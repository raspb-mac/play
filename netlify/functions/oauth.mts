/**
 * GitHub OAuth — initiation step.
 *
 * Decap CMS opens a popup pointing at this route. We answer with a 302
 * redirect to GitHub's authorize endpoint, carrying our Client ID and
 * scope. GitHub then redirects back to /api/oauth/callback with a
 * temporary `code` (handled in oauth-callback.mts).
 *
 * Required environment variables (set in Netlify site settings):
 *   - OAUTH_GITHUB_CLIENT_ID      Public Client ID of the GitHub OAuth App
 *   - OAUTH_GITHUB_CLIENT_SECRET  Secret of the same App (used in callback)
 *
 * See GITHUB_OAUTH_SETUP.md for the one-time setup steps.
 */

export default async (req: Request) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response(
      'OAUTH_GITHUB_CLIENT_ID env var is missing. See GITHUB_OAUTH_SETUP.md.',
      { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } }
    );
  }

  const url = new URL(req.url);
  // We accept the original "site origin" via query param (Decap may pass it),
  // otherwise fall back to the request's own origin.
  const origin = url.searchParams.get('origin') ?? url.origin;

  // Random state to prevent CSRF — verified in the callback.
  const state = crypto.randomUUID();

  const redirectUri = `${url.origin}/api/oauth/callback`;
  const ghAuthorize = new URL('https://github.com/login/oauth/authorize');
  ghAuthorize.searchParams.set('client_id', clientId);
  ghAuthorize.searchParams.set('redirect_uri', redirectUri);
  ghAuthorize.searchParams.set('scope', 'repo,user:email');
  ghAuthorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: ghAuthorize.toString(),
      // Persist the state + caller origin in a short-lived, http-only cookie.
      'Set-Cookie': [
        `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
        `oauth_origin=${encodeURIComponent(origin)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
      ].join(', ')
    }
  });
};

export const config = { path: '/api/oauth' };
