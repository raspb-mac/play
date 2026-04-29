/**
 * Stub content for second-level pages. Each entry maps a slug to its
 * canonical headline + 3-paragraph blind text. Placeholder material the
 * client fills in later — handed to a single dynamic [slug] route per
 * top-level section so we don't have to maintain 11 page files.
 */

export interface SubPageContent {
  /** Top-level section label (used in breadcrumbs/eyebrow) */
  parentLabel: string;
  /** Canonical parent route, e.g. '/about-us' */
  parentHref: string;
  /** Eyebrow line for this sub-page */
  eyebrow: string;
  /** Page headline (rendered in turquoise) */
  headline: string;
  /** Body paragraphs (between two and four) */
  paragraphs: string[];
}

export const aboutUsSubPages: Record<string, SubPageContent> = {
  team: {
    parentLabel: 'Über uns',
    parentHref: '/about-us',
    eyebrow: 'TEAM',
    headline: 'Menschen, die Verantwortung übernehmen.',
    paragraphs: [
      'Hinter jedem Mandat steht ein festes Team mit klarer Rollenverteilung. Die Senior-Berater:innen, die das Erstgespräch geführt haben, begleiten Sie auch durch die Umsetzung — keine Übergabe an Junior-Profile, keine Stille zwischen Workshops.',
      'Unser Team verbindet Erfahrungen aus Strategieberatung, Treasury, Risk Management, Operations und IT der von uns betreuten Industrien. Diese Mischung erlaubt uns, Probleme aus mehreren Blickwinkeln gleichzeitig zu betrachten — und dort Antworten zu finden, wo Lehrbuchwissen aufhört.',
      'Auf dieser Seite stellen wir in Kürze die Profile unserer Partner und Senior-Berater:innen vor — mit Lebensläufen, fachlichen Schwerpunkten und persönlicher Kontaktmöglichkeit. (tbd)'
    ]
  },
  clients: {
    parentLabel: 'Über uns',
    parentHref: '/about-us',
    eyebrow: 'KUNDEN',
    headline: 'Mit wem wir arbeiten.',
    paragraphs: [
      'Über 80 Unternehmen haben uns in den vergangenen zwei Jahrzehnten Mandate anvertraut — vom international tätigen Finanzhaus über pharmazeutische Hersteller und Telekommunikations­konzerne bis zu Logistik- und Travel-Spezialisten. Was sie eint, ist der Anspruch an ergebnis­orientierte Beratung.',
      'Über die Hälfte unserer Mandate sind Anschluss- oder Folge­mandate. Diese Loyalität ist für uns das wichtigste Qualitäts­signal: Sie zeigt, dass Beratung dann funktioniert, wenn sie ehrlich, diskret und langfristig gedacht ist.',
      'Aus Vertraulichkeits­gründen veröffentlichen wir nur ausgewählte Mandanten. Eine Referenzliste stellen wir auf Anfrage und nach Abstimmung mit den jeweiligen Partnern gerne zur Verfügung.'
    ]
  },
  partners: {
    parentLabel: 'Über uns',
    parentHref: '/about-us',
    eyebrow: 'PARTNER',
    headline: 'Wir denken in Netzwerken.',
    paragraphs: [
      'Wo unsere Beratungsleistung an spezialisierte Software, Daten oder Methodik trifft, arbeiten wir mit ausgewählten Technologie- und Beratungs­partnern zusammen. So bringen wir auch tiefe Spezialfragen ohne Reibungs­verlust zur Lösung.',
      'Im Risk-Advisory-Geschäft kooperieren wir u. a. mit Kamakura Corporation und ihrer KRM-Plattform für integriertes Marktrisiko-, Kreditrisiko- und Asset-Liability-Management. Damit bekommen unsere Mandanten eine in regulierten Häusern erprobte Software-Basis für ihre Risikosteuerung.',
      'Wir suchen unsere Partner gezielt nach inhaltlicher Tiefe und Verlässlichkeit aus, nicht nach Provisions­modellen. Wenn Sie als Software-Hersteller, Kanzlei oder Beratungs­haus eine Partnerschaft prüfen möchten, freuen wir uns über Ihre Kontaktaufnahme.'
    ]
  },
  careers: {
    parentLabel: 'Über uns',
    parentHref: '/about-us',
    eyebrow: 'KARRIERE',
    headline: 'Steile Lernkurve, flache Hierarchien.',
    paragraphs: [
      'Wir suchen Berater:innen, die mehr wollen als die Sicherheit eines großen Hauses. Bei uns übernehmen Sie ab dem ersten Mandat substantielle Verantwortung — gegenüber Mandanten, Kollegen und gegenüber dem Ergebnis.',
      'Unser Modell verbindet die intellektuelle Tiefe einer Strategie­beratung mit der unternehmerischen Geschwindigkeit eines Boutique-Hauses. Wer hier wächst, wächst schnell — fachlich wie persönlich.',
      'Wir freuen uns über Bewerbungen von erfahrenen Berater:innen ebenso wie von Hochschulabsolvent:innen, die ihre Karriere in einem fokussierten, kollegialen Umfeld starten möchten. Konkrete Stellenausschreibungen und Profile (tbd) folgen in Kürze.'
    ]
  }
};

