"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiLayers,
  FiCheckCircle,
  FiEye,
  FiFolder,
  FiStar,
} from "react-icons/fi";

const PROJECTS_DATA = [
  {
    id: "apsara-wellness",
    title: "Apsara Wellness",
    category: "Booking Platform",
    featuredBadge: "Featured Client Project",
    shortDesc:
      "A modern, responsive wellness service booking platform featuring clean appointment flows and real-time Firebase backend synchronization.",
    imageBgGradient: "from-emerald-600/20 via-teal-600/10 to-violet-600/20",
    accentColor: "#38ef7d",
    gradient: "from-emerald-400 to-teal-500",
    techStack: ["React.js", "Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://apsarawellness.com",
    githubUrl: "https://github.com/harsh8877",
    highlights: [
      "Intuitive multi-step appointment scheduling with dynamic time-slot generation.",
      "Firebase real-time database integration for instant booking confirmations and updates.",
      "Responsive, mobile-first design with smooth Framer Motion micro-animations.",
      "Optimized Core Web Vitals achieving fast initial page loads and high accessibility scores.",
    ],
    fullOverview:
      "Apsara Wellness is a specialized appointment and wellness booking web application designed to deliver an effortless booking experience. Built using Next.js and Firebase, it combines server-side rendering for optimal speed with real-time slot synchronization.",
  },
  {
    id: "enterprise-hrms-pms",
    title: "Enterprise HRMS & PMS System",
    category: "Enterprise Full-Stack",
    featuredBadge: "Flagship Enterprise Project",
    shortDesc:
      "Comprehensive HR + Project Management system with attendance tracking, shift scheduling, leave workflows, and Redis-backed background jobs.",
    imageBgGradient: "from-violet-600/20 via-purple-600/10 to-electric-blue/20",
    accentColor: "#6c5ce7",
    gradient: "from-violet-accent to-electric-blue",
    techStack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "RBAC",
      "Tailwind CSS",
    ],
    demoUrl: "https://github.com/harsh8877",
    githubUrl: "https://github.com/harsh8877",
    highlights: [
      "Hierarchical workspace UI managing branches, departments, and employee designations.",
      "Automated shift scheduling, attendance tracking, and overtime calculation engine.",
      "Multi-tier leave approval pipeline and project milestone management workflows.",
      "Redis-backed asynchronous queue for background email notifications and report generation.",
      "Granular Role-Based Access Control (RBAC) with JWT auth safeguarding multi-role privileges.",
    ],
    fullOverview:
      "A robust enterprise-grade solution uniting Human Resource Management and Project Management into a single cohesive platform. It handles complex business logic including shift management, automated salary/overtime computation, and departmental project workflows.",
  },
  {
    id: "ai-expense-tracker",
    title: "AI-Powered Expense Tracker",
    category: "Full-Stack & AI",
    featuredBadge: "AI Finance Platform",
    shortDesc:
      "Intelligent personal finance tracker with automated categorization, interactive visual dashboards, and AI-driven spending insights.",
    imageBgGradient: "from-blue-600/20 via-indigo-600/10 to-cyan-500/20",
    accentColor: "#00d4ff",
    gradient: "from-electric-blue to-cyan-400",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI API",
      "Chart.js",
      "Tailwind CSS",
    ],
    demoUrl: "https://github.com/harsh8877",
    githubUrl: "https://github.com/harsh8877",
    highlights: [
      "AI-assisted financial analysis identifying spending habits and personalized savings recommendations.",
      "Interactive data visualizations with dynamic breakdown charts by category and timeframe.",
      "Secure JWT user authentication with encrypted financial record storage in MongoDB.",
      "Optimized aggregation pipelines for fast analytical querying across historical transactions.",
    ],
    fullOverview:
      "A smart financial management application that empowers users to monitor expenses, set category budgets, and leverage AI insights to improve personal financial health through predictive analytics and data visualization.",
  },
  {
    id: "mern-ecommerce-store",
    title: "MERN E-Commerce Store",
    category: "E-Commerce",
    featuredBadge: "Full-Stack E-Commerce",
    shortDesc:
      "Full-featured online shopping platform featuring real-time product search/filtering, cart management, user auth, and streamlined checkout.",
    imageBgGradient: "from-amber-600/20 via-orange-600/10 to-red-600/20",
    accentColor: "#f59e0b",
    gradient: "from-amber-400 to-orange-500",
    techStack: [
      "React.js",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    demoUrl: "https://github.com/harsh8877",
    githubUrl: "https://github.com/harsh8877",
    highlights: [
      "Fast product search with debounced inputs and instant multi-criteria filtering (price, category, rating).",
      "Persistent cart state management powered by Redux Toolkit across sessions.",
      "Complete user authentication flow with order history, address management, and profile controls.",
      "Optimized MongoDB indexing and schema design for high-throughput product and transaction queries.",
    ],
    fullOverview:
      "A complete e-commerce solution tailored for modern web consumers. Includes dynamic product listings, detailed product specifications, an interactive shopping cart, and a responsive checkout process backed by scalable REST APIs.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// 3D Tilt Project Card Component
function ProjectTiltCard({ project, onSelect }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  // Normalized mouse coordinates relative to badge center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for natural tilt and recovery (max rotation ~8deg)
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={shouldReduceMotion ? undefined : `project-card-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      data-cursor="hover"
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: shouldReduceMotion ? "flat" : "preserve-3d",
      }}
      whileHover={
        shouldReduceMotion
          ? { opacity: 0.95 }
          : {
              y: -6,
              boxShadow: `0 24px 45px -15px ${project.accentColor}40`,
            }
      }
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
      }}
      className="group project-card relative flex flex-col justify-between rounded-3xl bg-white/95 dark:bg-navy-card/95 border border-slate-200 dark:border-navy-border shadow-lg backdrop-blur-md overflow-hidden cursor-pointer will-change-transform select-none"
    >
      {/* Dynamic Cursor Glare Overlay */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 60%)`,
          }}
        />
      )}

      {/* Top Accent Gradient Bar */}
      <motion.div
        layoutId={`project-gradient-${project.id}`}
        className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}
      />

      <div>
        {/* Screenshot / Visual Representation Area */}
        <div
          className={`relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.imageBgGradient} border-b border-slate-200/80 dark:border-navy-border/60 flex flex-col justify-between p-4 sm:p-5`}
        >
          {/* Mockup Top Window Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 dark:bg-navy-dark/80 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
              <span className="text-[10px] font-mono text-slate-300 ml-2 hidden xs:inline">
                {project.id}.app
              </span>
            </div>

            <motion.span
              layoutId={`project-badge-${project.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-900/80 dark:bg-navy-dark/90 text-white backdrop-blur-md border border-white/10 shadow-md"
            >
              <FiStar className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">{project.featuredBadge}</span>
              <span className="sm:hidden">{project.category}</span>
            </motion.span>
          </div>

          {/* Mockup Visual Center Representation */}
          <div
            className="relative my-auto flex flex-col items-center justify-center text-center p-2"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/80 dark:bg-navy-dark/85 backdrop-blur-md p-3.5 shadow-xl border border-slate-200/60 dark:border-navy-border/80 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-300">
              <FiFolder
                className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300"
                style={{ color: project.accentColor }}
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-navy-light/90 px-3.5 py-1 rounded-full border border-slate-200/70 dark:border-navy-border/70 backdrop-blur-sm shadow-sm">
              {project.category}
            </span>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
              Interactive Preview
            </p>
          </div>

          {/* Mockup Bottom Status Bar */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono z-10">
            <span className="truncate max-w-[180px] sm:max-w-xs">{project.title}</span>
            <span className="text-emerald-500 font-medium">● Live App</span>
          </div>

          {/* Clean Frosted Hover Overlay */}
          <div className="absolute inset-0 bg-slate-950/75 dark:bg-navy-dark/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 z-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-navy text-slate-900 dark:text-white text-xs sm:text-sm font-semibold shadow-2xl border border-violet-accent/40 dark:border-electric-blue/40 transform scale-95 group-hover:scale-100 transition-all duration-300">
              <FiEye className="w-4 h-4 text-violet-accent dark:text-electric-blue animate-pulse" />
              <span>Click to View Details</span>
            </div>
            <p className="text-[11px] text-slate-300 dark:text-slate-400 mt-2 font-medium">
              Architecture • Tech Stack • Case Study
            </p>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-6 sm:p-7" style={{ transform: "translateZ(15px)" }}>
          {/* Title */}
          <div className="flex items-start justify-between gap-4 mb-2.5">
            <motion.h3
              layoutId={`project-title-${project.id}`}
              className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 dark:text-white group-hover:text-violet-accent dark:group-hover:text-electric-blue transition-colors"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-navy-border/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 sm:px-7 pb-5 pt-3 border-t border-slate-100 dark:border-navy-border/40 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(project)}
          data-cursor="hover"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue hover:underline cursor-pointer"
        >
          <FiEye className="w-4 h-4" />
          <span>Explore Details</span>
        </button>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            title="View GitHub Repository"
            data-cursor="hover"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-light text-slate-600 dark:text-slate-300 hover:text-violet-accent dark:hover:text-electric-blue hover:bg-slate-200 dark:hover:bg-navy-border transition-colors cursor-pointer"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
            title="View Live Demo"
            data-cursor="hover"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-light text-slate-600 dark:text-slate-300 hover:text-violet-accent dark:hover:text-electric-blue hover:bg-slate-200 dark:hover:bg-navy-border transition-colors cursor-pointer"
          >
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll and Lenis when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "unset";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white/40 dark:bg-navy/70 border-t border-slate-200/80 dark:border-navy-border/40"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-violet-accent/10 dark:bg-violet-accent/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-electric-blue/10 dark:bg-electric-blue/5 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-accent/30 bg-violet-accent/10 px-4 py-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue mb-4">
            <span className="h-2 w-2 rounded-full bg-violet-accent dark:bg-electric-blue animate-pulse"></span>
            Featured Portfolio Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            Highlighted{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Real-world web applications showcasing frontend precision, full-stack architecture, and clean problem solving.
          </p>
        </motion.div>

        {/* Projects Grid with 3D perspective */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ perspective: shouldReduceMotion ? "none" : 1000 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {PROJECTS_DATA.map((project) => (
            <ProjectTiltCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </motion.div>
      </div>

      {/* Animated Modal Dialog for Full Project Details with shared layoutId */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content Box with matching layoutId for fluid morphing */}
            <motion.div
              layoutId={shouldReduceMotion ? undefined : `project-card-${selectedProject.id}`}
              initial={shouldReduceMotion ? { opacity: 0, scale: 0.95 } : undefined}
              animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
              exit={shouldReduceMotion ? { opacity: 0, scale: 0.95 } : undefined}
              transition={
                shouldReduceMotion
                  ? { duration: 0.2 }
                  : { type: "spring", damping: 28, stiffness: 260 }
              }
              className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-white dark:bg-navy-card rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-navy-border shadow-2xl flex flex-col z-50 my-auto overflow-hidden"
            >
              {/* Top Accent Gradient Bar in Modal */}
              <motion.div
                layoutId={shouldReduceMotion ? undefined : `project-gradient-${selectedProject.id}`}
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedProject.gradient} z-20`}
              />

              {/* Fixed Header with Close Button */}
              <div className="relative pt-6 sm:pt-7 pb-3 px-5 sm:px-8 shrink-0 flex justify-between items-start z-10">
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-2 pr-12 mt-1">
                  <motion.span
                    layoutId={`project-badge-${selectedProject.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-violet-accent dark:text-electric-blue bg-violet-accent/10 dark:bg-electric-blue/10 px-3 py-1 rounded-full border border-violet-accent/20 dark:border-electric-blue/20"
                  >
                    {selectedProject.category}
                  </motion.span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {selectedProject.featuredBadge}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project modal"
                  data-cursor="hover"
                  className="absolute top-5 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-100 dark:bg-navy-light text-slate-600 dark:text-slate-300 hover:text-violet-accent dark:hover:text-electric-blue hover:bg-slate-200 dark:hover:bg-navy-border transition-colors cursor-pointer z-20 flex items-center justify-center"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div
                className="overflow-y-auto px-5 sm:px-8 pb-6 sm:pb-8 flex-1"
                data-lenis-prevent="true"
              >
                {/* Title */}
                <motion.h3
                  layoutId={`project-title-${selectedProject.id}`}
                  className="text-xl sm:text-3xl font-extrabold font-poppins text-slate-900 dark:text-white mb-4 pr-6 leading-tight mt-2"
                >
                  {selectedProject.title}
                </motion.h3>

                {/* Full Overview Paragraph */}
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {selectedProject.fullOverview}
                </p>

                {/* Key Highlights & Architecture Points */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                    <FiLayers className="w-4 h-4 text-violet-accent dark:text-electric-blue" />
                    Key Architecture &amp; Features
                  </h4>
                  <div className="space-y-2.5 bg-slate-50 dark:bg-navy-dark/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-navy-border/60">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <FiCheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                    Technologies &amp; Libraries
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-light text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-navy-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Bottom Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-navy-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy-card text-slate-700 dark:text-slate-200 hover:text-violet-accent dark:hover:text-electric-blue font-medium text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px]"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>GitHub Code</span>
                  </a>

                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-accent/25 hover:shadow-electric-blue/30 transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Live Preview</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
