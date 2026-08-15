import { useEffect, useRef } from "react";
import { motion, useTransform, useMotionTemplate } from "motion/react";
import { useMouse } from "./mouse-provider";

/** Drifting particle / dust field on a canvas that parallaxes with the cursor. */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const mouse = { x: 0, y: 0 };

    const COUNT = Math.min(120, Math.floor((w * h) / 14000));
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.9 + 0.1, // depth → parallax + size
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      tw: Math.random() * Math.PI * 2,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / w - 0.5;
      mouse.y = e.clientY / h - 0.5;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const ox = mouse.x * 60 * p.z;
        const oy = mouse.y * 60 * p.z;
        const twinkle = 0.4 + Math.sin(p.tw) * 0.35;

        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 234, 220, ${twinkle * p.z})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

/** A single drifting aurora blob offset by the cursor. */
function Aurora({
  color,
  className,
  depth,
  duration,
  initial,
}: {
  color: string;
  className: string;
  depth: number;
  duration: number;
  initial: number;
}) {
  const { x, y } = useMouse();
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-[120px] ${className}`}
      style={{ x: tx, y: ty, background: color }}
      initial={{ scale: 1, opacity: 0.5, rotate: initial }}
      animate={{
        scale: [1, 1.25, 0.95, 1],
        opacity: [0.45, 0.7, 0.5, 0.45],
        rotate: [initial, initial + 40, initial],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function CinematicBackground() {
  const { px, py } = useMouse();
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${px}px ${py}px, rgba(240,167,67,0.10), rgba(79,209,197,0.05) 40%, transparent 70%)`;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-background">
      
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(79,209,197,0.10), transparent 55%), radial-gradient(ellipse at 80% 110%, rgba(240,167,67,0.12), transparent 50%)",
        }}
      />

      
      <Aurora
        color="rgba(240,167,67,0.55)"
        className="left-[-10%] top-[8%] h-[42vw] w-[42vw]"
        depth={70}
        duration={18}
        initial={0}
      />
      <Aurora
        color="rgba(79,209,197,0.45)"
        className="right-[-12%] top-[35%] h-[46vw] w-[46vw]"
        depth={-90}
        duration={22}
        initial={30}
      />
      <Aurora
        color="rgba(120,90,220,0.35)"
        className="bottom-[-15%] left-[25%] h-[40vw] w-[40vw]"
        depth={50}
        duration={26}
        initial={-20}
      />

      
      <ParticleField />

      
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(3,4,8,0.85) 100%)",
        }}
      />

    </div>
  );
}