export const expertiseSubPages: Record<string, SubPageContent> = {
  aos: {
    parentLabel: 'Kompetenzen',
    parentHref: '/expertise',
    eyebrow: 'ALIGNMENT OF ORGANIZATION TO STRATEGY',
    headline: 'Strategie, die in der Organisation ankommt.',
    paragraphs: [
      'Strategie scheitert selten an der Idee, sondern fast immer an der Übersetzung in Strukturen, Prozesse und Verantwortlichkeiten. AOS adressiert genau diese Lücke: Wir machen Ihre Organisation an der Strategie ausrichtbar — nicht umgekehrt.',
      'Im Mandat analysieren wir Aufbauorganisation, Steuerungslogik, Anreizsysteme und kulturelle Treiber. Daraus entwickeln wir ein konkretes Veränderungs­design, das mit Ihren Führungs­teams umsetzbar ist und an klaren Messpunkten überprüft wird.',
      'Typische Anlässe sind eine strategische Neuausrichtung, ein Carve-out, der Eintritt in neue Märkte oder ein Generationen­wechsel im Management. Mandate dauern in der Regel zwischen vier und neun Monaten — von der Diagnose bis zur Wirkungsmessung.',
      'Schwerpunkt­themen: Operating Model Design, Governance & Steuerung, Programm- und Portfolio-Management, Kultur- und Führungs­arbeit.'
    ]
  },
  finance: {
    parentLabel: 'Kompetenzen',
    parentHref: '/expertise',
    eyebrow: 'FINANCE & CONTROLLING',
    headline: 'Steuerung, die das Geschäft trägt.',
    paragraphs: [
      'Finance & Controlling ist für uns mehr als Reporting. Wir bauen Steuerungs­logiken, die das Geschäfts­modell tragen — von einer belastbaren Profitabilitäts­rechnung über Liquiditäts­steuerung bis zur szenariofähigen Planung.',
      'Unsere Mandate kombinieren methodische Tiefe mit operativer Pragmatik: Wir entwerfen nicht das ideale Reporting-Universum, sondern das System, das Ihre Organisation tatsächlich nutzt und das die Geschwindigkeit relevanter Entscheidungen erhöht.',
      'Typische Anlässe: Vorbereitung auf eine Transaktion, Wechsel im CFO-Office, Ausbau einer Holdingstruktur, Modernisierung der ERP- und Controlling-Landschaft, IFRS-/regulatorische Umstellungen im Finanzsektor.',
      'Schwerpunkt­themen: Reporting-Architektur und Datenmodelle, Profit-Center- und Produkt­profitabilität, Treasury- und Liquiditäts­steuerung, Planung und Forecasting.'
    ]
  },
  tas: {
    parentLabel: 'Kompetenzen',
    parentHref: '/expertise',
    eyebrow: 'TRANSACTIONS ADVISORY SERVICES',
    headline: 'Transaktionen mit Substanz.',
    paragraphs: [
      'TAS begleitet Käufer und Verkäufer durch alle Phasen einer Transaktion — von der Long-List-Erstellung über Due Diligence und Verhandlungs­support bis zur Post-Merger-Integration. Diskretion und kommerzielle Klarheit sind dabei nicht verhandelbar.',
      'Anders als reine M&A-Beratungen denken wir Strategie und Umsetzung zusammen. Eine Akquisition ist erst dann erfolgreich, wenn sie nach dem Closing das hält, was im Modell stand — und dafür sorgen wir mit Ihnen gemeinsam.',
      'Wir begleiten typischerweise Transaktionen mit einem Volumen zwischen 20 Mio. € und 1 Mrd. €, sowohl Buy-Side als auch Sell-Side, für strategische Investoren ebenso wie für Beteiligungs­gesellschaften.',
      'Schwerpunkt­themen: Commercial Due Diligence, Financial Modeling und Valuation Analytics, Vendor Assistance, Investor Relations, Post-Merger-Integration.'
    ]
  },
  ras: {
    parentLabel: 'Kompetenzen',
    parentHref: '/expertise',
    eyebrow: 'RISK ADVISORY SERVICES',
    headline: 'Risiken, die man führen kann.',
    paragraphs: [
      'RAS adressiert das, was zwischen Audit und Strategie liegt: die unternehmerische Steuerung von Risiken. Wir helfen Ihnen, Risiken transparent zu machen, sie zu priorisieren und in Ihre Steuerungs­logik zu integrieren — statt sie nur in Risikoregister abzulegen.',
      'Für die software-gestützte Umsetzung kooperieren wir mit Kamakura Corporation und ihrer Plattform KRM. Damit decken wir Marktrisiko, Kreditrisiko, Asset-Liability-Management und integriertes Risikoreporting auf einer in regulierten Häusern erprobten Basis ab.',
      'Unsere Mandate reichen vom Aufbau eines integrierten Risiko- und Compliance-Frameworks über regulatorische Themen wie ESG, BCM und IT-Sicherheit bis zur Begleitung in akuten Krisen­situationen — eng verzahnt mit Internal Audit, Compliance und den Aufsichts­organen.',
      'Schwerpunkt­themen: Enterprise Risk Management, Marktrisiko / ALM, Kreditrisiko, ESG- und Klimarisiken, IT- und Cyber-Risiken, Krisen- und Continuity-Management.'
    ]
  }
};

