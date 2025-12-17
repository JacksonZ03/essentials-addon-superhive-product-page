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
  headline: "A set of essential features missing in vanilla Blender.",
  subhead:
    "Designed to remove friction from daily workflows: snapping, navigation, viewport control, and other high-frequency wins.",
  primaryCta: { label: "Get it on Superhive", href: "#" },
  secondaryCta: { label: "Jump to features", href: "#features" },
  micro: "Dark by design. Minimal UI clutter. Modular feature toggles.",
};

const featuresSeed: Feature[] = [
  {
    id: "gravity-snap",
    title: "Gravity Snap",
    subtitle: "Drop objects onto surfaces instantly",
    description: [
      "Perfectly snap any mesh or empty object to the surface of another mesh—like you dropped it.",
      "Great for quickly aligning assets during layout and dressing passes.",
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
      "This automates the process, saving time when navigating complex scenes.",
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
      "Vanilla Blender doesn’t provide this directly",
      "Home is close, but it zooms camera to fullscreen",
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
      "Huge time-saver in large scenes where visibility management adds up fast.",
    ],
    mediaUrl:
      "https://assets.superhivemarket.com/cache/ff4a5136503a3da158369b9871597d26.gif",
    mediaAlt: "Visibility sync demo",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white/80">
      {children}
    </span>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/70">
      {children}
    </kbd>
  );
}

function ProgressPip({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full border transition",
        active ? "border-sky-300/70 bg-sky-300/40" : "border-white/15 bg-white/5"
      )}
    />
  );
}

