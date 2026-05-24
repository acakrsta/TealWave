"use client";

import { useState, useRef, useEffect } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
    title: "AI Strategy & Consulting",
    text: "Turn ambition into action with a clear AI roadmap. We align AI opportunities with your business priorities, define use cases with ROI, and guide you through adoption with confidence.",
  },
  {
    title: "Data Enablement",
    text: "Lay the foundation for AI success. From data strategy and architecture to governance and integration, we ensure your data is ready to power scalable, intelligent solutions.",
  },
  {
    title: "Managed AI Solutions",
    text: "We architect, design, build, and manage AI agentic solutions tailored to your business, so you can focus on outcomes without the technological hassle.",
  },
  {
    title: "AI Proof of Concept",
    text: "We co-create and test high-impact AI use cases, proving value in days or weeks. So you know what to invest in and how to expand with confidence.",
  },
  {
    title: "AI Training & Learning",
    text: "Make AI part of your DNA. We upskill teams, educate, and embed adoption practices so your people and technology grow stronger together.",
  },
];

const solutions = [
  {
    num: "01",
    title: "Knowledge & Retrieval",
    text: "Searches across documents and systems, extracts facts, links context, and returns reliable answers. Converts unstructured files into structured knowledge with memory for reuse.",
  },
  {
    num: "02",
    title: "Workflow Automation",
    text: "Digitizes manual data entry, reconciliations, and routine admin work in finance, HR, and operations. Cuts errors and cycle time with end to end automation.",
  },
  {
    num: "03",
    title: "Workforce Productivity",
    text: "Supports drafting, meeting capture, task routing, and team coordination inside existing tools. Raises throughput without adding headcount.",
  },
  {
    num: "04",
    title: "Monitoring & Compliance",
    text: "Tracks KPIs, policies, and regulatory updates in real time. Builds audit trails, validates data against rules, and enforces governance.",
  },
  {
    num: "05",
    title: "Decision & Planning",
    text: "Combines forecasting, scenario modeling, and optimization to guide plans, schedules, and pricing. Moves decisions from periodic to continuous and data driven.",
  },
  {
    num: "06",
    title: "Operations & Execution",
    text: "Runs service workflows, approvals, and case resolution across systems. Orchestrates handoffs between people and software to shorten cycle times.",
  },
  {
    num: "07",
    title: "Cost & Risk Management",
    text: "Analyzes spend, contracts, and transactions to surface leakage, fraud, and exposure. Prioritizes actions that lower run rate and improve margin at controlled risk.",
  },
  {
    num: "08",
    title: "Content Intelligence",
    text: "Generates, translates, and explains content for reports, contracts, and learning materials. Standardizes structure and tone while keeping provenance intact.",
  },
];

const technologies = [
  "Microsoft", "Mistral", "Anthropic", "Meta", "Databricks", "CrewAI",
  "OpenAI", "Google", "C3.ai", "Glean", "Gemini", "AWS",
];

const processSteps = [
  {
    num: "/01",
    title: "Envision",
    text: "It begins by understanding your goals and challenges to identify where AI can create the most value for your organization. This step clarifies priorities, exposes inefficiencies, and reveals new monetization opportunities.",
  },
  {
    num: "/02",
    title: "Blueprint",
    text: "From shaping a roadmap to addressing urgent challenges, we design and architect AI solutions by identifying both everyday inefficiencies and mission-critical pain points.",
  },
  {
    num: "/03",
    title: "Deploy",
    text: "We build and integrate AI solutions into new or existing workflows, ensuring secure data foundations, current IT system integration, and measurable results from day one.",
  },
  {
    num: "/04",
    title: "Support",
    text: "We partner ongoing to optimize, scale, and govern your AI ecosystem, nurturing continuous improvement and innovation to realize the dual dividend of customer delight and empowered teams.",
  },
];

