import { useEffect, useRef } from "react";

/**
 * A quiet field of white stars on the black background: they twinkle faintly,
 * drift a few pixels as the cursor moves (parallax by depth), and every few
 * seconds one streaks across as a shooting star. A handful carry the barest
 * cool/warm tint so it isn't clinically flat. Purely decorative: fixed behind
 * everything, never captures pointer events, and goes still under
 * prefers-reduced-motion.
 */

type Rgb = [number, number, number];

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number; // 0..1, drives parallax strength and brightness
  baseAlpha: number;
  tw: number; // twinkle phase
  twSpeed: number;
  tint: Rgb;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
};

const WHITE: Rgb = [255, 255, 255];
const COOL: Rgb = [201, 214, 255];
const WARM: Rgb = [255, 226, 189];
const MAX_SHIFT = 14; // px of cursor parallax at the screen edge

function pickTint(): Rgb {
  const r = Math.random();
  if (r < 0.08) return COOL;
  if (r < 0.15) return WARM;
  return WHITE;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const shooters: Shooter[] = [];
    let raf = 0;
    let last = performance.now();
    let nextShooter = last + 2500 + Math.random() * 3000;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    function seed() {
      const count = Math.round(Math.min(190, (width * height) / 9000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + depth * 1.1,
          depth,
          baseAlpha: 0.16 + depth * 0.5,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.5 + Math.random() * 1.4,
          tint: pickTint(),
        };
      });
    }

    function drawStar(s: Star, alpha: number, ox: number, oy: number) {
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = `rgb(${s.tint[0]},${s.tint[1]},${s.tint[2]})`;
      ctx!.beginPath();
      ctx!.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
      ctx!.fill();
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) {
        ctx!.clearRect(0, 0, width, height);
        for (const s of stars) drawStar(s, s.baseAlpha * 0.8, 0, 0);
        ctx!.globalAlpha = 1;
      }
    }

    function spawnShooter() {
      const fromLeft = Math.random() < 0.5;
      const angle = ((Math.random() * 12 + 20) * Math.PI) / 180; // 20-32 deg
      const speed = 620 + Math.random() * 340;
      const dirX = fromLeft ? Math.cos(angle) : -Math.cos(angle);
      shooters.push({
        x: fromLeft ? Math.random() * width * 0.5 : width * 0.5 + Math.random() * width * 0.5,
        y: Math.random() * height * 0.35,
        vx: dirX * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.5,
        len: 110 + Math.random() * 130,
      });
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      ctx!.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.tw += s.twSpeed * dt;
        const twinkle = 0.7 + 0.3 * Math.sin(s.tw);
        drawStar(s, s.baseAlpha * twinkle, cur.x * s.depth, cur.y * s.depth);
      }
      ctx!.globalAlpha = 1;

      if (now >= nextShooter && shooters.length < 2) {
        spawnShooter();
        nextShooter = now + 4000 + Math.random() * 5500;
      }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.life += dt;
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        const t = sh.life / sh.maxLife;
        if (t >= 1 || sh.x < -60 || sh.x > width + 60 || sh.y > height + 60) {
          shooters.splice(i, 1);
          continue;
        }
        const fade = Math.sin(t * Math.PI); // ease in and out
        const mag = Math.hypot(sh.vx, sh.vy) || 1;
        const tailX = sh.x - (sh.vx / mag) * sh.len;
        const tailY = sh.y - (sh.vy / mag) * sh.len;
        const grad = ctx!.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(sh.x, sh.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
        ctx!.globalAlpha = fade;
        ctx!.fillStyle = "rgba(255,255,255,0.95)";
        ctx!.beginPath();
        ctx!.arc(sh.x, sh.y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      raf = requestAnimationFrame(frame);
    }

    function onPointer(e: PointerEvent) {
      target.x = ((e.clientX - width / 2) / (width / 2)) * MAX_SHIFT;
      target.y = ((e.clientY - height / 2) / (height / 2)) * MAX_SHIFT;
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    if (!reduce) {
      raf = requestAnimationFrame(frame);
      document.addEventListener("visibilitychange", onVisibility);
      if (canHover) window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
