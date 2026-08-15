import { motion, useTransform } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { useMouse } from "./mouse-provider";

const TITLE_TOP = "Let's create";
const TITLE_BOT = "something";

function ParallaxWord({
  text,
  depth,
  italic,
  className = "",
}: {
  text: string;
  depth: number;
  italic?: boolean;
  className?: string;
}) {
  const { x, y } = useMouse();
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth * 0.5);
  return (
    <motion.span style={{ x: tx, y: ty }} className="inline-block">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className={`inline-block ${italic ? "italic" : ""} ${className}`}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: 0.2 + i * 0.04,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={c === " " ? { width: "0.35em" } : undefined}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const { x, y } = useMouse();
  const gx = useTransform(x, (v) => v * -30);
  const gy = useTransform(y, (v) => v * -30);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span
          className="text-muted-foreground"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
          }}
        >
          MOCKUP WEBSITE
        </span>
      </motion.div>

      <motion.h1
        style={{ x: gx, y: gy }}
        className="max-w-5xl text-[clamp(2.8rem,11vw,9rem)] font-[350] leading-[0.92] tracking-tight"
      >
        <span className="block overflow-hidden">
          <ParallaxWord text={TITLE_TOP} depth={24} />
        </span>
        <span className="block overflow-hidden">
          <ParallaxWord 
            text={TITLE_BOT} 
            depth={40} 
            italic 
            className="bg-gradient-to-r from-primary via-[#ffd9a0] to-accent bg-clip-text text-transparent" 
          />
          <ParallaxWord text=" cinematic" depth={16} italic />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="mt-8 max-w-xl text-lg text-muted-foreground"
      >
        I&apos;m Aria Vance — a creative developer crafting immersive,
        motion-driven web experiences. Let&apos;s turn your idea into something
        people remember.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-12 flex items-center gap-2 text-muted-foreground"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
          scroll to connect
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 1 },
          y: { delay: 1.4, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.div>
    </section>
  );
}
