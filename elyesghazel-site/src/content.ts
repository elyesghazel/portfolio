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
  kofi: "https://ko-fi.com/elyesghazel",
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

/**
 * Selected work on the home page. Every entry gets its own row with a big
 * picture next to it, alternating sides, so no two look the same.
 */
export type Media =
  | { kind: "image"; src: string; alt: string }
  /** A looping muted clip; `poster` is shown first and under reduced motion. */
  | { kind: "video"; src: string; poster: string; alt: string }
  /** A small terminal drawn in CSS, for things that have no picture. */
  | { kind: "terminal"; title: string; lines: { cmd?: string; out?: [string, string] }[] };

export type WorkItem = {
  title: string;
  /** Small line above the title, e.g. "hardware · solo". */
  kicker: string;
  period: string;
  /** One sentence, the pitch. */
  line: string;
  description: string;
  /** Short label/value pairs under the text. */
  specs: { label: string; value: string }[];
  media: Media;
  /** Caption under the picture, after "fig. 0n". */
  caption: string;
  /** Optional badge next to the kicker, e.g. "live" or "8 stars". */
  badge?: string;
  /** First one is the primary button. Hrefs starting with "/" stay on site. */
  links: { label: string; href: string }[];
};

export const work: WorkItem[] = [
  {
    title: "Stealthy",
    kicker: "hardware · solo",
    period: "2026.02 - 2026.03",
    line: "A pocket security-research badge, from an empty repo to a thing I can hold.",
    description:
      "Custom circuit board on the ESP32-S3, a 2.13\" e-ink screen, WiFi and infrared tooling. I designed the board in KiCad and wrote the firmware in C++ from scratch, in about a month.",
    specs: [
      { label: "silicon", value: "ESP32-S3" },
      { label: "board", value: "custom, KiCad" },
      { label: "firmware", value: "C++, PlatformIO" },
    ],
    media: { kind: "image", src: "/stealthy-hand.jpg", alt: "The finished Stealthy badge, held in one hand" },
    caption: "the finished badge, running its own firmware",
    links: [
      { label: "read the story", href: "/projects/stealthy" },
      { label: "source", href: "https://github.com/elyesghazel/stealthy-firmware" },
    ],
  },
  {
    title: "SlidePlate",
    kicker: "business · founder",
    period: "2025.12 - now",
    badge: "selling",
    line: "Foldable licence plate holders for supermoto and enduro bikes.",
    description:
      "Short, light, and they bolt straight onto the bike. I do the product design, the printing, the storefront, and the tooling that tells me whether any of it makes money.",
    specs: [
      { label: "versions", value: "BASE + FLEX" },
      { label: "fits", value: "Yamaha, KTM, TM, Beta + universal" },
      { label: "shop", value: "Shopify" },
    ],
    media: { kind: "image", src: "/work/slideplate-site.webp", alt: "The slideplate.ch storefront" },
    caption: "the live shop: slideplate.ch",
    links: [
      { label: "read more", href: "/projects/slideplate" },
      { label: "slideplate.ch", href: "https://slideplate.ch" },
    ],
  },
  {
    title: "zunder",
    kicker: "linux · open source",
    period: "2026.10 - now",
    badge: "8 stars",
    line: "One prompt for your apps and your windows.",
    description:
      "A launcher and ALT+TAB switcher that looks like a terminal: apps, windows, files, math, currencies, time zones and clipboard history in one prompt, and live thumbnails of every window. One small Rust daemon, plugins are a script in a folder.",
    specs: [
      { label: "written in", value: "Rust" },
      { label: "runs on", value: "Hyprland, Windows, macOS" },
      { label: "install", value: "one line" },
    ],
    media: { kind: "video", src: "/work/zunder.mp4", poster: "/work/zunder.webp", alt: "zunder converting a time zone on a Hyprland desktop" },
    caption: "\"3pm ny\", answered without leaving the keyboard",
    links: [
      { label: "source", href: "https://github.com/elyesghazel/zunder" },
    ],
  },
  {
    title: "Zweitakt",
    kicker: "game · built with agents",
    period: "2026.11",
    badge: "playable",
    line: "Run a two-stroke garage in a Swiss village, in the browser.",
    description:
      "A low-poly workshop game where you fix bikes by hand. I wrote the roadmap and played every build, AI agents wrote the code, mostly overnight. Empty folder on Saturday, public with multiplayer on Sunday.",
    specs: [
      { label: "engine", value: "Three.js" },
      { label: "built in", value: "one weekend" },
      { label: "plays on", value: "phone + desktop" },
    ],
    media: { kind: "image", src: "/zweitakt-shop.jpg", alt: "The Zweitakt garage with a bike on the lift" },
    caption: "the garage, one bike on the lift",
    links: [
      { label: "play it", href: "https://zweitakt.elyesghazel.ch" },
      { label: "how it was built", href: "/blog/zweitakt-overnight" },
    ],
  },
  {
    title: "TSW25 Fahrstand",
    kicker: "hardware · commission",
    period: "2025.03 - 2025.10",
    badge: "sold",
    line: "A real train driver's desk for Train Sim World 25.",
    description:
      "A friend was done driving trains with a keyboard. Custom PCB, hand-soldered, a 3D-printed housing and levers I designed on potentiometers. Seven months, then it sold.",
    specs: [
      { label: "controller", value: "Arduino, USB-HID" },
      { label: "board", value: "custom PCB" },
      { label: "housing", value: "Fusion 360, printed" },
    ],
    media: { kind: "image", src: "/log/tsw25.webp", alt: "The TSW25 Fahrstand, a custom train driver's desk" },
    caption: "door buttons, PZB toggles and printed levers",
    links: [{ label: "read the story", href: "/projects/tsw25-fahrstand" }],
  },
  {
    title: "my own server",
    kicker: "infrastructure · everything",
    period: "2023 - now",
    line: "Every elyesghazel.ch subdomain runs on one machine I maintain myself.",
    description:
      "About 30 containers behind Traefik: mail, Git and CI, dashboards, monitoring, encrypted offsite backups. When it goes down at 2am it is nobody's problem but mine.",
    specs: [
      { label: "base", value: "Linux, Docker" },
      { label: "edge", value: "Traefik" },
      { label: "backups", value: "restic, offsite" },
    ],
    media: {
      kind: "terminal",
      title: "elyesghazel.ch",
      lines: [
        { cmd: "status" },
        { out: ["mail", "up"] },
        { out: ["git + ci", "up"] },
        { out: ["monitoring", "up"] },
        { out: ["backups", "nightly, encrypted"] },
        { out: ["this page", "up"] },
      ],
    },
    caption: "the short version of a long list",
    links: [{ label: "how my agents run it", href: "/blog/ai-memory-recall" }],
  },
];

