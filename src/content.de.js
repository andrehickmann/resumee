/**
 * @typedef {{ label: string, tone?: string }} RadarItem
 * @typedef {{ title: string, description: string }} ServiceItem
 * @typedef {{ title: string, tools: string }} StackItem
 * @typedef {{ period: string, start: number, end: number, title: string, description: string, tags: string[] }} ProjectItem
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
  cvLabel: string,
  cvButton: string,
  filtersAll: string,
  stackItems: StackItem[],
  industries: string[],
  projects: ProjectItem[],
  careerTimeline: TimelineItem[],
  educationNote: string
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
    'Ich suche eine Festanstellung in Berlin oder remote. Hybrid mit Remote-Anteil ist ebenfalls möglich. Keine Freelance-Projekte.',
  heroPrimary: 'Projekte ansehen',
  heroGhost: 'Techstack entdecken',
  stats: [
    { key: 'experience', value: '23', label: 'Jahre Praxis' },
    { key: 'teams', value: '15', label: 'Teams begleitet' },
    { key: 'projects', value: '', label: 'Projekte' },
    { key: 'industries', value: '', label: 'Branchen' }
  ],
  heroImageAlt: 'Portraitfoto',
  availability: 'Verfügbar für Festanstellung',
  servicesTitle: 'Leistungen & Verantwortung',
  servicesIntro:
    'Ich begleite Projekte durchgängig – mit klarem Fokus auf Verständlichkeit, Qualität und Betrieb.',
  servicesHint: 'Ziehen oder scrollen für mehr',
  services: [
    {
      title: 'Requirements Engineering',
      description:
        'Workshops & Kundentermine, strukturierte Anforderungsanalyse und Dokumentation.'
    },
    {
      title: 'Fullstack-Entwicklung',
      description:
        'Konzeption und Umsetzung von Frontend, Backend, APIs und Datenmodellen.'
    },
    {
      title: 'Technische Spezifikation',
      description:
        'Schreiben technischer Anforderungen, Architektur- und Integrationskonzepte.'
    },
    {
      title: 'Software- & Codeanalyse',
      description:
        'Audit bestehender Codebases, Risikoanalyse und Ableitung von Modernisierungspfaden.'
    },
    {
      title: 'E2E Frontend-Testing',
      description:
        'Stabile Teststrategien mit Fokus auf kritische User Journeys.'
    },
    {
      title: 'KI-Driven Delivery',
      description:
        'LLM-Integration, Automatisierung und Assistenzsysteme mit Business Value.'
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
    { label: 'Data', tone: 't4' },
    { label: 'AI', tone: 't5' }
  ],
  industriesTitle: 'Branchen- und Domänenerfahrung',
  industriesIntro: 'Erfahrung in kritischen Domains mit komplexen Abläufen.',
  industriesCountLabel: 'Branchen',
  projectsTitle: 'Projekte & Ergebnisse',
  projectsIntro:
    'Auszug aus Projekten mit Fokus auf Wirkung, Skalierung und stabile Delivery.',
  projectsCountLabel: 'Projekte',
  filterTechLabel: 'Tech & Bereich',
  filterYearLabel: 'Jahre',
  filterResetLabel: 'Filter zurücksetzen',
  filterToggleLabel: 'Filter anzeigen',
  timelineTitle: 'Lebenslauf',
  timelineIntro: 'Highlights meiner Laufbahn – kompakt, relevant, aktuell.',
  contactTitle: 'Kontakt',
  contactIntro:
    'Interesse an einer Festanstellung? Ich freue mich auf ein kurzes Gespräch.',
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
  footerNote: 'Built with ❤ and 🤖 AI',
  konamiTitle: 'Hidden Mode: Debug',
  konamiSubtitle: 'Debug-Overlay aktiv',
  konamiRefresh: 'Neue Fakten',
  cvLabel: 'Lebenslauf als PDF',
  cvButton: 'PDF herunterladen',
  nextUpLabel: 'Next up',
  nextUpText: 'Suche nach neuer Herausforderung in einem innovativen Team. Schwerpunkt: Fullstack-Entwicklung (Frontend, Backend, Cloud), Requirements Engineering, Testing & Qualitätssicherung, Produktarchitektur, End-to-End Delivery.',
  filtersAll: 'Alle',
  stackItems: [
    {
      title: 'Backend & Architektur',
      tools: 'Node.js, Java, Go, API Design, Domain Driven Design'
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
      description:
        'Kamera/ML-gestützte Steuerung zur Unkrautbekämpfung per Laser.',
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
      description:
        'Konzeption & Entwicklung für Ticketverkauf, Venue-/Artist-Management, Payment.',
      tags: ['Ticketing', 'Web', 'Payments']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Streaming & Wettbewerbe',
      description:
        'Kurzvideo-Plattform mit Wettbewerben und Wallet-Logik (Web + Ionic).',
      tags: ['Streaming', 'Ionic', 'Vue', 'Mobile']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Biodiversity Compliance Plattform',
      description:
        'GIS-Heatmaps, Action Items, Frontend (React) und Backend (Python).',
      tags: ['Sustainability', 'GIS', 'React', 'Python']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Bewerberintegration (Arbeitsmarkt)',
      description:
        'Plattform zur Integration internationaler Bewerber (Vue/Scala/MySQL).',
      tags: ['HR', 'Vue', 'Scala', 'MySQL']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Legacy Modernisierung Ladenbau',
      description:
        'Modernisierung von PHP5/Vanilla JS auf PHP 8.x, stabiler Betrieb.',
      tags: ['Legacy', 'PHP', 'Modernization']
    },
    {
      period: '2024',
      start: 2024,
      end: 2024,
      title: 'Somnofox Schlafanalyse',
      description:
        'App zur Erkennung von Schnarchgeräuschen mit Analyse & Diagnosehilfe.',
      tags: ['Health', 'Mobile', 'Analytics']
    },
    {
      period: '2023',
      start: 2023,
      end: 2023,
      title: 'Bowling-Software Suite',
      description:
        'Steuerung von Bahnen, Buchung, Gastronomie, Payment (Vue/Scala/Java).',
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
      description:
        'Terminportal mit Videokonferenzen, TURN/STUN-Setup, Scala Backend.',
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
      description:
        'Software zur Steuerung von Abläufen in Hotels und deren Bereichen.',
      tags: ['Hospitality', 'Operations', 'Web']
    },
    {
      period: '2021 – 2026',
      start: 2021,
      end: 2026,
      title: 'desto.report (Steuerberatung)',
      description: 'Buchungs- und Jahresabschluss-Software für Großunternehmen.',
      tags: ['Finance', 'B2B', 'Vue', 'Scala']
    },
    {
      period: '2021 – 2025',
      start: 2021,
      end: 2025,
      title: 'Fashion Commerce Integration',
      description:
        'Rechnungs-/Retourenportal, Monitoring, Gutscheine, internationale Steuersätze.',
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
      description:
        'Bestellplattform mit Küchenportal, WaWi und Mollie-Zahlung.',
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
      description:
        'Rechnungsstellung, Kundenverwaltung, Mahnwesen, Bankanbindung, Versand.',
      tags: ['FinTech', 'Vue', 'Scala', 'PHP']
    },
    {
      period: '2008 – 2017',
      start: 2008,
      end: 2017,
      title: 'Kanzlei-Kommunikationsportale',
      description:
        'Mandantenportale, Integrationen (GDV/Versicherungen), DMS-Einführung.',
      tags: ['LegalTech', 'Integration', 'B2B']
    },
    {
      period: '2008 – 2017',
      start: 2008,
      end: 2017,
      title: 'Schuldnerportal Ratenzahlungen',
      description:
        'Onlinevereinbarungen für Ratenzahlungen inkl. Dokumentation & Schulungen.',
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
      summary:
        'Entwicklung & Betrieb von Webseiten, Onlineshop, CMS-System, Computerkurse.'
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
    'Ausbildung: Realschulabschluss · Allgemeine Hochschulreife · Medieninformatik (Grundstudium) · Staatlich geprüfter technischer Assistent für Informatik.'
};
