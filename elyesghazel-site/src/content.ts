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
  /** The row under the name. "local time" is filled in live by the page. */
  meta: [
    { label: "role", lines: ["software engineer", "apprentice, EFZ"] },
    { label: "at", lines: ["Swisscom, 2nd year", "Zürich, CH"] },
    { label: "now", lines: ["running SlidePlate", "since Dec 2025"] },
  ],
  /** Three big numbers. `href` scrolls to where the claim is backed up. */
  proof: [
    { value: "8+", text: "years writing code, starting with Minecraft plugins", href: "#about" },
    { value: "~40", text: "containers on a server I run myself", href: "#infra" },
    { value: "4", text: "countries SlidePlate ships to", href: "#slideplate" },
  ],
};

/** Big sentence on the left of the about section. */
export const pull = "I build the thing that isn't there yet.";

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
 * The work section, rendered as `git log --graph`: newest first, one commit
 * per project. `color` tints the node, the chips and the stage behind the
 * visual. Hrefs starting with "/" route client-side.
 *
 * Terminal stages use a tiny line syntax:
 *   "$ cmd"  prompt     "+ text"  green tick     "  text"  plain output
 */
export type Stage =
  | { kind: "image"; src: string; alt: string; tall?: boolean; alt2?: { src: string; alt: string } }
  | { kind: "term"; title: string; lines: string[] };

export type Commit = {
  id: string;
  title: string;
  date: string;
  color: string;
  /** First ref is the coloured one, the rest are muted. */
  refs: string[];
  one: string;
  why: string;
  facts: { label: string; value: string }[];
  links: { label: string; href: string }[];
  stage: Stage;
  caption?: string;
};

export const log: Commit[] = [
  {
    id: "slideplate",
    title: "SlidePlate",
    date: "now",
    color: "#e0686b",
    refs: ["HEAD -> main", "since Dec 2025"],
    one: "Foldable licence plate holders for supermoto and enduro bikes.",
    why: "Short, 3D-printed in ASA+, and they bolt straight on. Product design, production, storefront, and the tracker that tells me whether any of it makes money.",
    facts: [
      { label: "fitments", value: "Yamaha · KTM EXC · TM SMR · Beta · universal" },
      { label: "built with", value: "Fusion 360 · ASA+ · Shopify · Next.js · Prisma" },
    ],
    links: [
      { label: "Read the story", href: "/projects/slideplate" },
      { label: "slideplate.ch", href: "https://slideplate.ch" },
    ],
    stage: {
      kind: "term",
      title: "slideplate - tracker",
      lines: [
        "$ shopify revenue",
        "  looks great",
        "$ profit = revenue - filament - packaging - postage - warranty",
        "  a lot smaller",
        "+ one number I trust",
      ],
    },
    caption: "Why the profit tracker exists, from the write-up",
  },
  {
    id: "stealthy",
    title: "Stealthy",
    date: "Mar 2026",
    color: "#7fd39b",
    refs: ["featured build", "C++ · KiCad"],
    one: "A pocket security-research badge on the ESP32-S3.",
    why: "Custom circuit board, e-ink UI, WiFi and infrared tooling. Board, firmware and case designed and written from an empty repo in about a month.",
    facts: [
      { label: "silicon", value: "ESP32-S3, 2.13\" e-ink, IR" },
      { label: "firmware", value: "C++ from scratch, app framework, web UI" },
      { label: "built in", value: "~1 month" },
    ],
    links: [
      { label: "Read the story", href: "/projects/stealthy" },
      { label: "Source", href: "https://github.com/elyesghazel/stealthy-firmware" },
    ],
    stage: {
      kind: "image",
      src: "/log/stealthy-hand.webp",
      alt: "The finished Stealthy badge, held in one hand",
      tall: true,
    },
    caption: "The finished board, running its own firmware",
  },
  {
    id: "tsw25",
    title: "TSW25 Fahrstand",
    date: "Oct 2025",
    color: "#f5b83d",
    refs: ["sold", "C++ · Arduino"],
    one: "A physical train driver's desk for Train Sim World 25.",
    why: "A friend was done driving trains with a keyboard. Custom PCB, hand-soldered, 3D-printed housing, self-designed levers on potentiometers. Seven months of work.",
    facts: [
      { label: "controls", value: "door buttons, PZB toggles, 3D-printed levers" },
      { label: "under the hood", value: "Pro Micro · USB-HID · Fusion 360" },
    ],
    links: [{ label: "Read the story", href: "/projects/tsw25-fahrstand" }],
    stage: {
      kind: "image",
      src: "/log/tsw25.webp",
      alt: "The TSW25 Fahrstand, a custom train driver's desk",
    },
  },
  {
    id: "infra",
    title: "Self-hosted infrastructure",
    date: "2023",
    color: "#6f95ff",
    refs: ["initial commit", "still running"],
    one: "One server, every elyesghazel.ch subdomain, including this page.",
    why: "~40 containers behind Traefik: mail, Git and CI, password vault, media, push notifications, monitoring, encrypted offsite backups. When it goes down at 2am it is nobody's problem but mine.",
    facts: [
      { label: "stack", value: "Debian · Docker · Traefik · Forgejo · restic" },
      { label: "watched by", value: "Uptime Kuma, pushing to my phone" },
    ],
    links: [{ label: "github.com/elyesghazel", href: "https://github.com/elyesghazel" }],
    stage: {
      kind: "term",
      title: "elyes@server - ~",
      lines: [
        "$ docker ps --format '{{.Names}}' | head",
        "  inf-traefik         reverse proxy, wildcard TLS",
        "  inf-forgejo         git + CI",
        "  mailu-front-1       mail",
        "  apps-vaultwarden    passwords",
        "  apps-jellyfin       media",
        "  apps-ntfy           push",
        "  inf-uptime-kuma     monitoring",
        "+ restic, nightly 03:30, offsite",
      ],
    },
  },
];

