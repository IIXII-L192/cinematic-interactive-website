import { motion } from "motion/react";

const ITEMS = [
  "Creative Development",
  "Motion Design",
  "WebGL",
  "Immersive UI",
  "Brand Experiences",
  "Interaction Design",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative flex overflow-hidden border-y border-border py-6">
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8">
            <span className="text-[clamp(1.2rem,2.5vw,2rem)] text-muted-foreground">
              {item}
            </span>
            <span className="text-primary">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
