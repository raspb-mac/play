# Blog-Verwaltung — Konzeptpapier

Status: Entwurf · Stand: April 2026 · Verfasst für STRATECO

Dieses Dokument skizziert drei Pfade für die Blog-Verwaltung des STRATECO-Webauftritts und schlägt eine Vorzugsvariante vor. Es bezieht sich auf den aktuellen Prototyp (SvelteKit + Netlify Adapter) und die Sub-Routen unter `/insights/blog/`.

---

## 1. Anforderungen

| # | Anforderung | Priorität |
|---|---|---|
| R1 | Beiträge anlegen, bearbeiten, löschen | MUST |
| R2 | Bild-Upload (Cover-Image pro Beitrag) | MUST |
| R3 | WYSIWYG- oder Markdown-Editor mit Headlines, Absätzen, Zitaten | MUST |
| R4 | Geschützter Zugang (Login) für die Redaktion | MUST |
| R5 | Login-Eintritt nur über sehr dezenten Footer-Link | MUST |
| R6 | Kategorien filtern, Volltextsuche auf der öffentlichen Liste | MUST (erledigt im Prototyp) |
| R7 | Beiträge versionieren / Drafts | NICE |
| R8 | Mehrsprachigkeit (DE/EN) pro Beitrag | NICE |
| R9 | Geringer Betriebsaufwand und Folgekosten | MUST |
| R10 | SEO-fähige, schnelle öffentliche Auslieferung | MUST |

---

## 2. Drei Optionen im Vergleich

### Option A — Markdown-Files im Repo (Git-CMS)

Beiträge liegen als `.md`-Dateien in `content/blog/<slug>.md` mit YAML-Frontmatter. Bilder liegen unter `static/uploads/`. Eine kleine Admin-UI auf `/admin` schreibt Dateien per API-Endpunkt zurück und triggert einen Deploy.

**Stack-Bausteine:**
- `mdsvex` oder `marked` zum Parsen im SSR
- `@netlify/identity` oder `@auth/core` für die Auth
- Netlify Functions als Persistenz-Layer (Datei schreiben + Git-Commit über GitHub-API)
- Optional: Decap CMS (ehemals Netlify CMS) als Standard-Admin-Oberfläche

**Vorteile**
- Inhalte versioniert per Git (Audit-Trail kostenlos, Diff-Reviews möglich)
- Keine externe Datenbank, keine Vendor-Bindung über Netlify hinaus
- Performance: Beiträge sind beim Build statisch erzeugt (max. TTFB)
- Wenn Decap CMS genommen wird, fällt die Eigenentwicklung der Admin-UI komplett weg

**Nachteile**
- Schreiben aus der UI braucht entweder einen GitHub-PAT in einer Function oder ein OAuth-Flow zu GitHub. Beides ist machbar, aber mit etwas Konfigurationsaufwand verbunden.
- Mehrsprachigkeit pro Beitrag erfordert eine Konvention (z. B. `slug.de.md` und `slug.en.md`).
- Bild-Upload muss zusätzlich gelöst werden (Storage + URL-Rückgabe).
- Sehr große Mediatheken werden im Repo ungemütlich (>500 Bilder).

**Aufwand** (geschätzt): 4–6 Personentage für vollständig funktionsfähigen Stack inkl. Decap-Setup.
**Folgekosten:** ~0 €/Monat (alles in Netlify Free/Standard inkludiert).

---

### Option B — Headless CMS: Hygraph

Beiträge liegen in einer Hygraph-Instanz (GraphQL-API). Das Frontend liest beim Build und/oder zur Laufzeit per GraphQL. Die Redaktion arbeitet in der Hygraph-eigenen UI mit WYSIWYG, Asset-Manager, Workflows, Versionierung und Mehrsprachigkeit.

**Stack-Bausteine:**
- Hygraph-Projekt mit Content-Type `BlogPost` (title, slug, category, coverImage, content, locale, ...)
- GraphQL-Client im SvelteKit-`load`
- Webhook von Hygraph triggert Netlify-Rebuild bei Veröffentlichung
- Hygraph-eigenes Auth/Berechtigungs­modell für die Redaktion
- Eigene `/login`/`/admin`-Routen entfallen — die Redaktion arbeitet in Hygraph

**Vorteile**
- Sofort einsatzbereite, ausgereifte Redaktions­oberfläche (Drag-and-Drop-Bilder, RTE, Vorschau, Workflows)
- Mehrsprachigkeit als First-Class-Feature
- Versionierung und Drafts im Standard
- Asset-Pipeline mit Bildtransformationen (Format, Größe, Crop) inklusive

