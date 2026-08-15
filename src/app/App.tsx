import { Toaster } from "sonner";
import { Mail, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { MouseProvider } from "./components/mouse-provider";
import { CinematicBackground } from "./components/cinematic-background";
import { SmoothScroll } from "./components/smooth-scroll";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import { AboutSection } from "./components/about-section";
import { ConnectForm } from "./components/connect-form";
import { Reveal } from "./components/reveal";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

function ConnectSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <p
              className="mb-4 text-primary"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.3em" }}
            >
              → GET IN TOUCH
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.98]">
              Have an idea?
              <br />
              <span className="italic text-muted-foreground">
                Let&apos;s make it
              </span>{" "}
              real.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-muted-foreground">
              Tell me what you&apos;re dreaming up. I read every message
              personally and usually reply within a day.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 space-y-4">
              <a
                href="mailto:hello@ariavance.studio"
                className="group flex items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5 text-primary" />
                hello@ariavance.studio
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Lisbon · working worldwide
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-[0_8px_30px_-8px_rgba(240,167,67,0.6)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={60}>
          <ConnectForm />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-16 pt-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
        <span
          className="text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
        >
          © 2026 IIXII™ & Aakarsh Singhal — CRAFTED WITH OBSESSION (This is just a template, not a real service)
        </span>
        <span
          className="text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
        >
          DESIGNED & BUILT IN THE DARK
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <MouseProvider>
      <CinematicBackground />
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(11,14,22,0.9)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f2ede3",
            backdropFilter: "blur(12px)",
          },
        }}
      />
      <SmoothScroll>
        <main className="relative">
          <Hero />
          <Marquee />
          <AboutSection />
          <ConnectSection />
          <Footer />
        </main>
      </SmoothScroll>
    </MouseProvider>
  );
}
