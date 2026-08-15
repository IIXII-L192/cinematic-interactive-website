import { useEffect, useRef, type ReactNode } from "react";

/**
 * Transform-based smooth scroll. The real document height is mirrored onto the
 * <body> so native scrolling / scrollbars keep working, while the content is
 * translated with an eased (lerped) offset for a cinematic, weighty feel.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Respect reduced-motion users — skip the virtual scroll entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = 0;

    const setBodyHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`;
    };

    const ro = new ResizeObserver(setBodyHeight);
    ro.observe(content);
    setBodyHeight();

    content.style.position = "fixed";
    content.style.top = "0";
    content.style.left = "0";
    content.style.width = "100%";
    content.style.willChange = "transform";

    const onScroll = () => {
      target = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.05) current = target;
      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      document.body.style.height = "";
      content.removeAttribute("style");
    };
  }, []);

  return <div ref={contentRef}>{children}</div>;
}
