"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TransitionLink } from "../components/TransitionLink";

const ROBOTO_MONO = "var(--font-roboto-mono), monospace";
const SATOSHI = "'Satoshi', sans-serif";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleLink({ href, label }: { href: string; label: string }) {
  const [display, setDisplay] = useState(label);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = () => {
    let tick = 0;
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      tick++;
      const locked = Math.floor(tick / 3);
      setDisplay(
        label.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < locked) return label[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * 26)];
        }).join("")
      );
      if (locked >= label.length) { clearInterval(interval.current!); setDisplay(label); }
    }, 45);
  };

  useEffect(() => () => { if (interval.current) clearInterval(interval.current); }, []);

  return (
    <a href={href} onMouseEnter={handleMouseEnter}
      className="text-[15px] text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-4 decoration-neutral-400 transition-colors cursor-pointer"
      style={{ fontFamily: ROBOTO_MONO }}>{display}</a>
  );
}

function CalendlyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />
      <div className="relative w-full max-w-[1100px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f0f0f]">
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <iframe
          src="https://calendly.com/tealwavesolutions/30min?hide_gdpr_banner=1&primary_color=069494"
          style={{ display: "block", border: "none", marginTop: "-48px", marginLeft: "-48px", marginBottom: "-48px", width: "calc(100% + 96px)", height: "796px" }}
        />
      </div>
    </div>
  );
}

const services = [
  {
    number: "01",
    label: "/DELIVERY STABILIZATION SPRINT",
    description: "A focused 2-week engagement to identify where your delivery is breaking down — and a clear roadmap to fix it.",
    items: [
      "Workflow & delivery process review",
      "Operational bottleneck mapping",
      "Communication and ownership analysis",
      "Alignment gap identification",
      "Improvement roadmap with priorities",
    ],
    cta: "Book a Sprint",
    imageAlt: "Team at laptop with whiteboard and post-it notes",
  },
  {
    number: "02",
    label: "/FRACTIONAL HEAD OF DELIVERY",
    description: "Senior delivery and operational leadership on a monthly retainer — without the full-time hire.",
    items: [
      "Delivery leadership & prioritization",
      "Stakeholder alignment & facilitation",
      "Operational visibility improvements",
      "Workflow optimization",
      "Team support & coaching",
      "Founder bottleneck removal",
    ],
    cta: "Start a Retainer",
    imageAlt: "One person leading a meeting while others listen",
  },
  {
    number: "03",
    label: "/WAYS OF WORKING WORKSHOPS",
    description: "Facilitated sessions that reset how your team communicates, owns work, and collaborates — for lasting change.",
    items: [
      "Communication clarity sessions",
      "Ownership & accountability models",
      "Meeting optimization",
      "Async workflow design",
      "Leadership & team alignment",
      "Retrospective & reset facilitation",
    ],
    cta: "Book a Workshop",
    imageAlt: "Group of people in a casual session with whiteboard",
  },
  {
    number: "04",
    label: "/AI WORKFLOW & OPERATIONAL OPTIMIZATION",
    description: "Practical AI integration into your delivery and operational systems — without adding noise or complexity.",
    items: [
      "Workflow automation opportunities",
      "AI-assisted operational systems",
      "Knowledge organization & retrieval",
      "Operational visibility systems",
      "AI-enabled delivery workflows",
    ],
    cta: "Start Optimizing",
    imageAlt: "Person at computer with dashboards on screen",
  },
];

const solutions = [
  {
    title: "Delivery & Execution",
    text: "Reactive delivery, low predictability, constant context switching, and operational overload slowing your team down.",
  },
  {
    title: "Founder Bottlenecks",
    text: "Leadership stuck in day-to-day operations instead of strategy. Unclear ownership making every decision land on one desk.",
  },
  {
    title: "Communication & Alignment",
    text: "Too many meetings with too little clarity. Misalignment between leadership and teams causing constant priority changes.",
  },
  {
    title: "AI & Workflow Complexity",
    text: "AI adoption without operational structure. Fragmented workflows and manual work slowing teams down without clear ROI.",
  },
  {
    title: "Cross-functional Friction",
    text: "Departments working in silos. Handoffs breaking down. No shared visibility across teams and functions.",
  },
  {
    title: "Team Sustainability",
    text: "Burnout patterns, constant urgency culture, reduced focus time. High performance becoming unsustainable over time.",
  },
];

const solutionIcons = [
  <svg key="kr" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>,
  <svg key="wa" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="18" y1="8" x2="23" y2="13"/>
    <line x1="23" y1="8" x2="18" y2="13"/>
  </svg>,
  <svg key="wp" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>,
  <svg key="mc" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>,
  <svg key="dp" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="6" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="12" cy="18" r="3"/>
    <path d="M6 9v1a6 6 0 0 0 6 6"/><path d="M18 9v1a6 6 0 0 1-6 6"/>
  </svg>,
  <svg key="oe" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>,
];

