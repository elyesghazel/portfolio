/**
 * Every string on the site lives here. Edit this file, not the components.
 * House style: hyphens only, never em or en dashes.
 *
 * `about` paragraphs support inline links written as [label](href). Internal
 * hrefs starting with "/" route client-side; anything else opens in a new tab.
 */

export const site = {
  name: "Elyes Ghazel",
  domain: "elyesghazel.ch",
  role: "software engineer",
  location: "Zürich, CH",
  email: "elyes@elyesghazel.ch",
};

export const hero = {
  /** One sentence. Resist the urge to add a second. */
  line: "I build software end to end: backends, web apps, the circuit boards, and the servers underneath.",
  /** Three numbers under the hero. `value` is big, `label` sits under it. */
  facts: [
    { value: "8+", label: "years writing code" },
    { value: "2nd", label: "year, EFZ apprenticeship" },
    { value: "2025", label: "founded SlidePlate" },
  ],
  /** What's going on right now, one short line. */
  now: "apprentice at Swisscom · running SlidePlate",
};

export const about: string[] = [
  "I started at eight, writing Minecraft plugins in Java because the server was missing a feature I wanted. That is still more or less the pattern: I build the thing that isn't there yet.",
  "Eight years on it covers more ground. Kotlin and Spring Boot on the backend, React and TypeScript on the front, and a machine I own and maintain myself underneath it: mail, Git, CI, monitoring, backups, all self-hosted. When it goes down at 2am it is nobody's problem but mine, which has been the fastest way to learn anything.",
  "Right now I'm in the second year of a software engineering apprenticeship (EFZ) at Swisscom in Zürich, and I run [SlidePlate](/projects/slideplate), a small hardware business I started in December 2025.",
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "languages",
    items: ["Kotlin", "Java", "TypeScript", "C++", "SQL"],
  },
  {
    group: "backend & data",
    items: ["Spring Boot", "Node", "Prisma", "PostgreSQL", "REST"],
  },
  {
    group: "frontend",
    items: ["React", "Vite", "Tailwind", "Figma"],
  },
  {
    group: "infrastructure",
    items: ["Linux", "Docker", "Traefik", "Nginx", "Forgejo", "CI/CD", "restic"],
  },
  {
    group: "hardware",
    items: ["ESP32", "Arduino", "PCB design", "KiCad", "USB-HID", "Fusion 360", "3D printing", "soldering"],
  },
];

export type WorkItem = {
  title: string;
  period: string;
  role: string;
  description: string;
  tags: string[];
  /** Links to /projects/<slug> if a page exists in `projects` below. */
  slug?: string;
  href?: string;
  /** Optional thumbnail, a file in public/. */
  image?: { src: string; alt: string };
};

export const work: WorkItem[] = [
  {
    title: "SlidePlate",
    period: "2025.12 - now",
    role: "founder",
    description:
      "3D-printed foldable licence plate holders for supermoto and enduro bikes. Product design, production, storefront, and the tooling that tells me whether any of it makes money.",
    tags: ["Fusion 360", "ASA+", "Shopify", "Next.js", "Prisma"],
    slug: "slideplate",
  },
  {
    title: "TSW25 Fahrstand",
    period: "2025.03 - 2025.10",
    role: "hardware & firmware",
    description:
      "A physical train driver's desk for Train Sim World 25. Custom PCB, hand-soldered, 3D-printed housing, self-designed levers on potentiometers.",
    tags: ["C++", "Arduino", "PCB", "CAD", "3D printing"],
    slug: "tsw25-fahrstand",
    image: { src: "/log/tsw25.webp", alt: "The TSW25 Fahrstand, a custom train driver's desk" },
  },
  {
    title: "self-hosted infrastructure",
    period: "2023 - now",
    role: "everything",
    description:
      "One server, ~30 containers behind Traefik: mail, Git and CI, dashboards, monitoring, encrypted offsite backups. Every elyesghazel.ch subdomain runs here, including this page.",
    tags: ["Linux", "Docker", "Traefik", "Forgejo", "restic"],
  },
  {
    title: "3D printing shop",
    period: "2024 - now",
    role: "design & production",
    description:
      "Made-to-order printed parts and small objects, designed and printed here rather than resold.",
    tags: ["CAD", "3D printing", "Shopify"],
    href: "https://shop.elyesghazel.ch",
  },
];