const faqs = [
  {
    q: "What industries does Subduxion work with?",
    a: "We work across a wide range of industries including financial services, manufacturing, retail, healthcare, and professional services. Our solutions are tailored to the specific challenges and regulatory requirements of each sector.",
  },
  {
    q: "How long does it take to see results?",
    a: "With our AI Proof of Concept offering, you can see demonstrable value within days or weeks. Full deployments typically show measurable ROI within the first quarter of operation, depending on the complexity and scope of the solution.",
  },
  {
    q: "Are your solutions EU AI Act compliant?",
    a: "Yes. Compliance is built into our delivery process. We design solutions with data sovereignty, privacy by design, and EU AI Act requirements at the forefront, ensuring your organization is ready for the regulatory landscape.",
  },
  {
    q: "Do you work with existing systems or require new infrastructure?",
    a: "We integrate with your existing IT landscape wherever possible. Our vendor-independent approach means we select the right tools for your environment, whether that involves cloud platforms you already use or introducing new capabilities alongside current systems.",
  },
  {
    q: "What is the difference between a Managed AI Solution and a Proof of Concept?",
    a: "A Proof of Concept is a time-boxed engagement designed to validate a specific AI use case with minimal investment. A Managed AI Solution is a full-scale, production-grade system that we build, deploy, and continue to operate and optimize on your behalf.",
  },
];

