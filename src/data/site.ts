// Contenu éditable du site. Les champs `null` sont des informations non encore confirmées.
export const BRAND = "L’Economie Business Awards";

export const nextEdition = {
  number: 5,
  /** Date ISO (ex. "2027-03-18T19:00:00+01:00"). null = à annoncer. */
  date: null as string | null,
  venue: null as string | null,
  city: "Douala, Cameroun" as string | null,
  theme: null as string | null,
};

export const contact = {
  website: "www.leconomiebusinessawards.com",
  email: null as string | null,
  phone: null as string | null,
  address: null as string | null,
  organizer: "THELIE, en collaboration avec L’ECONOMIE MEDIA GROUP",
};

export const socials: { label: string; href: string }[] = [
  // { label: "LinkedIn", href: "https://..." },
];

export const objectives = [
  "Récompenser les entreprises et acteurs économiques les plus performants",
  "Mettre en lumière les talents, les innovations et les initiatives qui transforment l’économie",
  "Valoriser le leadership féminin",
  "Donner plus de visibilité aux entreprises et aux acteurs économiques",
  "Créer des opportunités de rencontres, de réseautage et de partenariats",
  "Encourager la responsabilité sociétale",
  "Célébrer les acteurs qui contribuent au développement de l’économie camerounaise",
  "Ouvrir le palmarès aux nouveaux métiers : fintech, technologie, IA, investissement et économie verte",
  "Faire rayonner les réussites camerounaises au-delà des frontières nationales",
];

export const audiences = [
  "Entreprises du secteur privé",
  "Entreprises du secteur parapublic",
  "Entreprises du secteur public",
  "Startups et jeunes entreprises innovantes",
  "Fintechs et entreprises technologiques",
  "Institutions financières et compagnies d’assurance",
  "Fonds d’investissement et capital-investissement",
  "Entrepreneurs et dirigeants d’entreprises",
];

export const selectionSteps = [
  { title: "Ouverture des candidatures", text: "Appel à candidatures publié sur les canaux de L’ECONOMIE MEDIA GROUP et de ses partenaires." },
  { title: "Vérification", text: "Contrôle de la complétude et de la recevabilité des dossiers par le comité d’organisation." },
  { title: "Présélection", text: "Étude approfondie des dossiers recevables et établissement d’une liste restreinte par catégorie." },
  { title: "Délibération du jury", text: "Un jury composé des journalistes de la rédaction du quotidien L’ECONOMIE évalue les dossiers retenus." },
  { title: "Annonce des lauréats", text: "Résultats communiqués lors de la cérémonie de gala." },
];

export type Category = { sector: string; prizes: { name: string; description?: string }[]; transversal?: boolean };