export type ProjectImage = { src: string; alt: string; caption?: string };

/*
 * Project write-ups and blog posts are markdown files in src/markdown/.
 */

/**
 * One project gets a framed, image-led card at the top of the work section.
 * `slug` must match an entry in `projects` below.
 */
export const featured = {
  slug: "stealthy",
  label: "featured build",
  title: "Stealthy",
  role: "hardware & firmware, solo",
  tagline:
    "A pocket-sized security-research badge on the ESP32-S3. Custom circuit board, e-ink UI, WiFi and infrared tooling - board and firmware designed and written from an empty repo in about a month.",
  image: { src: "/stealthy-hand.jpg", alt: "The finished Stealthy badge, held in one hand" },
  specs: [
    { label: "silicon", value: "ESP32-S3" },
    { label: "firmware", value: "C++, from scratch" },
    { label: "board", value: "custom, KiCad" },
    { label: "built in", value: "~1 month" },
  ],
  tags: ["ESP32-S3", "C++", "PlatformIO", "KiCad", "PCB design", "e-ink", "802.11", "IR"],
  repo: { label: "view code", url: "https://github.com/elyesghazel/stealthy-firmware" },
};

/**
 * The log: what happened when, newest first. Short lines, past tense.
 * `kind` is a lowercase tag; `to` links to a project page or anchor.
 * Blog posts are added to it automatically (see components/Log.tsx).
 */
export type LogEntry = {
  year: string;
  month?: string;
  kind: "build" | "business" | "school" | "infra" | "start" | "post";
  text: string;
  note?: string;
  to?: string;
};

export const log: LogEntry[] = [
  {
    year: "2026",
    month: "03",
    kind: "build",
    text: "shipped Stealthy",
    note: "security-research badge on the ESP32-S3, board and firmware in a month",
    to: "/projects/stealthy",
  },
  {
    year: "2025",
    month: "12",
    kind: "business",
    text: "founded SlidePlate",
    note: "foldable licence plate holders for supermoto and enduro bikes",
    to: "/projects/slideplate",
  },
  {
    year: "2025",
    month: "10",
    kind: "build",
    text: "finished and sold the TSW25 Fahrstand",
    note: "seven months, custom PCB to printed housing",
    to: "/projects/tsw25-fahrstand",
  },
  {
    year: "2025",
    month: "08",
    kind: "school",
    text: "started the apprenticeship at Swisscom",
    note: "software engineering, EFZ, Zürich",
  },
  {
    year: "2025",
    month: "03",
    kind: "start",
    text: "started the TSW25 Fahrstand",
    note: "a friend was done driving trains with a keyboard",
  },
  {
    year: "2024",
    kind: "business",
    text: "opened the 3D printing shop",
    note: "made-to-order parts, designed and printed here",
  },
  {
    year: "2023",
    kind: "infra",
    text: "moved everything onto my own server",
    note: "mail, Git, CI, monitoring, backups - still running, including this page",
  },
  {
    year: "2018",
    kind: "start",
    text: "first Minecraft plugin, in Java, at eight",
    note: "the server was missing a feature I wanted",
  },
];

export const links = [
  { label: "email", value: site.email, href: `mailto:${site.email}` },
  { label: "github", value: "github.com/elyesghazel", href: "https://github.com/elyesghazel" },
  {
    label: "linkedin",
    value: "linkedin.com/in/elyes-ghazel",
    href: "https://linkedin.com/in/elyes-ghazel",
  },
];

export const contactNote =
  "Open to interesting problems, hardware or software. Mail is read fastest.";