const news = [
  {
    tag: "INSIGHTS",
    date: "MAR 31, 2026",
    title: "Why We Built an Autonomous Sales AI, and What It Means for B2B Teams in Europe",
    excerpt: "Most AI sales tools solve the wrong problem. They automate the output without rethinking the workflow. We spent six months building one that does both.",
  },
  {
    tag: "TIPS",
    date: "FEB 22, 2026",
    title: "Are You AI Act Ready, or Just ‘Using AI’ Without Control?",
    excerpt: "Most companies are integrating AI into existing apps and workflows. Learn how to assess your readiness and what real compliance looks like in practice.",
  },
  {
    tag: "INSIGHTS",
    date: "JAN 13, 2026",
    title: "Understanding AI value starts with GDPval",
    excerpt: "GDPval is OpenAI’s economic framework for measuring AI value: does AI reduce the cost of intelligence? Here is what it means for your AI investments.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4 ${className}`}>
      {children}
    </h2>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-3 left-0 right-0 z-50 h-12 bg-[#f3f3f3]">
        <div className="max-w-[1300px] mx-auto px-8 h-full flex items-center justify-between relative">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Subduxion" className="h-[30px] w-auto" />
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-12 list-none absolute left-1/2 -translate-x-1/2">
          {[
            { label: "SERVICES", href: "#services" },
            { label: "USE CASES", href: "#solutions" },
            { label: "COMPANY", href: "#company" },
            { label: "NEWS", href: "#news" },
            { label: "CAREERS", href: "#careers" },
          ].map((l) => (
            <li key={l.label}>
              <ScrambleLink href={l.href} label={l.label} />
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Language */}
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
          {/* CTA */}
          <a href="#contact" className="group flex items-center rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200">
            <span className="px-4 py-2 text-[16px] font-normal text-white group-hover:text-neutral-900 transition-colors duration-200">Get in touch</span>
            <span className="m-1 w-7 h-7 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#f3f3f3] pt-12">
        <div className="max-w-[1300px] mx-auto w-full px-8 pt-12 pb-16">

          {/* Row 1: Heading + small image */}
          <div className="flex items-start gap-10 mb-24">
            <h1 className="flex-[3] text-[clamp(48px,5.6vw,80px)] font-[700] leading-[1.02] tracking-[-0.03em] text-neutral-900" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              TealWave helps scaling teams build operational clarity without the chaos.
            </h1>
            <div className="flex-shrink-0 w-[260px] xl:w-[300px] self-start rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero1.jpg" alt="Team at AI Innovation Center" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 2: Large image + content */}
          <div className="flex gap-10 items-center">
            {/* Large image */}
            <div className="w-[46%] flex-shrink-0 rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero2.jpg" alt="Developer working at multiple screens" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-10" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <p className="text-[20px] font-normal text-neutral-700 leading-[1.6]">
                Strategic delivery and operational consulting for startups and scaling product teams. We reduce friction, improve visibility, and help founders stop being the bottleneck.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <a href="#contact" className="group flex items-center justify-between flex-1 rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200">
                  <span className="px-6 py-4 text-[18px] font-normal text-white group-hover:text-neutral-900 transition-colors duration-200">Get in Touch</span>
                  <span className="m-1 w-10 h-10 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a href="#services" className="group flex items-center justify-between flex-1 border border-neutral-300 text-neutral-800 hover:bg-neutral-50 transition-colors rounded-sm overflow-hidden">
                  <span className="px-6 py-4 text-[18px] font-normal">What We Do</span>
                  <span className="m-1 w-10 h-10 flex-shrink-0 rounded-sm border border-neutral-200 text-neutral-600 relative overflow-hidden">
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

      {/* PROBLEMS */}
      <section className="bg-neutral-50 border-y border-neutral-200 py-20 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <SectionLabel>Challenges we solve</SectionLabel>
          <p className="text-neutral-500 text-base max-w-lg mb-12">
            We recognize the challenges you face. That is why your path to impact with AI starts here.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 divide-x divide-y divide-neutral-200">
            {[
              "Repetitive work slowing down teams",
              "Slow decisions hurting customer experience",
              "Scaling by adding extra headcount",
              "Technology spend without measurable ROI",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3 p-7 bg-white">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
                <p className="text-neutral-600 text-[14px]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <SectionLabel>How we work</SectionLabel>
          <SectionTitle>Your path to AI impact</SectionTitle>
          <p className="text-neutral-500 text-base max-w-xl mb-16">
            From first conversation to full deployment, we guide you every step of the way.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {processSteps.map((s) => (
              <div key={s.num}>
                <p className="text-[11px] tracking-[0.12em] text-neutral-300 mb-4">{s.num}</p>
                <p className="text-lg font-bold mb-3">{s.title}</p>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="services" className="py-24 px-6 md:px-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-[1300px] mx-auto">
          <SectionLabel>/OUR SERVICES</SectionLabel>
          <SectionTitle>Capabilities</SectionTitle>
          <p className="text-neutral-500 text-base max-w-xl mb-16">
            We design and deliver AI solutions that solve real business challenges, create measurable impact, and build capabilities that will last inside your organization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-neutral-200 divide-x divide-y divide-neutral-200">
            {capabilities.map((c) => (
              <div key={c.title} className="p-8 bg-white hover:bg-neutral-50 transition-colors">
                <p className="font-bold text-[15px] mb-3">{c.title}</p>
                <p className="text-neutral-500 text-[13px] leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="py-24 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <SectionLabel>/SOLUTIONS</SectionLabel>
          <SectionTitle>Use cases</SectionTitle>
          <p className="text-neutral-500 text-base max-w-xl mb-16">
            We focus on domains where agents solve entrenched business problems and unlock measurable value.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 divide-x divide-y divide-neutral-200">
            {solutions.map((s) => (
              <div key={s.num} className="p-7 hover:bg-neutral-50 transition-colors">
                <p className="text-[11px] tracking-[0.12em] text-neutral-300 mb-3">{s.num}</p>
                <p className="font-bold text-[15px] mb-2">{s.title}</p>
                <p className="text-neutral-500 text-[13px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section id="technologies" className="py-24 px-6 md:px-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-[1300px] mx-auto">
          <SectionLabel>/TECHNOLOGIES</SectionLabel>
          <SectionTitle>Vendor independent solutions</SectionTitle>
          <p className="text-neutral-500 text-base max-w-xl mb-16">
            We select the right technology for each challenge &mdash; not the most convenient one.
          </p>
          <div className="flex flex-wrap border border-neutral-200">
            {technologies.map((t) => (
              <div
                key={t}
                className="flex-1 basis-[120px] flex items-center justify-center py-7 px-5 border border-neutral-200 text-[12px] font-bold tracking-widest uppercase text-neutral-400 hover:text-neutral-900 hover:bg-white transition-colors"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="company" className="py-24 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionLabel>/ABOUT US</SectionLabel>
              <SectionTitle>The partner you have been looking for</SectionTitle>
              <p className="text-neutral-500 text-base max-w-lg mb-5">
                We bring together a wealth of experience to make technology work. Partnering with organizations to design bespoke solutions that can meet their highest standards.
              </p>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-5">
                Subduxion is a European AI consulting company and managed solutions provider based at the High Tech Campus in Eindhoven. We design, build, and operate intelligent systems for organizations across industries and borders.
              </p>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-5">
                Applied AI built on data sovereignty, privacy, security and EU ready governance. We deliver copilots, AI agents and workflow automation that boost productivity, customer experience and knowledge work.
              </p>
              <p className="font-bold text-[14px] tracking-wide mb-8">Data you can rely on. AI you can trust.</p>
              <div className="flex gap-3">
                <a
                  href="#contact"
                  className="bg-neutral-900 text-white text-[13px] font-semibold px-6 py-3 rounded hover:bg-neutral-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a
                  href="#services"
                  className="border border-neutral-300 text-neutral-700 text-[13px] font-semibold px-6 py-3 rounded hover:bg-neutral-50 transition-colors"
                >
                  What We Do
                </a>
              </div>
            </div>
            <div className="aspect-[4/3] bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-300 text-sm">
              Team photo
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <div className="border-y border-neutral-200 py-12 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-300 text-center mb-8">
            /TRUSTED BY
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Client A", "Client B", "Client C", "Client D", "Client E", "Client F"].map((c) => (
              <div
                key={c}
                className="px-6 py-3 border border-neutral-200 text-[11px] tracking-widest uppercase text-neutral-300"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS */}
      <section id="news" className="py-24 px-6 md:px-12 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-[1300px] mx-auto">
          <SectionLabel>/NEWS</SectionLabel>
          <SectionTitle>Latest insights</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-neutral-200 divide-x divide-y divide-neutral-200 mt-16">
            {news.map((n) => (
              <div
                key={n.title}
                className="p-8 bg-white hover:bg-neutral-50 transition-colors flex flex-col gap-3"
              >
                <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-400">{n.tag}</p>
                <p className="text-[11px] text-neutral-300">{n.date}</p>
                <p className="font-bold text-[16px] leading-snug">{n.title}</p>
                <p className="text-neutral-500 text-[13px] leading-relaxed flex-1">{n.excerpt}</p>
                <a href="#" className="text-[12px] text-blue-500 mt-auto">Read more &rarr;</a>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#"
              className="border border-neutral-300 text-neutral-700 text-[13px] font-semibold px-6 py-3 rounded hover:bg-neutral-100 transition-colors inline-block"
            >
              Discover more
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12">
        <div className="max-w-[860px] mx-auto">
          <SectionLabel>/FAQ</SectionLabel>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="mt-12 border-t border-neutral-200 divide-y divide-neutral-200">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  className="w-full text-left py-6 flex justify-between items-center gap-5 text-[15px] font-semibold"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <span
                    className={`text-xl text-neutral-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="pb-6 text-neutral-500 text-[14px] leading-relaxed max-w-2xl">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 text-center bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-2xl mx-auto">
          <SectionLabel>/CONTACT</SectionLabel>
          <SectionTitle>Shockingly good AI starts here.</SectionTitle>
          <p className="text-neutral-500 text-base mb-10 max-w-md mx-auto">
            Our experts are always happy to discuss your opportunities. Reach out, and we will connect you with a member of our team.
          </p>
          <a
            href="mailto:info@subduxion.com"
            className="bg-neutral-900 text-white text-[14px] font-semibold px-8 py-4 rounded hover:bg-neutral-700 transition-colors inline-block"
          >
            Start the Conversation
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-neutral-200 pt-16 pb-10 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 mb-4">About Subduxion</p>
              <p className="text-neutral-500 text-[13px] leading-relaxed mb-5">
                Subduxion is a European AI consulting company and managed solutions provider based at the High Tech Campus in Eindhoven. We design, build, and operate intelligent systems for organizations across industries and borders.
              </p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-neutral-400 mb-1">Email</p>
              <p className="text-neutral-500 text-[13px] mb-5">info@subduxion.com</p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-neutral-400 mb-1">Office</p>
              <p className="text-neutral-500 text-[13px] leading-relaxed mb-5">
                High Tech Campus 5<br />5656 AE Eindhoven<br />The Netherlands
              </p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-neutral-400 mb-1">Connect</p>
              <a href="#" className="text-neutral-500 text-[13px] hover:text-neutral-900 transition-colors">LinkedIn</a>
              <div className="mt-6">
                <p className="text-[10px] tracking-[0.1em] uppercase text-neutral-400 mb-3">Ecosystem Partnerships</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 border border-neutral-200 text-[10px] tracking-widest uppercase text-neutral-400">AI Innovation Center</span>
                  <span className="px-3 py-1.5 border border-neutral-200 text-[10px] tracking-widest uppercase text-neutral-400">AIC4NL</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 mb-5">Navigation</p>
              <ul className="space-y-3 list-none">
                {["Home", "Services", "Solutions", "Case Studies"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 mb-5">Company</p>
              <ul className="space-y-3 list-none mb-10">
                {["Company", "Careers", "Contact", "News"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 mb-5">Legal</p>
              <ul className="space-y-3 list-none">
                {["Terms of Services", "Privacy Policy", "Responsible AI", "Legal"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className="text-[11px] tracking-wide text-neutral-400">
              &copy; 2026 SUBDUXION B.V. IS A DUTCH COMPANY. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[11px] text-neutral-300">
              Subduxion is a company name and is not related to the geological term &apos;subduction&apos;.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
