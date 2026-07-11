import React, { useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import profilePic from "./assets/profPic.jpg"
import miniSIEM from "./assets/project-miniSIEMdashboard.png"
import bvDemo from "./assets/project-bv-demo.mov"
import dishcisionDemo from "./assets/project-dishcision-demo.MP4"
import cv from "./assets/cvMay2026.pdf"

// ---------------------------------------------------------------
// Lee Khai Fung — Portfolio v2 (Simplefolio-inspired)
// White hero · teal gradient sections · tilting project cards
// Display/Body: Montserrat · Gradient: #02AAB0 → #00CDAC
// ---------------------------------------------------------------

const GRAD = "linear-gradient(135deg, #02AAB0 0%, #00CDAC 100%)";
const TEAL = "#02AAB0";
const MINT = "#00CDAC";
const DARK = "#272727";
const GREY = "#5f6f7a";

const font = "'Montserrat', 'Segoe UI', sans-serif";

// --------------------------- data ------------------------------

const PROJECTS = [
  {
    name: "Dishcision",
    meta: "Pantry Tracker & Recipe Matcher · Mobile App",
    desc:
      "Track your pantry with automatic expiry labelling, match recipes to what you already own, and see how much you've saved. REST APIs on Spring Boot with PostgreSQL and Gmail SMTP authentication; Expo navigation keeps every page within 2 clicks.",
    stack: ["React Native", "Expo", "Spring Boot", "PostgreSQL"],
    live: "#", // placeholder — swap in demo URL when deployed
    livePlaceholder: true,
    code: "https://github.com/khaifunglee/Dishcision",
    video: dishcisionDemo,
  },
  {
    name: "Therapeutic Mental Health Tool",
    meta: "Braver Ventures · Tech Lead, team of 5",
    desc:
      "A clinician platform for assigning personalised exercises and reviewing client journals — with calendar integration (Google & Outlook) and AI-powered client insights. Redesigned navigation so every core feature is within 2 clicks. Showcased at the Endeavour Exhibition.",
    stack: ["React", "Spring Boot", "MySQL", "AWS", "LLM APIs"],
    live: null,
    code: "#",
    codePlaceholder: true,
    video: bvDemo,
  },
  {
    name: "Self-hosted Mini-SIEM",
    meta: "Security Monitoring · Personal Project",
    desc:
      "A Dockerised ELK pipeline (Filebeat → Logstash → Elasticsearch → Kibana) that parses 3 log formats with custom grok patterns and visualises security events across 10+ chart types, backed by 7 detection rules for manual investigation workflows.",
    stack: ["Filebeat", "Elastic Stack", "Docker", "Bash", "Linux"],
    live: null,
    code: "https://github.com/khaifunglee/mini-SIEM",
    img: miniSIEM,
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer Intern — Braver Ventures",
    period: "Jul – Nov 2025",
    desc: "Tech Lead in a team of 5; built and deployed a full-stack mental health platform on React, Spring Boot and AWS.",
  },
  {
    role: "Consultant Intern — Amplifon",
    period: "Mar – Jun 2025",
    desc: "Delivered 6 strategic recommendations; identified 3 digital outreach channels and a roadmap to 1.4M eligible clients via Python web scraping and Excel analysis.",
  },
  {
    role: "Assistant Sponsorship Director — Malaysians of Melbourne University",
    period: "2022 – 2023",
    desc: "Led a team of 10; secured 70+ FnB and 11 corporate sponsors, raising $5,000+ in contributions.",
  },
];

const SKILLS = [
  "Java", "JavaScript", "TypeScript", "Python", "SQL", "React", "React Native",
  "Spring Boot", "AWS", "Docker", "MySQL", "PostgreSQL", "ELK Stack", "Linux", "Git",
];

// ------------------------- animations ---------------------------

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// 3D tilt card (Simplefolio signature)
function TiltCard({ children }) {
  const ref = useRef(null);
  const reduced = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);
  const onMove = (e) => {
    if (reduced.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s ease", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

// Gradient-fill hover button (Simplefolio signature)
function GradButton({ href, children, solid = false, onClick, placeholder = false }) {
  const [hover, setHover] = useState(false);
  const style = {
    fontFamily: font,
    fontWeight: 700,
    fontSize: "0.9rem",
    letterSpacing: "0.03em",
    padding: "0.7rem 1.6rem",
    borderRadius: "4px",
    cursor: placeholder ? "default" : "pointer",
    textDecoration: "none",
    display: "inline-block",
    border: `2px solid ${placeholder ? "#b9c4ca" : TEAL}`,
    transition: "all 0.3s ease",
    background: placeholder ? "transparent" : solid || hover ? GRAD : "transparent",
    color: placeholder ? "#8b979e" : solid || hover ? "#fff" : TEAL,
    transform: hover && !placeholder ? "translateY(-2px)" : "none",
    boxShadow: hover && !placeholder ? "0 8px 18px rgba(2,170,176,0.25)" : "none",
  };
  const props = {
    style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  if (onClick) return <button {...props} onClick={onClick} style={{ ...style, borderStyle: "solid" }}>{children}</button>;
  return (
    <a {...props} href={href} target={href && href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

// White-on-gradient outline button
function WhiteButton({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: font,
        fontWeight: 700,
        fontSize: "0.95rem",
        padding: "0.8rem 2rem",
        borderRadius: "4px",
        border: "2px solid #fff",
        color: hover ? TEAL : "#fff",
        background: hover ? "#fff" : "transparent",
        textDecoration: "none",
        display: "inline-block",
        transition: "all 0.3s ease",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      {children}
    </a>
  );
}

// ---------------------------- page ------------------------------

export default function Portfolio() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" style={{ fontFamily: font, color: DARK, background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-25px) scale(1.08); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,20px) scale(1.05); } }
        @keyframes wave { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(16deg); } 75% { transform: rotate(-8deg); } }
        .wave-hand { display:inline-block; animation: wave 2.4s ease-in-out infinite; transform-origin: 70% 70%; }
        a:focus-visible, button:focus-visible { outline: 3px solid ${TEAL}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .blob, .wave-hand { animation: none !important; }
        }
      `}</style>

      {/* ---------------- hero ---------------- */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6">
        {/* animated gradient blobs */}
        <div
          className="blob absolute rounded-full"
          style={{
            width: 360, height: 360, top: "-90px", right: "-70px",
            background: GRAD, opacity: 0.12, filter: "blur(8px)",
            animation: "float1 9s ease-in-out infinite",
          }}
        />
        <div
          className="blob absolute rounded-full"
          style={{
            width: 360, height: 360, bottom: "-60px", left: "-60px",
            background: GRAD, opacity: 0.12, filter: "blur(8px)",
            animation: "float2 11s ease-in-out infinite",
          }}
        />
        <div className="max-w-4xl mx-auto w-full relative">
          <Reveal>
            <h1
              className="font-extrabold leading-tight text-center"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 6rem)", fontWeight: 800, color: DARK }}
            >
              Hi, my name is{" "}
              <span
                style={{
                  background: GRAD,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Khai Fung
              </span>{" "}
              <span className="wave-hand">👋</span>
              <br />
              I build software with a security mindset.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg text-center mx-auto" style={{ color: GREY }}>
              Master of IT (Cybersecurity) graduate in Melbourne — full-stack developer open to graduate roles.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8">
              <GradButton onClick={() => scrollTo("about")}>Know more ↓</GradButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- about (gradient) ---------------- */}
      <section id="about" className="px-6 py-20 md:py-28=4" style={{ background: GRAD }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h1 className="text-center text-3xl text-white md:text-4xl mb-14" style={{ fontWeight: 800 }}>
              About me
            </h1>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <Reveal className="md:col-span-2" delay={100}>
              <TiltCard>
                {/* Profile photo placeholder — replace this div with <img src="..." /> */}
                <img src={profilePic}
                  className="rounded-xl flex items-center justify-center"
                  style={{
                    width: "75%",
                    background: "rgba(255,255,255,0.18)",
                    border: "2px dashed rgba(255,255,255,0.7)",
                    color: "#fff", fontWeight: 700,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
                  }}
                />
              </TiltCard>
            </Reveal>
            <Reveal className="md:col-span-3" delay={250}>
              <div className="text-white">
                <p className="leading-relaxed pb-6 text-left" style={{ fontSize: "1.1rem" }}>
                  I'm a fresh Master of IT graduate from the University of Melbourne,
                  specialised in cybersecurity, with hands-on experience across full-stack
                  development, consulting, and security-focused projects, from developing a
                  clinician-facing platform as Tech Lead to building my own SIEM pipeline
                  and reproducing real vulnerabilities.
                </p>
                <p className="leading-relaxed pb-6 text-left" style={{ fontSize: "1.1rem", opacity: 0.92 }}>
                  Backed by a Bachelor of Commerce (Economics & Finance), I bring commercial
                  thinking to technical work. Google Cybersecurity certified; Currently learning CompTIA A+.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {SKILLS.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: "rgba(255,255,255,0.16)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <WhiteButton href={cv}>View Resume</WhiteButton>
        </div>
      </section>

      {/* ---------------- projects ---------------- */}
      <section id="projects" className="px-6 py-20 md:py-24" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-16" style={{ fontWeight: 800, color: DARK }}>
              Projects
            </h1>
          </Reveal>
          <div className="flex flex-col gap-20 md:gap-24">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name}>
                <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center`}>
                  {/* text */}
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <h3 className="text-2xl font-extrabold pb-1" style={{ color: DARK }}>
                      {p.name}
                    </h3>
                    <div className="text-sm font-semibold pb-4" style={{ color: TEAL }}>
                      {p.meta}
                    </div>
                    <p className="leading-relaxed pb-4" style={{ color: GREY }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded text-xs font-semibold"
                          style={{ background: "#EAF9F7", color: TEAL }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {p.live && (
                        <GradButton href={p.live} solid={!p.livePlaceholder} placeholder={p.livePlaceholder}>
                          {p.livePlaceholder ? "Live demo — coming soon" : "See Live"}
                        </GradButton>
                      )}
                      <GradButton href={p.code} solid={!p.codePlaceholder} placeholder={p.codePlaceholder}>
                        {p.codePlaceholder ? "Source Code — unavailable to public" : "Source Code"}
                        </GradButton>
                    </div>
                  </div>
                  {/* image card */}
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <TiltCard>
                      <div
                        className="rounded-xl overflow-hidden flex items-center justify-center h-72 md:h-80"
                        style={{
                          background: "linear-gradient(135deg, #f2fbfa 0%, #e2f6f3 100%)",
                          boxShadow: "0 18px 45px rgba(2,170,176,0.16)",
                        }}
                      >
                      {p.video ? (
                        <video
                          className="max-w-full max-h-full"
                          style={{ objectFit: "contain" }}
                          src={p.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : p.img ? (
                        <img
                          className="max-w-full max-h-full"
                          style={{ objectFit: "contain" }}
                          src={p.img}
                          alt={`${p.name} screenshot`}
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center text-center px-6 w-full h-full"
                          style={{
                            border: "2px dashed #9fd9d3",
                            color: "#5aa8a2",
                            fontWeight: 600,
                          }}
                        >
                          Add screenshot or demo video — {p.name}
                        </div>
                      )}
                      </div>
                    </TiltCard>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- experience ---------------- */}
      <section id="experience" className="px-6 py-20" style={{ background: "#F7FBFA" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-14" style={{ fontWeight: 800, color: DARK }}>
              Experience
            </h1>
          </Reveal>
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 120}>
                <div
                  className="rounded-xl p-6 bg-white"
                  style={{ boxShadow: "0 6px 24px rgba(2,170,176,0.08)", borderLeft: `4px solid ${TEAL}` }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-extrabold" style={{ color: DARK }}>{e.role}</h3>
                    <span className="text-sm font-semibold" style={{ color: TEAL }}>{e.period}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: GREY }}>{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-center text-md pt-8" style={{ color: GREY }}>
              <strong style={{ color: DARK }}>Education:</strong> Master of IT — Cybersecurity (WAM 79.2) ·
              Bachelor of Commerce — Economics & Finance (WAM 81.7), The University of Melbourne
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- contact (gradient) ---------------- */}
      <section id="contact" className="px-6 py-24 text-center" style={{ background: GRAD }}>
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontWeight: 800 }}>Contact Me</h1>
          <p className="text-white text-lg pb-8" style={{ opacity: 0.9 }}>
            Looking for a graduate engineer who thinks about security from day one?
            <br className="hidden md:block" /> Let's talk.
          </p>
          <WhiteButton href="mailto:leekhaifung@gmail.com">Let's Talk!</WhiteButton>
        </Reveal>
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className="px-6 py-12 text-center" style={{ background: "#1b1b1b" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="mb-6 inline-flex items-center justify-center w-11 h-11 rounded-full"
          style={{ background: GRAD, color: "#fff", border: "none", cursor: "pointer", fontSize: "1.5rem" }}
        >
          ↑
        </button>
        <div className="flex justify-center text-center gap-4 mb-6">
          <a href="https://www.linkedin.com/in/leekhaifung/" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#fff", textDecoration: "none" }}>
            <FaLinkedin />LinkedIn
          </a>
          <a href="https://github.com/khaifunglee" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#fff", textDecoration: "none" }}>
            <FaGithub />GitHub
          </a>
          
          <a href="mailto:leekhaifung@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#fff", textDecoration: "none" }}>
             <MdEmail color="white" size={20}/>Email
          </a>
        </div>
        <p className="text-xs" style={{ color: "#8a8a8a" }}>
          © Khai Fung Lee · Melbourne, Australia
        </p>
      </footer>
    </div>
  );
}
