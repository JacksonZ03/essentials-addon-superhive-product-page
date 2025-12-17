import React, { useEffect, useMemo, useRef, useState } from "react";

type Feature = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string; // e.g. "New in v1.1.0"
  description: string[];
  bullets?: string[];
  mediaUrl?: string;
  mediaAlt?: string;
};

const product = {
  name: "Essentials",
  eyebrow: "Blender add-on",
  headline: "Essential features missing in vanilla Blender.",
  subhead:
    "A chapter-based product page that stays readable as you add more features. Scroll like a story—each feature gets its own moment.",
  primaryCta: { label: "Get it on Superhive", href: "#" },
  secondaryCta: { label: "Start scrolling", href: "#f-gravity-snap" },
};

const featuresSeed: Feature[] = [
  {
    id: "gravity-snap",
    title: "Gravity Snap",
    subtitle: "Drop objects onto surfaces instantly",
    description: [
      "Perfectly snap any mesh or empty object to the surface of another mesh—like you dropped it.",
      "Great for quickly aligning meshes in your scene.",
    ],
    bullets: [
      "Respects object size, shape, and orientation",
      "Origin point moves with the object",
      "Offset control to embed above/below the target surface",
    ],
    mediaUrl:
      "https://assets.superhivemarket.com/cache/d478f9c789cc377df94f4fcf4d5b5bb8.gif",
    mediaAlt: "Gravity Snap demo",
  },
  {
    id: "outliner-highlight",
    title: "Auto-Highlight Selection in Outliner",
    subtitle: "Stop hunting through collections",
    description: [
      "Blender can expand collections to reveal the selected object—but it takes extra clicks each time.",
      "This automates the process, saving time when navigating large scenes.",
    ],
    mediaUrl:
      "https://assets.superhivemarket.com/cache/3a92110a27a26674d7ee90aba3b88590.gif",
    mediaAlt: "Outliner auto-highlight demo",
  },
  {
    id: "center-camera",
    title: "Center Camera Perspective",
    subtitle: "One click to center the camera view",
    description: ["Quickly center the camera perspective view with a single click."],
    bullets: [
      "Vanilla Blender does not provide this feature directly",
      "Closest is Home, but that zooms the camera to fullscreen",
    ],
    mediaUrl:
      "https://assets.superhivemarket.com/cache/3ccf57261b0b276667108d379856d299.gif",
    mediaAlt: "Center camera perspective demo",
  },
  {
    id: "spacebar-toggle",
    title: "Spacebar Play/Pause Toggle",
    subtitle: "Prevent accidental playback",
    description: [
      "Avoid accidental timeline playback when using spacebar across apps.",
      "Play/pause tutorials without triggering Blender animation playback.",
    ],
    bullets: [
      "Works in all animation workspaces (timeline, graph editor, etc.)",
      "If spacebar isn’t bound, the button won’t show",
    ],
    mediaUrl:
      "https://assets.superhivemarket.com/cache/5466c6f5d99df601cbfc26c0352dafde.gif",
    mediaAlt: "Spacebar toggle demo",
  },
  {
    id: "visibility-sync",
    title: "Viewport/Render Visibility Sync",
    subtitle: "One click, two visibility states",
    badge: "New in v1.1.0",
    description: [
      "Sync viewport and render visibility with a single click.",
      "Massive time-saver in large scenes where manual visibility management adds up fast.",
    ],
    mediaUrl:
      "https://assets.superhivemarket.com/cache/ff4a5136503a3da158369b9871597d26.gif",
    mediaAlt: "Visibility sync demo",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white/80">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/70">
      {children}
    </span>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProductPage() {
  const features = useMemo(() => featuresSeed, []);
  const sections = useMemo(
    () => [
      { id: "top", label: "Top" },
      ...features.map((f, i) => ({ id: `f-${f.id}`, label: `${String(i + 1).padStart(2, "0")}` })),
      { id: "prefs", label: "Prefs" },
      { id: "faq", label: "FAQ" },
    ],
    [features]
  );

  const [activeId, setActiveId] = useState<string>("top");
  const [spot, setSpot] = useState({ x: 50, y: 18 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Spotlight (mouse-follow glow)
  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setSpot({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Active section tracking
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    observerRef.current?.disconnect();

    const io = new IntersectionObserver(
      (entries) => {
        // choose the most "present" entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    nodes.forEach((n) => io.observe(n));
    observerRef.current = io;
    return () => io.disconnect();
  }, [features.length]);

  const activeIndex = useMemo(() => sections.findIndex((s) => s.id === activeId), [sections, activeId]);

  return (
    <main className="min-h-screen text-slate-100 bg-[#050713]">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .anim-fade, .anim-breathe { animation: none !important; transition: none !important; }
          html { scroll-behavior: auto !important; }
        }
        @keyframes breathe {
          0% { transform: translateY(0px); opacity: .7; }
          50% { transform: translateY(-10px); opacity: 1; }
          100% { transform: translateY(0px); opacity: .7; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Background with spotlight */}
      <div
        onMouseMove={onMove}
        style={
          {
            "--mx": `${spot.x}%`,
            "--my": `${spot.y}%`,
          } as React.CSSProperties
        }
        className={cn(
          "relative",
          "bg-[radial-gradient(800px_520px_at_var(--mx)_var(--my),rgba(56,189,248,0.18),transparent_60%),radial-gradient(1000px_700px_at_50%_-20%,rgba(99,102,241,0.14),transparent_60%),linear-gradient(to_bottom,#07081a,#030616)]"
        )}
      >
        {/* subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />

        {/* Floating chapter nav */}
        <div className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 md:block">
          <div className="rounded-2xl border border-white/10 bg-[#050713]/70 p-2 backdrop-blur">
            <div className="px-2 pb-2 pt-1 text-[10px] font-semibold tracking-widest text-white/50">
              CHAPTERS
            </div>
            <div className="flex flex-col gap-1">
              {sections.map((s, i) => {
                const on = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToId(s.id)}
                    className={cn(
                      "group flex items-center gap-2 rounded-xl px-2 py-2 text-left transition",
                      on ? "bg-white/10" : "hover:bg-white/5"
                    )}
                    aria-label={`Go to ${s.label}`}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-lg border text-[11px] font-semibold",
                        on
                          ? "border-sky-300/35 bg-sky-300/10 text-sky-200"
                          : "border-white/10 bg-white/5 text-white/60 group-hover:text-white/80"
                      )}
                    >
                      {s.label}
                    </span>
                    <span className={cn("text-xs", on ? "text-white/80" : "text-white/40")}>
                      {i === 0 ? "Top" : i === sections.length - 1 ? "FAQ" : i === sections.length - 2 ? "Prefs" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* tiny progress */}
            <div className="mt-2 px-2 pb-1 text-[10px] text-white/40">
              {Math.max(activeIndex, 0)}/{sections.length - 1}
            </div>
          </div>
        </div>

        {/* Sticky header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050713]/70 backdrop-blur">
          <Container>
            <div className="flex h-14 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <span className="text-sm font-semibold">E</span>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">{product.name}</div>
                  <div className="text-xs text-slate-400">{product.eyebrow}</div>
                </div>
              </div>

              <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
                <button className="hover:text-white" onClick={() => scrollToId("f-" + features[0].id)}>
                  Features
                </button>
                <button className="hover:text-white" onClick={() => scrollToId("prefs")}>
                  Preferences
                </button>
                <button className="hover:text-white" onClick={() => scrollToId("faq")}>
                  FAQ
                </button>
              </nav>

              <a
                href={product.primaryCta.href}
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:opacity-90"
              >
                {product.primaryCta.label}
              </a>
            </div>
          </Container>
        </header>

        {/* Scroll-snap story */}
        <div className="snap-y snap-mandatory">
          {/* HERO */}
          <section
            id="top"
            data-section
            className="snap-start"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <Container>
              <div className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Dark mode only</Pill>
                    <Pill>Modular</Pill>
                    <Pill>Story layout</Pill>
                  </div>

                  <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {product.headline}
                  </h1>
                  <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300">
                    {product.subhead}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={product.primaryCta.href}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow hover:opacity-90"
                    >
                      {product.primaryCta.label}
                    </a>
                    <a
                      href={product.secondaryCta.href}
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      {product.secondaryCta.label}
                    </a>
                  </div>

                  <div className="mt-6 text-xs text-white/50">
                    Tip: use the chapter nav (right side) to jump between sections.
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="anim-breathe absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/18 via-indigo-500/12 to-transparent blur-2xl"
                    style={{ animation: "breathe 7s ease-in-out infinite" }}
                  />
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                      <div className="text-xs font-semibold text-white/70">Preview reel</div>
                      <Badge>Scroll-snap chapters</Badge>
                    </div>
                    <div className="p-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {features.slice(0, 4).map((f) => (
                          <button
                            key={f.id}
                            onClick={() => scrollToId("f-" + f.id)}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
                          >
                            <div className="text-sm font-semibold text-white/85 group-hover:text-white">
                              {f.title}
                            </div>
                            <div className="mt-1 text-xs text-white/50">{f.subtitle}</div>
                            <div
                              className="mt-3 h-1.5 w-full rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                              style={{ backgroundSize: "200% 200%", animation: "shimmer 3.2s linear infinite" }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* FEATURE CHAPTERS */}
          {features.map((f, i) => {
            const even = i % 2 === 0;
            return (
              <section
                key={f.id}
                id={`f-${f.id}`}
                data-section
                className="snap-start"
                style={{ minHeight: "calc(100vh - 56px)" }}
              >
                <Container>
                  <div className="py-12 sm:py-16">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur",
                        "p-6 sm:p-10"
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0">
                        <div
                          className={cn(
                            "absolute -inset-24 blur-3xl",
                            even ? "bg-sky-500/10" : "bg-indigo-500/10"
                          )}
                        />
                      </div>

                      <div className="relative grid items-center gap-8 lg:grid-cols-2">
                        <div className={cn(!even && "lg:order-2")}>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge>Chapter {String(i + 1).padStart(2, "0")}</Badge>
                            {f.badge ? <Badge>{f.badge}</Badge> : null}
                          </div>

                          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            {f.title}
                          </h2>

                          {f.subtitle ? (
                            <p className="mt-2 text-sm font-semibold text-white/70">{f.subtitle}</p>
                          ) : null}

                          <div className="mt-5 space-y-3 text-slate-200/90">
                            {f.description.map((p, idx) => (
                              <p key={idx} className="leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>

                          {f.bullets?.length ? (
                            <ul className="mt-6 space-y-2 text-sm text-slate-300">
                              {f.bullets.map((b, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/80" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          <div className="mt-7 flex flex-wrap gap-2">
                            <button
                              onClick={() => scrollToId(i > 0 ? `f-${features[i - 1].id}` : "top")}
                              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/10"
                            >
                              ← Previous
                            </button>
                            <button
                              onClick={() =>
                                scrollToId(i < features.length - 1 ? `f-${features[i + 1].id}` : "prefs")
                              }
                              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/10"
                            >
                              Next →
                            </button>
                          </div>
                        </div>

                        <div className={cn("relative", !even && "lg:order-1")}>
                          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent blur-2xl" />
                          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-2xl">
                            <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold text-white/70">
                              Demo
                            </div>
                            <div className="p-3">
                              {f.mediaUrl ? (
                                <img
                                  src={f.mediaUrl}
                                  alt={f.mediaAlt ?? f.title}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full rounded-xl border border-white/10 bg-black/20"
                                />
                              ) : (
                                <div className="aspect-[16/9] w-full rounded-xl border border-white/10 bg-black/20" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center text-xs text-white/40">
                      Scroll to snap to the next chapter.
                    </div>
                  </div>
                </Container>
              </section>
            );
          })}

          {/* PREFS */}
          <section
            id="prefs"
            data-section
            className="snap-start"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <Container>
              <div className="py-14 sm:py-16">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                    <div>
                      <div className="mb-3 text-xs font-semibold tracking-widest text-sky-300/80">
                        MODULAR PREFERENCES
                      </div>
                      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Don’t need all the features?
                      </h2>
                      <p className="mt-4 text-pretty text-base leading-relaxed text-slate-300">
                        Toggle modules in the add-on preferences. Disabled modules remove their UI controls, keeping
                        Blender clean.
                      </p>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
                        <p className="text-sm font-semibold text-white">Change preferences:</p>
                        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
                          <li>Edit → Preferences → Add-ons</li>
                          <li>Find “Essentials”</li>
                          <li>Expand preferences and toggle modules</li>
                        </ol>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <Pill>No UI clutter</Pill>
                        <Pill>Only what you use</Pill>
                        <Pill>Future-proof</Pill>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-sky-500/15 to-transparent blur-2xl" />
                      <img
                        src="https://assets.superhivemarket.com/cache/c9b64c43ae7bae4181b85213132c5048.png"
                        alt="Addon preferences screenshot"
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-2xl border border-white/10 bg-black/20 shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* FAQ */}
          <section
            id="faq"
            data-section
            className="snap-start"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <Container>
              <div className="py-14 sm:py-16">
                <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-10">
                  <div className="text-center">
                    <div className="mb-3 text-xs font-semibold tracking-widest text-sky-300/80">FAQ</div>
                    <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Quick answers.
                    </h2>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      {
                        q: "Can I disable features I don’t need?",
                        a: "Yes—toggle modules in the add-on preferences. Disabled modules disappear from the UI.",
                      },
                      {
                        q: "Will this page stay clean when I add more features?",
                        a: "Yes. Each feature becomes a chapter. The nav updates automatically from the data array.",
                      },
                      {
                        q: "Does this layout work on mobile?",
                        a: "Yep. The chapter nav hides on small screens, and sections remain scroll-snap friendly.",
                      },
                    ].map((item) => (
                      <details
                        key={item.q}
                        className="group rounded-2xl border border-white/10 bg-black/25 p-5"
                      >
                        <summary className="cursor-pointer list-none text-base font-semibold text-white">
                          <span className="flex items-center justify-between gap-4">
                            {item.q}
                            <span className="text-slate-400 transition group-open:rotate-45">+</span>
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.a}</p>
                      </details>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
                    <div>
                      <div className="text-sm font-semibold text-white">More features coming.</div>
                      <div className="text-xs text-slate-400">
                        Add a new object to the feature array → new chapter appears.
                      </div>
                    </div>
                    <a
                      href={product.primaryCta.href}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:opacity-90"
                    >
                      {product.primaryCta.label}
                    </a>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </main>
  );
}