export const insightsSubPages: Record<string, SubPageContent> = {
  blog: {
    parentLabel: 'News & Insights',
    parentHref: '/insights',
    eyebrow: 'BLOG',
    headline: 'Beiträge unserer Berater:innen.',
    paragraphs: [
      'Im Blog teilen unsere Senior-Berater:innen Beobachtungen aus dem Mandatsalltag — kompakt, mit klarer These, ohne Marketing­filter. Themen reichen von Strategie­umsetzung über Capital Allocation bis zu strukturellen Trends in unseren Kernindustrien.',
      'Wir publizieren in der Frequenz, in der wir wirklich etwas zu sagen haben. Lieber alle drei Wochen ein durchdachter Text als wöchentlich ein generischer Aufguss aus dem Sektor-Newsletter.',
      'Sie können einzelne Beiträge teilen oder unseren E-Mail-Newsletter abonnieren. Die Newsletter­ausgabe erscheint monatlich und bündelt die jeweils stärksten Beiträge des Vormonats. (tbd)'
    ]
  },
  views: {
    parentLabel: 'News & Insights',
    parentHref: '/insights',
    eyebrow: 'EINBLICKE',
    headline: 'Studien & längere Stücke.',
    paragraphs: [
      'In der Rubrik Einblicke veröffentlichen wir längere Studien und Positions­papiere — typischerweise zwischen 12 und 30 Seiten. Sie entstehen aus der Verdichtung mehrerer Mandate oder aus eigener Sektor­analyse.',
      'Aktuelle Themen umfassen die Konsolidierungs­dynamik im europäischen Mittelstand, neue Anforderungen an die Investoren­kommunikation und die Auswirkungen veränderter Regulatorik auf Kapital­allokation und Bewertung.',
      'Studien sind kostenlos abrufbar; einzelne Detailauswertungen behalten wir unseren Mandanten und ausgewählten Partnern vor. Sprechen Sie uns an, wenn Sie eine Studie zu einem bestimmten Thema benötigen. (tbd)'
    ]
  },
  press: {
    parentLabel: 'News & Insights',
    parentHref: '/insights',
    eyebrow: 'PRESSE',
    headline: 'STRATECO in den Medien.',
    paragraphs: [
      'Wir sprechen selten öffentlich — und wenn, dann mit einem klaren Standpunkt. Auf dieser Seite finden Sie ausgewählte Pressestimmen, Interviews und Kommentare unserer Partner:innen zu aktuellen Themen aus Wirtschaft, Strategie und Kapitalmärkten.',
      'Unsere Pressestelle versorgt Wirtschaftsredaktionen kurzfristig mit fundierten Hintergrund­informationen und Expert:innen-Statements. Anfragen erreichen uns am schnellsten über die Pressestelle.',
      'Für hochauflösendes Bildmaterial, Lebensläufe unserer Sprecher:innen oder die Vereinbarung eines Interviewtermins schreiben Sie uns bitte direkt an die Pressestelle. (tbd)'
    ]
  }
};