export default function ProductPage() {
  const features = useMemo(() => featuresSeed, []);
  const [active, setActive] = useState(0);

  const activeFeature = features[active];
  const listRef = useRef<HTMLDivElement | null>(null);

  // Arrow-key navigation for the feature rail
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((v) => Math.min(v + 1, features.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((v) => Math.max(v - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [features.length]);

  // Keep active item visible in the rail when using arrow keys
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLButtonElement>(`button[data-i="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <main className="min-h-screen text-slate-100 bg-[#050713]">
      {/* Local styles for subtle animation/noise/scanlines */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .anim-aurora, .anim-float, .anim-scan { animation: none !important; }
        }
        @keyframes aurora {
          0% { transform: translate3d(-5%, -8%, 0) scale(1.05); opacity: .75; }
          50% { transform: translate3d(6%, 4%, 0) scale(1.12); opacity: .9; }
          100% { transform: translate3d(-5%, -8%, 0) scale(1.05); opacity: .75; }
        }
        @keyframes scan {
          0% { transform: translateY(-30%); opacity: 0; }
          15% { opacity: .25; }
          50% { opacity: .12; }
          100% { transform: translateY(130%); opacity: 0; }
        }
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(900px_600px_at_0%_10%,rgba(99,102,241,0.14),transparent_55%),linear-gradient(to_bottom,#07081a,#030616)]" />
        <div className="anim-aurora absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl"
             style={{ animation: "aurora 10s ease-in-out infinite" }} />
        <div className="anim-aurora absolute -right-48 top-20 h-[540px] w-[540px] rounded-full bg-indigo-500/10 blur-3xl"
             style={{ animation: "aurora 12s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050713]/70 backdrop-blur">
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
              <a className="hover:text-white" href="#features">
                Features
              </a>
              <a className="hover:text-white" href="#prefs">
                Preferences
              </a>
              <a className="hover:text-white" href="#faq">
                FAQ
              </a>
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

      {/* Hero */}
      <section className="pt-14 sm:pt-18">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-12">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="anim-scan absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-white/0 via-white/10 to-white/0"
                style={{ animation: "scan 7s linear infinite" }}
              />
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge>Dark mode only</Badge>
                  <Badge>Modular</Badge>
                  <Badge>Workflow-first</Badge>
                </div>

                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {product.headline}
                </h1>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-slate-300">
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

                <p className="mt-4 text-xs text-slate-400">{product.micro}</p>
              </div>

              {/* “Preview panel” (purely visual) */}
              <div className="relative">
                <div className="anim-float absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent blur-2xl"
                     style={{ animation: "floaty 6s ease-in-out infinite" }} />
                <div className="rounded-2xl border border-white/10 bg-black/30 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="text-xs font-semibold text-white/70">Command Rail</div>
                    <div className="text-[11px] text-white/50">
                      <Kbd>↑</Kbd> <Kbd>↓</Kbd>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {features.slice(0, 5).map((f, i) => (
                        <span
                          key={f.id}
                          className={cn(
                            "rounded-lg border px-2.5 py-1 text-[11px] font-semibold",
                            i === active
                              ? "border-sky-300/40 bg-sky-300/10 text-sky-200"
                              : "border-white/10 bg-white/5 text-white/60"
                          )}
                        >
                          {f.title}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold text-white">{activeFeature.title}</div>
                      <div className="mt-1 text-xs text-white/60">{activeFeature.subtitle}</div>
                      <div className="mt-3 flex items-center gap-2">
                        {features.map((_, i) => (
                          <ProgressPip key={i} active={i === active} />
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-white/55">
                        Click a feature below — or use <Kbd>↑</Kbd>/<Kbd>↓</Kbd>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end preview */}
            </div>
          </div>
        </Container>
      </section>

      {/* Feature gallery */}
      <section id="features" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-semibold tracking-widest text-sky-300/80">
              FEATURE GALLERY
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Browse like a command palette.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-slate-300">
              Fast overview on the left, rich detail on the right. Add a new feature object and it appears automatically.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* Rail */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="text-sm font-semibold text-white">Features</div>
                <div className="hidden text-[11px] text-white/55 sm:block">
                  Navigate: <Kbd>↑</Kbd> <Kbd>↓</Kbd>
                </div>
              </div>

              <div
                ref={listRef}
                className="max-h-[520px] overflow-auto p-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,.18)_transparent]"
              >
                {features.map((f, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={f.id}
                      data-i={i}
                      onClick={() => setActive(i)}
                      className={cn(
                        "group w-full text-left rounded-2xl p-4 transition",
                        selected
                          ? "border border-sky-300/25 bg-sky-300/10"
                          : "border border-transparent hover:border-white/10 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className={cn("text-sm font-semibold", selected ? "text-white" : "text-white/80")}>
                              {f.title}
                            </div>
                            {f.badge ? <Badge>{f.badge}</Badge> : null}
                          </div>
                          {f.subtitle ? (
                            <div className={cn("mt-1 text-xs", selected ? "text-white/70" : "text-white/50")}>
                              {f.subtitle}
                            </div>
                          ) : null}
                        </div>

                        <span
                          className={cn(
                            "mt-1 inline-flex h-6 w-6 items-center justify-center rounded-lg border text-xs transition",
                            selected
                              ? "border-sky-300/30 bg-sky-300/10 text-sky-200"
                              : "border-white/10 bg-white/5 text-white/50 group-hover:text-white/70"
                          )}
                          aria-hidden
                        >
                          ↵
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={cn(
                            "h-1.5 flex-1 rounded-full transition",
                            selected ? "bg-sky-300/40" : "bg-white/10 group-hover:bg-white/15"
                          )}
                        />
                        <span className="text-[11px] text-white/40">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-sky-500/15 to-transparent blur-2xl" />

              <div className="sticky top-[88px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{activeFeature.title}</h3>
                  {activeFeature.badge ? <Badge>{activeFeature.badge}</Badge> : null}
                </div>
                {activeFeature.subtitle ? (
                  <p className="mt-2 text-sm font-medium text-slate-300">{activeFeature.subtitle}</p>
                ) : null}

                <div className="mt-5 space-y-3 text-slate-200/90">
                  {activeFeature.description.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {activeFeature.bullets?.length ? (
                  <ul className="mt-5 space-y-2 text-sm text-slate-300">
                    {activeFeature.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/80" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                  <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold text-white/70">
                    Preview
                  </div>

                  <div className="p-3">
                    <div
                      key={activeFeature.id}
                      className="transition [transition-property:opacity,transform] duration-300 ease-out"
                    >
                      {activeFeature.mediaUrl ? (
                        <img
                          src={activeFeature.mediaUrl}
                          alt={activeFeature.mediaAlt ?? activeFeature.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full rounded-xl border border-white/10 bg-black/20 shadow-2xl"
                        />
                      ) : (
                        <div className="aspect-video w-full rounded-xl border border-white/10 bg-black/20" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
                  <div>
                    Tip: use <Kbd>↑</Kbd>/<Kbd>↓</Kbd> to browse.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActive((v) => Math.max(v - 1, 0))}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-semibold text-white/70 hover:bg-white/10 disabled:opacity-40"
                      disabled={active === 0}
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setActive((v) => Math.min(v + 1, features.length - 1))}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-semibold text-white/70 hover:bg-white/10 disabled:opacity-40"
                      disabled={active === features.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* end detail */}
          </div>
        </Container>
      </section>

      {/* Preferences (different look from v1) */}
      <section id="prefs" className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
              <div className="text-xs font-semibold tracking-widest text-sky-300/80">MODULAR</div>
              <h3 className="mt-2 text-2xl font-semibold text-white">Don’t need all the features?</h3>
              <p className="mt-3 leading-relaxed text-slate-300">
                Toggle modules in the add-on preferences. Disabled modules remove their UI, keeping Blender clean.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">Change preferences:</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
                  <li>Edit → Preferences → Add-ons</li>
                  <li>Find “Essentials”</li>
                  <li>Expand preferences and toggle modules</li>
                </ol>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>No UI spam</Badge>
                <Badge>Fast workflow</Badge>
                <Badge>Pick what you use</Badge>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent blur-2xl" />
              <img
                src="https://assets.superhivemarket.com/cache/c9b64c43ae7bae4181b85213132c5048.png"
                alt="Addon preferences screenshot"
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-white/10 bg-black/20 shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-semibold tracking-widest text-sky-300/80">FAQ</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Quick answers.
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {[
              {
                q: "Can I disable features I don’t need?",
                a: "Yes—toggle modules in the add-on preferences. Disabled modules disappear from the UI.",
              },
              {
                q: "Will this clutter my UI?",
                a: "No—everything is designed to stay out of the way. Disable anything you don’t use.",
              },
              {
                q: "How do I add new features to this page layout?",
                a: "Add a new object to the features array. The rail + detail panel update automatically.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
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
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <div className="text-sm font-semibold text-white">More features coming.</div>
              <div className="text-xs text-slate-400">
                This layout stays clean as the list grows—rail + detail keeps it readable.
              </div>
            </div>
            <a
              href={product.primaryCta.href}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:opacity-90"
            >
              {product.primaryCta.label}
            </a>
          </div>
        </Container>
      </footer>
    </main>
  );
}
