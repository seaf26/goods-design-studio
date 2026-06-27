import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Warehouse,
  ScanBarcode,
  Calculator,
  Users,
  Truck,
  Settings2,
  Sparkles,
  ChevronRight,
  Plus,
  Package,
  BarChart3,
  Building2,
  Layers,
  Zap,
  Shield,
  Globe2,
  Check,
  Quote,
  Menu,
  X,
  Gem,
  Cpu,
  MessageCircle,
  Send,
  Handshake,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";
import { BlurText } from "./BlurText";
import { getHeroLiquidSettings, resolveHeroQuality, type HeroQuality } from "./heroPerformance";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1] as const;
const LiquidEther = lazy(() => import("./LiquidEther"));

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
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

export function SplitText({
  text,
  className = "",
  delay = 0,
  textBlur = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  textBlur?: boolean;
}) {
  return (
    <BlurText
      as="h1"
      text={text}
      delay={delay}
      duration={1.05}
      stagger={0.065}
      direction="bottom"
      className={className}
      data-text-blur={textBlur ? "true" : undefined}
    />
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${light ? "text-white/60" : "text-[var(--muted-foreground)]"}`}
    >
      <span className={`h-1 w-1 rounded-full ${light ? "bg-primary" : "bg-primary"}`} />
      {children}
    </div>
  );
}

function getScrollOffset() {
  const scrollPaddingTop = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = Number.parseFloat(scrollPaddingTop);
  return Number.isFinite(parsed) ? parsed : 92;
}

function getSectionScrollTop(section: HTMLElement) {
  return section.getBoundingClientRect().top + window.scrollY - getScrollOffset();
}

function scrollToSection(section: HTMLElement, behavior: ScrollBehavior = "smooth") {
  const top = Math.max(0, getSectionScrollTop(section));
  window.scrollTo({ top, behavior });
  return 0;
}

function handleSectionLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#") || href === "#") return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollToSection(target, prefersReducedMotion ? "auto" : "smooth");
  window.history.pushState(null, "", href);
}

function MagneticButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors will-change-transform";
  const styles = {
    primary: "bg-[var(--ink)] text-white hover:bg-[var(--ink)]/90",
    dark: "bg-[#333da7] text-white hover:bg-[#2d3594]",
    ghost: "ring-hairline text-[var(--ink)] hover:bg-[var(--surface)]",
  }[variant];
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onClick={(event) => handleSectionLinkClick(event, href)}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}

function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
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
  return (
    <span ref={ref}>
      {isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const BRAND_NAME = "TRAFFODATA";
const BRAND_EMAIL = "hello@traffodata.com";
const BRAND_LOGO_SRC = "/brand/traffodata-logo-96.png";

function BrandMark({ size = "sm", framed = true }: { size?: "sm" | "md"; framed?: boolean }) {
  const boxSize = size === "md" ? "h-11 w-11 rounded-xl" : "h-8 w-8 rounded-lg";
  const imageSize = size === "md" ? "h-9 w-9" : "h-6 w-6";

  return (
    <span
      className={`grid shrink-0 place-items-center ${boxSize} ${
        framed
          ? "bg-white text-[var(--ink)] ring-1 ring-black/8 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.55)]"
          : ""
      }`}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt=""
        aria-hidden="true"
        width="96"
        height="96"
        decoding="async"
        className={`${imageSize} object-contain`}
      />
    </span>
  );
}

function GoodsNavLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2" aria-label={`${BRAND_NAME} home`}>
      <BrandMark />
      <span
        className={`text-[15px] font-semibold tracking-[-0.01em] ${inverted ? "text-white" : "text-[var(--ink)]"}`}
      >
        {BRAND_NAME}{" "}
        <span
          className={`font-normal ${inverted ? "text-white/62" : "text-[var(--muted-foreground)]"}`}
        >
          Software
        </span>
      </span>
    </a>
  );
}

export function Nav({ surface = "dark" }: { surface?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lightSurface = surface === "light";
  const elevated = scrolled || lightSurface;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      handleSectionLinkClick(event, href);
    }

    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-200 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div
          className={`flex items-center rounded-full px-2 py-2 backdrop-blur transition-[background,border-color,box-shadow] duration-200 ${
            elevated
              ? "border border-[var(--hairline)] bg-white/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.14)]"
              : "border border-white/10 bg-white/[0.03] shadow-none"
          }`}
        >
          <div className="px-2">
            <GoodsNavLogo inverted={!elevated} />
          </div>
        </div>

        <nav
          aria-label="Primary"
          className={`hidden items-center rounded-full px-2 py-2 backdrop-blur transition-[background,border-color,box-shadow] duration-200 lg:flex ${
            elevated
              ? "border border-[var(--hairline)] bg-white/85 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.14)]"
              : "border border-white/10 bg-white/[0.03] shadow-none"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                elevated
                  ? "text-[var(--ink)]/80 hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                  : "text-white/82 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className={`flex items-center gap-2 rounded-full p-2 backdrop-blur transition-[background,border-color,box-shadow] duration-200 ${
            elevated
              ? "border border-[var(--hairline)] bg-white/85 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.14)]"
              : "border border-white/10 bg-white/[0.03] shadow-none"
          }`}
        >
          <a
            href="/contact"
            onClick={(event) => handleNavClick(event, "/contact")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-[#03040a] transition duration-200 hover:bg-primary hover:text-white active:scale-[0.97]"
          >
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start a project</span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition duration-200 hover:border-primary hover:text-primary active:scale-[0.97] lg:hidden ${
              elevated ? "border-[var(--hairline)] text-[var(--ink)]" : "border-white/12 text-white"
            }`}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
            className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:hidden"
          >
            <div className="rounded-2xl border border-[var(--hairline)] bg-white p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className="block rounded-xl px-4 py-3 text-[15px] text-[var(--ink)] transition-colors hover:bg-[var(--surface)] hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useHeroQuality() {
  const [quality, setQuality] = useState<HeroQuality>("off");

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const saveData = () =>
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
      );

    const updateQuality = () => {
      setQuality(
        resolveHeroQuality({
          prefersReducedMotion: motionQuery.matches,
          saveData: saveData(),
          coarsePointer: coarsePointerQuery.matches,
          width: window.innerWidth,
          height: window.innerHeight,
          dpr: window.devicePixelRatio || 1,
          hardwareConcurrency: navigator.hardwareConcurrency,
          deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
          webglSupported: supportsWebGL(),
        }),
      );
    };

    updateQuality();
    window.addEventListener("resize", updateQuality, { passive: true });
    motionQuery.addEventListener("change", updateQuality);
    coarsePointerQuery.addEventListener("change", updateQuality);

    return () => {
      window.removeEventListener("resize", updateQuality);
      motionQuery.removeEventListener("change", updateQuality);
      coarsePointerQuery.removeEventListener("change", updateQuality);
    };
  }, []);

  return quality;
}

function HeroLiquidBackground({
  settings,
}: {
  settings: ReturnType<typeof getHeroLiquidSettings>;
}) {
  const liquidClassName = settings.textBlur
    ? "absolute inset-0 scale-[1.08] opacity-100 mix-blend-multiply blur-[6px] contrast-[1.14] saturate-[1.1]"
    : "absolute inset-0 scale-[1.06] opacity-90 mix-blend-multiply blur-[3px] contrast-[1.08] saturate-[1.06]";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f8f9ff]"
    >
      <div className="absolute inset-0 origin-top scale-125 bg-white" />
      <div className="absolute left-1/2 top-[-30rem] h-[66rem] w-[216rem] -translate-x-1/2 rounded-[50%] bg-[#7e91e8] blur-[96px]" />
      <div className="absolute left-1/2 top-[-38rem] h-[66rem] w-[216rem] -translate-x-1/2 rounded-[50%] bg-[#333da7] blur-[96px]" />
      <div className="absolute left-1/2 top-[-45rem] h-[66rem] w-[216rem] -translate-x-1/2 rounded-[50%] bg-[#0a0d21] blur-[88px]" />
      <div className="absolute left-1/2 top-[-51rem] h-[66rem] w-[216rem] -translate-x-1/2 rounded-[50%] bg-[#030409] blur-[88px]" />
      <div className="absolute inset-x-[-22%] top-[38%] h-[51%] rounded-[50%] bg-[#a9b5ff]/82 blur-[72px]" />
      <div className="absolute inset-x-[-12%] bottom-[-8%] h-[30%] bg-[linear-gradient(to_top,rgba(251,252,255,0.68)_0%,rgba(244,246,255,0.44)_28%,rgba(194,203,252,0.26)_58%,rgba(3,4,10,0)_100%)] blur-[18px]" />
      <div className="absolute inset-x-[-10%] top-[48%] h-[30%] bg-[linear-gradient(to_bottom,transparent,rgba(115,136,223,0.52),rgba(238,241,255,0.1),transparent)] blur-2xl" />
      <div className="absolute left-[31%] bottom-[-12%] h-[28%] w-[42%] rounded-[50%] bg-[#050612]/45 blur-[48px] mix-blend-multiply" />
      {settings.enabled && (
        <Suspense fallback={null}>
          <LiquidEther
            className={liquidClassName}
            colors={["#ffffff", "#aebaff", "#7388df", "#333da7", "#030409"]}
            mouseForce={settings.mouseForce}
            cursorSize={settings.cursorSize}
            hoverForce={settings.hoverForce}
            hoverOrbit={settings.hoverOrbit}
            isViscous={false}
            viscous={30}
            iterationsViscous={settings.iterationsViscous}
            iterationsPoisson={settings.iterationsPoisson}
            resolution={settings.resolution}
            isBounce={false}
            autoDemo
            autoSpeed={settings.autoSpeed}
            autoIntensity={settings.autoIntensity}
            takeoverDuration={0.25}
            autoResumeDelay={2200}
            autoRampDuration={0.5}
            maxPixelRatio={settings.maxPixelRatio}
            maxFps={settings.maxFps}
            interactiveMaxFps={settings.interactiveMaxFps}
            textureType="half"
          />
        </Suspense>
      )}
      <div className="hero-liquid-bottom-drift absolute inset-x-[-24%] bottom-[-17%] h-[38%]" />
    </div>
  );
}

function Hero() {
  const quality = useHeroQuality();
  const settings = getHeroLiquidSettings(quality);
  const { scrollY } = useScroll();
  const frameRef = useRef<HTMLElement>(null);
  const glowRafRef = useRef(0);
  const glowPointRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const y = useTransform(scrollY, [0, 700], [0, 70]);
  const opacity = useTransform(scrollY, [0, 620], [1, 0.18]);

  useEffect(() => {
    return () => {
      if (glowRafRef.current) window.cancelAnimationFrame(glowRafRef.current);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!settings.edgeGlow) return;
    const frame = frameRef.current;
    if (!frame) return;

    glowPointRef.current = { clientX: event.clientX, clientY: event.clientY };
    if (glowRafRef.current) return;

    glowRafRef.current = window.requestAnimationFrame(() => {
      glowRafRef.current = 0;
      const point = glowPointRef.current;
      const activeFrame = frameRef.current;
      if (!point || !activeFrame) return;

      const rect = activeFrame.getBoundingClientRect();
      const x = point.clientX - rect.left;
      const y = point.clientY - rect.top;
      const edgeDistance = Math.min(x, y, rect.width - x, rect.height - y);
      const glowRange = Math.min(130, Math.max(82, rect.width * 0.08));
      const edgeOpacity = Math.max(0, Math.min(0.78, 1 - edgeDistance / glowRange));

      activeFrame.style.setProperty("--hero-x", `${x}px`);
      activeFrame.style.setProperty("--hero-y", `${y}px`);
      activeFrame.style.setProperty("--hero-edge-opacity", edgeOpacity.toFixed(3));
      activeFrame.dataset.glow = edgeOpacity > 0 ? "true" : "false";
    });
  };

  const handlePointerLeave = () => {
    const frame = frameRef.current;
    if (!frame) return;

    if (glowRafRef.current) {
      window.cancelAnimationFrame(glowRafRef.current);
      glowRafRef.current = 0;
    }
    glowPointRef.current = null;
    frame.style.setProperty("--hero-edge-opacity", "0");
    frame.dataset.glow = "false";
  };

  return (
    <section
      id="hero"
      ref={frameRef}
      data-scroll-stop
      data-hero-quality={quality}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="liquid-hero-frame scroll-stop relative isolate min-h-[100dvh] overflow-hidden bg-[#03040a] text-white"
    >
      <HeroLiquidBackground settings={settings} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-[3] mx-auto flex h-full min-h-[100dvh] max-w-7xl -translate-y-8 flex-col items-center justify-center px-5 pb-36 pt-24 text-center sm:px-6 md:-translate-y-5 lg:px-8"
      >
        <Reveal delay={0.05}>
          <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-white ring-1 ring-white/14 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/62">
              TRAFFODATA Enterprise OS
            </span>
          </div>
        </Reveal>

        <SplitText
          text="Build the operating system"
          textBlur={settings.textBlur}
          className="text-center font-display text-[clamp(2.55rem,6.8vw,6.2rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white [text-shadow:0_1px_26px_rgba(3,4,10,0.28)]"
        />
        <SplitText
          text="for your business."
          delay={0.25}
          textBlur={settings.textBlur}
          className="text-center font-display text-[clamp(2.55rem,6.8vw,6.2rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white/76 [text-shadow:0_1px_26px_rgba(3,4,10,0.22)]"
        />

        <Reveal delay={0.7}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[15px] leading-relaxed text-white/78 [text-shadow:0_1px_18px_rgba(3,4,10,0.2)] md:text-base">
            TRAFFODATA engineers premium ERP, inventory, warehouse, POS, accounting, CRM and AI
            platforms, built to scale with the world's most ambitious operators.
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
            <MagneticButton
              variant="dark"
              href="/contact"
              className="bg-[#333da7] shadow-[0_16px_44px_rgba(3,4,10,0.24)] hover:bg-[#2d3594]"
            >
              Start a project{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href="#platform"
              className="bg-[#0c0e21]/28 text-white ring-1 ring-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md hover:bg-[#0c0e21]/36 hover:text-[#aebcff]"
            >
              Explore platform
            </MagneticButton>
          </div>
        </Reveal>
      </motion.div>

      <div className="absolute inset-x-0 bottom-28 z-[3] mx-auto hidden max-w-4xl items-end justify-between px-6 text-[#4b5066] md:flex lg:px-8">
        <p className="max-w-[30rem] text-[15px] leading-relaxed">
          AI-assisted delivery for inventory, warehouse, POS, accounting and CRM workflows.
        </p>
        <a
          href="#about"
          onClick={(event) => handleSectionLinkClick(event, "#about")}
          aria-label="Continue to about section"
          className="grid h-14 w-14 place-items-center rounded-full text-[#4b5066] transition-[transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:text-primary active:scale-[0.97]"
        >
          <ArrowRight className="h-11 w-11 rotate-90" strokeWidth={1.4} />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust + Metrics                                                     */
/* ------------------------------------------------------------------ */

function Trust() {
  const proof = [
    { v: "Commerce backends", l: "Vendor, checkout, wallet, and delivery operations" },
    { v: "Operational platforms", l: "Inventory, warehouse, logistics, and finance workflows" },
    { v: "AI and mobile products", l: "Event, booking, retail, and field-team experiences" },
  ];
  const systems = [
    "WikiFood",
    "Printout",
    "Taggz",
    "JAWAD",
    "Al Nasser",
    "Inovent",
    "I Grill",
    "Polaris Marine",
  ];
  return (
    <section id="trust" className="hairline-t hairline-b bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid grid-cols-1 items-center gap-6 md:grid-cols-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
            Selected systems
            <br />
            shipped for operators
          </div>
          <div className="md:col-span-3 grid grid-cols-3 gap-6 md:grid-cols-3">
            {proof.map((item) => (
              <div key={item.v}>
                <div className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.v}
                </div>
                <div className="mt-1 max-w-[17rem] text-[12px] leading-relaxed text-[var(--muted-foreground)]">
                  {item.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--surface)] to-transparent" />
          <div className="flex w-max gap-12 animate-marquee">
            {[...systems, ...systems].map((l, i) => (
              <span
                key={i}
                className="font-display text-2xl font-semibold tracking-tight text-[var(--muted-foreground)] hover:text-[var(--ink)] transition"
              >
                {l}
              </span>
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
    <section id="about" data-scroll-stop className="scroll-stop relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow>Who we are</Eyebrow>
        <div className="mt-10 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              <BlurText as="span" text="Software" className="block" />
              <BlurText
                as="span"
                text="engineered for"
                delay={0.08}
                className="block text-[var(--muted-foreground)]"
              />
              <BlurText as="span" text="operators." delay={0.16} className="block" />
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              TRAFFODATA is a software studio building the connective tissue of modern enterprises.
              We design and ship ERP, warehouse, accounting and commerce systems that quietly run
              global operations: refined, reliable, and built to last a decade.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              Our products power retailers, manufacturers, distributors and service companies, from
              boutique studios to publicly listed groups.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "ERP",
                "Automation",
                "Warehouses",
                "Inventory",
                "Accounting",
                "POS",
                "Logistics",
              ].map((t) => (
                <span
                  key={t}
                  className="group inline-flex cursor-default items-center gap-1.5 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] ring-hairline transition hover:bg-[var(--ink)] hover:text-white"
                >
                  <span className="h-1 w-1 rounded-full bg-primary transition group-hover:bg-white" />{" "}
                  {t}
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
  {
    i: Layers,
    t: "ERP Systems",
    d: "Unified financial, supply and ops backbone tailored to your industry.",
  },
  {
    i: Boxes,
    t: "Inventory Management",
    d: "Real-time stock, multi-location, batch & serial, accurate to the SKU.",
  },
  {
    i: Warehouse,
    t: "Warehouse Management",
    d: "Pick, pack, putaway and wave planning for high-velocity fulfillment.",
  },
  {
    i: ScanBarcode,
    t: "Point of Sale",
    d: "Offline-first retail POS with omnichannel inventory sync.",
  },
  {
    i: Calculator,
    t: "Accounting Systems",
    d: "Multi-entity ledgers, tax engines, statutory compliance built in.",
  },
  {
    i: Users,
    t: "CRM",
    d: "Pipeline, service and account intelligence connected to live operations.",
  },
  {
    i: Sparkles,
    t: "AI Automation",
    d: "Operational copilots, workflow intelligence and automation across your business systems.",
  },
  {
    i: Settings2,
    t: "Custom Development",
    d: "Bespoke modules and integrations engineered alongside your team.",
  },
];

function Services() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="services" data-scroll-stop className="scroll-stop bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow light>What we build</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.04em]">
              <BlurText as="span" text="Eight disciplines." className="block" />
              <BlurText
                as="span"
                text="One operating system."
                delay={0.08}
                className="block text-white/50"
              />
            </h2>
          </div>
          <p className="max-w-md text-[14px] text-white/60">
            Every module is engineered to stand alone and compose seamlessly, so you adopt only what
            you need, when you need it.
          </p>
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
                <span className="w-12 text-[12px] tabular-nums text-white/65">0{i + 1}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 transition group-hover:bg-primary group-hover:ring-primary">
                  <s.i className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {s.t}
                  </span>
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
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="shrink-0"
                >
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
  { k: "ai", l: "AI", icon: Sparkles },
  { k: "warehouse", l: "Warehouse", icon: Warehouse },
  { k: "pos", l: "POS", icon: ScanBarcode },
  { k: "reports", l: "Reports", icon: BarChart3 },
] as const;

type PlatformKey = (typeof platformTabs)[number]["k"];

type PlatformScene = {
  title: string;
  subtitle: string;
  operator: string;
  focus: string;
  queue: { label: string; value: string; state: "calm" | "review" | "active" }[];
  lanes: { label: string; items: string[] }[];
  footer: string[];
};

const platformScenes: Record<PlatformKey, PlatformScene> = {
  inventory: {
    title: "Inventory control room",
    subtitle: "Stock, warehouses, suppliers, and exceptions in one operating view.",
    operator: "Inventory manager",
    focus: "Replenishment and exception handling",
    queue: [
      { label: "Reorder queue", value: "Supplier review", state: "review" },
      { label: "Location health", value: "Receiving today", state: "active" },
      { label: "Exception lane", value: "Low stock watched", state: "calm" },
    ],
    lanes: [
      {
        label: "Stock movement",
        items: ["Purchase order received", "Transfer reserved", "Return inspected"],
      },
      {
        label: "Rules",
        items: ["Minimum quantity", "Always-in-stock items", "Warehouse priority"],
      },
      {
        label: "Operator actions",
        items: ["Approve transfer", "Update supplier", "Resolve mismatch"],
      },
    ],
    footer: ["SKU history", "Warehouse stock", "Bulk import", "Supplier terms"],
  },
  accounting: {
    title: "Finance close board",
    subtitle: "Receivables, payouts, taxes, and approvals tied back to operational events.",
    operator: "Finance lead",
    focus: "Month-end without spreadsheet drift",
    queue: [
      { label: "Close checklist", value: "Entity review", state: "active" },
      { label: "Receivables", value: "Aging watched", state: "review" },
      { label: "Audit trail", value: "Ready for export", state: "calm" },
    ],
    lanes: [
      { label: "Revenue", items: ["POS receipts", "Online payments", "Wallet adjustments"] },
      { label: "Controls", items: ["Tax review", "Refund approval", "Disbursement lock"] },
      { label: "Outputs", items: ["Ledger export", "VAT report", "Management pack"] },
    ],
    footer: ["Invoice states", "Tax rules", "Payment gateways", "Export logs"],
  },
  crm: {
    title: "CRM handoff desk",
    subtitle: "Sales activity, account context, and delivery follow-up without losing the thread.",
    operator: "Account owner",
    focus: "From lead to operational handoff",
    queue: [
      { label: "Next action", value: "Demo follow-up", state: "active" },
      { label: "Account stage", value: "Ops review", state: "review" },
      { label: "Handoff notes", value: "Delivery ready", state: "calm" },
    ],
    lanes: [
      { label: "Pipeline", items: ["Qualified lead", "Proposal shared", "Procurement review"] },
      { label: "Context", items: ["Sites", "Users", "Systems connected"] },
      { label: "Follow-up", items: ["Schedule call", "Assign owner", "Create project brief"] },
    ],
    footer: ["Contacts", "Tasks", "Company profile", "Deal history"],
  },
  ai: {
    title: "Automation review queue",
    subtitle: "AI assists repetitive work while operators keep control over decisions.",
    operator: "Operations analyst",
    focus: "Suggested actions with human approval",
    queue: [
      { label: "Suggested fixes", value: "Awaiting approval", state: "review" },
      { label: "Recipe status", value: "Running safely", state: "active" },
      { label: "Guardrails", value: "Human review on", state: "calm" },
    ],
    lanes: [
      { label: "Inputs", items: ["Low stock alert", "Late payout", "Duplicate customer"] },
      { label: "Assistant", items: ["Draft action", "Explain reason", "Check policy"] },
      { label: "Operator", items: ["Approve", "Edit", "Dismiss"] },
    ],
    footer: ["Rules", "Approvals", "Audit log", "Prompt history"],
  },
  warehouse: {
    title: "Warehouse execution board",
    subtitle: "Receiving, picking, packing, shipping, and returns coordinated from one queue.",
    operator: "Warehouse supervisor",
    focus: "Wave planning and dock visibility",
    queue: [
      { label: "Wave plan", value: "Picking now", state: "active" },
      { label: "Dock status", value: "Inbound review", state: "review" },
      { label: "Returns", value: "Inspection lane", state: "calm" },
    ],
    lanes: [
      { label: "Inbound", items: ["ASN received", "Quality checked", "Putaway assigned"] },
      { label: "Outbound", items: ["Pick wave", "Pack station", "Carrier handoff"] },
      { label: "Exceptions", items: ["Short pick", "Damaged item", "Address hold"] },
    ],
    footer: ["Bins", "Pick lists", "Packing slips", "Carrier labels"],
  },
  pos: {
    title: "Retail counter cockpit",
    subtitle: "Counter sales, offline sync, refunds, loyalty, and inventory connected at checkout.",
    operator: "Store operator",
    focus: "Fast counter work with clean back-office data",
    queue: [
      { label: "Counter state", value: "Selling now", state: "active" },
      { label: "Offline sync", value: "Protected queue", state: "calm" },
      { label: "Returns", value: "Manager review", state: "review" },
    ],
    lanes: [
      { label: "Sale", items: ["Scan item", "Apply offer", "Take payment"] },
      { label: "Customer", items: ["Loyalty lookup", "Wallet balance", "Receipt delivery"] },
      { label: "Back office", items: ["Stock decrement", "Tax record", "Shift close"] },
    ],
    footer: ["Cash drawer", "Coupons", "Receipts", "Shift reports"],
  },
  reports: {
    title: "Reporting command surface",
    subtitle: "Dashboards built from source systems, with freshness and ownership visible.",
    operator: "Leadership team",
    focus: "Decision views without data archaeology",
    queue: [
      { label: "Source health", value: "Feeds connected", state: "active" },
      { label: "Board pack", value: "Owner review", state: "review" },
      { label: "Exports", value: "Scheduled", state: "calm" },
    ],
    lanes: [
      { label: "Inputs", items: ["Inventory", "Finance", "Sales"] },
      { label: "Views", items: ["Executive summary", "Operations detail", "Exception list"] },
      { label: "Distribution", items: ["PDF pack", "CSV export", "Email schedule"] },
    ],
    footer: ["Dashboards", "Sources", "Permissions", "Snapshots"],
  },
};

function PlatformContent({ k }: { k: PlatformKey }) {
  const scene = platformScenes[k];
  const statusStyles = {
    active: "bg-primary text-white",
    calm: "bg-[var(--surface)] text-[var(--ink)] ring-1 ring-[var(--hairline)]",
    review: "bg-[#11131f] text-white",
  };
  const handoff = [
    ["Source event", "Captured"],
    ["Shared record", "Validated against workflow rules"],
    ["Operator action", "Assigned to owner"],
  ];

  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease }}
      className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[0.72fr_1.28fr]"
    >
      <div className="flex flex-col rounded-xl bg-[var(--surface)] p-4 ring-1 ring-[var(--hairline)] sm:p-5">
        <div>
          <div className="text-[12px] font-semibold text-[var(--ink)]">{scene.operator}</div>
          <div className="mt-2 font-display text-[clamp(1.55rem,3vw,2.35rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            {scene.title}
          </div>
          <p className="mt-4 text-[14px] leading-[1.6] text-[var(--muted-foreground)]">
            {scene.subtitle}
          </p>
        </div>

        <div className="mt-6 grid gap-2">
          {scene.queue.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-3 ring-1 ring-[var(--hairline)]"
            >
              <span className="text-[12px] font-medium text-[var(--muted-foreground)]">
                {item.label}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none ${statusStyles[item.state]}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="rounded-lg bg-[var(--ink)] p-4 text-white">
            <div className="text-[11px] font-medium text-white/50">Current focus</div>
            <div className="mt-2 text-[14px] font-semibold leading-snug">{scene.focus}</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-[var(--hairline)] sm:p-5">
        <div className="flex flex-col gap-2 border-b border-[var(--hairline)] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[12px] font-medium text-[var(--muted-foreground)]">
              Connected workflow
            </div>
            <div className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em]">
              {scene.title}
            </div>
          </div>
          <div className="w-fit rounded-full bg-[var(--surface)] px-3 py-1.5 text-[11px] font-semibold text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
            One shared record
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {scene.lanes.map((lane, laneIndex) => (
            <div key={lane.label} className="rounded-lg bg-[var(--surface)] p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[var(--ink)]">{lane.label}</span>
                <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                  {String(laneIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-2">
                {lane.items.map((item, itemIndex) => (
                  <div
                    key={item}
                    className="flex min-h-12 items-center gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-black/5"
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        itemIndex === 0 ? "bg-primary text-white" : "bg-black/5 text-primary"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[12px] font-medium leading-tight text-[var(--ink)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-4">
          {scene.footer.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-dashed border-black/10 bg-white px-3 py-3 text-[12px] font-semibold text-[var(--muted-foreground)]"
            >
              <div className="h-1.5 w-8 rounded-full bg-primary/50" />
              <div className="mt-3">{item}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-lg bg-[var(--ink)] p-3 text-white">
          <div className="grid gap-2 text-[11px] sm:grid-cols-3">
            {handoff.map(([label, value]) => (
              <div
                key={label}
                className="rounded-md bg-white/[0.08] px-3 py-2 font-medium text-white/78 ring-1 ring-white/10"
              >
                <div className="mb-1 text-white/45">{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Platform() {
  const [tab, setTab] = useState<PlatformKey>("inventory");
  return (
    <section id="platform" data-scroll-stop className="scroll-stop py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow>TRAFFODATA ERP Platform</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              <BlurText as="span" text="One platform." className="block" />
              <BlurText
                as="span"
                text="Every workflow."
                delay={0.08}
                className="block text-[var(--muted-foreground)]"
              />
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:pt-6">
            <p className="text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              A single source of truth for inventory, finance, sales, people and operations,
              engineered to feel like one product instead of seven disconnected screens.
            </p>
          </div>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-white ring-hairline shadow-elevated">
            <div className="flex flex-wrap items-center gap-1 hairline-b p-2">
              {platformTabs.map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`relative inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-[12px] transition ${tab === t.k ? "text-white" : "text-[var(--muted-foreground)] hover:text-[var(--ink)]"}`}
                >
                  {tab === t.k && (
                    <motion.span
                      layoutId="ptab"
                      transition={{ duration: 0.5, ease }}
                      className="absolute inset-0 -z-0 rounded-full bg-[var(--ink)]"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <t.icon className="h-3.5 w-3.5" /> {t.l}
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <PlatformContent k={tab} />
            </AnimatePresence>
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
    <section
      id="why"
      data-scroll-stop
      className="scroll-stop bg-[var(--surface)] hairline-t hairline-b"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>Why TRAFFODATA ERP</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <BlurText as="span" text="The compounding" className="block" />
            <BlurText
              as="span"
              text="return of clarity."
              delay={0.08}
              className="block text-primary"
            />
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
/* Comparison                                                          */
/* ------------------------------------------------------------------ */

type ComparisonRow = {
  icon: LucideIcon;
  label: string;
  goods: string;
  traditional: string;
  action?: boolean;
};

const comparisonRows: ComparisonRow[] = [
  {
    icon: Gem,
    label: "Approach",
    goods: "Design and engineering in sync",
    traditional: "Disconnected teams",
  },
  {
    icon: Settings2,
    label: "Process",
    goods: "Streamlined, transparent and async",
    traditional: "Endless calls, vague timelines",
  },
  {
    icon: Sparkles,
    label: "Design Philosophy",
    goods: "Modern, minimal and purposeful",
    traditional: "Trend-based and cluttered",
  },
  {
    icon: Cpu,
    label: "Development Stack",
    goods: "Built with modern frameworks",
    traditional: "Outdated stacks",
  },
  {
    icon: MessageCircle,
    label: "Communication",
    goods: "Clear updates",
    traditional: "Multiple middlemen",
  },
  {
    icon: Send,
    label: "Deliverables",
    goods: "Production-ready software systems",
    traditional: "Static mockups",
  },
  {
    icon: Handshake,
    label: "Support",
    goods: "Long-term partnership mindset",
    traditional: "One-and-done projects",
  },
  {
    icon: PhoneCall,
    label: "First conversation",
    goods: "Start with a project-fit call",
    traditional: "Paid discovery before clarity",
    action: true,
  },
];

function ComparisonMark({ positive = true }: { positive?: boolean }) {
  return (
    <span
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full md:h-8 md:w-8 ${
        positive
          ? "bg-[#333da7] text-white shadow-[0_10px_26px_-14px_rgba(51,61,167,0.8)]"
          : "bg-[var(--surface)] text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]"
      }`}
    >
      {positive ? (
        <Check className="h-4 w-4" strokeWidth={2.4} />
      ) : (
        <X className="h-4 w-4" strokeWidth={2.2} />
      )}
    </span>
  );
}

function ComparisonAction({
  variant,
  children,
}: {
  variant: "goods" | "traditional";
  children: ReactNode;
}) {
  const isGoods = variant === "goods";
  const className = `inline-flex w-fit items-center gap-3 rounded-xl bg-[var(--ink)] py-2 pl-2 pr-4 text-[14px] font-medium text-white shadow-[0_18px_50px_-28px_rgba(0,0,0,0.8)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] md:text-base ${
    isGoods ? "hover:-translate-y-0.5 active:scale-[0.98]" : "pointer-events-none opacity-55"
  }`;
  const iconClass = `grid h-9 w-9 place-items-center rounded-lg ${
    isGoods ? "bg-[#333da7] text-white" : "bg-white/12 text-white/65 ring-1 ring-white/10"
  }`;

  const content = (
    <>
      <span className={iconClass}>
        <PhoneCall className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="whitespace-nowrap">{children}</span>
    </>
  );

  if (!isGoods) {
    return (
      <span className={className} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a href="/contact" className={className}>
      {content}
    </a>
  );
}

function Comparison() {
  return (
    <section
      id="comparison"
      data-scroll-stop
      className="scroll-stop bg-[var(--surface)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6">
        <Reveal className="max-w-[82rem]">
          <BlurText
            as="h2"
            text="TRAFFODATA vs traditional service providers"
            className="font-display text-[clamp(2.75rem,6.4vw,5.9rem)] font-bold leading-[0.94] tracking-[-0.052em] text-balance"
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div
            data-comparison-table
            className="mt-14 overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[var(--hairline)] shadow-[0_34px_120px_-84px_rgba(0,0,0,0.5)] md:mt-16"
          >
            <div className="hidden grid-cols-[0.84fr_1.38fr_1.38fr] border-b border-[var(--hairline)] bg-white md:grid">
              <div className="min-h-28 bg-[var(--surface)]/72" />
              <div className="flex min-h-28 items-center gap-3 border-l border-[var(--hairline)] px-8 xl:px-10">
                <BrandMark size="md" />
                <span className="font-display text-[1.6rem] font-semibold leading-none tracking-tight">
                  TRAFFODATA Software
                </span>
              </div>
              <div className="flex min-h-28 items-center border-l border-[var(--hairline)] px-8 font-display text-[1.6rem] font-semibold leading-none tracking-tight text-[var(--muted-foreground)] xl:px-10">
                Traditional service providers
              </div>
            </div>

            <div className="divide-y divide-[var(--hairline)]">
              {comparisonRows.map((row, index) => {
                const Icon = row.icon;
                return (
                  <Reveal key={row.label} delay={index * 0.04} y={16}>
                    <div
                      data-comparison-row
                      className="grid gap-0 md:grid-cols-[0.84fr_1.38fr_1.38fr]"
                    >
                      <div className="flex items-center gap-4 bg-[var(--surface)]/72 px-5 py-5 md:min-h-[7.35rem] md:px-8 xl:px-10">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--ink)] ring-1 ring-[var(--hairline)] md:h-11 md:w-11">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <span className="font-display text-xl font-semibold tracking-tight md:text-[1.45rem]">
                          {row.label}
                        </span>
                      </div>

                      <div className="flex items-start gap-4 px-5 py-5 md:min-h-[7.35rem] md:items-center md:border-l md:border-[var(--hairline)] md:px-8 xl:px-10">
                        {row.action ? (
                          <ComparisonAction variant="goods">Start a project</ComparisonAction>
                        ) : (
                          <>
                            <ComparisonMark />
                            <div>
                              <div className="mb-1 text-[11px] font-medium text-primary md:hidden">
                                TRAFFODATA Software
                              </div>
                              <p className="text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[var(--ink)] md:text-[1.18rem]">
                                {row.goods}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-start gap-4 border-t border-[var(--hairline)] px-5 py-5 md:min-h-[7.35rem] md:items-center md:border-l md:border-t-0 md:px-8 xl:px-10">
                        {row.action ? (
                          <ComparisonAction variant="traditional">
                            Paid discovery call
                          </ComparisonAction>
                        ) : (
                          <>
                            <ComparisonMark positive={false} />
                            <div>
                              <div className="mb-1 text-[11px] font-medium text-[var(--muted-foreground)] md:hidden">
                                Traditional providers
                              </div>
                              <p className="text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[var(--muted-foreground)] md:text-[1.18rem]">
                                {row.traditional}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects (horizontal scroll)                                        */
/* ------------------------------------------------------------------ */

const projects = [
  {
    t: "WikiFood Multi-Vendor Commerce Backend",
    c: "WikiFood",
    tag: "Mobile product",
    slug: "wikifood-commerce-delivery-backend",
    color: "#7388DF",
    visual: "commerce",
    headline: "Multi-vendor order engine",
    modules: ["Vendor POS", "Customer app", "Delivery app"],
    states: ["Orders split by store", "Wallets and disbursements", "Stock-safe checkout"],
    action: "Laravel API platform",
  },
  {
    t: "Printout Backend",
    c: "Printout",
    tag: "Backend platform",
    slug: "printout-laravel-rest-api",
    color: "#1a1a1a",
    visual: "backend",
    headline: "Print workflow API",
    modules: ["REST endpoints", "Admin roles", "Order states"],
    states: ["Quote received", "Files attached", "Production queued"],
    action: "Operational backend",
  },
  {
    t: "Taggz AI Event Photography Platform",
    c: "Taggz",
    tag: "AI platform",
    slug: "taggz-ai-event-photography-platform",
    color: "#7388DF",
    visual: "ai",
    headline: "Event photo matching",
    modules: ["Upload queue", "Face match", "Gallery delivery"],
    states: ["Event imported", "Guests indexed", "Albums ready"],
    action: "AI delivery flow",
  },
  {
    t: "JAWAD Horse Riding Booking Platform",
    c: "JAWAD",
    tag: "Mobile product",
    slug: "jawad-horse-riding-booking-platform",
    color: "#1a1a1a",
    visual: "booking",
    headline: "Stable booking system",
    modules: ["Rider app", "Trainer slots", "Payments"],
    states: ["Choose horse", "Reserve lesson", "Confirm arrival"],
    action: "Mobile booking flow",
  },
  {
    t: "Elnasser Backend & Logistics Engine",
    c: "Al Nasser",
    tag: "Logistics system",
    slug: "elnasser-backend-dashboard",
    color: "#7388DF",
    visual: "logistics",
    headline: "Fulfillment control desk",
    modules: ["Warehouse", "Routes", "Returns"],
    states: ["Stock reserved", "Driver assigned", "Delivery tracked"],
    action: "Logistics operations",
  },
  {
    t: "Al Nasser E-Commerce Landing Page",
    c: "Al Nasser",
    tag: "Commerce system",
    slug: "alnasser-ecommerce",
    color: "#1a1a1a",
    visual: "landing",
    headline: "Commerce launch surface",
    modules: ["Catalog hero", "Campaign blocks", "Checkout CTA"],
    states: ["Browse offer", "Compare products", "Start order"],
    action: "Frontend conversion path",
  },
];

function ProjectSnapshot({ project }: { project: (typeof projects)[number] }) {
  const Icon =
    {
      ai: Sparkles,
      backend: Cpu,
      booking: Users,
      commerce: Package,
      landing: Globe2,
      logistics: Truck,
    }[project.visual] ?? Layers;
  const lines = {
    ai: [32, 74, 48, 88],
    backend: [64, 42, 78, 55],
    booking: [46, 70, 56, 82],
    commerce: [76, 52, 88, 68],
    landing: [82, 62, 74, 92],
    logistics: [40, 72, 60, 86],
  }[project.visual] ?? [62, 78, 48, 84];

  return (
    <div className="absolute inset-5 flex flex-col overflow-hidden rounded-xl bg-white/96 p-4 text-[var(--ink)] shadow-[0_10px_36px_-26px_rgba(0,0,0,0.6)] ring-1 ring-black/8 sm:inset-6 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-medium text-[var(--muted-foreground)]">{project.c}</div>
          <div className="mt-2 max-w-[17rem] font-display text-[clamp(1.55rem,4vw,2.25rem)] font-bold leading-[0.94] tracking-[-0.04em]">
            {project.headline}
          </div>
        </div>
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
          style={{ backgroundColor: project.color }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>

      <div className="mt-5 grid gap-2">
        {project.modules.map((module, index) => (
          <div
            key={module}
            className="flex items-center gap-3 rounded-lg bg-[var(--surface)] px-3 py-2"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: index === 1 ? "#111111" : project.color }}
            />
            <span className="text-[12px] font-semibold">{module}</span>
            <span
              className="ml-auto h-1.5 rounded-full bg-black/10"
              style={{ width: `${lines[index]}px` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-[var(--ink)] p-3 text-white">
        <div className="flex items-center justify-between text-[10px] text-white/55">
          <span>{project.action}</span>
          <span>Live workflow</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {project.states.map((state, index) => (
            <div
              key={state}
              className="min-h-20 rounded-md bg-white/[0.08] p-2 ring-1 ring-white/10"
            >
              <div className="text-[10px] text-white/45">0{index + 1}</div>
              <div className="mt-2 text-[11px] font-semibold leading-tight text-white/82">
                {state}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="relative h-12 overflow-hidden rounded-lg bg-[var(--surface)]">
          <div className="absolute inset-y-0 left-0 w-full">
            {lines.map((width, index) => (
              <span
                key={`${project.slug}-${width}`}
                className="absolute h-1.5 rounded-full"
                style={{
                  backgroundColor: index % 2 === 0 ? project.color : "rgba(0,0,0,0.16)",
                  left: `${index * 23 + 6}%`,
                  top: `${14 + (index % 2) * 16}px`,
                  width: `${Math.min(width, 78)}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" data-scroll-stop className="scroll-stop py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <BlurText
              as="h2"
              text="Featured projects."
              className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            />
          </div>
          <a
            href="/work"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium"
          >
            View all case studies{" "}
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      <div className="overflow-x-auto pb-8 [scrollbar-width:thin] snap-x snap-mandatory">
        <div className="flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          {projects.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06} className="snap-start">
              <a href={`/work/${p.slug}`} className="group block w-[88vw] max-w-[520px] shrink-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-hairline">
                  <div
                    className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    style={{ background: `linear-gradient(135deg, ${p.color} 0%, #000 100%)` }}
                  />
                  <ProjectSnapshot project={p} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold tracking-tight">{p.t}</div>
                    <div className="text-[12px] text-[var(--muted-foreground)]">
                      {p.c} - {p.tag}
                    </div>
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

const tech = [
  "Laravel",
  "PHP",
  "Node.js",
  "React",
  "Next.js",
  "Flutter",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "TypeScript",
];

function Tech() {
  return (
    <section id="tech" data-scroll-stop className="scroll-stop bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="mb-14 max-w-3xl">
          <Eyebrow light>Engineering stack</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <BlurText as="span" text="Built on a foundation" className="block" />
            <BlurText
              as="span"
              text="we trust for a decade."
              delay={0.08}
              className="block text-white/50"
            />
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {tech.map((t, i) => (
            <Reveal
              key={t}
              delay={i * 0.04}
              className="group relative bg-[var(--ink)] p-8 transition hover:bg-white/[0.04]"
            >
              <div className="text-[11px] text-white/65">
                0{(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="mt-3 font-display text-2xl font-semibold tracking-tight transition group-hover:text-primary">
                {t}
              </div>
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
  {
    n: "01",
    t: "Discovery",
    d: "We embed with your team to map operations, constraints and the unsolved problems worth solving.",
  },
  {
    n: "02",
    t: "Strategy",
    d: "We define modules, data model and the rollout path, sequenced for fast, measurable wins.",
  },
  {
    n: "03",
    t: "Design",
    d: "Interfaces designed around how your people actually work: calm, fast, and easy to learn.",
  },
  {
    n: "04",
    t: "Development",
    d: "Engineered in agile cycles with weekly demos and full transparency on quality and progress.",
  },
  {
    n: "05",
    t: "Deployment",
    d: "Migration, training and a long-term partnership. We stay with you as the business evolves.",
  },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" data-scroll-stop className="scroll-stop py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <BlurText as="span" text="A process, not" className="block" />
            <BlurText as="span" text="a pitch deck." delay={0.08} className="block" />
          </h2>
        </div>
        <div ref={ref} className="relative">
          <div className="absolute left-4 top-2 hidden h-full w-px bg-[var(--hairline)] md:block">
            <motion.div style={{ height: h }} className="w-full bg-primary origin-top" />
          </div>
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.05}
              className="relative mb-10 grid grid-cols-12 gap-6 md:pl-16"
            >
              <div className="absolute left-0 top-2 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--background)] ring-hairline md:flex">
                <span className="text-[10px] font-medium tabular-nums">{s.n}</span>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="text-[12px] tabular-nums text-primary md:hidden">{s.n}</div>
                <BlurText
                  as="h3"
                  text={s.t}
                  className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
                />
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
  {
    q: "TRAFFODATA quietly replaced four legacy systems. Our finance close went from twelve days to three.",
    a: "Layla Othman",
    r: "CFO, Aurora Industries",
  },
  {
    q: "It's the most considered enterprise product I've used. Every screen feels designed for the person who actually does the job.",
    a: "Marcus Reilly",
    r: "COO, Halcyon Logistics",
  },
  {
    q: "We rolled it out across 38 stores in a quarter. The team adopted it without a single training session.",
    a: "Nadia Park",
    r: "Head of Retail, Vertex",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section
      id="testimonials"
      data-scroll-stop
      className="scroll-stop bg-[var(--surface)] hairline-t hairline-b"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Eyebrow>Operators speak</Eyebrow>
        <div className="relative mt-10 min-h-[280px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease }}
            >
              <Quote className="h-8 w-8 text-primary" />
              <blockquote className="mt-6 font-display text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance">
                "{quotes[i].q}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-white text-[12px] font-semibold">
                  {quotes[i].a
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[13px] font-medium">{quotes[i].a}</span>
                  <span className="block text-[12px] text-[var(--muted-foreground)]">
                    {quotes[i].r}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex gap-2" role="tablist" aria-label="Testimonials">
          {quotes.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show testimonial ${n + 1}`}
              aria-selected={n === i}
              role="tab"
              className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                className={`h-1 rounded-full transition-all ${n === i ? "w-8 bg-[var(--ink)]" : "w-4 bg-[var(--muted-foreground)]"}`}
              />
            </button>
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
    <section
      id="cta"
      data-scroll-stop
      className="scroll-stop relative overflow-hidden bg-[var(--surface)] text-[var(--ink)] hairline-t"
    >
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -left-40 top-1/2 -z-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_60%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 top-0 -z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(115,136,223,0.14),transparent_60%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-32 text-center md:py-48">
        <Eyebrow>Start the conversation</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          <BlurText as="span" text="Ready to transform" className="block" />
          <BlurText
            as="span"
            text="your business?"
            delay={0.08}
            className="block text-[var(--muted-foreground)]"
          />
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-[15px] text-[var(--muted-foreground)]">
          A 30-minute call with our team. We'll show you the platform, mapped to your operations.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton variant="dark" href="/contact">
            Start a project <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <a
            href={`mailto:${BRAND_EMAIL}`}
            className="text-[13px] text-[var(--muted-foreground)] underline-offset-4 hover:text-[var(--ink)] hover:underline"
          >
            or email {BRAND_EMAIL}
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-[var(--muted-foreground)]">
          {[
            [Shield, "Verified email domain"],
            [Globe2, "ERP, POS, inventory, warehouse"],
            [Zap, "Fast technical review"],
            [Check, "Clear next step"],
          ].map(([I, l]) => {
            const Icon = I as typeof Shield;
            return (
              <span key={l as string} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-primary" /> {l as string}
              </span>
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

const footerColumns = [
  {
    title: "Pages",
    items: [
      { label: "Work", href: "/work" },
      { label: "Products", href: "/#platform" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "ERP Systems", href: "#services" },
      { label: "Inventory", href: "/#platform" },
      { label: "Warehouse", href: "/#platform" },
      { label: "POS", href: "/#platform" },
      { label: "Accounting", href: "/#platform" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Selected work", href: "/#projects" },
      { label: "How we work", href: "/#process" },
    ],
  },
  {
    title: "Start",
    items: [
      { label: "Start a project", href: "/contact" },
      { label: "Email hello@traffodata.com", href: `mailto:${BRAND_EMAIL}` },
    ],
  },
];

function GoodsLogo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label={`${BRAND_NAME} home`}>
      <BrandMark />
      <span className="text-[15px] font-semibold">
        {BRAND_NAME} <span className="font-normal text-white/55">Software</span>
      </span>
    </a>
  );
}

function handleFooterLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (href === "#") {
    event.preventDefault();
    return;
  }

  handleSectionLinkClick(event, href);
}

export function Footer() {
  return (
    <footer
      id="contact"
      data-scroll-stop
      className="scroll-stop relative overflow-hidden bg-[var(--ink)] text-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--primary)_30%,transparent),transparent_42%),radial-gradient(ellipse_at_50%_58%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_48%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--primary)_26%,transparent),color-mix(in_oklch,var(--primary)_9%,transparent)_38%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-[18rem] z-0 overflow-hidden px-5 sm:top-[16rem] sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div
            className="select-none whitespace-nowrap font-display text-[clamp(4rem,18vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.1]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.22) 24%, rgba(0,0,0,0.82) 58%, black 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.22) 24%, rgba(0,0,0,0.82) 58%, black 100%)",
            }}
          >
            TRAFFODATA
          </div>
        </div>
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pb-36 sm:pt-24 lg:pb-44">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-[1.2fr_2fr]">
          <Reveal className="max-w-[22rem]">
            <GoodsLogo />
            <p className="mt-6 text-[15px] leading-relaxed text-white/62 sm:mt-8 sm:text-sm">
              Premium ERP, inventory, warehouse, POS, accounting, CRM and AI software for operators
              building serious businesses.
            </p>
            <p className="mt-7 text-sm text-white/45 sm:mt-8">
              © {new Date().getFullYear()} TRAFFODATA Technologies. All rights reserved.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <div className="text-sm font-semibold text-white/82">{col.title}</div>
                  <ul className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={
                            item.href.startsWith("#")
                              ? (event) => handleFooterLinkClick(event, item.href)
                              : undefined
                          }
                          className="text-[15px] text-white/60 transition-colors hover:text-primary sm:text-sm"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative z-[2] mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:pt-7 sm:text-xs">
          <a href={`mailto:${BRAND_EMAIL}`} className="w-fit transition-colors hover:text-primary">
            {BRAND_EMAIL}
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/#hero" className="transition-colors hover:text-primary">
              Back to top
            </a>
            <a href="/contact" className="transition-colors hover:text-primary">
              Start a project
            </a>
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
        <Comparison />
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