**Nachteile**
- Neuer externer Dienst → zusätzliche Lieferanten­beziehung, DSGVO-Vereinbarung, monatliche Kosten
- Vendor-Lock-in: ein Wechsel später bedeutet eine Datenmigration
- Free-Tier hat Limits (Content-Volumen, API-Calls); STRATECO-Volumen ist klein, aber das Free-Tier eines kommerziellen Anbieters sollte man nicht auf Dauer betreiben
- Bei Compliance-/Datenschutz­anforderungen muss Hosting (EU-Region) explizit konfiguriert werden

**Aufwand:** 2–3 Personentage Frontend-Anbindung; CMS-Setup wenige Stunden.
**Folgekosten:** Hygraph Hobby kostenlos; Hygraph Growth ab ~99 USD/Monat — ab ~10 Redakteuren / mehr Inhalten realistisch.

---

### Option C — Netlify Blobs + Eigene Admin-UI

Beiträge liegen als JSON-Records in einem Netlify Blob-Store. Bilder liegen ebenfalls in Blobs (oder als Files unter `static/uploads/`). Eine eigene Admin-UI auf `/admin` (Svelte-Form) schreibt über Netlify Functions in den Blob-Store. Auth über Netlify Identity oder Auth0.

**Stack-Bausteine:**
- `@netlify/blobs` (S3-ähnlicher KV-Store, in Netlify-Standard inkludiert)
- Netlify Functions für CRUD-Endpunkte (`POST/PUT/DELETE /api/posts/:slug`)
- `@auth/sveltekit` mit Credentials-Provider oder `@netlify/identity` für Auth
- Custom-Admin-UI: Liste, Detailseite, Editor (Markdown — z. B. EasyMDE oder CodeMirror)

**Vorteile**
- Kein externer CMS-Anbieter, vollständige Datenhoheit auf Netlify
- API-First: Content kann später leicht von einem Mobile-Client / Newsletter-System konsumiert werden
- Volle gestalterische Kontrolle der Admin-UI (matched Brand)
- Skaliert mühelos (Blobs sind hochverfügbar)

**Nachteile**
- Höchster Eigenentwicklungs­aufwand: Editor, Preview, Bild-Upload, Validierung, Audit-Log — alles selbst zu bauen
- Keine Versionierung out-of-the-box (manuell implementieren)
- Keine Live-Vorschau ohne zusätzliche Logik
- Auth-Flow muss penibel durchdacht werden (Session, Refresh, CSRF)

**Aufwand:** 7–10 Personentage für eine wirklich brauchbare Redaktions­oberfläche.
**Folgekosten:** Netlify-Standard reicht für realistische Volumina (~0 €/Monat zusätzlich).

---

## 3. Vergleichsmatrix

| Kriterium | A — Git/Markdown | B — Hygraph | C — Netlify Blobs |
|---|---|---|---|
| Aufwand initial | mittel | gering | hoch |
| Folgekosten/Monat | 0 € | ~0 € → ~99 USD | 0 € |
| Redaktions-UX | gut (Decap) | sehr gut | initial roh, aufbaubar |
| Bild-Pipeline | manuell | sehr gut | manuell |
| Versionierung | Git | nativ | manuell |
| Mehrsprachigkeit | über Konvention | nativ | manuell |
| Vendor-Lock-in | gering | mittel-hoch | gering (Netlify) |
| DSGVO/Hosting EU | trivial | konfigurierbar | trivial |
| Performance öffentlich | Top (statisch) | gut (mit ISR/Build-Hook) | gut |
| Backup-Strategie | im Git enthalten | Hygraph-Export | manueller Snapshot |

---

## 4. Empfehlung

**Vorschlag: Option A — Git-CMS mit Markdown-Files und Decap-CMS.**

Begründung:
1. Die erwartete Publikations­frequenz von STRATECO (basierend auf der bestehenden Strateco-Blog-Quelle: ~2–4 Beiträge pro Jahr) rechtfertigt keine monatlichen Kosten für ein kommerzielles CMS.
2. Versionierung, Reviews und Audit-Trail werden über Git erledigt — das passt zur Compliance-Tonalität des Hauses.
3. Decap CMS bietet eine erprobte Redaktions­oberfläche „out of the box", deren visuelles Anpassungs­bedürfnis minimal ist.
4. Wenn STRATECO das Volumen später deutlich steigern will (z. B. Newsletter, externe Beiträge, mehrere Redakteure mit Workflow), ist eine Migration auf Hygraph aus Markdown-Files trivial möglich (Hygraph importiert Markdown direkt).
5. Die Auth bleibt einfach: Decap unterstützt Git-Gateway über Netlify-Identity oder GitHub-OAuth — beides ohne Eigenentwicklung.

