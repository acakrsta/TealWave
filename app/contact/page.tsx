"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      style={{ fontFamily: ROBOTO_MONO }}
    >
      {display}
    </a>
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />
      <div className="relative w-full max-w-[1100px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f0f0f]">
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
            marginTop: "-48px",
            marginLeft: "-48px",
            marginBottom: "-48px",
            width: "calc(100% + 96px)",
            height: "796px",
          }}
        />
      </div>
    </div>
  );
}

export default function ContactPage() {
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
    const handler = (e: Event) => {
      if ((e as CustomEvent).type === "open-calendly") setShowCalendly(true);
    };
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

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:ivanafisic26@gmail.com?subject=Contact from ${form.firstName} ${form.lastName}&body=${encodeURIComponent(
      `Company: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    )}`;
  };

  const labelClass = "block text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900 mb-2";
  const inputClass = "w-full bg-transparent border-b border-neutral-300 pb-3 text-[18px] font-[500] text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-neutral-600 transition-colors";

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
              { label: "USE CASES", href: "/#solutions" },
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

      {/* CONTENT */}
      <main className="min-h-screen bg-[#f9f9f9] pt-[72px]" style={{ fontFamily: SATOSHI }}>
        <div className="max-w-[1240px] mx-auto px-8 py-20">
          <div className="grid grid-cols-2 gap-20">

            {/* LEFT */}
            <div>
              <div className="mb-6">
                <div className="relative w-full h-[5px] mb-3">
                  <div className="absolute left-0 bottom-0 w-full h-px bg-[#e5e5e5]" />
                  <svg className="absolute left-0 top-0 flex-shrink-0" width="183" height="5" viewBox="0 0 183 5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 0 L 178 0 L 183 5 L 0 5 Z" fill="#e5e5e5"/>
                  </svg>
                </div>
                <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-900" style={{ fontFamily: ROBOTO_MONO }}>
                  /GET IN TOUCH
                </p>
              </div>

              <h1
                className="text-[64px] font-[700] leading-[1.0] tracking-[-0.04em] text-neutral-900 mb-6"
                style={{ fontFamily: SATOSHI }}
              >
                Let's talk.
              </h1>

              <p className="text-neutral-900 text-[16px] font-[500] leading-relaxed mb-12 max-w-[420px]" style={{ fontFamily: SATOSHI }}>
                Whether you're dealing with delivery chaos, founder bottlenecks, or just not sure where to start — reach out.
              </p>

              <div className="flex flex-col gap-4">
                {/* Book a call */}
                <div className="bg-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-7 flex items-center justify-between gap-6" style={{ clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)" }}>
                  <div>
                    <h3
                      className="text-[26px] font-[700] leading-[1.1] tracking-[-0.03em] text-neutral-900 mb-1"
                      style={{ fontFamily: SATOSHI }}
                    >
                      Book a discovery call
                    </h3>
                    <p className="text-neutral-900 text-[16px] font-[500]" style={{ fontFamily: SATOSHI }}>Free 30-minute call to explore your operational challenges.</p>
                  </div>
                  <button
                    onClick={() => setShowCalendly(true)}
                    className="group flex items-center flex-shrink-0 rounded-sm overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-colors duration-200"
                  >
                    <span className="px-5 py-3 text-[18px] font-[500] text-neutral-900 whitespace-nowrap" style={{ fontFamily: SATOSHI }}>Book a call</span>
                    <span className="m-2 w-8 h-8 flex-shrink-0 rounded-sm bg-[#f3f3f3] text-neutral-600 relative overflow-hidden">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto">
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Email */}
                <div className="bg-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-7 flex items-center justify-between gap-6" style={{ clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)" }}>
                  <div>
                    <h3
                      className="text-[26px] font-[700] leading-[1.1] tracking-[-0.03em] text-neutral-900 mb-1"
                      style={{ fontFamily: SATOSHI }}
                    >
                      Email us directly
                    </h3>
                    <p className="text-neutral-900 text-[16px] font-[500]" style={{ fontFamily: SATOSHI }}>Prefer email? Reach out anytime.</p>
                  </div>
                  <a
                    href="mailto:ivanafisic26@gmail.com"
                    className="group flex items-center flex-shrink-0 rounded-sm overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-colors duration-200"
                  >
                    <span className="px-5 py-3 text-[18px] font-[500] text-neutral-900 whitespace-nowrap" style={{ fontFamily: SATOSHI }}>Send email</span>
                    <span className="m-2 w-8 h-8 flex-shrink-0 rounded-sm bg-[#f3f3f3] text-neutral-600 relative overflow-hidden">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto">
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT – Form */}
            <div className="pt-[88px]">
              <h2
                className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-neutral-900 mb-10"
                style={{ fontFamily: SATOSHI }}
              >
                Tell us about your team.
              </h2>

              <form onSubmit={handleSubmit} className="bg-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-10 flex flex-col gap-8" style={{ clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)" }}>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass} style={{ fontFamily: ROBOTO_MONO }}>First Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      className={inputClass}
                      style={{ fontFamily: SATOSHI }}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: ROBOTO_MONO }}>Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      className={inputClass}
                      style={{ fontFamily: SATOSHI }}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={{ fontFamily: ROBOTO_MONO }}>Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClass}
                    style={{ fontFamily: SATOSHI }}
                  />
                </div>

                <div>
                  <label className={labelClass} style={{ fontFamily: ROBOTO_MONO }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className={inputClass}
                    style={{ fontFamily: SATOSHI }}
                  />
                </div>

                <div>
                  <label className={labelClass} style={{ fontFamily: ROBOTO_MONO }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={inputClass}
                    style={{ fontFamily: SATOSHI }}
                  />
                </div>

                <div>
                  <label className={labelClass} style={{ fontFamily: ROBOTO_MONO }}>Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What's the biggest operational challenge your team is facing?"
                      rows={5}
                      className={`${inputClass} resize-y`}
                      style={{ fontFamily: SATOSHI }}
                    />
                    <svg className="absolute bottom-2 right-1 pointer-events-none text-neutral-400" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 1L1 13M13 7L7 13M13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group flex items-center w-full rounded-sm overflow-hidden bg-neutral-900 hover:bg-[#069494] transition-colors duration-200"
                >
                  <span className="flex-1 px-6 py-4 text-left text-[18px] font-[500] text-white group-hover:text-neutral-900 transition-colors duration-200" style={{ fontFamily: SATOSHI }}>
                    Send message
                  </span>
                  <span className="m-2 w-10 h-10 flex-shrink-0 rounded-sm bg-[#069494] group-hover:bg-neutral-900 text-neutral-900 group-hover:text-white transition-colors duration-200 relative overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="absolute inset-0 m-auto transition-transform duration-300 ease-out -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

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
            maskImage: "linear-gradient(to bottom, transparent 0%, black 32.1368%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 32.1368%, black 100%)",
            opacity: footerImgOpacity,
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto">

          {/* CTA row */}
          <div className="py-20 flex items-center justify-between gap-12">
            <div>
              <h2
                className="text-[32px] font-[700] leading-[1.1] tracking-[-0.04em] text-white mb-4"
                style={{ fontFamily: SATOSHI }}
              >
                Clarity starts with a conversation.
              </h2>
              <p className="text-white font-normal text-[15px] leading-relaxed max-w-[480px]">
                Book a free 30-minute discovery call and let's talk about where your team is stuck.
              </p>
            </div>
            <button
              onClick={() => setShowCalendly(true)}
              className="group flex items-center flex-shrink-0 rounded-sm overflow-hidden bg-white hover:bg-[#069494] transition-colors duration-200"
            >
              <span className="flex-1 px-6 py-4 text-[18px] font-[500] text-neutral-900 group-hover:text-white transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: SATOSHI }}>Start the Conversation</span>
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
          <div className="py-16 grid grid-cols-4 gap-12">

            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-5" style={{ fontFamily: ROBOTO_MONO }}>About TealWave</p>
              <p className="text-white font-normal text-[15px] leading-relaxed mb-6">
                TealWave Solutions helps startups and scaling product teams build operational clarity, improve delivery, and scale sustainably.
              </p>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-500 mb-1" style={{ fontFamily: ROBOTO_MONO }}>Email</p>
              <p className="text-white font-normal text-[15px] mb-6">ivanafisic26@gmail.com</p>
              <p className="text-[14px] font-normal tracking-[0.1em] uppercase text-neutral-500 mb-1" style={{ fontFamily: ROBOTO_MONO }}>Connect</p>
              <a href="https://rs.linkedin.com/in/ivanafisic" target="_blank" rel="noopener noreferrer" className="text-white font-normal text-[15px] hover:text-neutral-300 transition-colors">LinkedIn</a>
            </div>

            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: ROBOTO_MONO }}>Navigation</p>
              <ul className="space-y-4 list-none">
                {[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/#services" },
                  { label: "Use Cases", href: "/#solutions" },
                  { label: "How We Work", href: "/#how-we-work" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: SATOSHI }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
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
            </div>

            <div>
              <p className="text-[14px] font-normal tracking-[0.12em] uppercase text-neutral-500 mb-6" style={{ fontFamily: ROBOTO_MONO }}>Legal</p>
              <ul className="space-y-4 list-none">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Legal"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[22px] font-[500] text-white hover:text-[#069494] transition-colors" style={{ fontFamily: SATOSHI }}>{l}</a>
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
