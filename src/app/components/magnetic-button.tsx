import { useRef, type ReactNode, type ComponentProps } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = ComponentProps<typeof motion.button> & {
  children: ReactNode;
  strength?: number;
};

/** A button whose body is magnetically pulled toward the cursor. */
export function MagneticButton({
  children,
  strength = 0.4,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15 });
  const y = useSpring(my, { stiffness: 200, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
