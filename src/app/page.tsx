"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  siteNav,
  impactMetrics,
  careerTimeline,
  education,
  skillsFramework,
  workInitiatives,
  hoWIWorkFramework,
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

      const sections = ["home", "impact", "about", "experience", "work", "education", "skills", "currently"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[#080909]/95 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-white transition hover:text-emerald-400"
        >
          RR
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {siteNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                activeSection === item.href.slice(1)
                  ? "text-emerald-400"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Links */}
        <div className="flex items-center gap-4">
          <a
            href="/resume.pdf"
            className="hidden text-sm font-medium text-white/60 transition hover:text-white sm:block"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/ronit-roy"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-300"
          >
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// HERO
// ============================================================================

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32"
    >
      {/* Subtle background effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Growth · Analytics · Strategy
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-7xl font-black tracking-[-0.03em] text-white md:text-8xl lg:text-9xl"
        >
          Ronit Roy
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-2xl font-semibold text-white/90 md:text-3xl"
        >
          I turn{" "}
          <span className="text-emerald-400">data into commercial decisions</span>
        </motion.p>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/70 leading-relaxed"
        >
          Manager – Sales Effectiveness at TBO.com, working at the intersection of analytics, commercial strategy and execution. I identify growth opportunities, build decision systems and work with teams to turn analysis into measurable business outcomes.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className="group rounded-lg bg-emerald-400 px-8 py-3 font-semibold text-black transition hover:bg-emerald-300"
          >
            View Work
          </a>
          <a
            href="#experience"
            className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            Career Journey
          </a>
        </motion.div>

        {/* Identity strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-12 text-sm text-white/60"
        >
          <span>TBO.com</span>
          <span className="hidden sm:inline">•</span>
          <span>Business Analytics</span>
          <span className="hidden sm:inline">•</span>
          <span>Growth Strategy</span>
          <span className="hidden sm:inline">•</span>
          <span>Commercial Intelligence</span>
          <span className="hidden sm:inline">•</span>
          <span>Travel Technology</span>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// IMPACT METRICS
// ============================================================================

function MetricCard({
  value,
  label,
  description,
  index,
}: {
  value: string;
  label: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-lg border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
    >
      <div className="mb-4 text-5xl font-black tracking-tight text-emerald-400 md:text-6xl">
        {value}
      </div>
      <h3 className="mb-3 text-lg font-semibold text-white">{label}</h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
    </motion.div>
  );
}

function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="impact"
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
          >
            Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
          >
            Numbers earned, not inherited.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg text-white/70"
          >
            Selected outcomes from analytics, growth strategy and commercial initiatives across my career.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {impactMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
              description={metric.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ABOUT
// ============================================================================

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
        >
          Where analytics meets business.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-6 text-lg text-white/70 leading-relaxed"
        >
          <p>
            I work in business and commercial analytics. My career spans travel technology and fintech, solving problems at the intersection of data, strategy and execution. I focus on growth, revenue, sales effectiveness and commercial intelligence.
          </p>

          <p>
            My work sits between data and business. I don't just build dashboards or run queries — I identify commercial opportunities, validate them with data, and work with teams to execute at scale. The goal is always measurable business outcome.
          </p>

          <p className="font-semibold text-white">
            How I think about problems:
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            <li>Understand the business problem. Clarify what we're trying to solve and why it matters.</li>
            <li>Find the leverage point. What one thing, if improved, creates disproportionate impact?</li>
            <li>Use data to validate. Build hypotheses and test them. Remove guessing from decisions.</li>
            <li>Build the solution. Create the analytical systems, frameworks or processes needed.</li>
            <li>Work with stakeholders to execute. Good analysis is only useful if it gets acted on.</li>
            <li>Measure and improve. Track outcomes, learn, and continuously refine.</li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// EXPERIENCE / CAREER TIMELINE
// ============================================================================

function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [selectedRole, setSelectedRole] = useState(careerTimeline[0].id);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
        >
          The career so far.
        </motion.h2>

        {/* Timeline */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Timeline list */}
          <div className="space-y-2 md:col-span-1">
            {careerTimeline.map((role) => (
              <motion.button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                  selectedRole === role.id
                    ? "border-emerald-400 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/70 hover:text-white"
                }`}
              >
                <div className="font-semibold">{role.company}</div>
                <div className="text-xs text-white/50">{role.title}</div>
              </motion.button>
            ))}
          </div>

          {/* Timeline detail */}
          <div className="md:col-span-2">
            {careerTimeline.map((role) => (
              role.id === selectedRole && (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-3xl font-black text-white">{role.title}</h3>
                      <span className="text-sm font-medium text-white/50">{role.company}</span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{role.dates}</p>
                  </div>

                  <p className="text-base leading-relaxed text-white/70">
                    {role.description}
                  </p>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/50">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {role.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-white/70">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/50">
                      Tools & Methods
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WORK / CASE STUDIES
// ============================================================================

function CaseStudyCard({
  initiative,
  index,
}: {
  initiative: typeof workInitiatives[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group rounded-xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition hover:border-emerald-400/30 hover:bg-emerald-500/[0.05] md:p-12"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left content */}
        <div className="md:col-span-2 space-y-8">
          {/* Number and category */}
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-white/30">{initiative.number}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              {initiative.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-black tracking-[-0.02em] text-white md:text-4xl">
            {initiative.title}
          </h3>

          {/* Context */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Context
            </p>
            <p className="text-base leading-relaxed text-white/70">{initiative.context}</p>
          </div>

          {/* What I owned */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              What I owned
            </p>
            <p className="text-base leading-relaxed text-white/70">{initiative.whatIOwned}</p>
          </div>

          {/* Approach */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Approach
            </p>
            <p className="text-base leading-relaxed text-white/70">{initiative.approach}</p>
          </div>

          {/* What changed */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-400">
              What changed
            </p>
            <p className="text-base font-medium leading-relaxed text-white/80">
              {initiative.whatChanged}
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {initiative.tools.map((tool, idx) => (
                <span key={idx} className="text-sm text-white/60">
                  {tool}
                  {idx < initiative.tools.length - 1 && <span className="ml-2">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right metric */}
        <div className="flex flex-col justify-start md:border-l md:border-white/10 md:pl-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
            Impact
          </p>
          <div className="text-5xl font-black text-emerald-400 md:text-6xl">
            {initiative.metric}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {initiative.metricLabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="work"
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
        >
          Problems I've worked on.
        </motion.h2>

        {/* Case Studies */}
        <div className="mt-16 space-y-8">
          {workInitiatives.map((initiative, index) => (
            <CaseStudyCard key={index} initiative={initiative} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EDUCATION
// ============================================================================

function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="education"
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Education
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-black tracking-[-0.03em] text-white md:text-5xl"
        >
          Academic foundation.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-6"
        >
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
              <p className="mt-2 text-emerald-400 font-medium">{edu.field}</p>
              <p className="mt-2 text-sm text-white/70">
                {edu.institution} · {edu.dates}
              </p>
            </div>
          ))}
        </motion.div>
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
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
        >
          Strategy brain. Analytics brain.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {/* Strategy */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8">
            <h3 className="mb-6 text-lg font-bold text-white">Strategy & Business</h3>
            <div className="flex flex-wrap gap-2">
              {skillsFramework.strategy.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8">
            <h3 className="mb-6 text-lg font-bold text-white">Analytics & Data</h3>
            <div className="flex flex-wrap gap-2">
              {skillsFramework.analytics.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8">
            <h3 className="mb-6 text-lg font-bold text-white">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skillsFramework.tools.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400"
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
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Currently
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
        >
          Where things stand.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-8"
        >
          {/* Current Role */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/50">
              Current Role
            </h3>
            <p className="text-2xl font-bold text-white">
              Manager – Sales Effectiveness
            </p>
            <p className="mt-2 text-lg text-emerald-400">TBO.com</p>
          </div>

          {/* Current Focus */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/50">
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
                <li key={idx} className="flex gap-3 text-white/70">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
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
// HOW I WORK
// ============================================================================

function HowIWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Methodology
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-5xl font-black tracking-[-0.03em] text-white md:text-6xl"
        >
          How I solve problems.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-5"
        >
          {hoWIWorkFramework.map((stage, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <div className="mb-4 text-4xl font-black text-emerald-400">
                {stage.step}
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">
                {stage.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RESUME CTA
// ============================================================================

function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-black tracking-[-0.03em] text-white md:text-5xl"
        >
          Want the complete picture?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg text-white/70"
        >
          The website gives you the story. My resume gives you the complete professional record.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/resume.pdf"
            className="rounded-lg bg-emerald-400 px-8 py-3 font-semibold text-black transition hover:bg-emerald-300"
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/ronit-roy"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT
// ============================================================================

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative border-t border-white/5 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-black tracking-[-0.03em] text-white md:text-5xl"
        >
          Let's talk about something meaningful.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg text-white/70"
        >
          If you're interested in growth, analytics, strategy or building better decision systems — let's connect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://www.linkedin.com/in/ronit-roy"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-400 px-8 py-3 font-semibold text-black transition hover:bg-emerald-300"
          >
            Connect on LinkedIn
          </a>
          <a
            href="mailto:hello@ronitroy.dev"
            className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            Email Me
          </a>
        </motion.div>

        <p className="mt-8 text-sm text-white/50">
          © 2024 Ronit Roy. All rights reserved.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN
// ============================================================================

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080909] text-white">
      <StickyNavigation />
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <EducationSection />
      <SkillsSection />
      <CurrentlySection />
      <HowIWorkSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
