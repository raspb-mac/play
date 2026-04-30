# GitHub OAuth Setup für Decap CMS

Diese Anleitung beschreibt die einmalige Konfiguration, damit du dich am
Redaktions-CMS unter `/admin/` mit deinem GitHub-Account anmelden kannst.

**Geschätzte Dauer:** 10 Minuten (alles Klicken in zwei Web-Oberflächen,
keine Code-Änderungen mehr nötig).

**Voraussetzung:** Repo-Push-Zugriff auf das Projekt-Repository (du als
`raspb-Mac` hast den) + Admin-Zugang zur Netlify-Site.

---

## Schritt 1 — GitHub OAuth App registrieren (3 Min)

1. Bei GitHub als **`raspb-Mac`** anmelden.
2. Diese URL aufrufen: <https://github.com/settings/developers>
   → Klick auf **„OAuth Apps"** → **„New OAuth App"**.
3. Felder ausfüllen:
   - **Application name**: `STRATECO Redaktion`
   - **Homepage URL**: `https://new-strateco.netlify.app` *(deine Netlify-URL)*
   - **Application description** (optional): `Decap CMS Login`
   - **Authorization callback URL**: `https://new-strateco.netlify.app/api/oauth/callback`
   - „Enable Device Flow" → **nicht** aktivieren
4. Klick **„Register application"**.
5. GitHub zeigt jetzt die **Client ID**. Klick **„Generate a new client secret"** →
   das Secret wird **nur einmal angezeigt** — sofort in einen Passwort-Manager
   kopieren.

> 🔒 **Wichtig:** Speichere das Client Secret nirgendwo im Repo. Nur
> in deinem Passwort-Manager und in den Netlify-Environment-Variablen
> (Schritt 2).

---

## Schritt 2 — Netlify Environment-Variablen setzen (3 Min)

1. Ins Netlify-Dashboard einloggen → die STRATECO-Site auswählen.
2. **Site settings → Environment variables → Add a variable** für jede
   der beiden Variablen:

   | Variable | Wert |
   |---|---|
   | `OAUTH_GITHUB_CLIENT_ID` | aus Schritt 1 (GitHub Client ID) |
   | `OAUTH_GITHUB_CLIENT_SECRET` | aus Schritt 1 (GitHub Client Secret) |

   Scope: **„All scopes"** (Production + Branch-Deploys + Deploy-Previews).

3. **Trigger redeploy** (Deploys → Trigger deploy → Deploy site), damit die
   Functions die neuen Env-Vars beim Build sehen.

---

## Schritt 3 — Repo-Identifikation in `static/admin/config.yml` einsetzen (2 Min)

Öffne **`static/admin/config.yml`** und ersetze die Platzhalter:

```yaml
backend:
  name: github
  repo: raspb-Mac/play              # ← <github-owner>/<repo-name>
  branch: main                       # ← oder dein Standard-Branch
  base_url: https://new-strateco.netlify.app   # ← deine Netlify-URL
```

> Wenn das Repo unter einer GitHub-Organisation liegt (z. B.
> `strateco-gmbh/website`), ist `repo:` der vollständige Pfad
> `<org-name>/<repo-name>`.

Gleich darunter, im selben File, optional:

```yaml
site_url: https://new-strateco.netlify.app
display_url: https://new-strateco.netlify.app
logo_url: https://new-strateco.netlify.app/favicon.svg
```

Commit + Push:

```sh
git add static/admin/config.yml
git commit -m "chore(cms): configure decap backend"
git push
```

---

## Schritt 4 — Erste Anmeldung testen (2 Min)

1. Warte auf den Netlify-Deploy (1–2 Min nach dem Push, im Netlify-Dashboard
   sichtbar).
2. Öffne `https://new-strateco.netlify.app/admin/`
3. Klick auf **„Login with GitHub"**.
4. Popup → GitHub fragt nach Berechtigung für die OAuth App → **„Authorize"**.
5. Popup schließt sich → Du landest in der Decap-Redaktions-Oberfläche.
6. Sichtbar sein sollten:
   - 8 bestehende Beiträge unter **„Blog"** (aus `content/blog/`)
   - Button **„New Beitrag"** rechts oben
   - Filter-Tabs (Compliance / AML / Risk Advisory / Strategie / Mandate / Allgemein)

Wenn das funktioniert: ✅ Setup abgeschlossen.

---

## Schritt 5 — Weitere Redakteur:innen einladen (optional)

Pro zusätzlicher Redakteur:in:

1. Die Person legt sich (falls nicht vorhanden) einen kostenlosen
   GitHub-Account an: <https://github.com/signup>
