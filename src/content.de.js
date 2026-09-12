/**
 * @typedef {{ label: string, tone?: string }} RadarItem
 * @typedef {{ title: string, description: string }} ServiceItem
 * @typedef {{ title: string, tools: string }} StackItem
 * @typedef {{ period: string, start: number, end: number, title: string, description: string, tags: string[], placeholder?: boolean }} ProjectItem
 * @typedef {{ src: string, label: string }} SideShot
 * @typedef {{ name: string, kind: string, year: string, status: string, tagline: string, description: string, stack: string[], shots: SideShot[], links: { code: string, live: string } }} SideProject
 * @typedef {{ period: string, role: string, summary: string }} TimelineItem
 */

/** @type {{
  brand: string,
  pageTitle: string,
  nav: { id: string, label: string }[],
  ctaLabel: string,
  eyebrow: string,
  heroTitle: string,
  heroLead: string,
  heroPrimary: string,
  heroGhost: string,
  stats: { key: string, value: string, label: string }[],
  heroImageAlt: string,
  availability: string,
  construction: {
    title: string,
    message: string,
    contact: string
  },
  servicesTitle: string,
  servicesIntro: string,
  servicesHint: string,
  services: ServiceItem[],
  stackTitle: string,
  stackIntro: string,
  radar: RadarItem[],
  industriesTitle: string,
  industriesIntro: string,
  industriesCountLabel: string,
  projectsTitle: string,
  projectsIntro: string,
  projectsCountLabel: string,
  filterTechLabel: string,
  filterYearLabel: string,
  filterResetLabel: string,
  filterToggleLabel: string,
  timelineTitle: string,
  timelineIntro: string,
  contactTitle: string,
  contactIntro: string,
  contactCardCopy: string,
  contactButton: string,
  modalTitle: string,
  formName: string,
  formEmail: string,
  formRole: string,
  formMessage: string,
  contactEmail: string,
  contactLocation: string,
  contactLinkedIn: string,
  contactGithub: string,
  footer: string,
  footerImprint: string,
  footerPrivacy: string,
  footerVersionLabel: string,
  cvLabel: string,
  cvButton: string,
  filtersAll: string,
  stackItems: StackItem[],
  industries: string[],
  projects: ProjectItem[],
  careerTimeline: TimelineItem[],
  educationNote: string,
  rd: Record<string, any>,
  side: SideProject[]
}} */
export const contentDe = {
  brand: 'Andre Hickmann Kuschnereit',
  pageTitle: 'Senior Softwareentwickler aus Berlin | Profil',
  nav: [
    { id: 'profil', label: 'Profil' },
    { id: 'leistungen', label: 'Leistungen' },
    { id: 'stack', label: 'Techstack' },
    { id: 'projekte', label: 'Projekte' },
    { id: 'kontakt', label: 'Kontakt' }
  ],
  ctaLabel: 'Anfrage starten',
  eyebrow: 'Berlin · 23+ Jahre Erfahrung · Senior Fullstack · Cloud · Architecture',
  heroTitle:
    'Senior Fullstack Engineer mit Fokus auf moderne Technologien, Cloud-Architektur und durchgängige Produktentwicklung.',
  heroLead:
    'Ich bin offen für eine Festanstellung in Berlin oder remote. Hybrid mit Remote-Anteil ist ebenfalls möglich. Keine Freelance-Projekte.',
  heroPrimary: 'Projekte ansehen',
  heroGhost: 'Techstack entdecken',
  stats: [
    { key: 'experience', value: '23', label: 'Jahre Praxis' },
    { key: 'teams', value: '15', label: 'Teams begleitet' },
    { key: 'projects', value: '', label: 'Projekte' },
    { key: 'industries', value: '', label: 'Branchen' }
  ],
  heroImageAlt: 'Portraitfoto',
  availability: 'Offen für neue Möglichkeiten',
  construction: {
    title: 'Bald Online',
    message: 'Diese Seite wird gerade vorbereitet und ist bald online.',
    contact: 'Interesse? Schreiben Sie mir: andre@hickmann-kuschnereit.de'
  },
  servicesTitle: 'Leistungen & Verantwortung',
  servicesIntro:
    'Ich begleite Projekte durchgängig – mit klarem Fokus auf Verständlichkeit, Qualität und Betrieb.',
  servicesHint: 'Ziehen oder scrollen für mehr',
  services: [
    {
      title: 'Requirements Engineering',
      description: 'Workshops & Kundentermine, strukturierte Anforderungsanalyse und Dokumentation.'
    },
    {
      title: 'Fullstack-Entwicklung',
      description: 'Konzeption und Umsetzung von Frontend, Backend, APIs und Datenmodellen.'
    },
    {
      title: 'Technische Spezifikation',
      description: 'Schreiben technischer Anforderungen, Architektur- und Integrationskonzepte.'
    },
    {
      title: 'Software- & Codeanalyse',
      description:
        'Audit bestehender Codebases, Risikoanalyse und Ableitung von Modernisierungspfaden.'
    },
    {
      title: 'E2E Frontend-Testing',
      description: 'Stabile Teststrategien mit Fokus auf kritische User Journeys.'
    },
    {
      title: 'KI-Driven Delivery',
      description: 'LLM-Integration, Automatisierung und Assistenzsysteme mit Business Value.'
    },
    {
      title: 'Wartung & Modernisierung',
      description:
        'Aktualisierung älterer Produkte, Stabilisierung, Performance- und Security-Fixes.'
    }
  ],
  stackTitle: 'Techstack',
  stackIntro: 'Ein klarer Stack für Produktteams, die Tempo und Stabilität brauchen.',
  terminalTitle: 'Terminal',
  terminalIntro: 'Mini-CLI für schnelle Fakten zu Profil, Projekten und Stack.',
  terminalPlaceholder: 'help, projects, stack, contact, clear',
  terminalHelp: ['help', 'projects', 'industries', 'stack', 'contact', 'clear'],
  sprintTitle: 'Bug‑Fix Sprint',
  sprintIntro: '10 Sekunden – klick so viele Bugs wie möglich.',
  sprintScore: 'Score',
  sprintHighscore: 'Highscore',
  sprintCombo: 'Combo',
  sprintTime: 'Zeit',
  sprintStart: 'Start',
  sprintRunning: 'Läuft…',
  radar: [
    { label: 'Frontend', tone: 't1' },
    { label: 'Backend', tone: 't2' },
    { label: 'Cloud/DevOps', tone: 't3' },
    { label: 'Requirements', tone: 't4' },
    { label: 'Data', tone: 't5' },
    { label: 'AI', tone: 't6' }
  ],
  industriesTitle: 'Branchen- und Domänenerfahrung',
  industriesIntro: 'Erfahrung in kritischen Domains mit komplexen Abläufen.',
  industriesCountLabel: 'Branchen',
  projectsTitle: 'Projekte & Ergebnisse',
  projectsIntro: 'Auszug aus Projekten mit Fokus auf Wirkung, Skalierung und stabile Delivery.',
  projectsCountLabel: 'Projekte',
  filterTechLabel: 'Tech & Bereich',
  filterYearLabel: 'Jahre',
  filterResetLabel: 'Filter zurücksetzen',
  filterToggleLabel: 'Filter anzeigen',
  loadMoreLabel: 'Mehr Projekte laden',
  timelineTitle: 'Lebenslauf',
  timelineIntro: 'Highlights meiner Laufbahn – kompakt, relevant, aktuell.',
  contactTitle: 'Kontakt',
  contactIntro: 'Interesse an einer Zusammenarbeit? Ich freue mich auf ein kurzes Gespräch.',
  contactCardCopy:
    'Bitte schick mir Informationen zur Rolle, Team und Techstack. Remote bevorzugt.',
  contactButton: 'Kennenlernen anfragen',
  modalTitle: 'Kontaktformular',
  formName: 'Name',
  formEmail: 'E-Mail',
  formRole: 'Rolle / Position',
  formMessage: 'Nachricht',
  contactEmail: 'Email: andre@hickmann-kuschnereit.de',
  contactLocation: 'Standort: Berlin · Remote möglich',
  contactLinkedIn: 'LinkedIn Profil',
  contactGithub: 'GitHub Profil',
  footer: '© 2026 · André Hickmann Kuschnereit · Senior Softwarearchitekt aus Berlin',
  footerImprint: 'Impressum',
  footerPrivacy: 'Datenschutz',
  footerVersionLabel: 'Version',
  footerReportBug: '🐛 Bug melden',
  footerGitHub: '⭐ GitHub',
  footerNote: 'Built with ❤ and 🤖 AI',
  konamiTitle: 'Hidden Mode: Debug',
  konamiSubtitle: 'Debug-Overlay aktiv',
  konamiRefresh: 'Neue Fakten',
  cvLabel: 'Lebenslauf als PDF',
  cvButton: 'PDF herunterladen',
  nextUpLabel: 'Next up',
  nextUpText:
    'Offen für neue Herausforderungen in einem innovativen Team. Schwerpunkt: Fullstack-Entwicklung (Frontend, Backend, Cloud), Requirements Engineering, Testing & Qualitätssicherung, Produktarchitektur, End-to-End Delivery.',
  filtersAll: 'Alle',
  stackItems: [
    {
      title: 'Backend & Architektur',
      tools: 'Node.js, Java, Scala, PHP, Go, API Design, Domain Driven Design'
    },
    {
      title: 'Frontend & Experience',
      tools: 'Vue.js, React, TypeScript, Angular, Design Systems, Microfrontends'
    },
    {
      title: 'Cloud & Infrastruktur',
      tools: 'AWS, Docker, Kubernetes, Helm, ArgoCD'
    },
    {
      title: 'Delivery & Qualität',
      tools: 'CI/CD, Observability, Testautomatisierung, E2E Testing, SRE Practices'
    },
    {
      title: 'Daten & Integration',
      tools: 'PostgreSQL, MySQL, Postgis, MSSQL, Redis, Kafka, Event Streaming'
    },
    {
      title: 'KI & Automatisierung',
      tools: 'LLM-Integration, RAG, Dokumentanalyse, Workflow-Automation'
    },
    {
      title: 'Leadership',
      tools: 'Teamführung, Mentoring, Produktstrategie, Workshop-Moderation'
    }
  ],
  industries: [
    'FinTech & Banking',
    'Mobility & Logistik',
    'HealthTech',
    'E-Commerce',
    'SaaS & B2B Plattformen',
    'Energie & Nachhaltigkeit',
    'Medien & Publishing',
    'Public Sector'
  ],
  projects: [
    {
      period: '2026 – ?',
      start: 2026,
      end: 2026,
      title: 'Hier könnte dein Projekt stehen',
      description:
        'Ich bin offen für eine neue Festanstellung in Berlin oder remote. Du hast spannende Herausforderungen? Lass uns sprechen!',
      tags: ['Next', 'Opportunity', 'Fullstack'],
      placeholder: true
    },
    {
      period: '2025 – heute',
      start: 2025,
      end: 2026,
      title: 'Shopping-Plattform & Website-Builder (Apotheken)',
      description:
        'Headless Commerce auf Vendure, Website-Builder für Filialen, Zahlungen über PayPal und Stripe.',
      tags: ['Commerce', 'Vendure', 'Payments', 'Vue']
    },
    {
      period: '2026 – heute',
      start: 2026,
      end: 2026,
      title: 'Agentic Coding Portal (intern)',
      description:
        'Git, Jira, Confluence und KI-gestütztes Coding an einem Ort – Entwicklerportal für das eigene Unternehmen.',
      tags: ['AI', 'DevTools', 'Integration', 'Platform']
    },
    {
      period: '2025 – heute',
      start: 2025,
      end: 2026,
      title: 'Forschungszentrum Nachhaltigkeit (Mehrere Projekte)',
      description:
        'Migration Vue2→Vue3, Timeseries-Visualisierung, Wasser-/Luftqualitätsdaten (Grafana).',
      tags: ['Research', 'Vue', 'Data', 'Sustainability']
    },
    {
      period: '2025',
      start: 2025,
      end: 2025,
      title: 'KI-Projekte (Anonymisiert)',
      description:
        'Belegerkennung, Dokumentanalyse, automatische Auswertungen und Code-Generierung.',
      tags: ['AI', 'Python', 'Automation']
    },
    {
      period: '2025',
      start: 2025,
      end: 2025,
      title: 'AgriTech Maschinensteuerung',
      description: 'Kamera/ML-gestützte Steuerung zur Unkrautbekämpfung per Laser.',
      tags: ['AgriTech', 'ML', 'Edge']
    },
    {
      period: '2025',
      start: 2025,
      end: 2025,
      title: 'Softwareanalyse EKG',
      description:
        'Review und Bewertung einer EKG-Analyse-Software inkl. Risiken & Verbesserungen.',
      tags: ['Health', 'Audit', 'Quality']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Ticketing Plattform',
      description: 'Konzeption & Entwicklung für Ticketverkauf, Venue-/Artist-Management, Payment.',
      tags: ['Ticketing', 'Web', 'Payments']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Streaming & Wettbewerbe',
      description: 'Kurzvideo-Plattform mit Wettbewerben und Wallet-Logik (Web + Ionic).',
      tags: ['Streaming', 'Ionic', 'Vue', 'Mobile']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Biodiversity Compliance Plattform',
      description: 'GIS-Heatmaps, Action Items, Frontend (React) und Backend (Python).',
      tags: ['Sustainability', 'GIS', 'React', 'Python']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Bewerberintegration (Arbeitsmarkt)',
      description: 'Plattform zur Integration internationaler Bewerber (Vue/Scala/MySQL).',
      tags: ['HR', 'Vue', 'Scala', 'MySQL']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Legacy Modernisierung Ladenbau',
      description: 'Modernisierung von PHP5/Vanilla JS auf PHP 8.x, stabiler Betrieb.',
      tags: ['Legacy', 'PHP', 'Modernization']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Schlafanalyse-Plattform',
      description: 'App zur Erkennung von Schnarchgeräuschen mit Analyse & Diagnosehilfe.',
      tags: ['Health', 'Mobile', 'Analytics']
    },
    {
      period: '2023',
      start: 2023,
      end: 2023,
      title: 'Bowling-Software Suite',
      description: 'Steuerung von Bahnen, Buchung, Gastronomie, Payment (Vue/Scala/Java).',
      tags: ['POS', 'Vue', 'Scala', 'Java']
    },
    {
      period: '2023',
      start: 2023,
      end: 2023,
      title: 'Sicherheitsdienst Schichtplanung',
      description: 'Planungssoftware für Schichten, Kunden und Einsatzorte.',
      tags: ['Scheduling', 'Web', 'B2B']
    },
    {
      period: '2023',
      start: 2023,
      end: 2023,
      title: 'Telemedizin & Video-Sprechstunde',
      description: 'Terminportal mit Videokonferenzen, TURN/STUN-Setup, Scala Backend.',
      tags: ['Health', 'Vue', 'Scala', 'Realtime']
    },
    {
      period: '2022',
      start: 2022,
      end: 2022,
      title: 'E-Bike Benchmarking',
      description:
        'Digitaler Benchmark-Raum für Kostenanalyse vom Einzelteil bis zum Komplettbike.',
      tags: ['Mobility', 'Data', 'Product']
    },
    {
      period: '2022',
      start: 2022,
      end: 2022,
      title: 'Jobportal mit Matching',
      description: 'Diskriminierungsfreies Jobportal mit Matching-Funktion.',
      tags: ['HR', 'Matching', 'Web']
    },
    {
      period: '2022',
      start: 2022,
      end: 2022,
      title: 'Hotel Operations Suite',
      description: 'Software zur Steuerung von Abläufen in Hotels und deren Bereichen.',
      tags: ['Hospitality', 'Operations', 'Web']
    },
    {
      period: '2021 – 2026',
      start: 2021,
      end: 2026,
      title: 'Steuerberatungs-Software',
      description: 'Buchungs- und Jahresabschluss-Software für Großunternehmen.',
      tags: ['Finance', 'B2B', 'Vue', 'Scala']
    },
    {
      period: '2021 – 2025',
      start: 2021,
      end: 2025,
      title: 'Fashion Commerce Integration',
      description: 'Rechnungs-/Retourenportal, Monitoring, Gutscheine, internationale Steuersätze.',
      tags: ['Commerce', 'Integration', 'Payments']
    },
    {
      period: '2021',
      start: 2021,
      end: 2021,
      title: 'Regionalpartner Bonusportal',
      description: 'Portal für Werbetreibende und Guthabenprogramme (Vue2/Scala).',
      tags: ['SaaS', 'Vue', 'Scala']
    },
    {
      period: '2021',
      start: 2021,
      end: 2021,
      title: 'Gäste-WLAN Management',
      description: 'Plattform zur Verwaltung von WLAN-Zugängen für Gäste.',
      tags: ['Network', 'PHP', 'Web']
    },
    {
      period: '2021',
      start: 2021,
      end: 2021,
      title: 'Food Delivery Plattform',
      description: 'Bestellplattform mit Küchenportal, WaWi und Mollie-Zahlung.',
      tags: ['Commerce', 'Vue', 'Scala', 'Payments']
    },
    {
      period: '2021',
      start: 2021,
      end: 2021,
      title: 'Umweltprojekt Schülerprogramme',
      description: 'Nachhaltige Schülerprojekte mit Bildungsbezug.',
      tags: ['Education', 'Sustainability', 'Web']
    },
    {
      period: '2021',
      start: 2021,
      end: 2021,
      title: 'Mathe-Lernsystem (Forschung)',
      description: 'Lernsystem mit erklärenden Aufgaben und Guided Questions.',
      tags: ['EdTech', 'Research', 'Web']
    },
    {
      period: '2020 – 2022',
      start: 2020,
      end: 2022,
      title: 'Versicherungsportal (Makler)',
      description:
        'REST/SOAP-Integration, Formular-Generator in Vue/TypeScript, Migration im Frontend.',
      tags: ['InsurTech', 'Vue', 'Java', 'Integration']
    },
    {
      period: '2018 – heute',
      start: 2018,
      end: 2026,
      title: 'FinTech Invoicing Plattform',
      description: 'Rechnungsstellung, Kundenverwaltung, Mahnwesen, Bankanbindung, Versand.',
      tags: ['FinTech', 'Vue', 'Scala', 'PHP']
    },
    {
      period: '2008 – 2017',
      start: 2008,
      end: 2017,
      title: 'Kanzlei-Kommunikationsportale',
      description: 'Mandantenportale, Integrationen (GDV/Versicherungen), DMS-Einführung.',
      tags: ['LegalTech', 'Integration', 'B2B']
    },
    {
      period: '2008 – 2017',
      start: 2008,
      end: 2017,
      title: 'Schuldnerportal Ratenzahlungen',
      description: 'Onlinevereinbarungen für Ratenzahlungen inkl. Dokumentation & Schulungen.',
      tags: ['LegalTech', 'Web', 'Payments']
    },
    {
      period: '2003 – 2008',
      start: 2003,
      end: 2008,
      title: 'CMS & Onlineshop Entwicklung',
      description: 'Eigenes CMS, Mode-Onlineshop, Webentwicklung & Betrieb.',
      tags: ['CMS', 'Commerce', 'Web']
    }
  ],
  careerTimeline: [
    {
      period: '01/2003 – 07/2008',
      role: 'Selbstständigkeit / Einzelunternehmer',
      summary: 'Entwicklung & Betrieb von Webseiten, Onlineshop, CMS-System, Computerkurse.'
    },
    {
      period: '08/2008 – 12/2017',
      role: 'Unternehmensgründung / Teilhaber swepp GmbH',
      summary:
        'Onlineportale für Kanzleien, GDV/Versicherungen-Integrationen, DMS-Implementierung, Schulungen & Dokumentation.'
    },
    {
      period: '01/2018 – heute',
      role: 'Senior Fullstack Engineer · brayn.io',
      summary:
        'End-to-End Produktentwicklung mit JavaScript/TypeScript (Vue, React, Node.js), Backend (Scala, PHP, Java, Go), Cloud-Infrastruktur (AWS, Docker, K8s), Requirements Engineering, technische Spezifikation, Code-Reviews, Softwareanalyse, Wartung & Modernisierung bestehender Systeme, Mentoring.'
    }
  ],
  educationNote:
    'Ausbildung: Realschulabschluss · Allgemeine Hochschulreife · Medieninformatik (Grundstudium) · Staatlich geprüfter technischer Assistent für Informatik.',
  // Copy of the "Terminal x Spatial" redesign - more direct and personal than the
  // headings above, which the legal pages still use.
  rd: {
    nav: [
      { id: 'profil', label: 'Profil' },
      { id: 'leistungen', label: 'Leistungen' },
      { id: 'stack', label: 'Stack' },
      { id: 'projekte', label: 'Projekte' },
      { id: 'side', label: 'Nebenbei' },
      { id: 'lebenslauf', label: 'Werdegang' },
      { id: 'kontakt', label: 'Kontakt' }
    ],
    eyebrow: 'Berlin · seit 2003 im Code · offen für Festanstellung',
    heroTitle:
      'Fullstack heißt: Ich fasse alles an. Anforderungen, Code, Deployment, Bugs, Support, KI.',
    heroLead:
      'Senior Fullstack Engineer. 23 Jahre Frontend, Backend, Cloud – und alles davor: Konzeption, funktionale und technische Anforderungen, Architekturplanung. Ich suche eine Festanstellung in Berlin oder remote. Keine Freelance-Anfragen.',
    heroPrimary: '$ open ./projekte.log',
    heroGhost: '$ ls side-projects/',
    heroPrompt: 'whoami',
    heroPromptFlag: '--verbose',
    statsCommand: '$ portfolio --stats',
    statsLabels: ['Jahre Praxis', 'Teams begleitet', 'Projekte', 'Branchen'],
    portraitMeta: '640×640 · preview',
    availability: 'available',
    servicesTitle: 'Was du von mir bekommst',
    servicesIntro:
      'Nicht nur Code. Ich übernehme den Weg von der ersten Anforderung bis zum stabilen Betrieb – und sage rechtzeitig, wenn etwas nicht funktionieren wird.',
    stackTitle: 'Womit ich arbeite',
    stackIntro: 'Kein Buzzword-Bingo. Das hier setze ich seit Jahren produktiv ein.',
    industriesTitle: 'Wo ich schon war',
    industriesIntro:
      'Branchen mit echten Regeln, echten Daten und echten Konsequenzen, wenn etwas schiefgeht.',
    projectsTitle: 'Kundenprojekte',
    projectsIntro: 'Auszug aus über zwanzig Jahren. Filter nach Technologie oder Bereich.',
    projectsCommand: '$ git log --oneline',
    projectsCountLabel: 'commits',
    sideTitle: 'Was ich nebenbei baue',
    sideIntro:
      'Freizeit heißt bei mir nicht Feierabend vom Code. Eigene Produkte, eigene Fehler, eigene Deployments – hier lerne ich das, was ich später in Kundenprojekte mitnehme.',
    sideCommand: '$ ls -la ~/side-projects',
    sideCodeLabel: 'Code',
    sideLiveLabel: 'Live',
    timelineTitle: 'Werdegang',
    timelineIntro: 'Drei Stationen, ein roter Faden: eigene Verantwortung von Anfang an.',
    cvButton: 'Lebenslauf als PDF',
    contactTitle: 'Lass uns reden',
    contactIntro:
      'Du suchst jemanden, der Produkt, Technik und Team zusammenbringt? Schreib mir kurz, worum es geht – Rolle, Team, Stack. Ich antworte persönlich.',
    contactButton: 'Nachricht senden',
    contactCommand: '$ ./contact.sh \\',
    contactMailLabel: 'mail',
    contactWhereLabel: 'where',
    contactLinksLabel: 'links',
    contactWhere: 'Berlin · Remote',
    formName: 'Dein Name',
    formEmail: 'Deine E-Mail',
    formRole: 'Rolle / Unternehmen',
    formMessage: 'Worum geht es?',
    formCaptchaLabel: '--verify',
    sentText: 'Danke – ich melde mich persönlich.',
    captchaMissing: 'Bitte bestätige das Captcha.',
    submitError: 'Verbindungsfehler. Bitte versuche es später erneut.',
    footer: '© 2026 André Hickmann Kuschnereit · Berlin',
    footerImprint: 'Impressum',
    footerPrivacy: 'Datenschutz',
    branch: 'master',
    paletteTitle: 'Springe zu …',
    paletteEmpty: 'Nichts gefunden',
    paletteSectionType: 'Sektion',
    paletteFilterType: 'Filter',
    paletteSideType: 'Nebenprojekt',
    konamiHint: '↑↑↓↓←→←→BA',
    konamiCommand: '$ sudo debug --hidden-mode',
    more: 'weitere Projekte anzeigen',
    moreHint: 'press to expand',
    less: 'weniger anzeigen',
    all: 'Alle',
    facts: [
      'Diese Seite trackt nichts. Kein Cookie, kein Analytics, kein Pixel.',
      'Deploys laufen über GitHub Releases auf einen eigenen V-Server.',
      'Jeder Pull Request bekommt ein eigenes Preview-Deployment.',
      'Erstes kommerzielles Projekt: ein eigenes CMS, 2003.',
      'Lieblingsfehler: „works on my machine“ – deshalb Docker.',
      'Scala und Vue in einem Team – seit 2018 Alltag.',
      'Cmd+K öffnet die Sprungleiste. Du hast Konami gefunden – Respekt.'
    ]
  },
  side: [
    {
      name: 'Family Dashboard',
      kind: 'Smart Home · Familie',
      year: '2025 – heute',
      status: 'aktiv',
      tagline: 'Ein Bildschirm für die ganze Familie – Wetter, Musik, Termine, Aufgaben.',
      description:
        'Wand-Dashboard für den Flur: Uhr und Wetter, Musiksteuerung pro Raum, Aufgabenliste mit Zuständigkeiten und Wochenziel pro Kind, Termine – und eine Sprach-/Text-Eingabe an Claude („Was steht heute noch an?“, „Licht im Kaminzimmer aus“).',
      stack: ['Claude API', 'Wetter-API', 'Multiroom-Audio', 'Touch-UI'],
      shots: [{ src: '/projects/dashboard.png', label: 'Übersicht' }],
      links: { code: '', live: '' }
    },
    {
      name: 'Fintara',
      kind: 'Personal Finance · Eigenes Produkt',
      year: '2025 – heute',
      status: 'v0.27 · live',
      tagline: 'Fintara – Konten, Umsätze, Belege und Prognose an einem Ort.',
      description:
        'Bankkonten per FinTS synchronisieren, Umsätze kategorisieren, Fixkosten und Kredite im Blick. Belege werden per KI gelesen und zugeordnet, die Kontostand-Prognose rechnet bis zu fünf Jahre voraus – Tag für Tag aus Fixkosten, Raten, Rücklagen und variablen Ausgaben. Und Tara, die Assistentin, beantwortet Fragen wie „Welche Verträge kann ich kündigen?“ direkt aus den eigenen Zahlen.',
      stack: ['FinTS-Sync', 'KI-Belegerkennung', 'Prognose-Engine', 'Assistentin Tara'],
      shots: [
        { src: '/projects/fintara-uebersicht.png', label: 'Übersicht' },
        { src: '/projects/fintara-prognose.png', label: 'Prognose' },
        { src: '/projects/fintara-umsaetze.png', label: 'Umsätze' },
        { src: '/projects/fintara-dokumente.png', label: 'Belege' },
        { src: '/projects/fintara-ki-analyse.png', label: 'KI-Analyse' },
        { src: '/projects/fintara-kredite.png', label: 'Kredite' },
        { src: '/projects/fintara-fixkosten.png', label: 'Fixkosten' },
        { src: '/projects/fintara-aufgaben.png', label: 'Aufgaben' },
        { src: '/projects/fintara-konten.png', label: 'Konten & Sync' }
      ],
      links: { code: '', live: 'https://fintara.hickmann-kuschnereit.de' }
    },
    {
      name: 'Hideout',
      kind: 'Game · Three.js · für meine Kinder',
      year: '2026',
      status: 'Prototyp · spielbar',
      tagline: 'Hideout – Versteckspiel in der echten Nachbarschaft, überall auf der Welt.',
      description:
        'Adresse oder Stadt eingeben, Radius wählen – Hideout baut daraus eine begehbare 3D-Welt: Straßen und Grundrisse aus OpenStreetMap, Gelände aus Satellitendaten, Häuser, Bäume und Autos prozedural generiert. Dann verstecken, dann jagen. Angefangen letzten Monat, weil meine Kinder ein Versteckspiel wollten, das auch bei Regen geht.',
      stack: ['Three.js', 'OpenStreetMap', 'Sentinel-2', 'Prozedurale Generierung', 'Multiplayer'],
      shots: [
        { src: '/projects/hideout-game.png', label: 'Im Spiel' },
        { src: '/projects/hideout-lobby.png', label: 'Lobby & Globus' }
      ],
      links: { code: '', live: '' }
    },
    {
      name: 'FindMy Monitor',
      kind: 'macOS · Standort & Geräte',
      year: '2025 – heute',
      status: 'aktiv',
      tagline: 'FindMy Monitor – entstanden, als das Handy meines Sohnes gestohlen wurde.',
      description:
        'Mein großer Sohn hatte sein iPhone verloren – kurz darauf war es gestohlen. Apples „Wo ist?“ zeigt nur den Moment, keinen Verlauf. Also habe ich einen Monitor gebaut, der Position, Akku und Online-Status aller Familiengeräte aufzeichnet, die komplette Spur auf der Karte zeigt und Zeitleiste, Akku-Verlauf und Nächte-Auswertung für 7 oder 30 Tage liefert. So konnten wir das Handy die ganze Zeit verfolgen.',
      stack: ['macOS', 'Apple Karten', 'Zeitreihen', 'Export'],
      shots: [{ src: '/projects/findmy-monitor.png', label: 'Karte & Zeitleiste' }],
      links: { code: '', live: '' }
    },
    {
      name: 'resumee',
      kind: 'Diese Website',
      year: '2024 – heute',
      status: 'live',
      tagline: 'Open Source Portfolio – Vue 3, Vite, eigener V-Server.',
      description:
        'Zweisprachig, ohne Tracking, mit CI/CD über GitHub Releases, Preview-Deployments pro Pull Request und ein paar Easter Eggs.',
      stack: ['Vue 3', 'TypeScript', 'Vitest', 'Docker'],
      shots: [{ src: '/projects/resumee.png', label: 'Portfolio v2' }],
      links: {
        code: 'https://github.com/andrehickmann/resumee',
        live: 'https://hickmann-kuschnereit.de'
      }
    }
  ]
};
