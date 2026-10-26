import type { CSSProperties } from "react";
import { log } from "../content";

/**
 * The hero board: one chip (me) routed out to a pad per project. Pads are
 * links to the matching work entry. Two layouts, wide and narrow, swapped in
 * CSS; both are drawn from the same description below.
 */
type Pt = [number, number];
type Layout = {
  w: number;
  h: number;
  chip: { x: number; y: number; w: number; h: number };
  /** Pin stubs: [x1, y1, x2, y2]. */
  pins: [number, number, number, number][];
  /** One per `log` entry, in order: pad box and the trace to it. */
  pads: { x: number; y: number; w: number; trace: Pt[] }[];
  /** Short labelled nets off the chip's sides. */
  nets: { trace: Pt[]; label: string; lx: number; ly: number; anchor?: "end" }[];
  holes: Pt[];
  vias: Pt[];
  rev: Pt;
};

const PAD_H = 56;

function pinsFor(chip: Layout["chip"], top: number[], side: number[]): Layout["pins"] {
  const { x, y, w, h } = chip;
  return [
    ...top.map((px): Layout["pins"][number] => [px, y - 10, px, y]),
    ...top.map((px): Layout["pins"][number] => [px, y + h, px, y + h + 10]),
    ...side.map((py): Layout["pins"][number] => [x - 10, py, x, py]),
    ...side.map((py): Layout["pins"][number] => [x + w, py, x + w + 10, py]),
  ];
}

const wideChip = { x: 250, y: 170, w: 140, h: 140 };
const WIDE: Layout = {
  w: 640,
  h: 480,
  chip: wideChip,
  pins: pinsFor(wideChip, [275, 305, 335, 365], [200, 230, 260, 290]),
  pads: [
    { x: 28, y: 40, w: 160, trace: [[275, 160], [275, 113], [230, 68], [188, 68]] },
    { x: 452, y: 40, w: 160, trace: [[365, 160], [365, 113], [410, 68], [452, 68]] },
    { x: 28, y: 384, w: 160, trace: [[275, 320], [275, 367], [230, 412], [188, 412]] },
    { x: 452, y: 384, w: 160, trace: [[365, 320], [365, 367], [410, 412], [452, 412]] },
  ],
  nets: [
    { trace: [[240, 200], [180, 200], [160, 180], [80, 180]], label: "BACKEND", lx: 80, ly: 168 },
    { trace: [[240, 290], [180, 290], [160, 310], [80, 310]], label: "WEB", lx: 80, ly: 330 },
    { trace: [[400, 200], [460, 200], [480, 180], [560, 180]], label: "PCB", lx: 560, ly: 168, anchor: "end" },
    { trace: [[400, 290], [460, 290], [480, 310], [560, 310]], label: "SERVERS", lx: 560, ly: 330, anchor: "end" },
  ],
  holes: [[16, 16], [624, 16], [16, 464], [624, 464]],
  vias: [[305, 140], [335, 140], [305, 340], [335, 340], [210, 245], [430, 245]],
  rev: [320, 466],
};

const narrowChip = { x: 110, y: 200, w: 140, h: 130 };
const NARROW: Layout = {
  w: 360,
  h: 530,
  chip: narrowChip,
  pins: pinsFor(narrowChip, [145, 170, 190, 215], [225, 255, 275, 305]),
  pads: [
    { x: 14, y: 24, w: 156, trace: [[145, 190], [145, 170], [92, 117], [92, 80]] },
    { x: 190, y: 24, w: 156, trace: [[215, 190], [215, 170], [268, 117], [268, 80]] },
    { x: 14, y: 450, w: 156, trace: [[145, 340], [145, 360], [92, 413], [92, 450]] },
    { x: 190, y: 450, w: 156, trace: [[215, 340], [215, 360], [268, 413], [268, 450]] },
  ],
  nets: [
    { trace: [[100, 225], [40, 225]], label: "BACKEND", lx: 30, ly: 212 },
    { trace: [[100, 305], [40, 305]], label: "WEB", lx: 30, ly: 326 },
    { trace: [[260, 225], [320, 225]], label: "PCB", lx: 330, ly: 212, anchor: "end" },
    { trace: [[260, 305], [320, 305]], label: "SERVERS", lx: 330, ly: 326, anchor: "end" },
  ],
  holes: [[14, 14], [346, 14], [14, 516], [346, 516]],
  vias: [[170, 160], [190, 160], [170, 370], [190, 370]],
  rev: [180, 518],
};

