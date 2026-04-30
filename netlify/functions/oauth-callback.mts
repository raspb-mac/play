/**
 * GitHub OAuth — callback step.
 *
 * GitHub redirects here with `code` and `state` after the user approves.
 * We verify state, exchange the code for an access token, then return a
 * tiny HTML page that postMessages the token back to the Decap CMS popup
 * opener and closes itself.
 *
 * Decap protocol: https://decapcms.org/docs/external-oauth-clients/
 *
 * Required environment variables:
 *   - OAUTH_GITHUB_CLIENT_ID
 *   - OAUTH_GITHUB_CLIENT_SECRET
 */

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  const m = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function popupHtml(payload: string): string {
  // The script posts the token back to the opener exactly as Decap expects.
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>STRATECO Auth</title></head>
<body>
<script>
  (function () {
    var payload = ${JSON.stringify(payload)};
    function send(target) {
      target.postMessage('authorization:github:success:' + payload, '*');
    }
    function ack(e) {
      if (!/^authorizing:github$/.test(e.data)) return;
      send(e.source || window.opener);
      window.removeEventListener('message', ack, false);
    }
    window.addEventListener('message', ack, false);
    if (window.opener) {
      window.opener.postMessage('authorizing:github', '*');
    }
    setTimeout(function () { window.close(); }, 1500);
  })();
</script>
<p>Authentifizierung erfolgreich. Sie können dieses Fenster schließen.</p>
</body></html>`;
}

function errorHtml(message: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>STRATECO Auth-Fehler</title></head>
<body>
<script>
  (function () {
    var msg = ${JSON.stringify(`authorization:github:error:${JSON.stringify({ message })}`)};
    if (window.opener) window.opener.postMessage(msg, '*');
    setTimeout(function () { window.close(); }, 4000);
  })();
</script>
<h1>Authentifizierung fehlgeschlagen</h1>
<p>${message.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]!))}</p>
</body></html>`;
}

export default async (req: Request) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response(errorHtml('Server misconfigured: OAUTH_GITHUB_CLIENT_ID/SECRET missing.'), {
      status: 500,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const ghError = url.searchParams.get('error');

  if (ghError) {
    return new Response(errorHtml(`GitHub: ${ghError}`), {
      status: 400,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  if (!code || !state) {
    return new Response(errorHtml('Missing `code` or `state` parameter.'), {
      status: 400,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  // Verify CSRF state cookie.
  const cookieHeader = req.headers.get('cookie');
  const expectedState = readCookie(cookieHeader, 'oauth_state');
  if (!expectedState || expectedState !== state) {
    return new Response(errorHtml('State mismatch — please retry login.'), {
      status: 400,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  // Exchange the authorization code for an access token.
  let token: string;
  try {
    const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${url.origin}/api/oauth/callback`
      })
    });
    if (!tokenResp.ok) throw new Error(`GitHub responded ${tokenResp.status}`);
    const data = (await tokenResp.json()) as { access_token?: string; error?: string };
    if (data.error || !data.access_token) {
      throw new Error(data.error ?? 'no access_token in GitHub response');
    }
    token = data.access_token;
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return new Response(errorHtml(`Token exchange failed: ${msg}`), {
      status: 502,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  // Decap expects: { token: '<gh_token>', provider: 'github' }
  const payload = JSON.stringify({ token, provider: 'github' });

  return new Response(popupHtml(payload), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Expire the state cookies — they're single-use.
      'Set-Cookie': [
        'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
        'oauth_origin=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
      ].join(', ')
    }
  });
};

export const config = { path: '/api/oauth/callback' };
