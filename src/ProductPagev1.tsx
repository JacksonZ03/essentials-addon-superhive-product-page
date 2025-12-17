import React from "react";

type Feature = {
    title: string;
    subtitle?: string;
    description: string[];
    bullets?: string[];
    mediaUrl?: string;
    mediaAlt?: string;
    badge?: string; // e.g. "New in v2.0.0"
};

const product = {
    name: "Essentials",
    headline: "Essential features missing in vanilla Blender.",
    subhead:
        "A lightweight add-on that removes friction from everyday Blender work—snapping, navigation, viewport control, and more.",
    primaryCta: { label: "Documentation", href: "https://superhivemarket.com/products/essentials/docs" },
};

const features: Feature[] = [
    // {
    //     title: "VSCode Keymaps For Text Editor",
    //     badge: "New in v2.0",
    //     description: [
    //         "If you use VSCode, you’re used to certain keyboard shortcuts for text editing.",
    //         "This new update adds those shortcuts right inside Blender.",
    //         "No need to switch to an external IDE anymore!",
    //     ],
    //     bullets: [
    //         "Move line up/down: Alt + Up/Down",
    //         "Duplicate line up/down: Shift + Alt + Up/Down Arrow",
    //         "Full support for multi-line moving/duplication",
    //     ],
    //     mediaUrl: "",
    // },
    {
        title: "Snap Objects to Any Surface - Gravity Snap",
        description: [
            "Perfectly snap any mesh or empty object to the surface of another mesh—just as if you dropped it.",
            "Essential for blocking out scenes, placing assets, or set dressing.",
            "Save seconds per object. Save hours per project.",
        ],
        bullets: [
            "Respects object size, shape, and orientation",
            "Origin point moves with the object",
            "Offset control to embed above/below the target surface",
        ],
        mediaUrl: "https://assets.superhivemarket.com/cache/d478f9c789cc377df94f4fcf4d5b5bb8.gif",
    },
    {
        title: "Auto-Highlight Selection",
        description: [
            "The Outliner can expand collections to reveal a selected object—but it takes extra clicks each time.",
            "This feature automates away those annoying clicks, focusing the outliner immediately on any object you select.",
        ],
        mediaUrl: "https://assets.superhivemarket.com/cache/3a92110a27a26674d7ee90aba3b88590.gif",
    },
    {
        title: "Center Camera Perspective with ALT + Numpad 0",
        subtitle: "One click to reset the camera view",
        description: ["Quickly center the camera perspective view with a single click."],
        bullets: [
            "Vanilla Blender doesn’t provide this directly",
            "Pressing Home is the closest thing in vanilla Blender, but that just zooms camera to fullscreen",
        ],
        mediaUrl: "https://assets.superhivemarket.com/cache/3ccf57261b0b276667108d379856d299.gif",
    },
    {
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
        mediaUrl: "https://assets.superhivemarket.com/cache/5466c6f5d99df601cbfc26c0352dafde.gif",
    },
    {
        title: "Viewport/Render Visibility Sync",
        description: [
            "Sync viewport and render visibility with a single click.",
            "Huge time-saver in large scenes where manual visibility management adds up fast.",
        ],
        mediaUrl: "https://assets.superhivemarket.com/cache/ff4a5136503a3da158369b9871597d26.gif",
    },
];

// const faqs = [
//     {
//         q: "Can I disable features I don’t need?",
//         a: "Yes—toggle features in the add-on preferences. Disabled features remove their UI buttons/toggles.",
//     },
//     {
//         q: "Will this clutter my UI?",
//         a: "No—everything is designed to stay out of the way. Disable anything you don’t use.",
//     },
//     {
//         q: "Does it work in all workspaces?",
//         a: "Where relevant (like playback), it works across animation workspaces (timeline, graph editor, etc.).",
//     },
// ];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-lg font-medium text-white/80">
            {children}
        </span>
    );
}

