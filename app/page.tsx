"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { TransitionLink } from "./components/TransitionLink";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function SplitText({
  children,
  className,
  style,
  stagger = 0.05,
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
          transition={{ duration: 0.45, delay: delay + i * stagger, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ScrambleLink({ href, label }: { href: string; label: string }) {
  const [display, setDisplay] = useState(label);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = () => {
    let tick = 0;
    if (interval.current) clearInterval(interval.current);

    interval.current = setInterval(() => {
      tick++;
      const locked = Math.floor(tick / 3); // jedan karakter se zaključava svakih 3 tikova (60ms)

      setDisplay(
        label
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < locked) return label[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (locked >= label.length) {
        clearInterval(interval.current!);
        setDisplay(label);
      }
    }, 45);
  };

  useEffect(() => () => { if (interval.current) clearInterval(interval.current); }, []);

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      className="text-[15px] text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-4 decoration-neutral-400 transition-colors cursor-pointer"
      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
    >
      {display}
    </a>
  );
}

const capabilities = [
  {
    title: "Delivery Stabilization Sprint",
    text: "A focused 2-week engagement to identify delivery bottlenecks, operational friction, and alignment gaps — with a clear improvement roadmap at the end.",
  },
  {
    title: "Fractional Head of Delivery",
    text: "Strategic delivery and operational leadership on a monthly retainer. For teams that need senior guidance without a full-time hire.",
  },
  {
    title: "Ways of Working Workshops",
    text: "Facilitated sessions on communication clarity, ownership models, and healthy collaboration — for teams and leadership alike.",
  },
  {
    title: "AI Workflow & Operational Optimization",
    text: "Practical AI integration into your delivery and operational systems — without adding more noise or complexity.",
  },
];

const capabilityIcons = [
  /* Strategy – target */
  <svg key="s" width="88" height="88" viewBox="0 0 88 88" fill="none">
    <circle cx="44" cy="44" r="30" stroke="#d2d2d2" strokeWidth="3"/>
    <circle cx="44" cy="44" r="19" stroke="#d2d2d2" strokeWidth="3"/>
    <circle cx="44" cy="44" r="8" fill="#d2d2d2"/>
    <line x1="44" y1="14" x2="44" y2="7"  stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round"/>
    <line x1="74" y1="44" x2="81" y2="44" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round"/>
    <line x1="44" y1="74" x2="44" y2="81" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round"/>
    <line x1="14" y1="44" x2="7"  y2="44" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round"/>
  </svg>,
  /* Data – stacked cylinders */
  <svg key="d" width="88" height="88" viewBox="0 0 88 88" fill="none">
    <ellipse cx="44" cy="22" rx="24" ry="9" stroke="#d2d2d2" strokeWidth="3"/>
    <path d="M20 22 L20 44" stroke="#d2d2d2" strokeWidth="3"/>
    <path d="M68 22 L68 44" stroke="#d2d2d2" strokeWidth="3"/>
    <ellipse cx="44" cy="44" rx="24" ry="9" stroke="#d2d2d2" strokeWidth="3"/>
    <path d="M20 44 L20 66" stroke="#d2d2d2" strokeWidth="3"/>
    <path d="M68 44 L68 66" stroke="#d2d2d2" strokeWidth="3"/>
    <ellipse cx="44" cy="66" rx="24" ry="9" stroke="#d2d2d2" strokeWidth="3"/>
  </svg>,
  /* Managed – cloud */
  <svg key="m" width="88" height="88" viewBox="0 0 88 88" fill="none">
    <path d="M26 60 C14 60 12 48 20 42 C18 30 30 22 42 28 C44 18 54 14 64 20 C72 26 72 38 64 44 C72 46 74 56 68 62 C64 66 56 64 50 64 L28 64 Z" stroke="#d2d2d2" strokeWidth="3" fill="none" strokeLinejoin="round"/>
  </svg>,
  /* PoC – clipboard */
  <svg key="p" width="88" height="88" viewBox="0 0 88 88" fill="none">
    <rect x="24" y="18" width="40" height="54" rx="4" stroke="#d2d2d2" strokeWidth="3"/>
    <rect x="32" y="13" width="24" height="12" rx="3" stroke="#d2d2d2" strokeWidth="3"/>
    <polyline points="32,34 37,39 46,29" stroke="#d2d2d2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="32" y1="48" x2="56" y2="48" stroke="#d2d2d2" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="32" y1="58" x2="48" y2="58" stroke="#d2d2d2" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>,
  /* Training – sync arrows */
  <svg key="t" width="88" height="88" viewBox="0 0 88 88" fill="none">
    <path d="M60 28 A24 24 0 1 1 24 48" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round"/>
    <polyline points="52,20 60,28 52,36" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 60 A24 24 0 1 1 64 40" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round"/>
    <polyline points="36,68 28,60 36,52" stroke="#d2d2d2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
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



function ChallengesSection() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Full 0→1 range defined explicitly — no extrapolation possible
  const y1  = useTransform(scrollYProgress, [0, 0.04, 0.20, 1], [60, 60, 0, 0]);
  const op1 = useTransform(scrollYProgress, [0, 0.04, 0.20, 1], [0,  0,  1, 1]);

  const y2  = useTransform(scrollYProgress, [0, 0.26, 0.42, 1], [60, 60, 0, 0]);
  const op2 = useTransform(scrollYProgress, [0, 0.26, 0.42, 1], [0,  0,  1, 1]);

  const y3  = useTransform(scrollYProgress, [0, 0.50, 0.66, 1], [60, 60, 0, 0]);
  const op3 = useTransform(scrollYProgress, [0, 0.50, 0.66, 1], [0,  0,  1, 1]);

  const y4  = useTransform(scrollYProgress, [0, 0.74, 0.90, 1], [60, 60, 0, 0]);
  const op4 = useTransform(scrollYProgress, [0, 0.74, 0.90, 1], [0,  0,  1, 1]);

  const mobileTops  = ["8%", "20%", "67%", "77%"];
  const mobileLefts = ["36%", "62%", "36%", "62%"];
  const pills = [
    { text: "Delivery becoming reactive and unpredictable",  top: "22%", left: "24%", y: y1, opacity: op1 },
    { text: "Founders stuck as the operational bottleneck",  top: "25%", left: "76%", y: y2, opacity: op2 },
    { text: "Teams overwhelmed by constant context switching", top: "75%", left: "31%", y: y3, opacity: op3 },
    { text: "Priorities changing faster than work gets done", top: "78%", left: "70%", y: y4, opacity: op4 },
  ].map((p, i) => ({
    ...p,
    top:  isMobile ? mobileTops[i]  : p.top,
    left: isMobile ? mobileLefts[i] : p.left,
  }));

  return (
    <section ref={ref} className="relative bg-white" style={{ height: "4100px" }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: "900px" }}>
        {/* Large centered text */}
        <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none">
          <p
            className="w-full max-w-[680px] md:max-w-[1240px] px-6 md:px-8 text-center text-[24px] md:text-[clamp(20px,2.5vw,28px)] font-[700] leading-[1.3] tracking-[-0.01em] text-[#0f0f0f] whitespace-normal md:whitespace-nowrap"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            We recognize the operational friction scaling teams face. That is why sustainable delivery starts here.
          </p>
        </div>

        {/* Floating pills – each fades + slides up in its own scroll window */}
        {pills.map((pill, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: pill.top, left: pill.left }}
          >
            <motion.div style={{ y: pill.y, opacity: pill.opacity }}>
              <div
                className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3.5 w-[185px] md:w-auto md:max-w-none"
                style={{ backgroundColor: "#f3f3f3" }}
              >
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" className="flex-shrink-0">
                  <path d="M9 1L17.3 16H0.7L9 1Z" fill="#ff9500" />
                  <line x1="9" y1="7" x2="9" y2="11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="9" cy="13.5" r="0.8" fill="white" />
                </svg>
                <span
                  className="text-[13px] md:text-[18px] font-[500] text-[#131313]"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {pill.text}
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const op1 = useTransform(scrollYProgress, [0, 0, 0.22, 0.28, 1],       [1, 1, 1, 0, 0]);
  const op2 = useTransform(scrollYProgress, [0, 0.22, 0.28, 0.47, 0.53, 1], [0, 0, 1, 1, 0, 0]);
  const op3 = useTransform(scrollYProgress, [0, 0.47, 0.53, 0.72, 0.78, 1], [0, 0, 1, 1, 0, 0]);
  const op4 = useTransform(scrollYProgress, [0, 0.72, 0.78, 1],           [0, 0, 1, 1]);

  const steps = [
    {
      num: "/01", opacity: op1,
      title: "Discovery",
      text: "We start by understanding your operational challenges, delivery patterns, and where friction is slowing your team down.",
      illustration: (
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
          <circle cx="140" cy="140" r="118" stroke="#069494" strokeWidth="1"   strokeOpacity="0.12"/>
          <circle cx="140" cy="140" r="88"  stroke="#069494" strokeWidth="1"   strokeOpacity="0.22"/>
          <circle cx="140" cy="140" r="58"  stroke="#069494" strokeWidth="1.5" strokeOpacity="0.38"/>
          <circle cx="140" cy="140" r="28"  stroke="#069494" strokeWidth="2"   strokeOpacity="0.6"/>
          <line x1="140" y1="22"  x2="140" y2="258" stroke="#069494" strokeWidth="1" strokeOpacity="0.1"/>
          <line x1="22"  y1="140" x2="258" y2="140" stroke="#069494" strokeWidth="1" strokeOpacity="0.1"/>
          <path d="M140 140 L230 82 A105 105 0 0 1 245 140 Z" fill="#069494" opacity="0.07"/>
          <line x1="140" y1="140" x2="230" y2="82" stroke="#069494" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round"/>
          <circle cx="140" cy="140" r="7" fill="#069494" opacity="0.85"/>
        </svg>
      ),
    },
    {
      num: "/02", opacity: op2,
      title: "Assessment",
      text: "We review your workflows, communication systems, ownership structures, and delivery health in depth.",
      illustration: (
        <svg width="256" height="256" viewBox="0 0 256 256" fill="none">
          {[0,1,2,3].map(row =>
            [0,1,2,3].map(col => {
              const x = 14 + col * 58, y = 14 + row * 58;
              const idx = row * 4 + col;
              const filled = idx < 9;
              const opacity = filled ? Math.max(0.25, 0.85 - idx * 0.07) : 0;
              return filled
                ? <rect key={`${row}-${col}`} x={x} y={y} width="52" height="52" rx="4" fill="#069494" opacity={opacity}/>
                : <rect key={`${row}-${col}`} x={x} y={y} width="52" height="52" rx="4" stroke="#069494" strokeWidth="1.5" strokeOpacity={0.18 - idx * 0.005}/>;
            })
          )}
        </svg>
      ),
    },
    {
      num: "/03", opacity: op3,
      title: "Recommendations",
      text: "We define priorities, improvements, and a clear engagement structure tailored to your organization.",
      illustration: (
        <svg width="320" height="180" viewBox="0 0 320 180" fill="none">
          <defs>
            <linearGradient id="tw3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#069494" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#069494" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <path d="M30 155 C70 155 90 55 160 55 C230 55 250 105 290 80" stroke="url(#tw3)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx="30"  cy="155" r="10" fill="white" stroke="#069494" strokeWidth="2" strokeOpacity="0.35"/>
          <circle cx="30"  cy="155" r="5"  fill="#069494" opacity="0.35"/>
          <circle cx="110" cy="105" r="10" fill="white" stroke="#069494" strokeWidth="2" strokeOpacity="0.55"/>
          <circle cx="110" cy="105" r="5"  fill="#069494" opacity="0.55"/>
          <circle cx="205" cy="57"  r="10" fill="white" stroke="#069494" strokeWidth="2" strokeOpacity="0.8"/>
          <circle cx="205" cy="57"  r="5"  fill="#069494" opacity="0.8"/>
          <circle cx="290" cy="80"  r="12" fill="#069494" opacity="0.9"/>
          <polyline points="283,72 291,80 283,88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      num: "/04", opacity: op4,
      title: "Collaboration",
      text: "Hands-on operational support, facilitation, delivery leadership, and workflow optimization — together.",
      illustration: (
        <svg width="280" height="240" viewBox="0 0 280 240" fill="none">
          <circle cx="105" cy="120" r="88" fill="#069494" fillOpacity="0.18"/>
          <circle cx="175" cy="120" r="88" fill="#069494" fillOpacity="0.18"/>
          <circle cx="105" cy="120" r="88" stroke="#069494" strokeWidth="1.5" strokeOpacity="0.4"/>
          <circle cx="175" cy="120" r="88" stroke="#069494" strokeWidth="1.5" strokeOpacity="0.4"/>
          <circle cx="105" cy="120" r="5" fill="#069494" opacity="0.6"/>
          <circle cx="175" cy="120" r="5" fill="#069494" opacity="0.6"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <div id="how-we-work" />

      {/* Mobile: static vertical list */}
      <section className="block md:hidden bg-white">
        <div className="px-6 pt-10 pb-4">
          <div className="relative w-full h-[5px] mb-3">
            <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
            <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
            </svg>
          </div>
          <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>/HOW WE WORK</p>
        </div>

        {steps.map((step) => (
          <div key={step.num} className="px-6 pt-8 pb-12">
            <span
              className="text-[32px] font-[700] leading-none tracking-[-0.04em] text-neutral-200 block mb-8"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              {step.num}
            </span>
            <div className="flex justify-center mb-8">{step.illustration}</div>
            <h3
              className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] mb-4 text-neutral-900"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              {step.title}
            </h3>
            <p className="text-neutral-900 text-[16px] font-[500] leading-relaxed">{step.text}</p>
          </div>
        ))}
      </section>

      {/* Desktop: sticky scroll animation */}
      <section ref={ref} className="hidden md:block relative bg-white" style={{ height: "400vh" }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

          {/* Section label */}
          <div className="absolute top-8 left-0 right-0">
            <div className="max-w-[1240px] mx-auto px-6 md:px-12">
              <div className="relative w-full h-[5px] mb-3">
                <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
                <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
                </svg>
              </div>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>/HOW WE WORK</p>
            </div>
          </div>

          {steps.map((step) => (
            <motion.div key={step.num} style={{ opacity: step.opacity }} className="absolute inset-0">
              <div className="max-w-[1240px] mx-auto px-6 md:px-12 h-full relative">

                {/* Step number */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2">
                  <span
                    className="text-[52px] font-[700] leading-none tracking-[-0.04em] text-neutral-200"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Illustration */}
                <div className="absolute left-[38%] top-[46%] -translate-x-1/2 -translate-y-1/2">
                  {step.illustration}
                </div>

                {/* Text */}
                <div className="absolute right-12 bottom-[18%] max-w-[380px]">
                  <h3
                    className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] mb-4 text-neutral-900"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-neutral-900 text-[16px] font-[500] leading-relaxed">{step.text}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}


function CalendlyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75" />
      {/* Scrollable layer – click outside card closes modal */}
      <div
        className="absolute inset-0 overflow-y-auto"
        onClick={onClose}
      >
        <div className="flex min-h-full items-start justify-center p-4 py-8">
          <div
            className="relative w-full max-w-[1100px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f0f0f]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <iframe
              src="https://calendly.com/tealwavesolutions/30min?hide_gdpr_banner=1&primary_color=069494"
              style={{
                display: "block",
                border: "none",
                marginLeft: "-48px",
                marginBottom: "-48px",
                width: "calc(100% + 96px)",
                height: "796px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerImgOpacity = useTransform(footerProgress, [0, 0.6, 1], [0, 0, 1]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (heroRef.current) {
        setPastHero(currentY > heroRef.current.offsetHeight);
      }
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
        animate={{ y: navHidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] ${pastHero ? "bg-white border-b border-neutral-200" : "bg-[#f9f9f9]"}`}
      >
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 h-full flex items-center justify-between relative">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Subduxion" className="h-[22px] md:h-[30px] w-auto" />
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-12 list-none absolute left-1/2 -translate-x-1/2">
          {[
            { label: "SERVICES", href: "/services" },
            { label: "USE CASES", href: "/services#solutions" },
            { label: "HOW WE WORK", href: "#how-we-work" },
            { label: "ABOUT", href: "/about" },
          ].map((l) => (
            <li key={l.label}>
              <ScrambleLink href={l.href} label={l.label} />
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Language – hidden on mobile */}
          <button className="hidden md:flex items-center gap-1 text-[14px] font-semibold tracking-wide text-neutral-600 hover:text-neutral-900 transition-colors">
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
          {/* CTA – outline on mobile, filled on desktop */}
          <TransitionLink href="/contact" className="flex group items-center rounded-sm overflow-hidden border border-neutral-300 md:border-0 md:bg-neutral-900 hover:bg-neutral-50 md:hover:bg-[#069494] transition-colors duration-200">
            <span className="px-3 py-[7px] md:px-4 md:py-2 text-[14px] md:text-[18px] font-[500] text-neutral-900 md:text-white md:group-hover:text-neutral-900 transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>Get in touch</span>
            <span className="hidden md:flex m-2 w-7 h-7 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </TransitionLink>
          {/* Hamburger – visible on mobile only, with border */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 border border-neutral-300 rounded-sm gap-[5px]"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span className="w-5 h-[1.5px] bg-neutral-800 block"
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span className="w-5 h-[1.5px] bg-neutral-800 block"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span className="w-5 h-[1.5px] bg-neutral-800 block"
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-[72px] left-0 right-0 bottom-0 z-40 bg-[#f9f9f9] flex flex-col px-6 md:hidden overflow-y-auto"
          >
            <ul className="flex flex-col list-none">
              {[
                { label: "Services", href: "/services" },
                { label: "Use Cases", href: "/services#solutions" },
                { label: "How We Work", href: "#how-we-work" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <li key={l.label} className="border-b border-neutral-200">
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-5 text-[28px] font-[700] tracking-[-0.02em] text-neutral-900"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 pb-8">
              <ul className="flex flex-col list-none">
                <li className="border-b border-neutral-200">
                  <button
                    onClick={() => { setMenuOpen(false); setShowCalendly(true); }}
                    className="block w-full text-left py-4 text-[13px] font-normal tracking-[0.12em] uppercase text-neutral-500"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    Book a Call
                  </button>
                </li>
                <li className="border-b border-neutral-200">
                  <a
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-[13px] font-normal tracking-[0.12em] uppercase text-neutral-500"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    Contact
                  </a>
                </li>
                <li className="border-b border-neutral-200">
                  <a
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-[13px] font-normal tracking-[0.12em] uppercase text-neutral-500"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section ref={heroRef} className="bg-[#f9f9f9] pt-12">
        <div className="max-w-[1240px] mx-auto w-full px-8 pt-12 pb-16">

          {/* Row 1: Heading + small image */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-12 md:mb-24">
            <h1 className="w-full md:flex-[3] text-[36px] md:text-[50px] lg:text-[64px] font-[700] leading-[1.02] tracking-[-0.03em] text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              TealWave helps scaling teams build operational clarity without the chaos.
            </h1>
            <div className="hidden md:block flex-shrink-0 w-[260px] xl:w-[300px] self-start rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero1.jpg" alt="Team at AI Innovation Center" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 2: Large image + content */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            {/* Large image */}
            <div className="w-full md:w-[46%] flex-shrink-0 rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero2.jpg" alt="Developer working at multiple screens" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-10" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <p className="text-[16px] font-[500] text-neutral-900 leading-[1.6]">
                Strategic delivery and operational consulting for startups and scaling product teams. We reduce friction, improve visibility, and help founders stop being the bottleneck.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <TransitionLink href="/contact" className="group flex items-center sm:flex-1 rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200">
                  <span className="flex-1 px-6 py-4 text-[18px] font-[500] text-white group-hover:text-neutral-900 transition-colors duration-200" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>Get in Touch</span>
                  <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </TransitionLink>
                <a href="#services" className="group flex items-center sm:flex-1 border border-neutral-300 text-neutral-800 hover:bg-neutral-50 transition-colors rounded-sm overflow-hidden">
                  <span className="flex-1 px-6 py-4 text-[18px] font-[500]" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>What We Do</span>
                  <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm border border-neutral-200 text-neutral-600 relative overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <ChallengesSection />

      {/* CAPABILITIES */}
      <section id="services" className="px-6 md:px-12 bg-white pb-24">
        <div className="max-w-[1240px] mx-auto">

          {/* Top line + label */}
          <div className="mb-5">
            <div className="relative w-full h-[5px] mb-3">
              <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
              <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
              </svg>
            </div>
            <SplitText className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: "var(--font-roboto-mono), monospace" }} stagger={0.04}>/OUR SERVICES</SplitText>
          </div>

          {/* Title + description row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 pb-8 md:pb-12 mb-8 md:mb-12">
            <SplitText className="flex-[0_0_auto] text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>Services</SplitText>
            <SplitText className="flex-[1_0_0px] max-w-[500px] text-neutral-900 text-[16px] font-[500] leading-relaxed" stagger={0.03}>
              {"We design operational systems that reduce friction, improve delivery clarity, and help teams scale sustainably — without burning people out."}
            </SplitText>
          </div>

          {/* Row 1: 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {capabilities.slice(0, 2).map((c, i) => (
              <div key={c.title} className="bg-[#f9f9f9] rounded-2xl p-8 flex flex-col min-h-[380px]">
                <div className="flex-1 flex items-center justify-center py-4">
                  {capabilityIcons[i]}
                </div>
                <SplitText className="text-[26px] font-[700] leading-[1.1] tracking-[-0.04em] mb-3 text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>{c.title}</SplitText>
                <SplitText className="text-neutral-900 text-[14px] font-[500] leading-relaxed" stagger={0.03}>{c.text}</SplitText>
              </div>
            ))}
          </div>

          {/* Row 2: 2 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {capabilities.slice(2).map((c, i) => (
              <div key={c.title} className="bg-[#f9f9f9] rounded-2xl p-8 flex flex-col min-h-[300px]">
                <div className="flex-1 flex items-center justify-center py-4">
                  {capabilityIcons[i + 2]}
                </div>
                <SplitText className="text-[26px] font-[700] leading-[1.1] tracking-[-0.04em] mb-3 text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>{c.title}</SplitText>
                <SplitText className="text-neutral-900 text-[14px] font-[500] leading-relaxed" stagger={0.03}>{c.text}</SplitText>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="px-6 md:px-12 bg-white pb-24">
        <div className="max-w-[1240px] mx-auto">

          {/* Top line + label */}
          <div className="mb-5">
            <div className="relative w-full h-[5px] mb-3">
              <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
              <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
              </svg>
            </div>
            <SplitText className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: "var(--font-roboto-mono), monospace" }} stagger={0.04}>/SOLUTIONS</SplitText>
          </div>

          {/* Title + description */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-10 md:mb-16">
            <SplitText className="flex-[0_0_auto] text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>Use cases</SplitText>
            <SplitText className="flex-[1_0_0px] max-w-[500px] text-neutral-900 text-[16px] font-[500] leading-relaxed" stagger={0.03}>
              {"We work with scaling teams navigating the operational friction that comes with growth."}
            </SplitText>
          </div>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 md:gap-y-14">
            {solutions.map((s, i) => (
              <div key={s.title}>
                <div className="mb-4 text-neutral-800">{solutionIcons[i]}</div>
                <SplitText className="text-[26px] font-[700] leading-[1.1] tracking-[-0.04em] mb-3 text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>{s.title}</SplitText>
                <SplitText className="text-neutral-900 text-[14px] font-[500] leading-relaxed max-w-[480px]" stagger={0.03}>{s.text}</SplitText>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <ProcessSection />


      {/* ABOUT */}
      <section id="company" className="py-24 px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">

            {/* Left */}
            <div className="flex flex-col">
              <div className="mb-5">
                <div className="relative w-full h-[5px] mb-3">
                  <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
                  <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
                  </svg>
                </div>
                <SplitText className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: "var(--font-roboto-mono), monospace" }} stagger={0.04}>/ABOUT US</SplitText>
              </div>
              <SplitText className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] mb-6 text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }} stagger={0.06}>
                {"The consultant your team has been waiting for."}
              </SplitText>
              <SplitText className="text-neutral-900 text-[16px] font-[500] leading-relaxed mb-8" stagger={0.03}>
                {"Ivana Fisic works at the intersection of delivery leadership, operational systems, AI-enabled workflows, and healthy team dynamics — helping organizations scale without losing clarity or burning people out."}
              </SplitText>

              {/* About Us button */}
              <TransitionLink href="/about" className="group flex items-center w-2/3 md:w-1/2 rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200">
                <span className="flex-1 px-6 py-4 text-[18px] font-[500] text-white group-hover:text-neutral-900 transition-colors duration-200" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>About Us</span>
                <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </TransitionLink>

              {/* Join us card */}
              <div className="mt-auto pt-8">
                <div className="bg-[#f9f9f9] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-8" style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)' }}>
                  <SplitText className="text-[26px] font-[700] leading-[1.1] tracking-[-0.04em] mb-4 text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>{"Not sure where to start?"}</SplitText>
                  <SplitText className="text-neutral-900 text-[14px] font-[500] leading-relaxed mb-6" stagger={0.03}>
                    {"Book a free 30-minute discovery call to explore how we can help."}
                  </SplitText>
                  <button onClick={() => setShowCalendly(true)} className="group flex items-center rounded-sm overflow-hidden border border-neutral-300 hover:border-neutral-500 transition-colors duration-200">
                    <span className="px-5 py-3 text-[18px] font-[500] text-neutral-800 whitespace-nowrap" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>Book a Call</span>
                    <span className="m-2 w-8 h-8 flex-shrink-0 rounded-sm border border-neutral-200 text-neutral-600 relative overflow-hidden">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto">
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
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
          fontFamily: "'Satoshi', sans-serif",
          clipPath: "polygon(0 0, calc(100% - 80px) 0, 100% 80px, 100% 100%, 0 100%)",
        }}
      >
        {/* Background image */}
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
            maskImage: "linear-gradient(to bottom, transparent 0%, black 32.1368%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 32.1368%, black 100%)",
            opacity: footerImgOpacity,
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto">

          {/* CTA row */}
          <div className="pt-24 pb-12 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
            <div>
              <SplitText className="text-[28px] md:text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-white mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }} stagger={0.07}>
                {"Clarity starts with a conversation."}
              </SplitText>
              <SplitText className="text-white font-normal text-[15px] leading-relaxed max-w-[480px]" stagger={0.03}>
                {"Book a free 30-minute discovery call and let's talk about where your team is stuck."}
              </SplitText>
            </div>
            <button onClick={() => setShowCalendly(true)} className="group flex items-center w-auto flex-shrink-0 rounded-sm overflow-hidden bg-white hover:bg-[#069494] transition-colors duration-200">
              <span className="px-6 py-4 text-[18px] font-[500] text-neutral-900 group-hover:text-white transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>Start the Conversation</span>
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

          {/* Divider */}
          <div className="border-t border-neutral-800" />

          {/* Links grid */}
          <div className="py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

            {/* About */}
            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-5" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>About TealWave</p>
              <p className="text-white font-normal text-[15px] leading-relaxed mb-6">
                TealWave Solutions helps startups and scaling product teams build operational clarity, improve delivery, and scale sustainably.
              </p>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-500 mb-1" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>Email</p>
              <p className="text-white font-normal text-[15px] mb-6">ivanafisic26@gmail.com</p>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-500 mb-1" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>Connect</p>
              <a href="https://rs.linkedin.com/in/ivanafisic" target="_blank" rel="noopener noreferrer" className="text-white font-normal text-[15px] hover:text-neutral-300 transition-colors">LinkedIn</a>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>Navigation</p>
              <ul className="space-y-4 list-none">
                {[
                  { label: "Home", href: "#" },
                  { label: "Services", href: "#services" },
                  { label: "Use Cases", href: "/services#solutions" },
                  { label: "How We Work", href: "#how-we-work" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: "'Satoshi', sans-serif" }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>Company</p>
              <ul className="space-y-4 list-none">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: "'Satoshi', sans-serif" }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>Legal</p>
              <ul className="space-y-4 list-none">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Legal"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: "'Satoshi', sans-serif" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Copyright */}
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
