"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import {
  siteNav,
  impactMetrics,
  careerTimeline,
  skillsFramework,
  workInitiatives,
} from "@/lib/data";

// ============================================================================
// STICKY NAVIGATION
// ============================================================================



function StickyNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "work",
        "experience",
        "contact",
      ];

      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element && element.getBoundingClientRect().top <= 150) {
          current = section;
        }
      }
      // When the user is on Let's Connect, don't highlight any nav item
         if (window.location.hash === "#contact" || current === "contact") {
           current = "";
         }

      // When the user reaches the final section, the contact section may
      // never reach the 150px threshold because the page has reached its
      // maximum scroll position. Force contact to be active at the bottom.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        current = "contact";
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] px-4 py-2 sm:px-5 sm:py-2.5">
      <div
        className={`mx-auto flex h-[54px] max-w-[1160px] items-center rounded-[18px] px-4 transition-all duration-500 sm:h-[58px] sm:px-6 ${
          isScrolled
            ? "border border-blue-100/90 bg-white/96 shadow-[0_10px_35px_rgba(30,64,175,0.10)] backdrop-blur-xl"
            : "border border-white/90 bg-white/88 shadow-[0_10px_35px_rgba(30,64,175,0.07)] backdrop-blur-xl"
        }`}
      >
        {/* LOGO */}
        <a
          href="#home"
          aria-label="Ronit Roy — Home"
          className="shrink-0 text-[23px] font-bold tracking-[-0.08em] sm:text-[25px]"
        >
          <span className="text-slate-900">R</span>
          <span className="text-blue-600">R</span>
        </a>

        {/* NAVIGATION — centered independently of logo and right controls */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-7">
          {["#home", "#about", "#work", "#experience"]
            .map((href) => siteNav.find((item) => item.href === href))
            .filter((item): item is NonNullable<typeof item> => item !== undefined)
            .map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative py-2 text-[13px] font-medium transition-colors duration-200 lg:text-[14px] ${
                activeSection === item.href.slice(1)
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.href === "#work" ? "Work & Impact" : item.label}

              {activeSection === item.href.slice(1) && (
                <span className="absolute -bottom-1 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-blue-600" />
              )}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-2.5 sm:gap-4">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600 transition hover:text-blue-600 sm:flex sm:text-[14px]"
            aria-label="Download resume"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Resume
          </a>

          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-[12px] font-semibold text-white shadow-[0_8px_25px_rgba(79,70,229,0.16)] transition duration-200 hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-[13px]"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// HERO
// ============================================================================

function RibbonItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 px-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:gap-3.5 sm:px-5 sm:text-[10px]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/50" />
      <span>{text}</span>
      <span className="h-px w-6 bg-blue-200/70" />
    </div>
  );
}