function SplitText({
  children,
  className,
  style,
  stagger = 0.055,
  delay = 0,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
  const words = children.split(" ");

  return (
    <span ref={ref} className={className} style={{ ...style, display: "block" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: i < words.length - 1 ? "0.25em" : undefined }}
          initial={{ opacity: 0.001, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.001, x: 20 }}
          transition={{
            duration: 0.45,
            delay: delay + i * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const COLS = 6;
const ROWS = 7;
const TILES = Array.from({ length: COLS * ROWS }, (_, i) => ({
  col: i % COLS,
  row: Math.floor(i / COLS),
}));

function FadeInColumn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TileReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <div ref={ref} className="relative w-full h-full">
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      >
        {TILES.map(({ col, row }, i) => (
          <motion.div
            key={i}
            className="bg-white"
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: isInView ? (col + row) * 0.06 : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FolderTab() {
  return (
    <div className="relative w-full h-[5px] mb-3">
      <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
      <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
      </svg>
    </div>
  );
}

function ArrowIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto">
      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ServicesPage() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerImgOpacity = useTransform(footerProgress, [0, 0.6, 1], [0, 0, 1]);

  useEffect(() => {
    const handler = (e: Event) => { if ((e as CustomEvent).type === "open-calendly") setShowCalendly(true); };
    window.addEventListener("open-calendly", handler);
    return () => window.removeEventListener("open-calendly", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setNavHidden(currentY > lastScrollY.current && currentY > 72);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}

      {/* NAV */}
      <motion.nav
        animate={{ y: navHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#f9f9f9] border-b border-[#f9f9f9]"
      >
        <div className="max-w-[1240px] mx-auto px-8 h-full flex items-center justify-between relative">
          <TransitionLink href="/" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="TealWave" className="h-[30px] w-auto" />
          </TransitionLink>

          <ul className="hidden md:flex items-center gap-12 list-none absolute left-1/2 -translate-x-1/2">
            {[
              { label: "SERVICES", href: "/services" },
              { label: "USE CASES", href: "#solutions" },
              { label: "HOW WE WORK", href: "/#how-we-work" },
              { label: "ABOUT", href: "/about" },
            ].map((l) => (
              <li key={l.label}>
                <ScrambleLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-[14px] font-semibold tracking-wide text-neutral-600 hover:text-neutral-900 transition-colors">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1"/>
                <ellipse cx="6.5" cy="6.5" rx="2.2" ry="5.5" stroke="currentColor" strokeWidth="1.1"/>
                <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              EN
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
            <TransitionLink href="/contact" className="group flex items-center rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200">
              <span className="flex-1 px-4 py-2 text-[18px] font-[500] text-white group-hover:text-neutral-900 transition-colors duration-200" style={{ fontFamily: SATOSHI }}>Get in touch</span>
              <span className="m-2 w-7 h-7 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </TransitionLink>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="bg-[#f9f9f9] pt-[72px]" style={{ fontFamily: SATOSHI }}>
        <div className="max-w-[1240px] mx-auto px-8 py-20">
          <div className="grid grid-cols-2 gap-16 items-end">
            <h1
              className="text-[64px] font-[700] leading-[1.0] tracking-[-0.04em] text-neutral-900"
              style={{ fontFamily: SATOSHI }}
            >
              <SplitText delay={0.0}>Your partner</SplitText>
              <SplitText delay={0.1}>for clarity,</SplitText>
              <SplitText delay={0.2}>delivery</SplitText>
              <SplitText delay={0.3}>{"& sustainable scale"}</SplitText>
            </h1>
            <div className="pb-2 flex flex-col items-end">
              <p className="text-[16px] font-[500] text-neutral-900 leading-relaxed mb-10 max-w-[440px] self-start" style={{ fontFamily: SATOSHI }}>
                From reactive firefighting to sustainable execution. We work hands-on with scaling teams to reduce friction and improve delivery clarity.
              </p>
              <TransitionLink
                href="/contact"
                className="group flex items-center rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200"
              >
                <span className="flex-1 px-6 py-4 text-[18px] font-[500] text-white group-hover:text-neutral-900 transition-colors duration-200" style={{ fontFamily: SATOSHI }}>
                  Plan a free quick scan
                </span>
                <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <main className="bg-white" style={{ fontFamily: SATOSHI }}>
        {services.map((service, i) => {
          const isEven = i % 2 === 1;
          const hasCutCorner = !isEven;

          const textContent = (
            <div className="flex flex-col justify-center py-16">
              <div className="mb-6">
                <FolderTab />
                <SplitText
                  className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900"
                  style={{ fontFamily: ROBOTO_MONO }}
                  stagger={0.04}
                >
                  {service.label}
                </SplitText>
              </div>

              <SplitText
                className="text-[16px] font-[500] text-neutral-900 leading-relaxed mb-10 max-w-[480px]"
                style={{ fontFamily: SATOSHI }}
                stagger={0.03}
              >
                {service.description}
              </SplitText>

              <div className="mb-10">
                <div className="mb-4">
                  <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: ROBOTO_MONO }}>
                    /WHAT WE DO
                  </p>
                </div>
                <ul className="space-y-2 list-none">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[18px] font-[500] text-neutral-900" style={{ fontFamily: SATOSHI }}>
                      <span className="text-neutral-400 flex-shrink-0 mt-0.5">▪</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowCalendly(true)}
                className="group self-start flex items-center rounded-sm overflow-hidden border border-neutral-300 hover:border-neutral-500 transition-colors duration-200"
              >
                <span className="px-5 py-3 text-[18px] font-[500] text-neutral-900 whitespace-nowrap" style={{ fontFamily: SATOSHI }}>
                  {service.cta}
                </span>
                <span className="m-2 w-8 h-8 flex-shrink-0 rounded-sm bg-[#f9f9f9] text-neutral-600 relative overflow-hidden">
                  <ArrowIcon />
                </span>
              </button>
            </div>
          );

          const imageContent = (
            <div className="py-8">
              <div
                className="w-full aspect-[4/5] overflow-hidden"
                style={hasCutCorner ? { clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" } : {}}
              >
                <TileReveal>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/services-${i + 1}.jpg`}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </TileReveal>
              </div>
            </div>
          );

          return (
            <div key={service.number}>
              <div className="max-w-[1240px] mx-auto px-8">
                <div className="grid grid-cols-2 gap-20">
                  {isEven ? (
                    <>{imageContent}{textContent}</>
                  ) : (
                    <>{textContent}{imageContent}</>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* SOLUTIONS */}
      <section id="solutions" className="px-6 md:px-12 bg-white py-32" style={{ fontFamily: SATOSHI }}>
        <div className="max-w-[1240px] mx-auto">

          <div className="mb-5">
            <FolderTab />
            <SplitText
              className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900"
              style={{ fontFamily: ROBOTO_MONO }}
              stagger={0.04}
            >
              /SOLUTIONS
            </SplitText>
          </div>

          <div className="flex flex-row items-center justify-between gap-6 mb-16">
            <SplitText
              className="flex-[0_0_auto] text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-neutral-900"
              style={{ fontFamily: SATOSHI }}
            >
              Use cases
            </SplitText>
            <SplitText
              className="flex-[1_0_0px] max-w-[500px] text-neutral-900 text-[16px] font-[500] leading-relaxed"
              stagger={0.03}
            >
              {"We work with scaling teams navigating the operational friction that comes with growth."}
            </SplitText>
          </div>

          <div className="grid grid-cols-2 gap-x-20 gap-y-14">
            {solutions.map((s, i) => (
              <div key={s.title}>
                <div className="mb-4 text-neutral-800">{solutionIcons[i]}</div>
                <SplitText
                  className="text-[26px] font-[700] leading-[1.1] tracking-[-0.04em] mb-3 text-neutral-900"
                  style={{ fontFamily: SATOSHI }}
                >
                  {s.title}
                </SplitText>
                <SplitText
                  className="text-neutral-900 text-[14px] font-[500] leading-relaxed max-w-[480px]"
                  stagger={0.03}
                >
                  {s.text}
                </SplitText>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="company" className="py-32 px-6 md:px-12 bg-white" style={{ fontFamily: SATOSHI }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-2 gap-16 items-stretch">

            {/* Left */}
            <div className="flex flex-col">
              <div className="mb-5">
                <FolderTab />
                <SplitText
                  className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900"
                  style={{ fontFamily: ROBOTO_MONO }}
                  stagger={0.04}
                >
                  /ABOUT US
                </SplitText>
              </div>
              <SplitText
                className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] mb-6 text-neutral-900"
                style={{ fontFamily: SATOSHI }}
                stagger={0.06}
              >
                {"The consultant your team has been waiting for."}
              </SplitText>
              <SplitText
                className="text-neutral-900 text-[16px] font-[500] leading-relaxed mb-8"
                stagger={0.03}
              >
                {"Ivana Fisic works at the intersection of delivery leadership, operational systems, AI-enabled workflows, and healthy team dynamics — helping organizations scale without losing clarity or burning people out."}
              </SplitText>

              <TransitionLink href="/about" className="group flex items-center w-1/2 rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200">
                <span className="flex-1 px-6 py-4 text-[18px] font-[500] text-white group-hover:text-neutral-900 transition-colors duration-200" style={{ fontFamily: SATOSHI }}>About Us</span>
                <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </TransitionLink>

              <div className="mt-auto pt-8">
                <div className="bg-[#f9f9f9] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-8" style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}>
                  <SplitText
                    className="text-[26px] font-[700] leading-[1.1] tracking-[-0.04em] mb-5 text-neutral-900"
                    style={{ fontFamily: SATOSHI }}
                  >
                    {"Not sure where to start?"}
                  </SplitText>
                  <div className="flex items-center justify-between gap-8">
                    <SplitText className="text-neutral-900 text-[14px] font-[500] leading-relaxed" stagger={0.03}>
                      {"Book a free 30-minute discovery call to explore how we can help."}
                    </SplitText>
                    <button
                      onClick={() => setShowCalendly(true)}
                      className="group flex items-center flex-shrink-0 rounded-sm overflow-hidden border border-neutral-300 hover:border-neutral-500 transition-colors duration-200"
                    >
                      <span className="px-5 py-3 text-[18px] font-[500] text-neutral-800 whitespace-nowrap" style={{ fontFamily: SATOSHI }}>Book a Call</span>
                      <span className="m-2 w-8 h-8 flex-shrink-0 rounded-sm border border-neutral-200 text-neutral-600 relative overflow-hidden">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto">
                          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right – image */}
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ivana.jpeg" alt="Ivana Fisic" className="w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className="relative px-6 md:px-12 bg-[#0f0f0f]"
        style={{
          fontFamily: SATOSHI,
          clipPath: "polygon(0 0, calc(100% - 80px) 0, 100% 80px, 100% 100%, 0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/footer-g.jpg"
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "354px",
            objectFit: "cover",
            zIndex: 0,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 32%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 32%, black 100%)",
            opacity: footerImgOpacity,
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto">
          <div className="py-20 flex items-center justify-between gap-12">
            <div>
              <h2
                className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-white mb-4"
                style={{ fontFamily: SATOSHI }}
              >
                <SplitText stagger={0.07}>{"Clarity starts with a conversation."}</SplitText>
              </h2>
              <p className="text-white font-normal text-[15px] leading-relaxed max-w-[480px]">
                Book a free 30-minute discovery call and let&apos;s talk about where your team is stuck.
              </p>
            </div>
            <button
              onClick={() => setShowCalendly(true)}
              className="group flex items-center flex-shrink-0 rounded-sm overflow-hidden bg-white hover:bg-[#069494] transition-colors duration-200"
            >
              <span className="flex-1 px-6 py-4 text-[18px] font-[500] text-neutral-900 group-hover:text-white transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: SATOSHI }}>
                Start the Conversation
              </span>
              <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm bg-neutral-100 group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>

          <div className="border-t border-neutral-800" />

          <div className="py-16 grid grid-cols-4 gap-12">
            <FadeInColumn delay={0}>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-5" style={{ fontFamily: ROBOTO_MONO }}>About TealWave</p>
              <p className="text-white font-normal text-[15px] leading-relaxed mb-6">
                TealWave Solutions helps startups and scaling product teams build operational clarity, improve delivery, and scale sustainably.
              </p>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-500 mb-1" style={{ fontFamily: ROBOTO_MONO }}>Email</p>
              <p className="text-white font-normal text-[15px] mb-6">ivanafisic26@gmail.com</p>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-500 mb-1" style={{ fontFamily: ROBOTO_MONO }}>Connect</p>
              <a href="https://rs.linkedin.com/in/ivanafisic" target="_blank" rel="noopener noreferrer" className="text-white font-normal text-[15px] hover:text-neutral-300 transition-colors">LinkedIn</a>
            </FadeInColumn>

            <FadeInColumn delay={0.12}>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: ROBOTO_MONO }}>Navigation</p>
              <ul className="space-y-4 list-none">
                {[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/services" },
                  { label: "Use Cases", href: "#solutions" },
                  { label: "How We Work", href: "/#how-we-work" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: SATOSHI }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </FadeInColumn>

            <FadeInColumn delay={0.24}>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: ROBOTO_MONO }}>Company</p>
              <ul className="space-y-4 list-none">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: SATOSHI }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </FadeInColumn>

            <FadeInColumn delay={0.36}>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: ROBOTO_MONO }}>Legal</p>
              <ul className="space-y-4 list-none">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Legal"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: SATOSHI }}>{l}</a>
                  </li>
                ))}
              </ul>
            </FadeInColumn>
          </div>

          <div className="border-t border-neutral-800 pt-6 pb-32">
            <p className="text-[13px] tracking-wide text-neutral-500">
              &copy; 2026 TEALWAVE. COACOA
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