2. **Repo-Settings → Collaborators → Add people** → den Username eingeben →
   **„Send invitation"**.
3. Die eingeladene Person bekommt eine GitHub-Einladung per Mail oder im
   GitHub-Notification-Center → **„Accept invitation"**.
4. Danach kann sich diese Person genauso wie du unter `/admin/` einloggen.

> Empfehlung: Berechtigung **„Write"** ist ausreichend für Redaktion.
> **„Maintain"** oder **„Admin"** nur für die Site-Owner.

---

## Schritt 6 — Editorial Workflow (Draft → Review → Publish)

In `static/admin/config.yml` ist `publish_mode: editorial_workflow` aktiviert.
Heißt:
- Beim Speichern wird ein **Pull Request** erstellt (kein direkter Commit).
- Im PR-Review kann ein zweites Augenpaar prüfen, bevor der Beitrag live geht.
- Mit **„Publish"** in Decap wird der PR automatisch gemergt → Netlify-Deploy
  startet → Beitrag ist online.

Wenn du das **nicht** willst (jeder Edit committet sofort), die Zeile
`publish_mode: editorial_workflow` aus `config.yml` entfernen.

---

## Lokal testen mit Netlify CLI (optional)

Wenn du das Auth-Setup vor dem Deploy testen willst:

```sh
npm install -g netlify-cli
netlify login
netlify link                # einmalig: Site verlinken
netlify dev                 # startet vite + functions auf http://localhost:8888
```

Dann `http://localhost:8888/admin/` öffnen. Wichtig: für lokales Testen
in der GitHub-OAuth-App eine zweite Callback-URL ergänzen
(`http://localhost:8888/api/oauth/callback`) ODER eine zweite OAuth-App nur
für Dev-Tests anlegen.

---

## Was passiert technisch?

```
[Browser /admin/]
       │
       │ Klick „Login with GitHub"
       ▼
[Decap CMS] ──► popup öffnen: /api/oauth
       │
       ▼
[Netlify Function: oauth.mts]
       │ baut GitHub-Authorize-URL, setzt CSRF-Cookie
       │ 302 →
       ▼
[github.com/login/oauth/authorize]
       │ User klickt „Authorize"
       │ 302 →
       ▼
[Netlify Function: oauth-callback.mts]
       │ tauscht code → access_token (POST an github.com/login/oauth/access_token)
       │ Antwort: HTML mit postMessage('authorization:github:success:{token}')
       ▼
[Decap CMS popup → opener] empfängt Token, speichert in localStorage
       │
       ▼
[Decap-UI] zeigt Editor — von hier an redet Decap direkt mit der
GitHub-API (mit dem Token), liest content/blog/*.md, schreibt Edits zurück.
```

Du speicherst **kein Passwort**, dein Server macht **keine Session-Verwaltung**.
Token-Lebensdauer und Revoke laufen über GitHub.

---

## Häufige Stolpersteine

| Symptom | Ursache | Fix |
|---|---|---|
| Login-Popup zeigt „state mismatch" | Cookies werden vom Browser blockiert | Drittanbieter-Cookies für `*.netlify.app` zulassen oder Custom-Domain einsetzen |
| GitHub sagt „redirect_uri_mismatch" | Callback-URL stimmt nicht überein | In der GitHub OAuth App **exakt** `https://<deine-netlify-url>/api/oauth/callback` eintragen |
| „OAUTH_GITHUB_CLIENT_ID env var is missing" | Env-Var nicht gesetzt oder Site nicht redeployt nach Setzen | Schritt 2 prüfen, dann **„Trigger deploy"** in Netlify klicken |
| Decap zeigt „No collections found" | `repo:` in `config.yml` falsch oder Branch existiert nicht | Schritt 3 prüfen — `<owner>/<repo>` muss exakt stimmen |
| Login klappt, aber Speichern schlägt fehl | OAuth-Scope reicht nicht | Default-Scope `repo` ist gesetzt; falls Repo in Org → in der Org-Einstellung „Third-party access" für die OAuth App freigeben |

---

## Was ich NICHT für dich tun konnte

Diese drei Dinge müssen mit deinen GitHub- und Netlify-Zugängen geklickt
werden und sind in den Schritten oben beschrieben:

1. GitHub OAuth App registrieren (deine GitHub-UI)
2. Client ID + Secret in Netlify als Env-Vars eintragen (deine Netlify-UI)
3. `repo:` in `config.yml` auf den echten Repo-Pfad ändern + committen

Sobald das durch ist, funktioniert der Login direkt.

---

*Bei Fragen oder wenn etwas hakt: einfach melden, ich gucke drauf.*
