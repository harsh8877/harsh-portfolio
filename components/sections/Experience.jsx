"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

const EXPERIENCES = [
  {
    role: "MERN Stack Intern",
    company: "Dignizant Technology",
    period: "Apr 2025 – Jul 2025",
    duration: "4 Months",
    location: "Surat, Gujarat, India",
    type: "Internship",
    description:
      "Contributed to building and maintaining high-performance client-facing web applications using the MERN stack.",
    responsibilities: [
      "Built dynamic, responsive React.js applications and integrated complex RESTful APIs.",
      "Collaborated actively as part of an agile development team to ship real production features.",
      "Optimized frontend component rendering, handled state management, and resolved production bugs.",
      "Implemented modular code structures adhering to industry best practices and clean architecture.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
      "JavaScript (ES6+)",
    ],
    accentColor: "from-violet-accent to-electric-blue",
    glowColor: "#6c5ce7",
  },
  {
    role: "Web Design Intern",
    company: "Intebility Solutions",
    period: "May 2023 – Jun 2023",
    duration: "2 Months",
    location: "Surat, Gujarat, India",
    type: "Internship",
    description:
      "Gained foundational industry experience focused on web design aesthetics, responsive layouts, and cross-browser UI development.",
    responsibilities: [
      "Designed and implemented clean, responsive, and mobile-friendly web page layouts.",
      "Converted design concepts and wireframes into pixel-perfect HTML, CSS, and JavaScript interfaces.",
      "Enhanced user experience through intuitive UI component interactions and smooth styling.",
      "Conducted cross-browser compatibility testing and resolved layout discrepancies.",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "UI/UX Design",
      "Cross-Browser Compatibility",
    ],
    accentColor: "from-electric-blue to-cyan-500",
    glowColor: "#00d4ff",
  },
];

function TimelineRow({ exp, idx, total, scrollYProgress }) {
  const shouldReduceMotion = useReducedMotion();
  const isEven = idx % 2 === 0;

  // Calculate when the drawn timeline line reaches this specific dot
  const triggerPoint = total <= 1 ? 0.3 : idx / (total - 1);
  const startRange = Math.max(0, triggerPoint * 0.7 - 0.05);
  const endRange = Math.min(1, triggerPoint * 0.7 + 0.15);

  // Scroll-connected illumination physics
  const rawDotScale = useTransform(scrollYProgress, [startRange, endRange], [0.9, 1.15]);
  const rawDotBorder = useTransform(
    scrollYProgress,
    [startRange, endRange],
    ["rgba(148, 163, 184, 0.4)", exp.glowColor]
  );
  const rawDotShadow = useTransform(
    scrollYProgress,
    [startRange, endRange],
    ["0 0 0 rgba(0,0,0,0)", `0 0 25px ${exp.glowColor}90`]
  );
  const rawInnerDotScale = useTransform(scrollYProgress, [startRange, endRange], [0.6, 1]);
  const rawInnerDotOpacity = useTransform(scrollYProgress, [startRange, endRange], [0.4, 1]);

  const dotScale = shouldReduceMotion ? 1 : rawDotScale;
  const dotBorder = shouldReduceMotion ? exp.glowColor : rawDotBorder;
  const dotShadow = shouldReduceMotion ? `0 0 15px ${exp.glowColor}40` : rawDotShadow;
  const innerDotScale = shouldReduceMotion ? 1 : rawInnerDotScale;
  const innerDotOpacity = shouldReduceMotion ? 1 : rawInnerDotOpacity;

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center">
      {/* Timeline Dot Node connected to scroll progress */}
      <motion.div
        style={{
          scale: dotScale,
          borderColor: dotBorder,
          boxShadow: dotShadow,
        }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-navy-card border-2 transition-colors duration-200"
      >
        <motion.div
          style={{
            scale: innerDotScale,
            opacity: innerDotOpacity,
          }}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr ${exp.accentColor}`}
        />
      </motion.div>

      {/* Card Container */}
      <div
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
          isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto md:text-left"
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: shouldReduceMotion ? 0 : (isEven ? -40 : 40),
            y: shouldReduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={
            shouldReduceMotion
              ? { opacity: 0.95 }
              : {
                  y: -5,
                  boxShadow: `0 20px 35px -10px ${exp.glowColor}25`,
                }
          }
          data-cursor="hover"
          className="group relative p-6 sm:p-8 rounded-2xl bg-white/85 dark:bg-navy-card/90 border border-slate-200 dark:border-navy-border shadow-lg backdrop-blur-md transition-all duration-300 overflow-hidden text-left"
        >
          {/* Top Accent Gradient Bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.accentColor}`}
          />

          {/* Header: Role & Period */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-accent/10 dark:bg-electric-blue/10 text-violet-accent dark:text-electric-blue border border-violet-accent/20 dark:border-electric-blue/20">
              <FiBriefcase className="w-3.5 h-3.5" />
              {exp.type}
            </span>

            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-navy-light px-3 py-1 rounded-full border border-slate-200/60 dark:border-navy-border/60">
              <FiCalendar className="w-3.5 h-3.5 text-violet-accent dark:text-electric-blue" />
              <span>{exp.period}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>{exp.duration}</span>
            </div>
          </div>

          {/* Role & Company Name */}
          <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-1 group-hover:text-violet-accent dark:group-hover:text-electric-blue transition-colors">
            {exp.role}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium mb-4">
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              {exp.company}
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
              {exp.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
            {exp.description}
          </p>

          {/* Responsibilities Bullets */}
          <div className="space-y-2.5 mb-6">
            {exp.responsibilities.map((resp, rIdx) => (
              <div key={rIdx} className="flex items-start gap-2.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                  {resp}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-navy-border/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Technologies Used
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-navy-border/60 hover:border-violet-accent/40 dark:hover:border-electric-blue/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll through the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 65%"],
  });

  // Smoothly draw the timeline line from top to bottom
  const rawLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = shouldReduceMotion ? "100%" : rawLineHeight;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white/40 dark:bg-navy/60 border-t border-slate-200/80 dark:border-navy-border/40"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-violet-accent/10 dark:bg-violet-accent/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-electric-blue/10 dark:bg-electric-blue/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-accent/30 bg-violet-accent/10 px-4 py-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue mb-4">
            <span className="h-2 w-2 rounded-full bg-violet-accent dark:bg-electric-blue animate-pulse"></span>
            Career Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            Work{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Hands-on professional journey building scalable web applications and interactive digital products.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-navy-border/60 rounded-full" />

          {/* Progressively Drawn Gradient Active Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-violet-accent via-electric-blue to-purple-500 rounded-full shadow-[0_0_12px_rgba(0,212,255,0.6)] z-10 origin-top"
          />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCES.map((exp, idx) => (
              <TimelineRow
                key={exp.company + exp.period}
                exp={exp}
                idx={idx}
                total={EXPERIENCES.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