/** Smaller things, one row each. All public. */
export const alsoBuilt: { title: string; line: string; year: string; href: string; lang: string }[] = [
  { title: "brief", line: "keyboard-first mail client for Hyprland, multi-account IMAP", year: "2026", lang: "Rust", href: "https://github.com/elyesghazel/brief" },
  { title: "kerf", line: "video editor with a timeline AI agents can cut, remote render over ssh", year: "2026", lang: "Rust", href: "https://github.com/elyesghazel/kerf" },
  { title: "halo", line: "RGB lighting and fans for the whole PC on Linux, in one window", year: "2026", lang: "Rust", href: "https://github.com/elyesghazel/halo" },
  { title: "hyprwidgets", line: "desktop widgets on empty workspaces: weather, calendar, media", year: "2026", lang: "Rust", href: "https://github.com/elyesghazel/hyprwidgets" },
  { title: "porttiming", line: "two-stroke port timing calculator, before and after a base plate", year: "2026", lang: "TypeScript", href: "https://porttiming.elyesghazel.ch" },
  { title: "sessionrecall", line: "semantic search over past Claude Code, Codex and OpenCode sessions", year: "2026", lang: "Python", href: "https://github.com/elyesghazel/sessionrecall" },
];

export type ProjectImage = { src: string; alt: string; caption?: string };

/*
 * Project write-ups and blog posts are markdown files in src/markdown/.
 */

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
  { label: "support", value: "ko-fi.com/elyesghazel", href: site.kofi },
];

export const contactNote =
  "Open to interesting problems, hardware or software. Mail is read fastest.";
