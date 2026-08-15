import { Reveal } from "./reveal";

const STATS = [
  { value: "8+", label: "Years crafting" },
  { value: "120", label: "Projects shipped" },
  { value: "14", label: "Awards & features" },
  { value: "∞", label: "Pixels obsessed over" },
];

const SERVICES = [
  {
    n: "01",
    title: "Cinematic front-ends",
    body: "Story-driven interfaces built with React, motion, and WebGL — where every scroll and hover feels intentional.",
  },
  {
    n: "02",
    title: "Brand experiences",
    body: "Launch sites and campaigns that make a first impression impossible to scroll past.",
  },
  {
    n: "03",
    title: "Product & prototypes",
    body: "From napkin sketch to polished, performant product — design and engineering under one roof.",
  },
];

export function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p
          className="mb-4 text-primary"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.3em" }}
        >
          → WHAT I DO
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="max-w-3xl text-[clamp(1.8rem,5vw,3.6rem)] leading-[1.05]">
          I build the web experiences brands{" "}
          <span className="italic text-muted-foreground">wish</span> they could
          scroll through forever.
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.12}>
            <div className="group h-full rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.04]">
              <span
                className="text-primary"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
              >
                {s.n}
              </span>
              <h3 className="mt-4 text-xl transition-colors group-hover:text-primary">
                {s.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border pt-16 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div>
              <div className="text-[clamp(2.2rem,5vw,3.5rem)] leading-none text-foreground">
                {s.value}
              </div>
              <div
                className="mt-3 text-muted-foreground"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
