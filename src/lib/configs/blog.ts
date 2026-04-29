/**
 * Blog post stubs for the prototype. Each post has a slug used in URLs,
 * a teaser block (rendered on the list and on the homepage carousel) and
 * a body of paragraphs for the detail page. Real editorial content
 * replaces these later — for now, original placeholder prose only.
 */

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  /** ISO yyyy-mm-dd for sorting */
  isoDate: string;
  title: string;
  teaser: string;
  image: string;
  /** Approximate read time in minutes (shown on the detail page) */
  readMinutes: number;
  /** Body — sections, each with optional heading and paragraphs */
  body: BlogBlock[];
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string };

import news1 from '$images/news/news-1.jpg';
import news2 from '$images/news/news-2.jpg';
import news3 from '$images/news/news-3.jpg';
import news4 from '$images/news/news-4.jpg';
import portfolio2 from '$images/portfolio/finance-2.jpg';
import portfolio4 from '$images/portfolio/finance-4.jpg';

export const blogPosts: BlogPost[] = [
  {
    slug: 'mid-caps-konsolidierung-2026',
    category: 'Marktbeobachtung',
    date: 'April 2026',
    isoDate: '2026-04-08',
    title: 'Mid-Cap-Konsolidierung 2026: Wer setzt die Maßstäbe?',
    teaser:
      'Der europäische Mittelstand steht 2026 vor einer Welle struktureller Neuordnungen. Welche Sektoren führen, welche reagieren — und welche Häuser strategisch profitieren.',
    image: news1,
    readMinutes: 7,
    body: [
      {
        type: 'p',
        text: 'In den vergangenen achtzehn Monaten hat sich die Konsolidierungs­bewegung im europäischen Mittelstand spürbar beschleunigt. Was als Reaktion auf höhere Kapitalkosten begann, hat inzwischen eine eigene strategische Logik entwickelt.'
      },
      {
        type: 'h2',
        text: 'Warum gerade jetzt?'
      },
      {
        type: 'p',
        text: 'Drei Faktoren wirken zusammen: Erstens werden Bewertungs­korridore wieder verhandelbar — das Bid-Ask-Spread, das Mandate über Monate blockiert hat, schließt sich. Zweitens drängen Beteiligungs­gesellschaften aus den Vintage-Jahren 2016–2019 in die Realisierungs­phase. Drittens entdecken strategische Käufer das Mittelmarkt­segment als überlegenen Wachstums­treiber gegenüber großen, teuren Targets.'
      },
      {
        type: 'p',
        text: 'In unseren Mandaten beobachten wir, dass die Vorbereitung auf den Verkaufs­prozess heute deutlich substantieller läuft als noch 2022 — Vendor-Due-Diligence, ESG-Reporting und ein belastbarer 18-Monats-Forecast sind keine Kür mehr, sondern Voraussetzung für ein wettbewerbliches Bieter­feld.'
      },
      {
        type: 'h2',
        text: 'Welche Sektoren führen?'
      },
      {
        type: 'p',
        text: 'Industrie­technik, B2B-Software und ausgewählte Healthcare-Segmente führen das Feld. Was sie eint: hohe wiederkehrende Umsätze, geringe Konjunktur­abhängigkeit und eine fragmentierte Wettbewerber­landschaft, die Buy-and-Build-Strategien begünstigt.'
      },
      {
        type: 'quote',
        text: 'Wer 2026 verkauft, sollte sein Story-Telling bereits Mitte 2025 aufgesetzt haben — alles andere wirkt reaktiv und kostet Bewertung.',
        cite: 'Senior Partner, STRATECO TAS'
      },
      {
        type: 'p',
        text: 'Für die kommenden zwölf Monate erwarten wir eine deutliche Zunahme von Carve-out-Mandaten aus großen Konzern­strukturen — getrieben durch aktivistische Investoren und durch eine neue Disziplin in der Portfolio­steuerung. Wer hier auf der Käuferseite vorbereitet ist, kann strukturelle Vorteile heben.'
      }
    ]
  },
  {
    slug: 'digitale-transformation-jenseits-der-buzzwords',
    category: 'Strategie',
    date: 'März 2026',
    isoDate: '2026-03-21',
    title: 'Digitale Transformation jenseits der Buzzwords.',
    teaser:
      'Echte Transformation bemisst sich an EBITDA, nicht an Pressemitteilungen. Drei Hebel, die Vorstände 2026 ernsthaft adressieren sollten.',
    image: news2,
    readMinutes: 6,
    body: [
      {
        type: 'p',
        text: 'Die Halbwertszeit der Modeworte verkürzt sich; die der Erwartungen an digitale Transformation nicht. Im fünften Jahr nach dem ersten großen Welle hat sich der Markt von Folien-Strategien zu konkreten EBITDA-Versprechen weiterbewegt — zu Recht.'
      },
      {
        type: 'h2',
        text: 'Hebel 1: Operating Model statt Tool-Auswahl'
      },
      {
        type: 'p',
        text: 'Tools sind nicht das Problem. Das Operating Model dahinter ist es. Wer Cloud-Migration, Datenplattform und KI-Initiative ohne ein klares Bild davon entscheidet, wie Verantwortung, Steuerung und Skill-Profile sich verändern müssen, baut Inseln statt Wirkung.'
      },
      {
        type: 'h2',
        text: 'Hebel 2: Daten als Steuerungs­substanz'
      },
      {
        type: 'p',
        text: 'Daten­strategien werden auch 2026 noch zu oft als IT-Themen behandelt. Sie sind aber primär Steuerungs­themen: Welche Entscheidungen sollen schneller, fundierter, automatisierter getroffen werden? Diese Frage sortiert die Investitionsliste.'
      },
      {
        type: 'h2',
        text: 'Hebel 3: Konsequente Wirkungs­messung'
      },
      {
        type: 'p',
        text: 'Wir empfehlen, jede Transformations­initiative an genau einem EBITDA-relevanten KPI zu messen — und diese Messung quartalsweise gegen die Ausgangs­linie zu vertreten. Was nicht messbar ist, bleibt Marketing.'
      },
      {
        type: 'p',
        text: 'Erfolgreiche Transformations­programme der letzten zwei Jahre haben eines gemeinsam: einen Vorstand, der Ergebnisse einfordert — und ein Beratungs­modell, das die Verantwortung dafür übernimmt.'
      }
    ]
  },
  {
    slug: 'helios-capital-markteintritt-dach',
    category: 'Mandate',
    date: 'Februar 2026',
    isoDate: '2026-02-17',
    title: 'Helios Capital — Markteintritt in DACH.',
    teaser:
      'Wie eine umfassende Marktanalyse, Stakeholder-Mapping und ein operativer 100-Tage-Plan den Eintritt eines internationalen Investors in den deutschsprachigen Raum getragen haben.',
    image: news3,
    readMinutes: 5,
    body: [
      {
        type: 'p',
        text: 'Mit Helios Capital betritt ein internationaler Investor mit ausgeprägtem Industrie­fokus den DACH-Markt. Strateco hat den Eintritt mit einer neunmonatigen Dreierphase begleitet — von der Marktstudie bis zum operativen 100-Tage-Plan.'
      },
      {
        type: 'h2',
        text: 'Phase 1 — Marktstudie und Sourcing-Strategie'
      },
      {
        type: 'p',
        text: 'In zwölf Wochen haben wir mit Helios Capital ein Sourcing-Universum aus rund 240 Mid-Cap-Targets aufgebaut, segmentiert nach Sektor­fit, Wachstums­profil und Eigentümer­situation. Aus dieser Long-List wurde eine fokussierte Short-List für die ersten Gespräche.'
      },
      {
        type: 'h2',
        text: 'Phase 2 — Stakeholder-Mapping'
      },
      {
        type: 'p',
        text: 'Erfolg im DACH-Mittelstand entscheidet sich vor dem ersten Term-Sheet. Wir haben Helios mit relevanten Familien­holdings, Family Offices und ausgewählten M&A-Beratern verbunden — und die Markenpositionierung im deutschen Markt entsprechend nachgeschärft.'
      },
      {
        type: 'h2',
        text: 'Phase 3 — 100-Tage-Plan'
      },
      {
        type: 'p',
        text: 'Der operative 100-Tage-Plan beschreibt die Aufbauschritte des Frankfurter Büros: Personalisierung, Compliance-Setup, Reporting-Architektur und die Integration in die zentrale Investment-Governance. Heute ist Helios mit einem festen Team in DACH operativ und hat die ersten beiden Mandate gewonnen.'
      }
    ]
  },
  {
    slug: 'neue-partner-2026',
    category: 'People',
    date: 'Januar 2026',
    isoDate: '2026-01-30',
    title: 'Neue Partner: Wir wachsen mit klaren Profilen.',
    teaser:
      'Zwei neue Partner verstärken unser Team in den Schwerpunkten Capital Markets und Industrial Operations — und unterstreichen unseren Wachstumskurs.',
    image: news4,
    readMinutes: 3,
    body: [
      {
        type: 'p',
        text: 'Mit Wirkung zum 1. Januar 2026 verstärken zwei neue Partner unser Team. Beide bringen langjährige Industrie­erfahrung mit — und eine ausgesprochene Mandanten­treue, die in den letzten Jahren zu Folge­mandaten in zweistelliger Anzahl geführt hat.'
      },
      {
        type: 'p',
        text: 'Eine Partner­position fokussiert sich auf Capital Markets und integrierte Treasury-Mandate. Wir adressieren damit den steigenden Bedarf unserer Mandanten an szenario­fähiger Steuerung von Liquidität, Zins- und Währungs­risiken — gerade vor dem Hintergrund der weiterhin volatilen Zins­landschaft.'
      },
      {
        type: 'p',
        text: 'Die zweite Partner­position vertieft unsere Industrial-Operations-Praxis. Schwerpunkt: Performance Improvement bei industriellen Mandanten in Deutschland und Österreich, mit besonderem Fokus auf Lieferketten- und Energie­kosten-Optimierung.'
      },
      {
        type: 'p',
        text: 'Detaillierte Profile (tbd) folgen in Kürze auf der Team-Seite.'
      }
    ]
  },
  {
    slug: 'esg-bewertungslogik',
    category: 'Studien',
    date: 'Januar 2026',
    isoDate: '2026-01-12',
    title: 'Wie ESG die Bewertungslogik verändert.',
    teaser:
      'Eine kompakte Auswertung von 60 Mid-Cap-Transaktionen 2024–2025: Wo ESG-Daten bereits eindeutig Bewertungs­wirkung zeigen — und wo nicht.',
    image: portfolio2,
    readMinutes: 9,
    body: [
      {
        type: 'p',
        text: 'In der öffentlichen Wahrnehmung hat ESG den Übergang von der Compliance-Disziplin zur Bewertungs­logik vollzogen. Unsere Auswertung von 60 Mid-Cap-Transaktionen aus den Jahren 2024 und 2025 zeigt jedoch ein differenzierteres Bild.'
      },
      {
        type: 'h2',
        text: 'Wo ESG zählt — und wo nicht'
      },
      {
        type: 'p',
        text: 'In drei Sektoren ist die Bewertungs­wirkung eindeutig nachweisbar: Industrietechnik, Bau- und Infrastruktur sowie Konsum­güter. In jeweils anderen Bereichen wirkt ESG bislang vor allem als Filterkriterium auf der Käuferseite — nicht als Bewertungs­hebel.'
      },
      {
        type: 'h2',
        text: 'Welche KPIs treiben?'
      },
      {
        type: 'p',
        text: 'Drei Kennzahlen-Cluster zeigen die stärkste Korrelation mit Multiples: erstens belastbare Scope-1- und Scope-2-Bilanzen, zweitens transparente Lieferketten­standards, drittens etablierte Governance-Strukturen für Compliance. Letzteres überrascht in seiner Bedeutung — und unterstreicht, dass Investor:innen "Substanz" in der Steuerung honorieren, nicht "Fassade".'
      },
      {
        type: 'p',
        text: 'Die vollständige Studie mit Methodik und Sektor-Breakdowns steht auf Anfrage zur Verfügung. (tbd)'
      }
    ]
  },
  {
    slug: 'capital-allocation-disziplin',
    category: 'Strategie',
    date: 'Dezember 2025',
    isoDate: '2025-12-09',
    title: 'Capital Allocation als Disziplin — nicht als Reaktion.',
    teaser:
      'Drei Beobachtungen aus Mandaten der letzten zwei Jahre: Wo strukturierte Kapital­allokation Wert schafft, wo Reaktion ihn vernichtet.',
    image: portfolio4,
    readMinutes: 5,
    body: [
      {
        type: 'p',
        text: 'Capital Allocation gehört zu den am häufigsten besprochenen — und am inkonsistentesten umgesetzten — Vorstands­themen der letzten Jahre. Wir haben in den letzten 24 Monaten neun Mandate begleitet, die diesen Themenkomplex direkt adressiert haben. Drei Beobachtungen.'
      },
      {
        type: 'h2',
        text: 'Beobachtung 1: Disziplin schlägt Volumen'
      },
      {
        type: 'p',
        text: 'Häuser, die regelmäßig denselben Bewertungs­korridor anlegen — auch wenn Akquisitions­chancen vorliegen — schneiden über fünf Jahre messbar besser ab als Häuser mit volatiler Auslastung der M&A-Pipeline. Diszipl­ineffekte wirken stärker als der vermeintliche Geschwindigkeits­vorteil opportunistischen Vorgehens.'
      },
      {
        type: 'h2',
        text: 'Beobachtung 2: Klare Hurdle-Logiken'
      },
      {
        type: 'p',
        text: 'Eine messbare Hurdle Rate, die für jede Investition pro forma angewandt wird, schützt vor strategischer Verzerrung. Die Mandate, die wir 2024 begleitet haben, hatten alle einen klaren Mindest-IRR — und genau diese Mandate haben durchschnittlich 3,1 Prozent­punkte über Plan abgeschlossen.'
      },
      {
        type: 'h2',
        text: 'Beobachtung 3: Capital Allocation ist Vorstands­arbeit'
      },
      {
        type: 'p',
        text: 'Wo M&A-, Capex- und Working-Capital-Entscheidungen in getrennten Komitees laufen, entstehen die größten Verluste. Erfolgreiche Häuser bündeln diese Entscheidungen in einem einzigen Steuerungs­kreis — typischerweise quartalsweise, mit klarer Vorstand­verantwortung.'
      }
    ]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