function HeroSection() {
  const phrases = [
   "Turning insights into action.",
   "Transforming data into growth.",
   "Turning analysis into strategy.",
   "Enabling sales team with data visibility.",
   "Driving measurable business impact.",
 ];;

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = window.setTimeout(
      () => {
        if (!deleting) {
          const nextText = currentPhrase.slice(0, text.length + 1);
          setText(nextText);

          if (nextText === currentPhrase) {
            window.setTimeout(() => setDeleting(true), 1400);
          }
        } else {
          const nextText = currentPhrase.slice(0, Math.max(0, text.length - 1));
          setText(nextText);

          if (nextText === "") {
            setDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      deleting ? 35 : 60
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, phraseIndex]);

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-transparent"
    >
      {/* ================================================================
          SUBTLE HERO BACKGROUND
          ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.42]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Very soft ambient glows */}
        <motion.div
          className="absolute -left-56 top-[34%] h-[420px] w-[420px] rounded-full bg-blue-200/15 blur-3xl"
          animate={{
            x: [0, 18, 0],
            y: [0, -10, 0],
            opacity: [0.14, 0.22, 0.14],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-56 bottom-[10%] h-[420px] w-[420px] rounded-full bg-violet-200/12 blur-3xl"
          animate={{
            x: [0, -16, 0],
            y: [0, 12, 0],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================================
            MOVING RIBBON / FLOWING LINES
            ================================================================ */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 850"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="
              M-140 410
              C80 270 220 300 360 405
              C500 510 600 485 720 345
              C840 210 970 265 1085 385
              C1200 505 1320 490 1440 365
              C1530 270 1620 260 1740 340
            "
            stroke="#2563eb"
            strokeWidth="1.15"
            strokeOpacity="0.16"
            animate={{
              d: [
                `
                  M-140 410
                  C80 270 220 300 360 405
                  C500 510 600 485 720 345
                  C840 210 970 265 1085 385
                  C1200 505 1320 490 1440 365
                  C1530 270 1620 260 1740 340
                `,
                `
                  M-140 430
                  C80 290 220 320 360 425
                  C500 530 600 505 720 365
                  C840 230 970 285 1085 405
                  C1200 525 1320 510 1440 385
                  C1530 290 1620 280 1740 360
                `,
                `
                  M-140 410
                  C80 270 220 300 360 405
                  C500 510 600 485 720 345
                  C840 210 970 265 1085 385
                  C1200 505 1320 490 1440 365
                  C1530 270 1620 260 1740 340
                `,
              ],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="
              M-140 485
              C100 350 230 370 365 475
              C500 580 620 550 740 410
              C860 275 980 325 1100 430
              C1220 535 1340 540 1460 430
              C1550 350 1630 335 1740 410
            "
            stroke="#6366f1"
            strokeWidth="0.95"
            strokeOpacity="0.09"
            animate={{
              x: [0, 14, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 21,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* A third, barely visible line gives the background depth. */}
          <motion.path
            d="
              M-120 545
              C120 425 250 445 390 535
              C530 625 660 595 785 475
              C900 365 1020 400 1140 500
              C1260 600 1390 590 1510 485
              C1600 410 1680 405 1760 460
            "
            stroke="#8b5cf6"
            strokeWidth="0.8"
            strokeOpacity="0.055"
            animate={{ x: [0, -10, 0] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* ================================================================
            SUBTLE MARKET GRAPH
            Kept behind the white hero content and clearly visible.
            ================================================================ */}
        <div
          className="
            absolute
            bottom-[7%]
            right-[-4%]
            z-[1]
            h-[220px]
            w-[430px]
            opacity-[0.22]
            sm:right-[2%]
            sm:w-[500px]
            lg:right-[5%]
            lg:h-[250px]
            lg:w-[540px]
          "
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 540 250"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <defs>
              <linearGradient
                id="heroGraphGradient"
                x1="0"
                y1="250"
                x2="540"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2563eb" />
                <stop offset="0.55" stopColor="#4f46e5" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>

            {/* Guides */}
            {[55, 110, 165, 220].map((y) => (
              <path
                key={y}
                d={`M0 ${y} H540`}
                stroke="#2563eb"
                strokeOpacity="0.075"
              />
            ))}

            {/* Rising animated graph */}
            <motion.path
              d="
                M0 220
                C28 212 45 216 66 198
                C88 180 105 202 126 174
                C148 145 165 170 187 146
                C210 120 228 139 250 108
                C272 78 292 101 314 76
                C337 48 357 69 380 52
                C404 30 426 43 448 31
                C474 16 502 22 540 2
              "
              stroke="url(#heroGraphGradient)"
              strokeWidth="1.8"
              strokeOpacity="0.75"
              strokeDasharray="850"
              animate={{
                strokeDashoffset: [850, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />

            {/* Soft moving area under the graph */}
            <motion.path
              d="
                M0 220
                C28 212 45 216 66 198
                C88 180 105 202 126 174
                C148 145 165 170 187 146
                C210 120 228 139 250 108
                C272 78 292 101 314 76
                C337 48 357 69 380 52
                C404 30 426 43 448 31
                C474 16 502 22 540 2
                L540 250
                L0 250 Z
              "
              fill="url(#heroGraphGradient)"
              opacity="0.025"
              animate={{ opacity: [0.015, 0.04, 0.015] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Candlesticks */}
          <div className="absolute inset-0 flex items-end justify-between px-2 pb-4">
            {[
              30, 39, 34, 46, 42, 55, 50, 67, 61, 78, 72, 88, 83, 102, 96,
              113, 108, 126, 119, 140, 134, 154,
            ].map((height, index) => (
              <motion.div
                key={index}
                className="relative w-[4px]"
                style={{ height: `${height}px` }}
                animate={{
                  height: [`${height - 2}px`, `${height + 4}px`, `${height - 2}px`],
                  opacity: [0.55, 0.8, 0.55],
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.07,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute left-1/2 top-[-7px] h-[calc(100%+14px)] w-px -translate-x-1/2 bg-blue-500/20" />
                <div className="absolute bottom-0 left-0 h-[42%] w-full rounded-[2px] bg-gradient-to-t from-blue-500/20 to-violet-500/25" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Small floating points */}
        {[
          { left: "14%", top: "28%", delay: 0 },
          { left: "80%", top: "25%", delay: 1 },
          { left: "24%", top: "68%", delay: 2 },
          { left: "82%", top: "64%", delay: 1.5 },
          { left: "61%", top: "31%", delay: 2.5 },
        ].map((dot, index) => (
          <motion.span
            key={index}
            className="absolute h-[4px] w-[4px] rounded-full bg-blue-500/25"
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.18, 0.45, 0.18],
            }}
            transition={{
              duration: 5,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ================================================================
          HERO CONTENT
          ================================================================ */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          w-full
          max-w-[1280px]
          flex-col
          items-center
          justify-center
          px-5
          pb-[86px]
          pt-[102px]
          text-center
          sm:px-8
        "
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-[10px] md:text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600/90" />
          Growth · Analytics · Strategy
        </motion.div>

        {/* Name — smaller and safely padded so the final Y never clips. */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            relative
            z-20
            m-0
            w-full
            max-w-[900px]
            px-4
            pb-2
            text-center
            text-[clamp(50px,7.2vw,88px)]
            font-black
            leading-[1.05]
            tracking-[-0.065em]
          "
        >
          <span
            className="inline-block max-w-full overflow-visible whitespace-nowrap"
            style={{
              background:
                "linear-gradient(100deg, #2563eb 0%, #315cf4 38%, #6738f5 72%, #7c2df2 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              paddingRight: "0.06em",
              paddingBottom: "0.08em",
            }}
          >
            Ronit Roy
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="
            relative
            z-20
            mt-2
            max-w-[780px]
            px-4
            text-[clamp(14px,1.35vw,18px)]
            font-medium
            leading-[1.45]
            tracking-[-0.012em]
            text-slate-600
          "
        >
          Manager – Sales Effectiveness at TBO.com, working across analytics,
          <br className="hidden md:block" />
          commercial strategy, growth and execution.
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="
            relative
            z-20
            mt-4
            flex
            h-[30px]
            items-center
            font-mono
            text-[clamp(15px,1.55vw,20px)]
            font-medium
            tracking-[0.005em]
            text-blue-600
          "
        >
          {text}
          <motion.span
            className="ml-1 inline-block h-[1em] w-[2px] bg-violet-500"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-2.5"
        >
          <a
            href="#work"
            className="
              group
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-violet-600
              px-5
              py-2.5
              text-[12px]
              font-bold
              text-white
              shadow-[0_10px_25px_rgba(59,91,246,0.16)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_14px_28px_rgba(59,91,246,0.22)]
              sm:px-6
              sm:py-3
              sm:text-[13px]
            "
          >
            Explore my work
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#about"
            className="
              rounded-full
              border
              border-slate-300/90
              bg-white/70
              px-5
              py-2.5
              text-[12px]
              font-semibold
              text-slate-700
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-md
              sm:px-6
              sm:py-3
              sm:text-[13px]
            "
          >
            About me
          </a>

          <a
            href="#contact"
            className="
              rounded-full
              border
              border-slate-300/90
              bg-white/70
              px-5
              py-2.5
              text-[12px]
              font-semibold
              text-slate-700
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-md
              sm:px-6
              sm:py-3
              sm:text-[13px]
            "
          >
            Let's Connect
          </a>

          <a
            href="https://www.linkedin.com/in/ronit-roy-b3061a177"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-300/90
              bg-white/70
              px-5
              py-2.5
              text-[12px]
              font-semibold
              text-slate-700
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-md
              sm:px-6
              sm:py-3
              sm:text-[13px]
            "
          >
            <span className="text-[16px] font-black text-blue-600">in</span>
            LinkedIn
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="relative z-20 mt-4 flex flex-col items-center gap-1 text-[9px] font-medium text-slate-400 sm:mt-5 sm:text-[10px]"
        >
          <span>Scroll to explore</span>

          <motion.div
            className="flex h-7 w-[18px] items-start justify-center rounded-full border border-slate-300 bg-white/50 p-1 backdrop-blur-sm"
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="h-1.5 w-1 rounded-full bg-blue-600"
              animate={{
                y: [0, 5, 0],
                opacity: [1, 0.35, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ================================================================
          LIGHT MOVING METRICS TICKER
          No dark bar — it sits directly on the white hero background.
          ================================================================ */}
      <div className="absolute bottom-16 left-0 z-30 w-full overflow-hidden bg-white/45 py-2 backdrop-blur-[2px] sm:bottom-14">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex items-center whitespace-nowrap"
            >
              <RibbonItem text="$65M+ opportunity" />
              <RibbonItem text="2x GTV growth" />
              <RibbonItem text="80% partner reactivation" />
              <RibbonItem text="15.7% ROI improvement" />
              <RibbonItem text="12+ APAC markets" />
              <RibbonItem text="Commercial analytics" />
              <RibbonItem text="Growth strategy" />
              <RibbonItem text="Data → action" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// ABOUT
// ============================================================================

function AboutSection() {
  const aboutCards = [
    {
      icon: "🧠",
      title: "Analytical thinker",
      text: "I break complex problems into clear questions, patterns and decisions.",
    },
    {
      icon: "🎯",
      title: "Commercial mindset",
      text: "I care about what the analysis changes — growth, revenue, efficiency and impact.",
    },
    {
      icon: "🎸",
      title: "Music & production",
      text: "I play guitar, make music and enjoy experimenting with sound and production.",
    },
    {
      icon: "✈️",
      title: "Travel & exploring",
      text: "I’m drawn to new places, unfamiliar environments and the perspectives they bring.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-transparent px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-16"
    >
      {/* =========================================================
          SUBTLE LIGHT-THEME BACKGROUND
          Same section geometry and content; only the visual language
          changes to match the new hero theme.
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Soft blue / violet ambient light */}
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-[12%] h-80 w-80 rounded-full bg-blue-400/[0.07] blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 bottom-[8%] h-96 w-96 rounded-full bg-violet-400/[0.055] blur-[125px]"
        />

        {/* Subtle flowing lines matching the hero */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 720"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M-120 185 C120 55 250 90 390 190 C530 290 650 265 770 145 C890 25 1010 55 1130 170 C1250 285 1350 275 1560 125"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.10"
            animate={{
              d: [
                "M-120 185 C120 55 250 90 390 190 C530 290 650 265 770 145 C890 25 1010 55 1130 170 C1250 285 1350 275 1560 125",
                "M-120 205 C120 75 250 110 390 210 C530 310 650 285 770 165 C890 45 1010 75 1130 190 C1250 305 1350 295 1560 145",
                "M-120 185 C120 55 250 90 390 190 C530 290 650 265 770 145 C890 25 1010 55 1130 170 C1250 285 1350 275 1560 125",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M-100 255 C100 145 240 160 370 255 C500 350 630 340 750 230 C870 120 1000 135 1120 245 C1240 355 1380 355 1550 235"
            stroke="#6366f1"
            strokeWidth="0.9"
            strokeOpacity="0.065"
            animate={{ x: [0, 18, 0], y: [0, -5, 0] }}
            transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* =========================================================
          MAIN CONTENT — LAYOUT AND CONTENT UNCHANGED
      ========================================================= */}
      <div className="relative mx-auto max-w-6xl">
        {/* SECTION LABEL */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.35)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            About me
          </span>
        </motion.div>

        {/* MAIN TWO-COLUMN AREA */}
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          {/* LEFT — PROFESSIONAL STORY */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl"
            >
              I work where{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                data meets business.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 max-w-xl space-y-4 text-[15px] leading-6 text-slate-600"
            >
              <p>
                I’m a Business & Commercial Analytics professional working
                across growth, revenue, sales effectiveness and strategy. I
                enjoy taking complex business problems, finding the signal in
                the data, and turning it into decisions that teams can
                actually act on.
              </p>

              <p>
                I studied{" "} a
                <span className="font-medium text-slate-800">
                  Master's in Economics at Ashoka University
                </span>{" "}
                from 2019–2021, which shaped the way I think about markets,
                businesses and decision-making.
              </p>

              <p>
                Today, I work across growth, commercial analytics at TBO.com. My work focuses on understanding
                where the biggest opportunities are, how teams should
                prioritize them, and how to measure what actually moves the
                business.
              </p>

              <p>
                I’m particularly interested in problems where the answer
                requires more than a dashboard — connecting data, commercial
                context and execution to create measurable outcomes.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — FOUR CHARACTER / INTEREST CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="pt-2 lg:pt-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {aboutCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative min-h-[124px] overflow-hidden rounded-xl border border-blue-100/80 bg-white/75 p-4 shadow-[0_8px_30px_rgba(30,64,175,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-white/90 hover:shadow-[0_12px_35px_rgba(30,64,175,0.09)]"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/10" />

                  <div className="relative">
                    <div className="mb-3 text-xl">{card.icon}</div>

                    <h3 className="text-sm font-semibold tracking-tight text-slate-800">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CURRENTLY EXPLORING */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ y: -3 }}
              className="group relative mt-3 overflow-hidden rounded-xl border border-blue-100 bg-white/70 px-5 py-4 shadow-[0_8px_30px_rgba(30,64,175,0.045)] backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-white/85"
            >
              <motion.div
                animate={{ x: [0, 25, 0], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-10 top-0 h-24 w-32 rounded-full bg-blue-500/10 blur-3xl"
              />

              <div className="relative flex items-center gap-4">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50">
                  <span className="absolute h-2 w-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.45)]" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                    Currently exploring
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    AI tools & building with AI
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Experimenting with new AI tools and finding practical ways
                    to use them to build, automate and solve problems.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EXPERIENCE / CAREER TIMELINE
// ============================================================================


// ============================================================================
// EXPERIENCE / CAREER TIMELINE
// ============================================================================

function ExperienceSection() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.12,
  });

  // Current → past
  const experienceTimeline = [
    {
      id: "tbo-manager",
      dates: "July 2024 – Present",
      company: "TBO.com",
      title: "Manager – Sales Effectiveness",
      type: "experience",
      description:
        "Leading sales effectiveness analytics and commercial strategy initiatives. Owning analytics-led growth programs, performance optimization, and data-driven decision systems for the commercial team.",
      achievements: [
        "Leading predictive and analytics-led initiatives supporting 2× YoY GTV growth.",
        "Revived dormant partner business by identifying commercial opportunities and driving targeted reactivation initiatives.",
        "Built performance dashboards and decision systems to improve visibility across sales and commercial teams.",
        "Working across growth, revenue, sales effectiveness and commercial strategy.",
      ],
      tools: [
        "SQL",
        "Power BI",
        "Python",
        "Excel",
        "Commercial Analytics",
        "Strategy",
      ],
    },

    {
      id: "tbo-associate-manager",
      dates: "June 2022 – June 2024",
      company: "TBO.com",
      title: "Associate Manager – Sales Effectiveness",
      type: "experience",
      description:
        "Worked across APAC sales effectiveness, commercial analytics and revenue strategy, translating market and customer data into actionable growth opportunities.",
      achievements: [
        "Identified $65M+ in revenue opportunity through market-gap and commercial opportunity analysis across APAC.",
        "Generated analytical frameworks and models used to support sales and revenue decisions.",
        "Built Power BI dashboards to improve commercial visibility and decision-making.",
        "Worked across APAC markets including Malaysia and Indonesia on commercial initiatives.",
      ],
      tools: [
        "Power BI",
        "SQL",
        "Excel",
        "Stata",
        "Market Analysis",
        "Revenue Strategy",
      ],
    },

    {
      id: "better",
      dates: "July 2021 – May 2022",
      company: "Better.com",
      title: "Business Analyst – Disclosure Audit",
      type: "experience",
      description:
        "Started my professional career in analytical problem-solving, working on disclosure audit processes and data-driven operational analysis.",
      achievements: [
        "Analyzed large datasets to identify discrepancies and improve audit accuracy.",
        "Worked with cross-functional teams to investigate data and process issues.",
        "Developed a structured approach to analytical problem-solving and business reporting.",
      ],
      tools: [
        "SQL",
        "Excel",
        "Python",
        "Data Analysis",
        "Audit Analytics",
      ],
    },

    {
      id: "ashoka",
      dates: "2019 – 2021",
      company: "Ashoka University",
      title: "Master's in Economics",
      type: "education",
      description:
        "Built the analytical and economic foundation that shaped how I approach markets, business problems and data-driven decision-making.",
      achievements: [
        "Developed a strong foundation in economics, quantitative analysis and structured problem-solving.",
        "Built a structured way of thinking about markets, incentives and business decisions.",
        "Applied quantitative and analytical methods to economic and research problems.",
      ],
      tools: [
        "Economics",
        "Quantitative Analysis",
        "Research",
        "Data Analysis",
      ],
    },
  ];

  const [selectedRole, setSelectedRole] = useState(
    experienceTimeline[0].id
  );

  const selectedRoleData = experienceTimeline.find(
    (role) => role.id === selectedRole
  );

  return (
    <section
      ref={ref}
      id="experience"
      className="relative overflow-hidden bg-transparent px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      {/* ================================================================
          BACKGROUND
          ================================================================ */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle grid — same visual language as previous sections */}
        <div
          className="absolute inset-0 opacity-[0.26]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Blue ambient glow */}
        <motion.div
          className="absolute -left-40 top-[10%] h-[420px] w-[420px] rounded-full bg-blue-400/[0.055] blur-[120px]"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            opacity: [0.3, 0.42, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Violet ambient glow */}
        <motion.div
          className="absolute -right-40 bottom-[5%] h-[440px] w-[440px] rounded-full bg-violet-400/[0.05] blur-[125px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            opacity: [0.22, 0.36, 0.22],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Flowing analytical lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 760"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M-120 500 C100 350 240 390 390 500 C540 610 660 580 790 440 C910 310 1030 350 1160 465 C1290 580 1410 560 1560 430"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.065"
            animate={{
              d: [
                "M-120 500 C100 350 240 390 390 500 C540 610 660 580 790 440 C910 310 1030 350 1160 465 C1290 580 1410 560 1560 430",
                "M-120 480 C100 330 240 370 390 480 C540 590 660 560 790 420 C910 290 1030 330 1160 445 C1290 560 1410 540 1560 410",
                "M-120 500 C100 350 240 390 390 500 C540 610 660 580 790 440 C910 310 1030 350 1160 465 C1290 580 1410 560 1560 430",
              ],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M-100 570 C120 450 250 470 400 560 C550 650 680 620 800 500 C920 380 1040 410 1170 515 C1300 620 1410 610 1570 500"
            stroke="#8b5cf6"
            strokeWidth="0.8"
            strokeOpacity="0.04"
            animate={{
              x: [0, 15, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* ================================================================
          CONTENT
          ================================================================ */}

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ================================================================
            HEADER
            ================================================================ */}

        <div className="mb-6">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{ duration: 0.45 }}
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 sm:text-xs"
          >
            Experience
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-4xl font-black tracking-[-0.045em] text-slate-900 sm:text-5xl md:text-6xl"
          >
            The journey{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              so far.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]"
          >
            From an economics foundation to analytical problem-solving,
            commercial strategy and business ownership. Each step expanded
            the scope of what I could own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-3.5 py-2 text-[10px] font-medium text-slate-500 shadow-sm"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              ↖
            </span>
            Tap each role to explore
          </motion.div>

        </div>

        {/* ================================================================
            TIMELINE + DETAIL
            ================================================================ */}

        <div className="grid items-start gap-4 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[255px_minmax(0,1fr)]">

          {/* ==============================================================
              LEFT — COMPACT TIMELINE
              ============================================================== */}

          <div className="relative lg:sticky lg:top-[105px]">

            {/* Timeline line — blue → indigo → violet */}
            <div className="absolute bottom-5 left-[12px] top-5 w-px bg-gradient-to-b from-blue-300 via-indigo-200 to-violet-300" />

            <div className="relative space-y-2">

              {experienceTimeline.map((role, index) => {

                const isActive =
                  selectedRole === role.id;

                return (
                  <motion.button
                    key={role.id}
                    type="button"
                    onClick={() =>
                      setSelectedRole(role.id)
                    }
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            x: 0,
                          }
                        : {
                            opacity: 0,
                            x: -12,
                          }
                    }
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                    }}
                    whileHover={{
                      x: 2,
                    }}
                    className={`group relative w-full rounded-xl border px-3 py-3 pl-7 text-left transition-all duration-300 ${
                      isActive
                        ? "border-blue-200 bg-white shadow-[0_8px_25px_rgba(37,99,235,0.08)]"
                        : "border-blue-100/70 bg-white/55 hover:border-indigo-200 hover:bg-white/80"
                    }`}
                  >

                    {/* Timeline node */}
                    <span
                      className={`absolute left-[7px] top-1/2 z-10 flex h-[10px] w-[10px] -translate-y-1/2 items-center justify-center rounded-full border-2 bg-[#f7f9ff] transition-all duration-300 ${
                        isActive
                          ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                          : "border-blue-200 group-hover:border-indigo-400"
                      }`}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                      )}
                    </span>

                    {/* Active left edge — same gradient as previous sections */}
                    <span
                      className={`absolute bottom-0 left-0 top-0 w-[3px] rounded-l-xl bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 transition-opacity ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />

                    {/* DATE */}
                    <div
                      className={`text-[12px] font-bold leading-4 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                          : "text-slate-500"
                      }`}
                    >
                      {role.dates}
                    </div>

                    {/* COMPANY */}
                    <div
                      className={`mt-1 text-[14px] font-bold leading-5 ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-700"
                      }`}
                    >
                      {role.company}
                    </div>

                    {/* TITLE */}
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 pr-5">
                       <div className="text-[11px] font-medium leading-4 text-slate-500">
                         {role.title}
                       </div>
                       {role.id === "tbo-manager" && (
                         <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-[2px] text-[8px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                           Current Role
                         </span>
                       )}
                     </div>

                    {/* TYPE */}
                    <div
                      className={`mt-1.5 inline-flex rounded-full border px-2 py-[2px] text-[8px] font-bold uppercase tracking-[0.12em] ${
                        role.type === "education"
                          ? "border-violet-100 bg-violet-50 text-violet-600"
                          : "border-blue-100 bg-blue-50 text-blue-600"
                      }`}
                    >
                      {role.type === "education" ? "Education" : "Experience"}
                    </div>

                    {/* Arrow */}
                    <span
                      className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] transition-all ${
                        isActive
                          ? "translate-x-0 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
                          : "text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-400"
                      }`}
                    >
                      →
                    </span>

                  </motion.button>
                );
              })}

            </div>
          </div>

          {/* ==============================================================
              RIGHT — SELECTED ROLE
              ============================================================== */}

          <div className="min-w-0">

            <AnimatePresence
              mode="wait"
              initial={false}
            >

              {selectedRoleData && (
                <motion.div
                  key={selectedRoleData.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="overflow-hidden rounded-[22px] border border-blue-100/80 bg-white/90 shadow-[0_16px_45px_rgba(30,64,175,0.07)] backdrop-blur-sm"
                >

                  {/* ======================================================
                      ROLE HEADER
                      ====================================================== */}

                  <div className="px-6 pb-5 pt-6 sm:px-8 sm:pt-7">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <div className="mb-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-[10px] font-bold uppercase tracking-[0.2em] text-transparent">
                          {selectedRoleData.company}
                        </div>

                        <h3 className="text-2xl font-black tracking-[-0.035em] text-slate-900 sm:text-3xl">
                          {selectedRoleData.title}
                        </h3>

                      </div>

                      <div className="shrink-0 text-xs font-medium text-slate-400 sm:pt-1">
                        {selectedRoleData.dates}
                      </div>

                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                      {selectedRoleData.description}
                    </p>

                  </div>

                  {/* ======================================================
                      ACHIEVEMENTS + TOOLS
                      ====================================================== */}

                  <div className="grid border-t border-blue-50 md:grid-cols-[1.45fr_0.75fr]">

                    {/* ACHIEVEMENTS */}

                    <div className="px-6 py-5 sm:px-8">

                      <div className="mb-4 flex items-center gap-3">

                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />

                        <h4 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-[10px] font-bold uppercase tracking-[0.2em] text-transparent">
                          Key Achievements
                        </h4>

                      </div>

                      <ul className="space-y-2.5">

                        {selectedRoleData.achievements.map(
                          (achievement, index) => (
                            <motion.li
                              key={index}
                              initial={{
                                opacity: 0,
                                x: -8,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                              className="flex gap-3 text-sm leading-6 text-slate-600"
                            >

                              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                              <span>
                                {achievement}
                              </span>

                            </motion.li>
                          )
                        )}

                      </ul>

                    </div>

                    {/* TOOLS */}

                    <div className="border-t border-blue-50 px-6 py-5 md:border-l md:border-t-0 sm:px-8">

                      <div className="mb-4 flex items-center gap-3">

                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />

                        <h4 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-[10px] font-bold uppercase tracking-[0.2em] text-transparent">
                          Tools & Methods
                        </h4>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {selectedRoleData.tools.map(
                          (tool, index) => (
                            <motion.span
                              key={index}
                              initial={{
                                opacity: 0,
                                scale: 0.95,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                duration: 0.25,
                                delay: index * 0.04,
                              }}
                              className="rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-[11px] font-medium text-blue-700 transition-colors duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              {tool}
                            </motion.span>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Bottom accent — same blue/indigo/violet gradient */}
                  <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-80" />

                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WORK — WORK & IMPACT
// ============================================================================

function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const [activeWork, setActiveWork] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="work"
      className="relative overflow-hidden bg-transparent px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      {/* ================================================================
          BACKGROUND — SAME LIGHT ANALYTICS THEME
          ================================================================ */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.26]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div
          className="absolute -left-40 top-[12%] h-[420px] w-[420px] rounded-full bg-blue-400/[0.055] blur-[120px]"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            opacity: [0.3, 0.42, 0.3],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -right-40 bottom-[4%] h-[440px] w-[440px] rounded-full bg-violet-400/[0.05] blur-[125px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            opacity: [0.22, 0.36, 0.22],
          }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Quiet flowing lines — no decorative dots */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 760"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M-120 500 C100 350 240 390 390 500 C540 610 660 580 790 440 C910 310 1030 350 1160 465 C1290 580 1410 560 1560 430"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.065"
            animate={{
              d: [
                "M-120 500 C100 350 240 390 390 500 C540 610 660 580 790 440 C910 310 1030 350 1160 465 C1290 580 1410 560 1560 430",
                "M-120 480 C100 330 240 370 390 480 C540 590 660 560 790 420 C910 290 1030 330 1160 445 C1290 560 1410 540 1560 410",
                "M-120 500 C100 350 240 390 390 500 C540 610 660 580 790 440 C910 310 1030 350 1160 465 C1290 580 1410 560 1560 430",
              ],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M-100 570 C120 450 250 470 400 560 C550 650 680 620 800 500 C920 380 1040 410 1170 515 C1300 620 1410 610 1570 500"
            stroke="#8b5cf6"
            strokeWidth="0.8"
            strokeOpacity="0.04"
            animate={{ x: [0, 15, 0], y: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.45 }}
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 sm:text-xs"
            >
              Work & Impact
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="max-w-3xl text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl md:text-5xl"
            >
              Different problems.
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                One common thread: growth.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]"
            >
              Problems I’ve worked on across analytics, commercial strategy,
              revenue and growth — and the outcomes they created.
            </motion.p>
          </div>

          <span className="hidden shrink-0 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:block">
            Select a highlight
          </span>
        </div>

        {/* ================================================================
            HIGHLIGHT CARDS
            Clean horizontal row — no blue dots / connector line.
            ================================================================ */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {workInitiatives.map((initiative, index) => {
            const isActive = activeWork === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative"
              >
                <motion.button
                  type="button"
                  onClick={() => setActiveWork(isActive ? null : index)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.995 }}
                  className={`group relative flex min-h-[210px] w-full flex-col overflow-hidden rounded-[18px] border text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isActive
                      ? "border-blue-200 bg-white shadow-[0_18px_42px_rgba(37,99,235,0.11)]"
                      : "border-blue-100/80 bg-white/82 shadow-[0_8px_26px_rgba(30,64,175,0.045)] hover:border-blue-200 hover:bg-white hover:shadow-[0_14px_34px_rgba(37,99,235,0.075)]"
                  }`}
                  aria-expanded={isActive}
                >
                  {/* Minimal active edge */}
                  <span
                    className={`absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />

                  <div className="relative flex h-full flex-col p-5 sm:p-6">
                    {/* Category + action */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="max-w-[82%] text-[9px] font-bold uppercase leading-4 tracking-[0.18em] text-slate-400">
                        {initiative.category}
                      </span>

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "rotate-45 border-blue-500 bg-blue-600 text-white"
                            : "border-slate-200 bg-white text-slate-400 group-hover:border-blue-300 group-hover:text-blue-600"
                        }`}
                      >
                        +
                      </span>
                    </div>

                    {/* Metric */}
                    <div className="mt-5">
                      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-[clamp(36px,3.7vw,48px)] font-black leading-none tracking-[-0.06em] text-transparent">
                        {initiative.metric}
                      </div>

                      <div className="mt-2 text-[13px] font-bold leading-5 text-slate-800">
                        {initiative.metricLabel}
                      </div>
                    </div>

                    {/* Problem / project title */}
                    <div className="mt-auto pt-4">
                      <div className="text-[12px] font-medium leading-5 text-slate-500">
                        {initiative.title}
                      </div>

                      <div
                        className={`mt-3 text-[9px] font-bold uppercase tracking-[0.18em] transition-colors ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-400 group-hover:text-blue-600"
                        }`}
                      >
                        {isActive ? "CLOSE CASE" : "READ CASE"}{" "}
                        <span className="ml-1 text-[11px]">
                          {isActive ? "↑" : "→"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* ================================================================
            EXPANDED DETAIL
            ================================================================ */}
        <AnimatePresence initial={false} mode="wait">
          {activeWork !== null && workInitiatives[activeWork] && (
            <motion.div
              key={activeWork}
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 overflow-hidden rounded-[18px] border border-blue-100/80 bg-white/88 shadow-[0_12px_32px_rgba(30,64,175,0.055)] backdrop-blur-sm">
                {/* Detail header */}
                <div className="flex flex-col gap-4 border-b border-blue-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
                      {workInitiatives[activeWork].category}
                    </p>

                    <h3 className="mt-1 text-xl font-black tracking-[-0.025em] text-slate-900 sm:text-2xl">
                      {workInitiatives[activeWork].title}
                    </h3>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <div className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-3xl font-black tracking-[-0.05em] text-transparent">
                      {workInitiatives[activeWork].metric}
                    </div>
                    <div className="text-[10px] font-medium text-slate-500">
                      {workInitiatives[activeWork].metricLabel}
                    </div>
                  </div>
                </div>

                {/* Detail body */}
                <div className="grid gap-0 sm:grid-cols-3">
                  <div className="border-b border-blue-50 px-5 py-5 sm:border-b-0 sm:border-r sm:px-7">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      The problem
                    </p>
                    <p className="text-xs leading-5 text-slate-600 sm:text-[13px]">
                      {workInitiatives[activeWork].context}
                    </p>
                  </div>

                  <div className="border-b border-blue-50 px-5 py-5 sm:border-b-0 sm:border-r sm:px-7">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      What I did
                    </p>
                    <p className="text-xs leading-5 text-slate-600 sm:text-[13px]">
                      {workInitiatives[activeWork].whatIOwned}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-[13px]">
                      {workInitiatives[activeWork].approach}
                    </p>
                  </div>

                  <div className="px-5 py-5 sm:px-7">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600">
                      What changed
                    </p>
                    <p className="text-xs font-medium leading-5 text-slate-700 sm:text-[13px]">
                      {workInitiatives[activeWork].whatChanged}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
                      {workInitiatives[activeWork].tools.map(
                        (tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="rounded-full bg-slate-50 px-2 py-1 text-[9px] font-medium text-slate-500"
                          >
                            {tool}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// SKILLS
// ============================================================================

function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative overflow-hidden bg-transparent px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.26]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.div
          className="absolute -left-40 top-[10%] h-[420px] w-[420px] rounded-full bg-blue-400/[0.055] blur-[120px]"
          animate={{ x: [0, 25, 0], y: [0, -15, 0], opacity: [0.3, 0.42, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-[5%] h-[440px] w-[440px] rounded-full bg-violet-400/[0.05] blur-[125px]"
          animate={{ x: [0, -20, 0], y: [0, 15, 0], opacity: [0.22, 0.36, 0.22] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 sm:text-xs"
        >
          Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 text-4xl font-black tracking-[-0.045em] text-slate-900 sm:text-5xl md:text-6xl"
        >
          Strategy brain. Analytics brain.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {/* Strategy */}
          <div className="rounded-[18px] border border-blue-100/80 bg-white/85 p-6 shadow-[0_12px_35px_rgba(30,64,175,0.05)] backdrop-blur-sm">
            <h3 className="mb-5 text-lg font-bold text-slate-900">Strategy & Business</h3>
            <div className="flex flex-wrap gap-2">
              {skillsFramework.strategy.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="rounded-[18px] border border-blue-100/80 bg-white/85 p-6 shadow-[0_12px_35px_rgba(30,64,175,0.05)] backdrop-blur-sm">
            <h3 className="mb-5 text-lg font-bold text-slate-900">Analytics & Data</h3>
            <div className="flex flex-wrap gap-2">
              {skillsFramework.analytics.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-medium text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="rounded-[18px] border border-blue-100/80 bg-white/85 p-6 shadow-[0_12px_35px_rgba(30,64,175,0.05)] backdrop-blur-sm">
            <h3 className="mb-5 text-lg font-bold text-slate-900">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skillsFramework.tools.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CURRENTLY
// ============================================================================

function CurrentlySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="currently"
      className="relative overflow-hidden bg-transparent px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.24]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.div
          className="absolute -right-40 top-[12%] h-[420px] w-[420px] rounded-full bg-violet-400/[0.05] blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, 15, 0], opacity: [0.22, 0.36, 0.22] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600"
        >
          Currently
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-black tracking-[-0.045em] text-slate-900 sm:text-5xl md:text-6xl"
        >
          Where things stand.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {/* Current Role */}
          <div className="rounded-[18px] border border-blue-100/80 bg-white/85 p-6 shadow-[0_12px_35px_rgba(30,64,175,0.05)] backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-blue-600">
              Current Role
            </h3>
            <p className="text-xl font-black text-slate-900">
              Manager – Sales Effectiveness
            </p>
            <p className="mt-2 text-base font-semibold text-blue-600">TBO.com</p>
          </div>

          {/* Current Focus */}
          <div className="rounded-[18px] border border-blue-100/80 bg-white/85 p-6 shadow-[0_12px_35px_rgba(30,64,175,0.05)] backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-blue-600">
              Current Focus
            </h3>
            <ul className="space-y-2">
              {[
                "Growth analytics and opportunity identification",
                "Commercial intelligence and decision systems",
                "Sales effectiveness and productivity improvement",
                "Revenue and GTV growth initiatives",
                "Data-driven stakeholder engagement",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-slate-600">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// LET'S CONNECT
// ============================================================================

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject =
      formData.subject || "Potential opportunity";

    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `.trim();

    window.location.href = `mailto:hello@ronitroy.dev?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-transparent px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-16"
    >
      {/* ================================================================
          BACKGROUND — SAME LIGHT ANALYTICS THEME
          ================================================================ */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div
          className="absolute -left-40 top-[8%] h-[420px] w-[420px] rounded-full bg-blue-400/[0.055] blur-[120px]"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 bottom-[5%] h-[460px] w-[460px] rounded-full bg-violet-400/[0.05] blur-[130px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M-100 600 C120 440 250 480 400 590 C550 700 680 660 810 500 C940 340 1060 390 1190 520 C1320 650 1440 620 1700 430"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.06"
            animate={{
              d: [
                "M-100 600 C120 440 250 480 400 590 C550 700 680 660 810 500 C940 340 1060 390 1190 520 C1320 650 1440 620 1700 430",
                "M-100 580 C120 420 250 460 400 570 C550 680 680 640 810 480 C940 320 1060 370 1190 500 C1320 630 1440 600 1700 410",
                "M-100 600 C120 440 250 480 400 590 C550 700 680 660 810 500 C940 340 1060 390 1190 520 C1320 650 1440 620 1700 430",
              ],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M-100 690 C140 530 260 560 420 650 C580 740 700 710 830 560 C960 410 1080 440 1210 570 C1340 700 1480 670 1700 500"
            stroke="#8b5cf6"
            strokeWidth="0.8"
            strokeOpacity="0.045"
            animate={{ x: [0, 15, 0], y: [0, -8, 0] }}
            transition={{
              duration: 27,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* ================================================================
          CONTENT
          ================================================================ */}

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ================================================================
            HERO
            ================================================================ */}

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45 }}
            className="mb-3 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-violet-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-600 sm:text-xs">
              Let's Connect
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-blue-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-4 py-2 text-[11px] font-medium text-emerald-600 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mx-auto max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-900 sm:text-6xl md:text-7xl"
          >
            Let's build something{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              meaningful.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]"
          >
            I work at the intersection of analytics, growth strategy and
            commercial execution. If you're solving an ambitious problem,
            building something new, or looking for someone who can turn data
            into action — let's talk.
          </motion.p>

          {/* SOCIAL / DIRECT CONTACT BUTTONS */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="https://www.linkedin.com/in/ronit-roy-b3061a177"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(79,70,229,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(79,70,229,0.25)]"
            >
              <span className="text-[15px] font-black">in</span>
              Connect on LinkedIn
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="mailto:royronit.roy3@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white"
            >
              <span>✉</span>
              Email directly
            </a>

            <a
              href="mailto:hello@ronitroy.dev?subject=20-minute%20conversation"
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white"
            >
              <span>◷</span>
              Book 20 mins
            </a>
          </motion.div>
        </div>

        {/* ================================================================
            DIRECT-CONVERSATION CARD
            ================================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl rounded-[22px] border border-blue-100 bg-white/80 p-6 shadow-[0_16px_45px_rgba(30,64,175,0.06)] backdrop-blur-sm sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-lg">
                📅
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Prefer to talk directly?
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Send me a message and we can find a time that works.
                </p>
              </div>
            </div>

            <a
              href="mailto:hello@ronitroy.dev?subject=20-minute%20conversation"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-xs font-bold text-blue-700 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              Start a conversation →
            </a>
          </div>
        </motion.div>

        {/* ================================================================
            MESSAGE FORM
            ================================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-[22px] border border-blue-100 bg-white/85 shadow-[0_16px_45px_rgba(30,64,175,0.06)] backdrop-blur-sm"
        >
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-black tracking-[-0.025em] text-slate-900">
              Send me a message
            </h3>

            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
              Tell me about what you're working on, the challenge you're
              facing, or the opportunity you have in mind.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Your name *
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-blue-100 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Your email *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-blue-100 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Phone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-blue-100 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Subject *
                  </label>
                  <input
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Growth role at [Company]"
                    className="w-full rounded-xl border border-blue-100 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Message *
                </label>

                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  maxLength={2000}
                  placeholder="Tell me about what you're working on, the challenge you're facing, or the opportunity you have in mind..."
                  className="w-full resize-none rounded-xl border border-blue-100 bg-white/80 px-4 py-2.5 text-sm leading-6 text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                />

                <div className="mt-1 text-right text-[10px] text-slate-400">
                  {formData.message.length}/2000
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-xs font-bold text-white shadow-[0_8px_22px_rgba(79,70,229,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(79,70,229,0.22)]"
                >
                  Send message →
                </button>

                <a
                  href="mailto:hello@ronitroy.dev"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-6 py-3 text-xs font-semibold text-slate-600 transition-all duration-300 hover:border-indigo-200 hover:text-indigo-600"
                >
                  ✉ Open in mail app
                </a>

                <span className="text-[10px] text-slate-400">
                  * required
                </span>
              </div>
            </form>
          </div>

          <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
        </motion.div>

        {/* ================================================================
            FOOTER
            ================================================================ */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 border-t border-blue-100 pt-5 text-center"
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
            RONIT ROY · GROWTH · ANALYTICS · STRATEGY
          </div>

          <div className="mt-2 text-[10px] text-slate-400">
            Turning data into growth.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// GLOBAL MOVING RIBBON BACKGROUND
// Stays behind every section so the visual language of the hero continues
// throughout the page. It does not add section dividers or affect layout.
// ============================================================================

function GlobalRibbonBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.9]">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="h-full w-full"
          fill="none"
        >
          <motion.path
            d="M-160 210 C120 60 250 95 410 215 C570 335 700 305 835 155 C970 5 1095 55 1225 180 C1350 300 1450 285 1610 125"
            stroke="#2563eb"
            strokeWidth="1.15"
            strokeOpacity="0.11"
            animate={{
              d: [
                "M-160 210 C120 60 250 95 410 215 C570 335 700 305 835 155 C970 5 1095 55 1225 180 C1350 300 1450 285 1610 125",
                "M-160 235 C120 85 250 120 410 240 C570 360 700 330 835 180 C970 30 1095 80 1225 205 C1350 325 1450 310 1610 150",
                "M-160 210 C120 60 250 95 410 215 C570 335 700 305 835 155 C970 5 1095 55 1225 180 C1350 300 1450 285 1610 125",
              ],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M-170 430 C80 285 235 315 390 425 C545 535 675 505 805 365 C935 225 1070 265 1200 390 C1330 515 1450 505 1620 355"
            stroke="#4f46e5"
            strokeWidth="1"
            strokeOpacity="0.085"
            animate={{
              d: [
                "M-170 430 C80 285 235 315 390 425 C545 535 675 505 805 365 C935 225 1070 265 1200 390 C1330 515 1450 505 1620 355",
                "M-170 405 C80 260 235 290 390 400 C545 510 675 480 805 340 C935 200 1070 240 1200 365 C1330 490 1450 480 1620 330",
                "M-170 430 C80 285 235 315 390 425 C545 535 675 505 805 365 C935 225 1070 265 1200 390 C1330 515 1450 505 1620 355",
              ],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M-150 665 C90 520 250 545 405 650 C560 755 695 730 825 590 C955 450 1080 490 1215 605 C1350 720 1460 710 1610 565"
            stroke="#7c3aed"
            strokeWidth="0.9"
            strokeOpacity="0.065"
            animate={{ x: [0, 18, 0], y: [0, -8, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN
// ============================================================================

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f7f9ff] text-[#111827]">
      <StickyNavigation />

      <GlobalRibbonBackground />

      <div className="relative z-[2]">
        <HeroSection />

      <AboutSection />
      <WorkSection />
      <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}


