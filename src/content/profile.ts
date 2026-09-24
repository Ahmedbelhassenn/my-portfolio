// Single source of truth for everything personal. Edit here, not in components.

export const profile = {
  name: "Ahmed Belhassen",
  role: "Software Engineer",
  focus: "Backend & Distributed Systems",
  location: "Sfax, Tunisia",
  email: "ahmed.belhassen@supcom.tn",
  phone: "+216 56 400 308",
  // TODO: set this to your real domain before launch. Canonical URLs, the
  // sitemap, robots.txt and every OG image derive from it. A wrong value
  // here means search engines quietly ignore the sitemap.
  siteUrl: "https://ahmedbelhassen.dev",

  /** Hero greeting. The display line. */
  greeting: "Hi, I'm Ahmed",

  /** Kept general on purpose: the hero introduces, the sections below prove.
      Specific figures live in Experience, Freelance and Projects. */
  intro:
    "Software engineer with professional experience in backend and full-stack development. I design and build production systems, from backend services and cloud infrastructure to the web products that run on top of them.",

  /** Used for the social card, where a specific line works harder. */
  headline: "I build the systems behind payments, catalogs and the products on top.",

  /** Longer version, used for the page description and social cards. */
  metaDescription:
    "Software engineer in Sfax, Tunisia. I build payment infrastructure, AI data pipelines, and the full-stack products on top of them.",

  availability: "Open to backend & full-stack roles",

  cvPath: "/Ahmed-Belhassen-CV.pdf",
  // Real intrinsic size. A wrong ratio here makes next/image reserve the
  // wrong box and the page shifts as the photo loads.
  photo: { src: "/profile.jpeg", width: 738, height: 1600 },

  links: {
    github: "https://github.com/Ahmedbelhassenn",
    linkedin: "https://www.linkedin.com/in/ahmed-belhassen-551b042bb/",
  },
} as const;

export const education: { school: string; degree: string; period: string; logo?: string }[] = [
  {
    school: "SUP'COM, Tunis",
    degree: "National Engineering Degree in ICT, High Honors",
    period: "2023 — 2026",
  },
  {
    school: "IPEIS, Sfax",
    degree: "Preparatory Cycle, Mathematics & Physics",
    period: "2021 — 2023",
  },
  {
    school: "Fadhel Ben Achour, Sfax",
    degree: "Baccalaureate in Mathematics, High Honors",
    period: "2021",
  },
];

/** The About copy. Kept to two short paragraphs on purpose. */
export const about = [
  "I'm an ICT engineering graduate from SUP'COM in Tunis. At Converty I work on payment and catalog infrastructure, and alongside that I take on freelance work, building production sites for clients in Tunisia and Mauritania.",
  "Vice President of Leading SUP'COM and of NATEG. Chess player.",
];

export type Role = {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  logo?: string;
  /**
   * How the mark is rendered. `plain` leaves it alone (it already reads in its
   * own colours on the dark ground), `light` is a white-drawn file that only
   * needs flipping on the light theme. Omitted means invert it, for marks
   * drawn as dark ink on transparency.
   */
  logoStyle?: "plain" | "light";
  /**
   * Optional second file for the light theme, when one drawing cannot serve
   * both grounds — a wordmark set in white needs a dark twin on paper.
   * Given one, `logo` is the dark-theme version and this is shown instead
   * when the light theme is on.
   */
  logoLight?: string;
  /** Freelance entries link to their case study. */
  href?: string;
};

/** Employment. Salaried and internship roles only. */
export const employment: Role[] = [
  {
    company: "Converty",
    role: "Software Engineer",
    period: "Jun 2026 — Present",
    summary:
      "Building an AI-powered product import pipeline: bounded BFS crawling of external storefronts, Gemini extraction into a fixed catalog schema, and a React admin where sellers review and publish before anything goes live.",
    stack: ["Node.js", "Python", "React", "Gemini"],
    logo: "/logos/converty-dark.svg",
    logoLight: "/logos/converty.svg",
    logoStyle: "plain",
  },
  {
    company: "Converty",
    role: "Full-Stack Engineer Intern (PFE)",
    period: "Jan — May 2026",
    summary:
      "Designed and shipped the payment microservice: four gateways behind one interface, idempotency keys, retry handling and automatic reconciliation, event-driven over RabbitMQ and running on Kubernetes.",
    stack: ["TypeScript", "Go", "RabbitMQ", "Redis", "Kubernetes"],
    logo: "/logos/converty-dark.svg",
    logoLight: "/logos/converty.svg",
    logoStyle: "plain",
  },
  {
    company: "Telnet",
    role: "DevOps Intern",
    period: "Jul — Aug 2025",
    summary:
      "Built a Jenkins pipeline automating checkout, build, test and Docker image steps for delivery teams.",
    stack: ["Jenkins", "Docker"],
    logo: "/logos/telnet.png",
    logoStyle: "plain",
  },
  {
    company: "Telnet",
    role: "Full-Stack Developer Intern",
    period: "Jul — Aug 2024",
    summary:
      "Built a sprint analytics application on the Jira REST API, visualizing velocity and delivery rate for Agile teams.",
    stack: ["Spring Boot", "Angular", "PostgreSQL"],
    logo: "/logos/telnet.png",
    logoStyle: "plain",
  },
];

/** Client work, billed independently. Kept separate from employment on purpose.
    No logos here: these rows show the delivered site itself, pulled from the
    matching case study in projects.ts by slug. */
export const freelance: Role[] = [
  {
    company: "Mauritanian Mining Logistics",
    role: "Web engineer · mml.mr",
    period: "2026",
    summary:
      "Designed and built a trilingual site with native right-to-left Arabic for a mining logistics firm in Nouakchott, with search visibility built in from the start rather than bolted on.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    href: "/work/mml",
  },
  {
    company: "Ayoub Kahlaoui",
    role: "Web engineer · video portfolio",
    period: "2026",
    summary:
      "Rebuilt a video editor's portfolio around delivery weight: an automated ffmpeg pipeline publishing roughly 1.5 GB of rushes as 41 MB, with the sound audible in one click.",
    stack: ["React", "TypeScript", "Vite", "ffmpeg"],
    href: "/work/ayoub-kahlaoui",
  },
];

/** Verifiable things. Rankings and certifications, not adjectives. */
export const credentials: { label: string; detail: string; href?: string }[] = [
  {
    label: "National Engineering Degree — SUP'COM",
    detail: "ICT, High Honors · 2023–2026",
  },
  {
    label: "Ranked 141st of 1,750",
    detail: "National Engineering Entrance Examination · 2023",
  },
  {
    // Named exactly as the badge is issued. This is an AWS Academy training
    // badge, not an AWS Certification, and calling it one would not survive
    // an interview question.
    label: "AWS Academy Graduate — Cloud Foundations",
    detail: "Amazon Web Services · Sept 2025",
    href: "https://www.credly.com/go/9dig7j88",
  },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "B2" },
  { name: "French", level: "B2" },
];