/** One-line extras under the log. */
export const also = [
  {
    name: "3D printing shop",
    text: "made-to-order printed parts, designed and printed here rather than resold",
    year: "2024",
    href: "https://shop.elyesghazel.ch",
  },
];

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] };

export type ProjectImage = { src: string; alt: string; caption?: string };

export type ProjectPage = {
  slug: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
  link?: { label: string; url: string };
  /** Optional gallery, rendered under the intro. Missing files hide themselves. */
  images?: ProjectImage[];
  blocks: Block[];
};

export const projects: ProjectPage[] = [
  {
    slug: "stealthy",
    title: "Stealthy",
    role: "hardware & firmware, solo",
    period: "2026.02 - 2026.03",
    summary:
      "A pocket security-research badge on the ESP32-S3: a custom circuit board, a 2.13\" e-ink screen, WiFi and infrared tooling, and firmware written in C++ from an empty repo. Board, code and case, about a month end to end.",
    tags: ["ESP32-S3", "C++", "PlatformIO", "KiCad", "PCB design", "e-ink", "802.11", "IR"],
    link: { label: "github.com/elyesghazel/stealthy-firmware", url: "https://github.com/elyesghazel/stealthy-firmware" },
    images: [
      {
        src: "/stealthy-hand.jpg",
        alt: "The finished Stealthy badge, fully built, held in one hand",
        caption: "Finished board: ESP32-S3, e-ink, four buttons, running its own firmware.",
      },
      {
        src: "/stealthy-pcb.jpg",
        alt: "The bare Stealthy PCB before any components are soldered",
        caption:
          "The bare board, before assembly. 'PUT THAT BACK' hides under the ESP32 footprint; the note by the e-ink connector reads, upside-down, 'if you can read this, you are holding it the wrong way.'",
      },
      {
        src: "/stealthy-kicad.jpg",
        alt: "The Stealthy PCB layout in KiCad",
        caption: "The layout in KiCad. Footprints, placement and routing, all done by hand.",
      },
      {
        src: "/stealthy-schematic.jpg",
        alt: "The Stealthy schematic",
        caption: "The schematic: ESP32-S3, e-ink over SPI, IR, buttons, power path and kill switch.",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "I wanted to understand how **wireless attacks** actually work at the packet level, so instead of buying a tool I built one. Stealthy is a pocket security-research badge built on an ++ESP32-S3++: a circuit board I designed myself, a ++2.13\" e-ink screen++, four buttons, an infrared unit, and firmware I wrote in **C++** starting from an empty repository. Board, code and case, about a month from nothing to a thing I can hold in my hand and use.",
      },
      { type: "h", text: "What it does" },
      {
        type: "p",
        text: "The firmware runs like a tiny operating system. Every tool is its own **app**, driven from the ++e-ink menu++ with four buttons or remotely from a password-protected **web interface** the badge hosts itself.",
      },
      {
        type: "ul",
        items: [
          "**WiFi beacon flood**: crafts raw 802.11 frames to fill the air with fake networks",
          "**Deauth**: sends 802.11 deauthentication frames to knock devices off a target access point",
          "**Karma / rogue AP**: listens for probe requests and shape-shifts the AP into whatever network a nearby device is looking for",
          "**Captive troll portal**: serves configurable HTML to anyone who connects to it",
          "**IR record and replay**: captures remote-control signals over infrared and plays them back, reading and writing the Flipper Zero .ir file format",
          "**Offline TOTP authenticator**: generates 2FA codes with no network at all, time synced from the browser",
        ],
      },
      {
        type: "p",
        text: "None of it is example code glued together. The firmware is structured like real software: a small **app framework with a state machine**, apps as singletons with **onEnter and onExit lifecycle hooks**, and a **service-locator context** that hands each screen the managers it needs - display, input, power, storage, IR, WiFi, LEDs. The radio, the **LittleFS** filesystem and the web server are all separate modules. Adding a new tool means writing one app, not editing everything else.",
      },
      { type: "h", text: "The board" },
      {
        type: "p",
        text: "The hardware is the part I am proudest of. I designed the whole ++PCB in KiCad++ - schematic, footprints, layout - with the ++ESP32-S3++ at the centre, e-ink over ++SPI++, an infrared LED, four tactile buttons, status LEDs, battery input, and a ++physical kill switch++ wired straight into the VCC line so the device is genuinely dead when it's off. The ++USB-C++ port went in horizontally with the two ++5.1 kΩ resistors++ on the CC pins that modern chargers demand before they will deliver any power.",
      },
      {
        type: "p",
        text: "Revision one taught me what revision two fixed. The first regulator, an ++AMS1117++, sagged under current spikes, so I replaced it with a ++Microchip TC1262++ that has a far smaller dropout, patched it in with ++bodge wires++ to prove it, then spun a cleaner board. A ++boost converter++ is planned to feed the 1-3 W infrared LED the current it wants without dragging the ESP32 into a brown-out.",
      },
      { type: "h", text: "Making it stop resetting itself" },
      {
        type: "p",
        text: "An e-ink refresh and a WiFi burst both pull hard on a small battery, and the ESP32-S3 answers the voltage dip by resetting itself. Three changes fixed it. ++Partial refresh++, so the screen updates without the full black-and-white flash that costs the most current. Dropping the CPU to ++80 MHz++ while writing to the display. And briefly muting the ++brown-out detector++ during boot, so the charge pump can't trap the board in a reset loop before it has settled. Together they turned a flaky prototype into something that just runs.",
      },
      { type: "h", text: "The case, and the jokes" },
      {
        type: "p",
        text: "The enclosure is an open-frame skeleton design: the board snaps into ++printed corner clips++ with no screws, and a back plate carries the battery. I also left a few things on the ++silkscreen++ for anyone who looks closely. 'PUT THAT BACK' under the ESP32 footprint. And, printed upside-down beside the e-ink connector, 'if you can read this, you are holding it the wrong way.'",
      },
      {
        type: "p",
        text: "About a month, empty repository to working board. It's the project I point at when someone asks whether I actually build hardware or just talk about it. Built for learning and authorised testing on my own equipment.",
      },
    ],
  },
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

/** Rows under the big email address. The address itself comes from `site`. */
export const links = [
  { label: "github", value: "elyesghazel", href: "https://github.com/elyesghazel" },
  { label: "linkedin", value: "Elyes Ghazel", href: "https://linkedin.com/in/elyes-ghazel" },
  { label: "slideplate", value: "slideplate.ch", href: "https://slideplate.ch" },
  { label: "shop", value: "3D printing", href: "https://shop.elyesghazel.ch" },
];

export const contactNote = "Open to interesting problems, hardware or software.";

/** Last line on the page; `strong` is set in the accent colour. */
export const closing = {
  text: "Mail is read fastest.",
  strong: "Let's build something.",
};
