/* ------------------------------------------------------------------
   Case studies.

   Order is the argument: production backend systems first (what you are
   hired for), then shipped client products (proof you deliver whole
   things). Everything else lives in `alsoBuilt`.

   Content rules:
   - Every claim here must be true today. No invented figures.
   - A number you cannot source is a TODO, not a guess.
   - Nothing proprietary: no code, no credentials, no internal hostnames,
     no customer data in screenshots.
------------------------------------------------------------------- */

export type Metric = { value: string; label: string };
export type FlowStep = { label: string; detail?: string };
export type Decision = { title: string; body: string };
export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  /** Mono index shown in listings — keeps the Swiss numbering. */
  index: string;
  title: string;
  client: string;
  /** Short kind label: what sort of work this was. */
  kind: string;
  year: string;
  period: string;
  /** One line. This is what most people will read of the project. */
  tagline: string;
  role: string;
  stack: string[];
  metrics: Metric[];
  /** Architecture, left to right. Used as the visual when there are no shots. */
  flow: FlowStep[];
  shots?: { desk: Shot; mob?: Shot };
  live?: { label: string; href: string };
  problem: string;
  decisions: Decision[];
  challenge: Decision;
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: "payment-microservice",
    index: "01",
    title: "Unified Payment Microservice",
    client: "Converty",
    kind: "Production system",
    year: "2026",
    period: "Jan — May 2026",
    tagline:
      "Four payment gateways behind one interface, with idempotency, retries and automatic reconciliation.",
    role: "Designed and owned the service end to end, from architecture to production rollout.",
    stack: ["Node.js", "TypeScript", "Go", "MongoDB", "RabbitMQ", "Redis", "Kubernetes", "GitHub Actions"],
    metrics: [
      { value: "4", label: "gateways, one interface" },
      { value: "K8s", label: "running in production" },
      // TODO: add a fourth once you can source it — transactions processed,
      // reconciliation success rate, or p95 latency.
    ],
    flow: [
      { label: "Checkout", detail: "React storefront" },
      { label: "Payment API", detail: "Node.js · TypeScript" },
      { label: "Gateway adapters", detail: "Flouci · ClicToPay · Stripe · PayPal" },
      { label: "Event bus", detail: "RabbitMQ" },
      { label: "Reconciliation", detail: "MongoDB · Redis" },
    ],
    // TODO (Converty cleared screenshots): capture the payment admin or a
    // sanitized transaction view at 1440x900, blur any customer data, convert
    // to WebP, drop in public/work/, then fill this in:
    // shots: { desk: { src: "/work/payments-desk.webp", alt: "...", width: 1440, height: 900 } },
    problem:
      "Sellers needed to accept both local Tunisian payment methods and international cards. Every provider has its own API, its own callback format and its own failure modes — and payment logic spread across the platform would have been risky to change and hard to test. The service had to own every payment, whichever provider settled it.",
    decisions: [
      {
        title: "One interface, one adapter per provider",
        body: "Every provider implements the same contract: create, verify, refund, handle webhook. Business code never talks to a gateway directly, so adding a fifth provider means writing one adapter and changing nothing else.",
      },
      {
        title: "Idempotency as a first-class concern",
        body: "Client retries, duplicate webhooks and network timeouts are ordinary events in payments, not edge cases. Each operation carries an idempotency key checked in Redis and persisted in MongoDB, so replaying a request can never charge a customer twice.",
      },
      {
        title: "Events instead of direct calls",
        body: "Payment state changes are published to RabbitMQ rather than calling downstream services synchronously. Orders and notifications consume at their own pace, and a slow consumer can no longer block a checkout.",
      },
    ],
    challenge: {
      title: "Staying in sync with providers that go quiet",
      // TODO: replace with the specific incident or edge case you actually hit —
      // this is the paragraph senior engineers read most closely.
      body: "Webhooks arrive late, arrive twice, arrive out of order, or never arrive at all. A scheduled reconciliation pass compares local payment records against each provider's own view and repairs the differences automatically, so a dropped callback no longer strands an order in `pending`.",
    },
    outcomes: [
      "Shipped to production on Kubernetes, with CI/CD from staging through production via GitHub Actions.",
      "Local methods (Flouci, ClicToPay) and international ones (Stripe, PayPal) served by a single interface.",
      "Integrated with existing React and Go services without changing their payment-agnostic code.",
    ],
  },
  {
    slug: "ai-product-import",
    index: "02",
    title: "AI Product Import Pipeline",
    client: "Converty",
    kind: "Production system",
    year: "2026",
    period: "Jun 2026 — Present",
    tagline:
      "Crawl an external storefront, let an LLM structure the catalog, and migrate a whole store into Converty.",
    role: "Designed and built the pipeline from scratch, backend services and review interface included.",
    stack: ["Node.js", "Python", "React", "Tailwind CSS", "Gemini"],
    metrics: [
      { value: "BFS", label: "bounded storefront crawl" },
      { value: "2", label: "modes: one product, or a whole store" },
      // TODO: products per run, extraction accuracy, or time saved per migration.
    ],
    flow: [
      { label: "Store URL", detail: "One product or a full store" },
      { label: "BFS crawler", detail: "Page discovery" },
      { label: "LLM extraction", detail: "Gemini" },
      { label: "Validation", detail: "Schema & normalization" },
      { label: "Admin review", detail: "React · publish" },
    ],
    // TODO (Converty cleared screenshots): the admin review screen is the
    // strongest visual here — it shows the human-in-the-loop step.
    problem:
      "Sellers moving to Converty had to rebuild their catalogs by hand: every title, image, price and variant. Storefronts are all built differently, so a hand-written scraper per platform would never have scaled past the first few.",
    decisions: [
      {
        title: "Breadth-first crawling",
        body: "BFS explores a store level by level from its entry URL, so category and product pages surface early and the crawl can be bounded by depth and page count. A migration's cost stays predictable instead of depending on how deep a site nests.",
      },
      {
        title: "An LLM instead of per-site selectors",
        body: "Gemini turns arbitrary product pages into one fixed schema: title, images, pricing, variants. The pipeline handles storefronts it has never seen, where CSS selectors would break on the next theme change.",
      },
      {
        title: "A human before anything is published",
        body: "Extracted data is validated against the schema, then reviewed in a React admin before it goes live. Sellers keep control of their own catalog, and an extraction mistake is caught before a customer ever sees it.",
      },
    ],
    challenge: {
      title: "One pipeline, two very different jobs",
      // TODO: the real difficulty — rate limits, duplicate detection, variant
      // mapping, or controlling token cost on a large store.
      body: "A single-product import has to feel instant; a full-store migration can run to hundreds of pages. Both share the same extraction and validation stages, and only differ in how pages are discovered and batched — so there is one code path to reason about, not two.",
    },
    outcomes: [
      "Deployed to staging, supporting both single-product imports and full-store migrations.",
      "Node.js and Python services with a React admin for reviewing, validating and publishing.",
    ],
  },
  {
    slug: "mml",
    index: "03",
    title: "Mauritanian Mining Logistics",
    client: "MML · mml.mr",
    kind: "Client product",
    year: "2026",
    period: "2026",
    tagline:
      "A trilingual site with native right-to-left Arabic, built to be found on Google in a market with almost no competition online.",
    role: "Freelance. Front-end architecture, the trilingual content model, and search visibility.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "JSON-LD"],
    metrics: [
      { value: "3", label: "languages at full parity" },
      { value: "RTL", label: "native Arabic, not a translation layer" },
      { value: "SEO", label: "designed in, not added after" },
    ],
    flow: [
      { label: "One app", detail: "React · TypeScript" },
      { label: "Locale routing", detail: "URL is the source of truth" },
      { label: "Prerender", detail: "A real HTML page per language" },
      { label: "Search", detail: "hreflang · sitemap · JSON-LD" },
    ],
    shots: {
      desk: {
        src: "/work/mml-desk.webp",
        alt: "The mml.mr home page on desktop — “Là où s'arrête la route, MML continue” over a Sahara haulage convoy",
        width: 2400,
        height: 1500,
      },
      mob: {
        src: "/work/mml-mob.webp",
        alt: "The mml.mr home page on a phone, in Arabic, right to left",
        width: 860,
        height: 1864,
      },
    },
    live: { label: "mml.mr", href: "https://mml.mr" },
    problem:
      "MML hauls machinery, fuel and camps to exploration sites deep in the Mauritanian Sahara. They were bidding against major international mining groups with no credible presence online, and their buyers read French, English and Arabic — often in the same procurement process.",
    decisions: [
      {
        title: "The URL carries the language",
        body: "Each language is its own address with its own prerendered HTML, rather than a client-side toggle. A crawler can reach all three, `hreflang` can point at them, and a shared link opens in the language it was shared in.",
      },
      {
        title: "Arabic written natively, right to left",
        body: "The Arabic is authored in formal Arabic and laid out RTL throughout, not machine-translated from English and mirrored at the end. For a buyer in Nouakchott that difference is immediately visible.",
      },
      {
        title: "Enquiries land where the team reads them",
        body: "The contact form routes into WhatsApp and email rather than a dashboard nobody opens. In this market WhatsApp is where business actually starts.",
      },
    ],
    challenge: {
      title: "Three languages that stay in step",
      body: "Every locale is typed against one content contract, so a missing or misspelled translation fails the build instead of shipping an empty section. Alt text is per-language too — it is indexed content, and serving one language's alt text on all three pages would have been a real search bug.",
    },
    outcomes: [
      "Live at mml.mr, serving French, English and Arabic at full parity.",
      "Found on Google for logistics searches in Mauritania.",
      "Enquiries arrive by WhatsApp and email, where the team already works.",
    ],
  },
  {
    slug: "ayoub-kahlaoui",
    index: "04",
    title: "Video Portfolio, Rebuilt Around Weight",
    client: "Ayoub Kahlaoui",
    kind: "Client product",
    year: "2026",
    period: "2026",
    tagline:
      "1.5 GB of raw footage published as 41 MB. 97% lighter, no visible loss, and the sound finally audible.",
    role: "Freelance. Rebuilt the site and wrote the automated video pipeline behind it.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "ffmpeg"],
    metrics: [
      { value: "1.5 GB → 41 MB", label: "published video, no visible loss" },
      { value: "97%", label: "lighter home-page video" },
      { value: "1 click", label: "to hear the sound design" },
    ],
    flow: [
      { label: "Raw rushes", detail: "~1.5 GB" },
      { label: "ffmpeg pipeline", detail: "Encode · poster frames" },
      { label: "Web delivery", detail: "41 MB total" },
      { label: "Player", detail: "Sound on in one click" },
    ],
    shots: {
      desk: {
        src: "/work/ayoub-desk.webp",
        alt: "Ayoub Kahlaoui's video-editing portfolio on desktop, showreel paused on a kinetic-type frame",
        width: 1600,
        height: 1000,
      },
      mob: {
        src: "/work/ayoub-mob.webp",
        alt: "The same portfolio on a phone, the showreel filling the screen",
        width: 560,
        height: 1212,
      },
    },
    live: { label: "ayoub-kahlaoui.vercel.app", href: "https://ayoub-kahlaoui.vercel.app/" },
    problem:
      "Ayoub edits video for e-commerce brands. His old site buried the work under a heavy, muted background video: visitors on mobile waited, and nobody ever heard the sound design he is actually hired for. The site was working against the product it was selling.",
    decisions: [
      {
        title: "Treat encoding as a build step, not a chore",
        body: "An automated ffmpeg pipeline takes the rushes, encodes for the web and generates poster frames. Publishing new work is a command, not an afternoon — which is the only reason the site stays current.",
      },
      {
        title: "Sound is the product, so make it one click",
        body: "Browsers block autoplay with audio, and most sites give up there and stay muted forever. The player is built around a single obvious control that turns the sound on, because a muted showreel is a portfolio of someone else's work.",
      },
      {
        title: "One pre-filled WhatsApp message per offer",
        body: "Each service opens its own prepared message. Ayoub knows what the client wants before the conversation starts, and the client skips explaining it.",
      },
    ],
    challenge: {
      title: "97% lighter, with nothing visibly lost",
      body: "The compression target was set by what the work has to look like, not by a file-size budget picked in advance: encode, compare against the source, adjust. Getting from roughly 1.5 GB to 41 MB without visible degradation is the whole engineering result — on a mobile connection it is the difference between a showreel that plays and one nobody waits for.",
    },
    outcomes: [
      "Live, with the showreel playing fast on mobile connections.",
      "Roughly 1.5 GB of footage delivered as 41 MB, about 97% lighter.",
      "Sound audible in one click, so the sound design is part of the pitch.",
    ],
  },
];

/** Smaller or older work. Listed, not given a case study. */
export const alsoBuilt = [
  {
    title: "E-Learning Platform with AI Assistant",
    year: "2025",
    note: "Course and training management for instructors, participants and admins. JWT auth with role-based authorization, and a Gemini study assistant.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Gemini"],
  },
  {
    title: "Sprint Analytics Dashboard",
    year: "2024",
    note: "Agile delivery metrics, velocity and delivery rate, built on the Jira REST API at Telnet.",
    stack: ["Spring Boot", "Angular", "PostgreSQL", "Chart.js"],
  },
  {
    title: "Landing-Page Builder",
    year: "2025",
    note: "Architecture for a drag-and-drop builder for product showcases, with real-time updates.",
    stack: ["React", "Next.js"],
  },
  {
    title: "Jenkins CI/CD Pipeline",
    year: "2025",
    note: "Automated checkout, build, test and Docker image steps for delivery teams at Telnet.",
    stack: ["Jenkins", "Docker"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
