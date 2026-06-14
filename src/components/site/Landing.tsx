import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowUpRight, Boxes, Warehouse, ScanBarcode, Calculator,
  Users, Briefcase, Truck, Settings2, Sparkles, ChevronRight, Plus,
  TrendingUp, Activity, Package, CreditCard, BarChart3, Building2,
  Layers, Zap, Shield, Globe2, Check, Quote
} from "lucide-react";
import LiquidEther from "./LiquidEther";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = text.split(" ");
  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1, delay: delay + i * 0.06, ease }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${light ? "text-white/60" : "text-[var(--muted-foreground)]"}`}>
      <span className={`h-1 w-1 rounded-full ${light ? "bg-primary" : "bg-primary"}`} />
      {children}
    </div>
  );
}

function MagneticButton({ children, href = "#", variant = "primary", className = "" }: { children: ReactNode; href?: string; variant?: "primary" | "ghost" | "dark"; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const base = "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors will-change-transform";
  const styles = {
    primary: "bg-[var(--ink)] text-white hover:bg-[var(--ink)]/90",
    dark: "bg-primary text-white hover:bg-primary/90",
    ghost: "ring-hairline text-[var(--ink)] hover:bg-[var(--surface)]",
  }[variant];
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const e = 1 - Math.pow(1 - p, 3);
      setV(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const isFloat = to % 1 !== 0;
  return <span ref={ref}>{isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString()}{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "bg-white/75 backdrop-blur-xl ring-hairline shadow-elevated" : "bg-transparent"}`}>
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--ink)] text-white text-[13px] font-bold tracking-tight">G</span>
          <span className="font-display text-[17px] font-semibold tracking-tight">Goods</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Platform", "Services", "Projects", "Process", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] text-[var(--muted-foreground)] transition-colors hover:text-[var(--ink)]">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden text-[13px] text-[var(--muted-foreground)] hover:text-[var(--ink)] sm:block">Sign in</a>
          <a href="#cta" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 text-[13px] font-medium text-white transition-transform hover:scale-[1.02]">
            Book a demo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [4, -4]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 60, damping: 18 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      className="relative mx-auto w-full max-w-6xl"
    >
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-12 -bottom-12 -top-8 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(124,92,191,0.18),transparent_70%)] blur-2xl" />

      {/* Dashboard frame */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease }}
        className="relative rounded-2xl bg-white ring-hairline shadow-elevated overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between hairline-b px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EAEAEA]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#EAEAEA]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#EAEAEA]" />
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1 text-[11px] text-[var(--muted-foreground)]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> goods.app / dashboard
          </div>
          <div className="text-[11px] text-[var(--muted-foreground)]">Q4 · 2026</div>
        </div>

        <div className="grid grid-cols-12 gap-4 p-4 md:p-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
            {[
              { i: BarChart3, l: "Overview", a: true },
              { i: Boxes, l: "Inventory" },
              { i: Warehouse, l: "Warehouse" },
              { i: ScanBarcode, l: "POS" },
              { i: Calculator, l: "Accounting" },
              { i: Users, l: "CRM" },
              { i: Briefcase, l: "HR" },
            ].map(({ i: Icon, l, a }) => (
              <div key={l} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] ${a ? "bg-[var(--ink)] text-white" : "text-[var(--muted-foreground)]"}`}>
                <Icon className="h-3.5 w-3.5" /> {l}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="col-span-12 md:col-span-9 grid grid-cols-6 gap-4">
            {/* KPI cards */}
            {[
              { l: "Revenue", v: "$2.84M", d: "+12.4%", icon: TrendingUp },
              { l: "Orders", v: "18,402", d: "+5.1%", icon: Package },
              { l: "Stock turn", v: "6.2x", d: "+0.4", icon: Activity },
            ].map(({ l, v, d, icon: Icon }) => (
              <div key={l} className="col-span-2 rounded-xl ring-hairline p-4">
                <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">{l}<Icon className="h-3.5 w-3.5" /></div>
                <div className="mt-2 font-display text-2xl font-semibold tracking-tight">{v}</div>
                <div className="mt-1 text-[11px] text-primary">{d}</div>
              </div>
            ))}

            {/* Chart */}
            <div className="col-span-6 md:col-span-4 rounded-xl ring-hairline p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[12px] font-medium">Sales velocity</div>
                <div className="flex gap-1 text-[10px] text-[var(--muted-foreground)]">
                  {["1D","1W","1M","1Y"].map((t,i) => <span key={t} className={`rounded px-1.5 py-0.5 ${i===2 ? "bg-[var(--surface)] text-[var(--ink)]" : ""}`}>{t}</span>)}
                </div>
              </div>
              <svg viewBox="0 0 400 140" className="h-32 w-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7C5CBF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7C5CBF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,100 C40,80 70,90 100,70 C140,45 180,85 220,60 C260,35 300,55 340,30 L400,18 L400,140 L0,140 Z" fill="url(#g1)" />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, delay: 1, ease }}
                  d="M0,100 C40,80 70,90 100,70 C140,45 180,85 220,60 C260,35 300,55 340,30 L400,18"
                  fill="none" stroke="#7C5CBF" strokeWidth="2"
                />
                {[100, 70, 60, 30, 18].map((y, i) => (
                  <circle key={i} cx={i * 100} cy={y} r="2.5" fill="#7C5CBF" />
                ))}
              </svg>
            </div>

            {/* Side widgets */}
            <div className="col-span-6 md:col-span-2 space-y-4">
              <div className="rounded-xl ring-hairline p-4">
                <div className="text-[11px] text-[var(--muted-foreground)]">Warehouse occupancy</div>
                <div className="mt-2 flex items-end gap-3">
                  <div className="font-display text-xl font-semibold">78%</div>
                  <div className="text-[10px] text-[var(--muted-foreground)]">3 zones near full</div>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-[var(--surface)]">
                  <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.5, delay: 1.4, ease }} className="h-full rounded-full bg-primary" />
                </div>
              </div>
              <div className="rounded-xl ring-hairline p-4">
                <div className="text-[11px] text-[var(--muted-foreground)]">Open invoices</div>
                <div className="mt-2 font-display text-xl font-semibold">142</div>
                <div className="mt-3 flex gap-1">
                  {[3,5,2,7,4,6,8].map((h,i) => (
                    <motion.span key={i} initial={{ height: 0 }} animate={{ height: h*4 }} transition={{ duration: 0.7, delay: 1.5 + i*0.06, ease }} className="w-2 rounded-sm bg-[var(--ink)]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Activity row */}
            <div className="col-span-6 rounded-xl ring-hairline">
              <div className="flex items-center justify-between hairline-b px-4 py-3 text-[12px]">
                <span className="font-medium">Recent activity</span>
                <span className="text-[var(--muted-foreground)]">View all</span>
              </div>
              <ul>
                {[
                  ["PO-3920 received", "Warehouse · Dock 4", "Just now"],
                  ["Invoice #4421 paid", "Accounting · Stripe", "2m ago"],
                  ["12 SKUs low stock", "Inventory · Zone B", "5m ago"],
                ].map(([a,b,c], i) => (
                  <li key={i} className="flex items-center justify-between px-4 py-2.5 text-[12px] hairline-b last:border-b-0">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {a}</span>
                    <span className="text-[var(--muted-foreground)]">{b}</span>
                    <span className="text-[var(--muted-foreground)]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating panels */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease }}
        className="absolute -left-6 top-16 hidden w-56 rounded-xl bg-white p-4 ring-hairline shadow-float animate-float md:block"
      >
        <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">Inventory <Boxes className="h-3.5 w-3.5" /></div>
        <div className="mt-2 font-display text-2xl font-semibold">24,108</div>
        <div className="mt-1 text-[11px] text-primary">SKUs synced live</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease }}
        style={{ animationDelay: "1.2s" }}
        className="absolute -right-6 top-24 hidden w-60 rounded-xl bg-[var(--ink)] p-4 text-white shadow-float animate-float md:block"
      >
        <div className="flex items-center justify-between text-[11px] text-white/60">Today's revenue <CreditCard className="h-3.5 w-3.5" /></div>
        <div className="mt-2 font-display text-2xl font-semibold">$48,920</div>
        <div className="mt-3 flex h-8 items-end gap-1">
          {[4,7,5,9,6,8,10,7,9,12,8,11].map((h,i) => (
            <span key={i} style={{ height: `${h*6}%` }} className="w-1.5 flex-1 rounded-sm bg-primary" />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease }}
        className="absolute -bottom-8 left-1/2 hidden w-72 -translate-x-1/2 rounded-xl bg-white p-4 ring-hairline shadow-float md:block"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[var(--muted-foreground)]">Order #OG-29104</div>
            <div className="mt-0.5 font-display text-sm font-semibold">Shipped from DXB-01</div>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">On route</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px]">
          <Truck className="h-3.5 w-3.5 text-primary" />
          <div className="relative h-1 flex-1 rounded-full bg-[var(--surface)]">
            <motion.div initial={{ width: 0 }} animate={{ width: "64%" }} transition={{ duration: 2, delay: 2, ease }} className="absolute inset-y-0 left-0 rounded-full bg-primary" />
          </div>
          <span className="text-[var(--muted-foreground)]">ETA 14m</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]">
        <LiquidEther
          colors={["#7C5CBF", "#B497CF", "#FF9FFC"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          resolution={0.5}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: "100%", height: "100%", opacity: 0.55 }}
        />
      </div>
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-6">
        <Reveal delay={0.05}>
          <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 ring-hairline backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Goods · Enterprise OS · v6</span>
          </div>
        </Reveal>

        <SplitText
          text="Build the operating system"
          className="text-center font-display text-[clamp(2.6rem,8.5vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.05em]"
        />
        <SplitText
          text="for your business."
          delay={0.25}
          className="text-center font-display text-[clamp(2.6rem,8.5vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[var(--muted-foreground)]"
        />

        <Reveal delay={0.7}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-[var(--muted-foreground)] md:text-base">
            Goods engineers premium ERP, inventory, warehouse, POS, accounting, CRM and HR platforms — built to scale with the world's most ambitious operators.
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton variant="primary" href="#cta">
              Book a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton variant="ghost" href="#platform">
              Explore platform
            </MagneticButton>
          </div>
        </Reveal>
      </motion.div>

      <div className="mx-auto mt-20 max-w-7xl px-6">
        <HeroDashboard />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust + Metrics                                                     */
/* ------------------------------------------------------------------ */

function Trust() {
  const logos = ["Northwind", "Aurora", "Lumen", "Halcyon", "Vertex", "Kintsugi", "Monolith", "Atlas Co.", "Orbital", "Substrate"];
  return (
    <section className="hairline-t hairline-b bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid grid-cols-1 items-center gap-6 md:grid-cols-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Trusted by operators<br />in 38 countries</div>
          <div className="md:col-span-3 grid grid-cols-3 gap-6 md:grid-cols-3">
            {[
              { n: 1000, s: "+", l: "Businesses powered" },
              { n: 50, s: "M+", l: "Transactions / month" },
              { n: 99.9, s: "%", l: "System reliability" },
            ].map((m) => (
              <div key={m.l}>
                <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  <Counter to={m.n} suffix={m.s} />
                </div>
                <div className="mt-1 text-[12px] text-[var(--muted-foreground)]">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--surface)] to-transparent" />
          <div className="flex w-max gap-12 animate-marquee">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="font-display text-2xl font-semibold tracking-tight text-[var(--muted-foreground)]/70 hover:text-[var(--ink)] transition">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow>Who we are</Eyebrow>
        <div className="mt-10 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              Software<br /><span className="text-[var(--muted-foreground)]">engineered for</span><br />operators.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              Goods is a software studio building the connective tissue of modern enterprises. We design and ship ERP, warehouse, accounting and commerce systems that quietly run global operations — refined, reliable, and built to last a decade.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              Our products power retailers, manufacturers, distributors and service companies — from boutique studios to publicly listed groups.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["ERP", "Automation", "Warehouses", "Inventory", "Accounting", "POS", "Logistics"].map(t => (
                <span key={t} className="group inline-flex cursor-default items-center gap-1.5 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] ring-hairline transition hover:bg-[var(--ink)] hover:text-white">
                  <span className="h-1 w-1 rounded-full bg-primary transition group-hover:bg-white" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

const services = [
  { i: Layers, t: "ERP Systems", d: "Unified financial, supply and ops backbone tailored to your industry." },
  { i: Boxes, t: "Inventory Management", d: "Real-time stock, multi-location, batch & serial — accurate to the SKU." },
  { i: Warehouse, t: "Warehouse Management", d: "Pick, pack, putaway and wave planning for high-velocity fulfillment." },
  { i: ScanBarcode, t: "Point of Sale", d: "Offline-first retail POS with omnichannel inventory sync." },
  { i: Calculator, t: "Accounting Systems", d: "Multi-entity ledgers, tax engines, statutory compliance built in." },
  { i: Users, t: "CRM", d: "Pipeline, service and account intelligence connected to live operations." },
  { i: Briefcase, t: "Human Resources", d: "Hire-to-retire, payroll, time and attendance for distributed teams." },
  { i: Settings2, t: "Custom Development", d: "Bespoke modules and integrations engineered alongside your team." },
];

function Services() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="services" className="bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow light>What we build</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.04em]">
              Eight disciplines.<br /><span className="text-white/50">One operating system.</span>
            </h2>
          </div>
          <p className="max-w-md text-[14px] text-white/60">Every module is engineered to stand alone and compose seamlessly — so you adopt only what you need, when you need it.</p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <button
                key={s.t}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-6 py-6 text-left transition hover:px-2"
              >
                <span className="w-12 text-[12px] tabular-nums text-white/40">0{i + 1}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 transition group-hover:bg-primary group-hover:ring-primary">
                  <s.i className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-semibold tracking-tight md:text-3xl">{s.t}</span>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="mt-3 block max-w-2xl text-[14px] leading-relaxed text-white/60 overflow-hidden"
                      >
                        {s.d}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease }} className="shrink-0">
                  <Plus className="h-5 w-5 text-white/60 group-hover:text-primary" />
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Platform showcase                                                   */
/* ------------------------------------------------------------------ */

const platformTabs = [
  { k: "inventory", l: "Inventory", icon: Boxes },
  { k: "accounting", l: "Accounting", icon: Calculator },
  { k: "crm", l: "CRM", icon: Users },
  { k: "hr", l: "HR", icon: Briefcase },
  { k: "warehouse", l: "Warehouse", icon: Warehouse },
  { k: "pos", l: "POS", icon: ScanBarcode },
  { k: "reports", l: "Reports", icon: BarChart3 },
];

function PlatformContent({ k }: { k: string }) {
  const palette = {
    inventory: { kpi: [["SKUs", "24,108"], ["Low stock", "32"], ["Turnover", "6.2x"]], title: "Inventory · live across 14 locations" },
    accounting: { kpi: [["Revenue MTD", "$1.92M"], ["Receivables", "$214K"], ["Margin", "38.4%"]], title: "Accounting · multi-entity ledgers" },
    crm: { kpi: [["Pipeline", "$4.7M"], ["Deals", "182"], ["Win rate", "31%"]], title: "CRM · operations-aware" },
    hr: { kpi: [["Headcount", "248"], ["Open roles", "12"], ["Retention", "94%"]], title: "HR · hire to retire" },
    warehouse: { kpi: [["Picks / hr", "412"], ["Accuracy", "99.8%"], ["Dock util.", "78%"]], title: "Warehouse · pick, pack, ship" },
    pos: { kpi: [["Today", "$48,920"], ["Tickets", "1,204"], ["Avg basket", "$40.6"]], title: "POS · offline-first retail" },
    reports: { kpi: [["Dashboards", "94"], ["Sources", "21"], ["Refresh", "60s"]], title: "Reports · realtime intelligence" },
  }[k] ?? { kpi: [], title: "" };

  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="grid grid-cols-6 gap-4 p-6"
    >
      <div className="col-span-6 md:col-span-2 space-y-3">
        <div className="text-[12px] font-medium text-[var(--muted-foreground)]">{palette.title}</div>
        {palette.kpi.map(([l, v]) => (
          <div key={l} className="rounded-xl ring-hairline p-4">
            <div className="text-[11px] text-[var(--muted-foreground)]">{l}</div>
            <div className="mt-1 font-display text-2xl font-semibold tracking-tight">{v}</div>
          </div>
        ))}
      </div>
      <div className="col-span-6 md:col-span-4 rounded-xl ring-hairline p-5">
        <div className="mb-3 flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
          <span>Trend · last 30 days</span><span>Updated 6s ago</span>
        </div>
        <svg viewBox="0 0 500 180" className="h-44 w-full">
          <defs>
            <linearGradient id="pg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7C5CBF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7C5CBF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={i} x1="0" x2="500" y1={(i + 1) * 36} y2={(i + 1) * 36} stroke="#EAEAEA" strokeDasharray="2 4" />
          ))}
          <motion.path
            key={k + "fill"}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            d="M0,130 C50,120 90,90 140,100 C190,110 220,60 270,75 C320,90 360,40 410,55 C450,65 480,30 500,40 L500,180 L0,180 Z"
            fill="url(#pg)"
          />
          <motion.path
            key={k + "line"}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease }}
            d="M0,130 C50,120 90,90 140,100 C190,110 220,60 270,75 C320,90 360,40 410,55 C450,65 480,30 500,40"
            fill="none" stroke="#7C5CBF" strokeWidth="2"
          />
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
          {["North", "EMEA", "APAC"].map((r, i) => (
            <div key={r} className="rounded-lg bg-[var(--surface)] p-3">
              <div className="text-[var(--muted-foreground)]">{r}</div>
              <div className="mt-1 font-display text-base font-semibold">{["$684K","$512K","$724K"][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Platform() {
  const [tab, setTab] = useState("inventory");
  return (
    <section id="platform" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow>Goods ERP · Platform</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              One platform.<br /><span className="text-[var(--muted-foreground)]">Every workflow.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:pt-6">
            <p className="text-[15px] leading-relaxed text-[var(--muted-foreground)]">A single source of truth for inventory, finance, sales, people and operations — engineered to feel like one product, not seven.</p>
          </div>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-white ring-hairline shadow-elevated">
            <div className="flex flex-wrap items-center gap-1 hairline-b p-2">
              {platformTabs.map(t => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] transition ${tab === t.k ? "text-white" : "text-[var(--muted-foreground)] hover:text-[var(--ink)]"}`}
                >
                  {tab === t.k && <motion.span layoutId="ptab" transition={{ duration: 0.5, ease }} className="absolute inset-0 -z-0 rounded-full bg-[var(--ink)]" />}
                  <span className="relative z-10 flex items-center gap-2"><t.icon className="h-3.5 w-3.5" /> {t.l}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait"><PlatformContent k={tab} /></AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why                                                                 */
/* ------------------------------------------------------------------ */

function Why() {
  const stats = [
    { n: 95, s: "%", l: "Operational efficiency" },
    { n: 80, s: "%", l: "Faster inventory control" },
    { n: 70, s: "%", l: "Reduced manual work" },
    { n: 60, s: "%", l: "Higher team productivity" },
  ];
  return (
    <section className="bg-[var(--surface)] hairline-t hairline-b">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>Why Goods ERP</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            The compounding<br /><span className="text-primary">return of clarity.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="bg-[var(--background)] p-8 md:p-10">
              <div className="font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.04em]">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-6 text-[13px] text-[var(--muted-foreground)]">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects (horizontal scroll)                                        */
/* ------------------------------------------------------------------ */

const projects = [
  { t: "Retail ERP", c: "Northwind Group", tag: "Multi-store", color: "#7C5CBF" },
  { t: "Manufacturing ERP", c: "Aurora Industries", tag: "Production", color: "#1a1a1a" },
  { t: "Warehouse Management", c: "Halcyon Logistics", tag: "Fulfillment", color: "#7C5CBF" },
  { t: "Distribution System", c: "Vertex Wholesale", tag: "Supply chain", color: "#1a1a1a" },
  { t: "Accounting Platform", c: "Monolith Holdings", tag: "Multi-entity", color: "#7C5CBF" },
];

function Projects() {
  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              Featured projects.
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-1.5 text-[13px] font-medium">
            View all case studies <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      <div className="overflow-x-auto pb-8 [scrollbar-width:thin] snap-x snap-mandatory">
        <div className="flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          {projects.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06} className="snap-start">
              <a href="#" className="group block w-[88vw] max-w-[520px] shrink-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-hairline">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" style={{ background: `linear-gradient(135deg, ${p.color} 0%, #000 100%)` }} />
                  {/* Mock UI inside card */}
                  <div className="absolute inset-6 rounded-xl bg-white/95 p-4 shadow-elevated transition-transform duration-[1.2s] ease-out group-hover:scale-[0.98]">
                    <div className="flex items-center justify-between text-[10px] text-[var(--muted-foreground)]">
                      <span>{p.c}</span><span>{p.tag}</span>
                    </div>
                    <div className="mt-4 font-display text-[28px] font-bold leading-[0.95] tracking-tight">{p.t}</div>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[1,2,3].map(n => (
                        <div key={n} className="rounded-lg bg-[var(--surface)] p-3">
                          <div className="text-[9px] text-[var(--muted-foreground)]">Metric 0{n}</div>
                          <div className="mt-1 font-display text-base font-semibold">{["$2.1M","99.4%","6.2x"][n-1]}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-20 rounded-lg bg-[var(--surface)] p-3">
                      <svg viewBox="0 0 200 60" className="h-full w-full">
                        <path d="M0,40 C30,30 50,45 80,30 C110,15 140,35 170,20 L200,12" fill="none" stroke={p.color} strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold tracking-tight">{p.t}</div>
                    <div className="text-[12px] text-[var(--muted-foreground)]">{p.c} · {p.tag}</div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[var(--muted-foreground)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" />
                </div>
              </a>
            </Reveal>
          ))}
          <div className="w-6 shrink-0" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tech                                                                */
/* ------------------------------------------------------------------ */

const tech = ["Laravel","PHP","Node.js","React","Next.js","Flutter","MySQL","PostgreSQL","Redis","Docker","AWS","TypeScript"];

function Tech() {
  return (
    <section className="bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="mb-14 max-w-3xl">
          <Eyebrow light>Engineering stack</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Built on a foundation<br /><span className="text-white/50">we trust for a decade.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {tech.map((t, i) => (
            <Reveal key={t} delay={i * 0.04} className="group relative bg-[var(--ink)] p-8 transition hover:bg-white/[0.04]">
              <div className="text-[11px] text-white/40">0{(i+1).toString().padStart(2,"0")}</div>
              <div className="mt-3 font-display text-2xl font-semibold tracking-tight transition group-hover:text-primary">{t}</div>
              <div className="absolute right-6 top-6 opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

const steps = [
  { n: "01", t: "Discovery", d: "We embed with your team to map operations, constraints and the unsolved problems worth solving." },
  { n: "02", t: "Strategy", d: "We define modules, data model and the rollout path — sequenced for fast, measurable wins." },
  { n: "03", t: "Design", d: "Interfaces designed around how your people actually work — calm, fast, and easy to learn." },
  { n: "04", t: "Development", d: "Engineered in agile cycles with weekly demos and full transparency on quality and progress." },
  { n: "05", t: "Deployment", d: "Migration, training and a long-term partnership — we stay with you as the business evolves." },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            A process, not<br />a pitch deck.
          </h2>
        </div>
        <div ref={ref} className="relative">
          <div className="absolute left-4 top-2 hidden h-full w-px bg-[var(--hairline)] md:block">
            <motion.div style={{ height: h }} className="w-full bg-primary origin-top" />
          </div>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} className="relative mb-10 grid grid-cols-12 gap-6 md:pl-16">
              <div className="absolute left-0 top-2 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--background)] ring-hairline md:flex">
                <span className="text-[10px] font-medium tabular-nums">{s.n}</span>
              </div>
          <div className="col-span-12 md:col-span-5">
                <div className="text-[12px] tabular-nums text-primary md:hidden">{s.n}</div>
                <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{s.t}</h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-[15px] leading-relaxed text-[var(--muted-foreground)]">{s.d}</p>
              </div>
              <div className="col-span-12 hairline-b mt-6" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

const quotes = [
  { q: "Goods quietly replaced four legacy systems. Our finance close went from twelve days to three.", a: "Layla Othman", r: "CFO · Aurora Industries" },
  { q: "It's the most considered enterprise product I've used. Every screen feels designed for the person who actually does the job.", a: "Marcus Reilly", r: "COO · Halcyon Logistics" },
  { q: "We rolled it out across 38 stores in a quarter. The team adopted it without a single training session.", a: "Nadia Park", r: "Head of Retail · Vertex" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="bg-[var(--surface)] hairline-t hairline-b">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Eyebrow>Operators speak</Eyebrow>
        <div className="relative mt-10 min-h-[280px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease }}
            >
              <Quote className="h-8 w-8 text-primary" />
              <blockquote className="mt-6 font-display text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance">
                "{quotes[i].q}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-white text-[12px] font-semibold">
                  {quotes[i].a.split(" ").map(n => n[0]).join("")}
                </span>
                <span>
                  <span className="block text-[13px] font-medium">{quotes[i].a}</span>
                  <span className="block text-[12px] text-[var(--muted-foreground)]">{quotes[i].r}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex gap-1.5">
          {quotes.map((_, n) => (
            <button key={n} onClick={() => setI(n)} className={`h-1 rounded-full transition-all ${n === i ? "w-8 bg-[var(--ink)]" : "w-4 bg-[var(--hairline)]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */

function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[var(--ink)] text-white">
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -left-40 top-1/2 -z-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,191,0.25),transparent_60%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 top-0 -z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,92,191,0.15),transparent_60%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-32 text-center md:py-48">
        <Eyebrow light>Start the conversation</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          Ready to transform<br /><span className="text-white/50">your business?</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-[15px] text-white/60">A 30-minute call with our team. We'll show you the platform, mapped to your operations.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton variant="dark" href="#">
            Book a demo <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <a href="#" className="text-[13px] text-white/60 underline-offset-4 hover:text-white hover:underline">or email hello@goods.app</a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-white/40">
          {[
            [Shield, "SOC 2 · Type II"],
            [Globe2, "Deployed in 38 countries"],
            [Zap, "99.99% uptime SLA"],
            [Check, "Free 14-day pilot"],
          ].map(([I, l]) => {
            const Icon = I as typeof Shield;
            return (
              <span key={l as string} className="inline-flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-primary" /> {l as string}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-none tracking-[-0.06em]">Goods.</div>
            <p className="mt-6 max-w-md text-[14px] text-[var(--muted-foreground)]">The operating system for modern enterprises. Designed and engineered for the operators who build them.</p>
          </div>
          {[
            { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
            { t: "Products", l: ["ERP", "Inventory", "Warehouse", "POS", "Accounting"] },
            { t: "Resources", l: ["Documentation", "Customers", "Changelog", "Status"] },
            { t: "Connect", l: ["Twitter", "LinkedIn", "GitHub", "Dribbble"] },
          ].map(c => (
            <div key={c.t} className="col-span-6 md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{c.t}</div>
              <ul className="mt-5 space-y-3">
                {c.l.map(i => (
                  <li key={i}><a href="#" className="group inline-flex items-center gap-1 text-[14px] text-[var(--ink)] transition">
                    <span className="relative">{i}<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" /></span>
                  </a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-4 hairline-t pt-8 text-[12px] text-[var(--muted-foreground)] md:flex-row md:items-center">
          <div>© 2026 Goods Technologies, Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--ink)]">Privacy</a>
            <a href="#" className="hover:text-[var(--ink)]">Terms</a>
            <a href="#" className="hover:text-[var(--ink)]">Security</a>
            <a href="#" className="hover:text-[var(--ink)]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function GoodsLanding() {
  return (
    <div className="bg-[var(--background)] text-[var(--ink)]">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <About />
        <Services />
        <Platform />
        <Why />
        <Projects />
        <Tech />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
