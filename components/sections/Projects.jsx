"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiLayers,
  FiCheckCircle,
  FiEye,
  FiFolder,
  FiStar,
  FiCpu,
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

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
          initial={{ opacity: 0, y: 30 }}
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
            Highlighted <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Real-world web applications showcasing frontend precision, full-stack architecture, and clean problem solving.
          </p>
        </motion.div>

        {/* Projects Grid: 1 col mobile, 2 col tablet/desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {PROJECTS_DATA.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                rotateX: 1.5,
                rotateY: -1.5,
                boxShadow: `0 25px 45px -12px ${project.accentColor}25`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col justify-between rounded-3xl bg-white/90 dark:bg-navy-card/90 border border-slate-200 dark:border-navy-border shadow-lg backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

              <div>
                {/* Screenshot Placeholder Area */}
                {/* TODO: replace with real project screenshot */}
                <div
                  className={`relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br ${project.imageBgGradient} flex flex-col items-center justify-center p-6 border-b border-slate-200/80 dark:border-navy-border/60 group-hover:scale-[1.01] transition-transform duration-500`}
                >
                  {/* Decorative Project Icon Frame */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-navy-dark/80 backdrop-blur-md p-3.5 shadow-xl border border-slate-200/60 dark:border-navy-border/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <FiFolder className="w-8 h-8 text-violet-accent dark:text-electric-blue" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-navy-light/80 px-3 py-1 rounded-full border border-slate-200/60 dark:border-navy-border/60 backdrop-blur-sm">
                      {project.category}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                      /* TODO: replace with real project screenshot */
                    </p>
                  </div>

                  {/* Top Badge: Featured */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 dark:bg-navy-dark/90 text-white backdrop-blur-md border border-white/10 shadow-md">
                      <FiStar className="w-3.5 h-3.5 text-amber-400" />
                      {project.featuredBadge}
                    </span>
                  </div>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-navy text-slate-900 dark:text-white text-xs font-semibold shadow-xl">
                      <FiEye className="w-4 h-4 text-violet-accent dark:text-electric-blue" />
                      Click to View Details
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 dark:text-white group-hover:text-violet-accent dark:group-hover:text-electric-blue transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
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
              <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-slate-100 dark:border-navy-border/40 flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue group-hover:underline cursor-pointer"
                >
                  <FiEye className="w-4 h-4" />
                  <span>Explore Case Study</span>
                </button>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-navy-light text-slate-600 dark:text-slate-300 hover:text-violet-accent dark:hover:text-electric-blue hover:bg-slate-200 dark:hover:bg-navy-border transition-colors cursor-pointer"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-navy-light text-slate-600 dark:text-slate-300 hover:text-violet-accent dark:hover:text-electric-blue hover:bg-slate-200 dark:hover:bg-navy-border transition-colors cursor-pointer"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Modal Dialog for Full Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-white dark:bg-navy-card rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-navy-border shadow-2xl overflow-y-auto z-10 my-auto p-5 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-slate-100 dark:bg-navy-light text-slate-600 dark:text-slate-300 hover:text-violet-accent dark:hover:text-electric-blue hover:bg-slate-200 dark:hover:bg-navy-border transition-colors cursor-pointer z-20 min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-3 pr-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-accent dark:text-electric-blue bg-violet-accent/10 dark:bg-electric-blue/10 px-3 py-1 rounded-full border border-violet-accent/20 dark:border-electric-blue/20">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {selectedProject.featuredBadge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-3xl font-extrabold font-poppins text-slate-900 dark:text-white mb-4 pr-6 leading-tight">
                {selectedProject.title}
              </h3>

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
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy-card text-slate-700 dark:text-slate-200 hover:text-violet-accent dark:hover:text-electric-blue font-medium text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px]"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub Code</span>
                </a>

                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-accent/25 hover:shadow-electric-blue/30 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Live Preview</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
