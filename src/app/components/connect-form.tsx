import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Check, Loader2, Send } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { useMouse } from "./mouse-provider";
import { useTransform, useMotionTemplate } from "motion/react";

const PROJECTS = [
  "A cinematic web experience",
  "Brand / product site",
  "Web app / SaaS",
  "Creative collaboration",
  "Just saying hello",
];

type Field = "name" | "email" | "budget" | "message";

function CineInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  textarea,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const shared =
    "peer w-full rounded-xl border border-border bg-input px-4 pb-3 pt-6 text-foreground outline-none transition-all duration-300 placeholder-transparent focus:border-primary/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(240,167,67,0.35),0_0_40px_-8px_rgba(240,167,67,0.4)]";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          required={required}
          value={value}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 origin-left transition-all duration-300 ${
          active
            ? "top-2 text-[0.7rem] tracking-[0.15em] text-primary uppercase"
            : "top-1/2 -translate-y-1/2 text-muted-foreground"
        }`}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
    </div>
  );
}

export function ConnectForm() {
  const { px, py } = useMouse();
  const rx = useTransform(py, [0, window.innerHeight], [6, -6]);
  const ry = useTransform(px, [0, window.innerWidth], [-6, 6]);
  const glow = useMotionTemplate`radial-gradient(500px circle at ${px}px ${py}px, rgba(240,167,67,0.14), transparent 65%)`;

  const [form, setForm] = useState<Record<Field, string>>({
    name: "",
    email: "",
    budget: PROJECTS[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: Field) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    // Simulated send — swap for a real endpoint / Supabase call.
    setTimeout(() => {
      setStatus("sent");
      toast.success("Message sent — I'll be in touch soon.");
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.7 },
        colors: ["#f0a743", "#4fd1c5", "#f2ede3", "#785adc"],
      });
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", budget: PROJECTS[0], message: "" });
      }, 2600);
    }, 1400);
  };

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="relative"
    >
      
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-accent/20 to-transparent opacity-70 blur-[1px]" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 backdrop-blur-2xl sm:p-10">
        <motion.div className="absolute inset-0" style={{ background: glow }} />
        <div className="relative">
          <p
            className="mb-2 text-primary"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.3em" }}
          >
            → LET&apos;S TALK
          </p>
          <h2 className="mb-8 text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
            Start a conversation
          </h2>

          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <CineInput
                id="name"
                label="Your name"
                value={form.name}
                onChange={set("name")}
                required
              />
              <CineInput
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
              />
            </div>

            <div className="relative">
              <label
                className="mb-3 block text-muted-foreground"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                }}
              >
                WHAT&apos;S THE PROJECT?
              </label>
              <div className="flex flex-wrap gap-2">
                {PROJECTS.map((p) => {
                  const selected = form.budget === p;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => set("budget")(p)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_0_30px_-6px_rgba(240,167,67,0.6)]"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <CineInput
              id="message"
              label="Tell me about it"
              value={form.message}
              onChange={set("message")}
              textarea
              required
            />

            <MagneticButton
              type="submit"
              disabled={status !== "idle"}
              className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-primary-foreground transition-shadow duration-300 hover:shadow-[0_10px_60px_-10px_rgba(240,167,67,0.7)] disabled:opacity-90"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <AnimatePresence mode="wait" initial={false}>
                {status === "idle" && (
                  <motion.span
                    key="idle"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    Send message <Send className="h-4 w-4" />
                  </motion.span>
                )}
                {status === "sending" && (
                  <motion.span
                    key="sending"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sending <Loader2 className="h-4 w-4 animate-spin" />
                  </motion.span>
                )}
                {status === "sent" && (
                  <motion.span
                    key="sent"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sent <Check className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