/** Catégories proposées pour l’exercice 2025 — non définitives tant que le comité ne les a pas arrêtées. */
export const categoriesStatus = "Proposition pour l’exercice 2025 — intitulés définitifs arrêtés par le comité d’organisation avant l’ouverture des candidatures.";
export const categories: Category[] = [
  { sector: "Banques", prizes: [{ name: "Prix de la Banque de l’Année" }, { name: "Prix de la Banque ayant le plus accompagné les PME" }, { name: "Prix de la Banque Agricole de l’Année" }, { name: "Prix de la Banque de l’Inclusion Financière" }] },
  { sector: "Assurances", prizes: [{ name: "Prix de la compagnie d’assurance vie de l’année" }, { name: "Prix de la compagnie d’assurance non vie de l’année" }] },
  { sector: "Microfinance", prizes: [{ name: "Prix de l’établissement de Microfinance de l’Année" }] },
  { sector: "Fintech & paiements", prizes: [{ name: "Prix de la Fintech de l’année" }] },
  { sector: "Marchés financiers", prizes: [{ name: "Prix de la Société de Bourse de l’Année" }, { name: "Prix de la Société de Gestion d’Actifs de l’Année" }, { name: "Prix de l’Intermédiaire Financier de l’Année" }] },
  { sector: "Tech & intelligence artificielle", prizes: [{ name: "Prix de la transformation digitale" }] },
  { sector: "Cabinets d’avocats d’affaires", prizes: [{ name: "Prix du cabinet d’avocats d’affaires de l’Année" }] },
  { sector: "Entreprises publiques", prizes: [{ name: "Prix de l’Entreprise Publique de l’Année" }] },
  { sector: "PME & start-ups", prizes: [{ name: "Prix de la PME émergente de l’année" }] },
  { sector: "Ressources humaines", prizes: [{ name: "Prix de l’Agence de Placement du Personnel" }] },
  { sector: "Agro-industries", prizes: [{ name: "Prix de l’entreprise agro-industrielle de l’année" }] },
  { sector: "Transformation locale", prizes: [{ name: "Prix de la Valorisation du Made in Cameroon" }] },
  { sector: "Régie publicitaire", prizes: [{ name: "Prix de la Régie publicitaire de l’année" }] },
  { sector: "Entreprise événementielle", prizes: [{ name: "Prix de l’entreprise événementielle de l’année" }] },
  { sector: "Agence conseil en publicité", prizes: [{ name: "Prix de l’agence conseil en publicité de l’année" }] },
  {
    sector: "Prix transversaux",
    transversal: true,
    prizes: [
      { name: "Prix du Manager de l’Année", description: "Dirigeant dont le parcours et les résultats de l’année illustrent l’excellence entrepreneuriale." },
      { name: "Prix Spécial du Jury", description: "Parcours ou contribution exceptionnelle au monde économique camerounais." },
      { name: "Prix du Leadership Féminin", description: "Parcours d’une dirigeante d’entreprise." },
      { name: "Prix du Jeune Entrepreneur", description: "Jeunes entrepreneurs et cadres de moins de 35 ans." },
      { name: "Meilleure Entreprise Engagée en RSE", description: "Engagement exemplaire en responsabilité sociétale et impact positif sur la société et l’environnement." },
      { name: "Prix de la Meilleure Implantation Étrangère", description: "Entreprise étrangère dont l’implantation au Cameroun se distingue par ses investissements et la création d’emplois." },
      { name: "Prix de la Conquête Internationale", description: "Entreprise camerounaise ayant réalisé la meilleure performance à l’international." },
      { name: "Prix de l’Entrepreneur de la Diaspora", description: "Entrepreneurs camerounais de la diaspora contribuant au développement national." },
      { name: "Grand Prix de l’Entreprise de l’Année", description: "La plus haute distinction de la soirée." },
    ],
  },
];

export type Edition = { number: number; label: string; date: string; venue: string; winners: { prize: string; name: string }[] };