Eskalation auf **Option B (Hygraph)** wird empfohlen, sobald **mindestens zwei** der folgenden Bedingungen eintreten:
- mehr als drei aktive Redakteur:innen
- mehr als 30 Beiträge pro Jahr
- vollständige DE/EN-Pflege pro Beitrag wird zur Pflicht
- Asset-Pipeline (Bildtransformationen, Crops) wird zentral benötigt

**Option C (Netlify Blobs + Custom UI)** wird nur dann sinnvoll, wenn STRATECO die Redaktions­oberfläche eng an interne Prozesse binden möchte (z. B. Approval-Workflows mit anderen internen Systemen) und bereit ist, den dafür nötigen Eigenaufwand zu tragen.

---

## 5. Migrationspfad bei Option A

1. **Schritt 1 — Datenmodell finalisieren** (½ Tag)
   - Frontmatter-Felder festlegen: `slug`, `title`, `category`, `date`, `author`, `cover`, `readMinutes`, `teaser`, `language`
   - Konvention `content/blog/<slug>.<lang>.md` für Mehrsprachigkeit
2. **Schritt 2 — SvelteKit-Loader umschreiben** (1 Tag)
   - Statt aus `blog.ts` aus dem Markdown-Verzeichnis lesen
   - `mdsvex` oder Build-Step `fs.readdir + frontmatter`
   - Detail- und Listen-Seite konsumieren das gleiche Modell
3. **Schritt 3 — Decap CMS einrichten** (1 Tag)
   - `static/admin/index.html` mit Decap-Konfiguration
   - Auth über Netlify Identity (Email-Whitelist) oder GitHub-OAuth
   - Felder im Decap-`config.yml` definieren, inkl. Bild-Upload
4. **Schritt 4 — Webhook + Build-Trigger** (½ Tag)
   - Decap committet auf `main` → Netlify rebuild → öffentliche Seite aktualisiert
   - Optional Branch-Strategie für Drafts (`drafts/`-Branch mit Vorschau-URL)
5. **Schritt 5 — Inhalts-Migration** (variabel)
   - Bestehende `blog.ts`-Posts als initiale Markdown-Files exportieren
   - Bilder von `src/lib/assets/images/news/` in `static/uploads/` umlegen
6. **Schritt 6 — Admin-Stub-Routen abschalten** (Stunden)
   - `/admin` und `/login` aus der Sitemap entfernen oder auf Decap umleiten

**Gesamtschätzung:** ~4–6 Personentage bis zur produktiven Redaktions­oberfläche.

---

## 6. Was im Prototyp bereits vorbereitet ist

- **Filter & Suche** auf der Blog-Liste (clientseitig, sofort einsetzbar)
- **Author-Byline** im Datenmodell und auf der Detail-Seite
- **Kategorien-Taxonomie** mit Compliance-Schwerpunkt (`Compliance` · `AML` · `Risk Advisory` · `Strategie` · `Mandate` · `Allgemein`)
- **`/admin`-Route** (Stub) zeigt die geplante Tabellen-Oberfläche und referenziert dieses Konzept
- **`/login`-Route** (Stub) als visuelle Vorlage für das Auth-Setup
- **Footer „Admin"-Link** sehr dezent, im rechten Bereich neben dem Copyright

Diese Stubs lassen sich bei der gewählten Option weiterverwenden:
- A → ersetzen durch Weiterleitung auf `/admin/index.html` (Decap)
- B → ersetzen durch Weiterleitung in das Hygraph-Studio
- C → vorhandene Stubs sind die Basis und werden funktional ausgebaut

---

## 7. Offene Entscheidungen

- **(D1)** Welche Mehrsprachigkeits­tiefe soll der Blog haben? Alle Beiträge zweisprachig oder nur ausgewählte?
- **(D2)** Wer pflegt den Blog operativ? Eine Person, die Marketing-Abteilung, oder direkt Senior-Berater:innen?
- **(D3)** Wie wird mit externen Gastbeiträgen umgegangen? Brauchen wir Author-Profile-Pages?
- **(D4)** Soll der Blog auf einer Subdomain (`blog.strateco.de`) liegen oder im Hauptauftritt unter `/insights/blog/`?
   - Aktueller Prototyp: Letzteres. Empfehlung: dabei bleiben, weil interne Verlinkung und SEO einfacher sind.
- **(D5)** RSS-Feed: ja/nein? Falls ja, ergänzen wir eine `/rss.xml`-Endpunkt-Route (im Footer schon verlinkt).

---

## 8. Anhang — Referenzen

- Decap CMS: https://decapcms.org/
- Netlify Identity: https://docs.netlify.com/security/secure-access-to-sites/identity/
- Netlify Blobs: https://docs.netlify.com/blobs/overview/
- Hygraph: https://hygraph.com/
- mdsvex: https://mdsvex.com/

*Ende des Dokuments. Rückfragen bitte über die Redaktions-Mailadresse oder direkt im Repository als Issue.*
