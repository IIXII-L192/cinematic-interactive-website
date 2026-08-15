import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

type MouseCtx = {
  /** Normalized -0.5..0.5 relative to viewport, spring-smoothed. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Raw pixel position, spring-smoothed (for the spotlight). */
  px: MotionValue<number>;
  py: MotionValue<number>;
};

const Ctx = createContext<MouseCtx | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const rx = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const ry = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const x = useSpring(nx, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(ny, { stiffness: 60, damping: 20, mass: 0.6 });
  const px = useSpring(rx, { stiffness: 120, damping: 24, mass: 0.4 });
  const py = useSpring(ry, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      nx.set(e.clientX / window.innerWidth - 0.5);
      ny.set(e.clientY / window.innerHeight - 0.5);
      rx.set(e.clientX);
      ry.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [nx, ny, rx, ry]);

  return <Ctx.Provider value={{ x, y, px, py }}>{children}</Ctx.Provider>;
}

export function useMouse() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMouse must be used within MouseProvider");
  return ctx;
}