const d = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

function Drawing({ L, className }: { L: Layout; className: string }) {
  const id = `g-${className}`;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${L.w} ${L.h}`}
      role="group"
      aria-label="Circuit board: a chip labelled EG-01 routed to one pad per project"
    >
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="0.9" className="grid" />
        </pattern>
      </defs>
      <rect className="pcb" width={L.w} height={L.h} rx="18" />
      <rect width={L.w} height={L.h} rx="18" fill={`url(#${id})`} />
      <rect className="edge" x="6.5" y="6.5" width={L.w - 13} height={L.h - 13} rx="13" />
      {L.holes.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="hole" cx={x} cy={y} r="6" />
      ))}

      {L.nets.map((n, i) => {
        const end = n.trace[n.trace.length - 1];
        return (
          <g key={n.label} style={{ "--i": i + 4 } as CSSProperties}>
            <path className="trace thin" d={d(n.trace)} pathLength={1} />
            <circle className="via via-end" cx={end[0]} cy={end[1]} r="5" />
            <text className="silk dim" x={n.lx} y={n.ly} textAnchor={n.anchor ?? "start"}>
              {n.label}
            </text>
          </g>
        );
      })}
      {L.vias.map(([x, y]) => (
        <circle key={`v${x}-${y}`} className="via" cx={x} cy={y} r="4" />
      ))}

      {L.pins.map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}-${x2}`} className="pin" x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
      <rect className="chip" x={L.chip.x} y={L.chip.y} width={L.chip.w} height={L.chip.h} rx="6" />
      <circle cx={L.chip.x + 14} cy={L.chip.y + 14} r="4" fill="#26332d" />
      <text className="chip-t" x={L.chip.x + L.chip.w / 2} y={L.chip.y + L.chip.h / 2 + 8} textAnchor="middle">
        EG-01
      </text>
      <text className="chip-s" x={L.chip.x + L.chip.w / 2} y={L.chip.y + L.chip.h - 18} textAnchor="middle">
        ZÜRICH · CH
      </text>
      <text className="silk dim" x={L.chip.x} y={L.chip.y - 22}>
        U1
      </text>

      {L.pads.map((p, i) => {
        const c = log[i];
        if (!c) return null;
        return (
          <a key={c.id} href={`#${c.id}`} className="net" style={{ "--i": i } as CSSProperties}>
            <path className="trace" d={d(p.trace)} pathLength={1} />
            <path className="pulse" d={d(p.trace)} pathLength={1} />
            <rect className="pad" x={p.x} y={p.y} width={p.w} height={PAD_H} rx="8" />
            <text className="pad-t" x={p.x + 14} y={p.y + 25}>
              {c.title.split(" ")[0]}
            </text>
            <text className="pad-s" x={p.x + 14} y={p.y + 43}>
              {`J${i + 1} · ${c.date}`}
            </text>
          </a>
        );
      })}

      <text className="silk dim" x={L.rev[0]} y={L.rev[1] - 8} textAnchor="middle">
        ELYESGHAZEL.CH · REV 2026.10
      </text>
    </svg>
  );
}

export default function Board() {
  return (
    <div className="board">
      <Drawing L={WIDE} className="wide" />
      <Drawing L={NARROW} className="narrow" />
    </div>
  );
}
