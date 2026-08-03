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
  facts: [
    { label: "writing code", value: "8+ years" },
    { label: "apprenticeship", value: "2nd year, EFZ" },
    { label: "slideplate", value: "founder, since 2025" },
  ],
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
    items: ["Arduino", "PCB design", "USB-HID", "Fusion 360", "3D printing", "soldering"],
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

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] };

export type ProjectPage = {
  slug: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
  link?: { label: string; url: string };
  blocks: Block[];
};

export const projects: ProjectPage[] = [
  {
    slug: "slideplate",
    title: "SlidePlate",
    role: "founder",
    period: "2025.12 - now",
    summary:
      "3D-printed foldable licence plate holders for supermoto and enduro bikes.",
    tags: ["Fusion 360", "ASA+", "3D printing", "Shopify", "Next.js", "Prisma"],
    link: { label: "slideplate.ch", url: "https://slideplate.ch" },
    blocks: [
      {
        type: "p",
        text: "Supermoto and enduro bikes ship with licence plate holders that are long, heavy, and bolted onto a bracket that hangs out past the rear wheel. Mine are short, they fold, and they bolt straight on without modifying the bike.",
      },
      {
        type: "p",
        text: "Two versions. BASE is fixed. FLEX folds in flat against the fender and back out to almost horizontal, which is what you want after dropping the bike or when you need the clearance. There are model-specific fitments for Yamaha, KTM EXC, TM SMR and Beta, plus a universal plate for everything else. They ship to Switzerland, Austria, Belgium and the UK.",
      },
      { type: "h", text: "The part I got wrong" },
      {
        type: "p",
        text: "The first run was printed in PETG with settings I had not thought about hard enough: low infill, thin walls. The hinges broke. Five came back.",
      },
      {
        type: "p",
        text: "I replaced every one of them for free, moved the whole line to ASA+, and then posted a video explaining exactly what I had got wrong and why. That video got shared more than anything else I have posted, including the product ones. It taught me more about selling something than any amount of product copy did.",
      },
      { type: "h", text: "The boring half" },
      {
        type: "p",
        text: "Most of the work is unglamorous: measuring rear ends, cutting new fitments in CAD, printing to order, packing boxes, answering DMs about whether it fits a 2019 EXC.",
      },
      {
        type: "p",
        text: "Shopify reports revenue, and for a while I read that as profit. It isn't. So I built my own tracker in Next.js, Prisma and Postgres, where every order carries its real costs: filament, packaging, the postage I actually paid, and the warranty units that went out for nothing. It produces one number I trust. It is a lot smaller than the number Shopify shows, and that is the entire reason it exists.",
      },
    ],
  },
  {
    slug: "tsw25-fahrstand",
    title: "TSW25 Fahrstand",
    role: "hardware & firmware",
    period: "2025.03 - 2025.10",
    summary:
      "A physical train driver's desk for Train Sim World 25, built from the circuit board up.",
    tags: ["C++", "Arduino", "PCB", "Fusion 360", "3D printing", "USB-HID"],
    blocks: [
      {
        type: "p",
        text: "A friend was done playing Train Sim World 25 with a keyboard and mouse. So I built him a driver's desk instead: circuit board, firmware, housing, all of it designed from scratch. Seven months of work, and it sold.",
      },
      { type: "h", text: "Controls" },
      {
        type: "ul",
        items: [
          "2 large buttons for the doors, left and right",
          "3 toggle switches for the PZB system",
          "Self-designed 3D-printed levers running on potentiometers",
        ],
      },
      { type: "h", text: "Build" },
      {
        type: "ul",
        items: [
          "Pro Micro (Arduino Leonardo clone) as the microcontroller",
          "C++ with the Joystick library",
          "Custom PCB, hand-soldered",
          "Housing designed in Fusion 360, printed on a Prusa Mini+",
        ],
      },
      { type: "h", text: "The hard part" },
      {
        type: "p",
        text: "Calibrating the potentiometers. The microcontroller has to reliably find the minimum and maximum travel of every lever, or the inputs arrive imprecise and inconsistent. On top of that the USB-HID descriptor had to be right enough that the game accepts the desk as a real controller rather than an unknown device.",
      },
      {
        type: "p",
        text: "Seven months later: a working, realistic-looking driver's desk, designed, soldered and programmed end to end.",
      },
    ],
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