export const editions: Edition[] = [
  {
    number: 4, label: "4e édition", date: "26 février 2026", venue: "Hôtel Sawa, Douala",
    winners: [
      { prize: "Grand Prix de l’Entreprise de l’Année", name: "Afriland First Bank" },
      { prize: "Meilleure Microfinance de l’Année", name: "ACEP Cameroun" },
      { prize: "Meilleure Banque de l’Année", name: "Crédit Communautaire d’Afrique-Bank (CCA-Bank) Cameroun" },
      { prize: "Meilleure Banque ayant accompagné les PME", name: "Bange Bank Cameroun" },
      { prize: "Meilleure Administration Publique de l’Année", name: "Port Autonome de Kribi" },
      { prize: "Meilleure Entreprise Événementielle de l’Année", name: "Easy Group Expériences" },
      { prize: "Meilleure Société de Gestion d’Actifs de l’Année", name: "Harvest Asset Management" },
      { prize: "Prix du Leadership Féminin de l’Année", name: "Marguerite FONKWEN ATANGA" },
      { prize: "Meilleure Régie Publicitaire de l’Année", name: "Coral Media" },
      { prize: "Prix Spécial du Jury", name: "Annie Barla" },
    ],
  },
  {
    number: 3, label: "3e édition", date: "28 novembre 2024", venue: "Hôtel Sawa, Douala",
    winners: [
      { prize: "Prix de l’entreprise de l’année", name: "PROMETAL" },
      { prize: "Prix du meilleur investisseur de l’année", name: "PROMETAL" },
      { prize: "Meilleure entreprise du secteur public", name: "TRADEX" },
      { prize: "Meilleure société de gestion de portefeuille", name: "Elite Capital Asset Management SA" },
      { prize: "Meilleure entreprise du secteur bancaire", name: "Crédit Communautaire d’Afrique-Bank (CCA-Bank) Cameroun" },
      { prize: "Meilleure PME montante", name: "D.H.I" },
      { prize: "Prix spécial du jury", name: "Protais AYANGMA" },
    ],
  },
  {
    number: 2, label: "2e édition", date: "29 novembre 2023", venue: "Hôtel Best Western, Douala",
    winners: [
      { prize: "Grand prix de l’entreprise de l’année", name: "Afriland First Bank" },
      { prize: "Prix spécial du jury", name: "James ONOBIONO" },
      { prize: "Prix de l’entrepreneur camerounais de la diaspora", name: "Thierry Hot" },
      { prize: "Meilleure société de gestion de portefeuille", name: "Harvest Asset Management" },
      { prize: "Meilleure entreprise du secteur public", name: "Port Autonome de Douala" },
      { prize: "Meilleure entreprise du secteur agroalimentaire", name: "Castel, Boissons du Cameroun" },
      { prize: "Meilleure entreprise de télécommunication", name: "Orange Cameroun" },
      { prize: "Meilleure entreprise du secteur métallurgique", name: "PROMETAL" },
      { prize: "Meilleure entreprise de la microfinance", name: "FOCEP" },
      { prize: "Meilleure entreprise du secteur bancaire", name: "Banque Atlantique Cameroun" },
      { prize: "Meilleure entreprise du secteur de la cimenterie", name: "CIMENCAM" },
      { prize: "Meilleure agence conseil", name: "Cabinet conseil ACSESE" },
      { prize: "Meilleure régie publicitaire", name: "Coral Media Company" },
      { prize: "Meilleure entreprise — segment non vie", name: "Prudential Beneficial Insurance" },
      { prize: "Meilleure entreprise — segment vie", name: "SAAR Assurances" },
    ],
  },
  {
    number: 1, label: "1re édition", date: "17 novembre 2022", venue: "GICAM, Douala",
    winners: [
      { prize: "Meilleure entreprise du secteur brassicole", name: "Boissons du Cameroun" },
      { prize: "Meilleure entreprise du secteur métallurgique", name: "Prometal" },
      { prize: "Meilleure entreprise du secteur de la téléphonie", name: "Camtel" },
      { prize: "Meilleure entreprise du secteur public", name: "CNPS" },
      { prize: "Meilleure entreprise du secteur bancaire", name: "Afriland First Bank" },
    ],
  },
];

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type Laureate = { slug: string; name: string; awards: { prize: string; edition: Edition }[] };

/** Fiches lauréats regroupées par nom (un lauréat peut avoir plusieurs distinctions). */
export const laureates: Laureate[] = (() => {
  const map = new Map<string, Laureate>();
  for (const ed of editions) for (const w of ed.winners) {
    const slug = slugify(w.name);
    const entry = map.get(slug) ?? { slug, name: w.name, awards: [] };
    entry.awards.push({ prize: w.prize, edition: ed });
    map.set(slug, entry);
  }
  return [...map.values()];
})();

export type Nominee = { slug: string; name: string; company: string; category: string; bio: string; photo?: string };
/** Les nominés de la prochaine édition seront ajoutés ici après annonce officielle. */
export const nominees: Nominee[] = [];

export type Partner = { name: string; logo: string; url?: string; tier?: string };
/** Ajouter ici les partenaires officiels avec leurs logos fournis. */
export const partners: Partner[] = [];

export type Article = { slug: string; title: string; date: string; excerpt: string; body: string[] };
export const articles: Article[] = [
  {
    slug: "palmares-4e-edition",
    title: "Palmarès de la 4e édition",
    date: "26 février 2026",
    excerpt: "Afriland First Bank remporte le Grand Prix de l’Entreprise de l’Année lors de la cérémonie organisée à l’Hôtel Sawa de Douala.",
    body: [
      "La 4e édition de L’Economie Business Awards s’est tenue le 26 février 2026 à l’Hôtel Sawa, à Douala.",
      "Le Grand Prix de l’Entreprise de l’Année a été décerné à Afriland First Bank. Le Prix du Leadership Féminin de l’Année est revenu à Marguerite FONKWEN ATANGA et le Prix Spécial du Jury à Annie Barla.",
      "Retrouvez l’ensemble des distinctions dans la page consacrée aux lauréats.",
    ],
  },
];