function Container({ children }: { children: React.ReactNode }) {
    return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
                <div className="mb-3 text-xs font-semibold tracking-widest text-sky-300/80">{eyebrow}</div>
            ) : null}
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
            {subtitle ? <p className="mt-4 text-pretty text-base leading-relaxed text-slate-300">{subtitle}</p> : null}
        </div>
    );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
    const reverse = index % 2 === 1;

    return (
        <div
            className={cn(
                "grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8 lg:grid-cols-2",
                reverse && "lg:[&>*:first-child]:order-2"
            )}
        >
            <div>
                <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">{feature.title}</h3>
                    {feature.badge ? <Badge>{feature.badge}</Badge> : null}
                </div>

                {feature.subtitle ? (
                    <p className="mt-2 text-sm font-medium text-slate-300">{feature.subtitle}</p>
                ) : null}

                <div className="mt-4 space-y-3 text-slate-200/90">
                    {feature.description.map((p, i) => (
                        <p key={i} className="leading-relaxed">
                            {p}
                        </p>
                    ))}
                </div>

                {feature.bullets?.length ? (
                    <ul className="mt-5 space-y-2 text-sm text-slate-300">
                        {feature.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/80" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>

            <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent blur-2xl" />
                {feature.mediaUrl ? (
                    <img
                        src={feature.mediaUrl}
                        alt={feature.mediaAlt ?? feature.title}
                        loading="lazy"
                        className="w-full rounded-2xl border border-white/10 bg-black/20 shadow-2xl"
                    />
                ) : (
                    <div className="aspect-video w-full rounded-2xl border border-white/10 bg-black/20" />
                )}
            </div>
        </div>
    );
}

export default function ProductPage() {
    return (
        <main
            className={cn(
                "min-h-screen text-slate-100",
                "bg-[radial-gradient(1000px_600px_at_50%_-20%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(900px_500px_at_0%_0%,rgba(99,102,241,0.18),transparent_55%),linear-gradient(to_bottom,#070a12,#020617)]"
            )}
        >
            {/* Top bar */}
            {/* <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/40 backdrop-blur">
                <Container>
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
                                <span className="text-sm font-semibold">E</span>
                            </div>
                            <div className="leading-tight">
                                <div className="text-sm font-semibold text-white">{product.name}</div>
                                <div className="text-xs text-slate-400">Blender add-on</div>
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
            </header> */}

            {/* Hero */}
            <section className="pt-16 sm:pt-20">
                <Container>
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-12">
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

                        <div className="relative max-w-2xl">
                            {/* <div className="mb-4 flex flex-wrap items-center gap-2">
                                <Badge>NEW UPDATE - VERSION 2.0</Badge>
                            </div> */}

                            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                {product.headline}
                            </h1>
                            <p className="mt-5 text-pretty text-lg leading-relaxed text-slate-300">{product.subhead}</p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href={product.primaryCta.href}
                                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow hover:opacity-90"
                                >
                                    {product.primaryCta.label}
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features */}
            <section id="features" className="py-16 sm:py-20">
                <Container>
                    <SectionTitle
                        eyebrow="WHAT YOU GET"
                        title="Fast wins, every time."
                        subtitle="Each feature is selectively designed to remove repetitive clicks and speed up your workflow, especially in larger scenes."
                    />

                    <div className="mt-10 space-y-6">
                        {features.map((f, i) => (
                            <FeatureRow key={f.title} feature={f} index={i} />
                        ))}
                    </div>
                </Container>
            </section>

            {/* Preferences callout */}
            <section id="prefs" className="pb-16 sm:pb-20">
                <Container>
                    <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <h3 className="text-2xl font-semibold text-white">Don’t need all the features?</h3>
                            <p className="mt-3 leading-relaxed text-slate-300">
                                Enable/disable tools in the add-on preferences. Disabled tools disappear from the UI,
                                keeping Blender clean.
                            </p>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                                <p className="text-sm font-semibold text-white">Change preferences:</p>
                                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
                                    <li>Edit → Preferences → Add-ons</li>
                                    <li>Find “Essentials”</li>
                                    <li>Expand preferences and toggle modules</li>
                                </ol>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-sky-500/15 to-transparent blur-2xl" />
                            <img
                                src="https://assets.superhivemarket.com/cache/c9b64c43ae7bae4181b85213132c5048.png"
                                alt="Addon preferences screenshot"
                                loading="lazy"
                                className="w-full rounded-2xl border border-white/10 bg-black/20 shadow-2xl"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ */}
            {/* <section id="faq" className="pb-20">
                <Container>
                    <SectionTitle eyebrow="FAQ" title="Quick answers" />

                    <div className="mx-auto mt-10 max-w-3xl space-y-4">
                        {faqs.map((item) => (
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
            </section> */}

            {/* Footer */}
            <footer className="border-t border-white/10 py-10">
                <Container>
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <div>
                            <div className="text-sm font-semibold text-white">More features coming soon!</div>
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
