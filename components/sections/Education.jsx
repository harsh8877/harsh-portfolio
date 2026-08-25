"use client";

import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";

export default function Education() {
  const coursework = [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Full-Stack Web Development",
    "Object-Oriented Programming",
    "Computer Networks",
    "Software Engineering",
  ];

  return (
    <section
      id="education"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50/50 dark:bg-navy-dark/40 border-t border-slate-200/80 dark:border-navy-border/40"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-violet-accent/10 dark:bg-violet-accent/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-18"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-accent/30 bg-violet-accent/10 px-4 py-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue mb-4">
            <span className="h-2 w-2 rounded-full bg-violet-accent dark:bg-electric-blue animate-pulse"></span>
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            Education &amp;{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">
              Credentials
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Foundational academic background in computer science, software engineering, and modern web architectures.
          </p>
        </motion.div>

        {/* Education Card (Consistent with Experience style) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            y: -6,
            boxShadow: "0 25px 45px -12px rgba(108, 92, 231, 0.25)",
          }}
          className="group relative rounded-3xl bg-white/90 dark:bg-navy-card/90 border border-slate-200 dark:border-navy-border shadow-xl backdrop-blur-md overflow-hidden p-6 sm:p-10 transition-all duration-300"
        >
          {/* Top Accent Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-accent via-electric-blue to-purple-600" />

          <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
            {/* Graduation Cap Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-violet-accent to-electric-blue p-0.5 shadow-lg shadow-violet-accent/25 shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-navy-dark flex items-center justify-center text-white">
                <FaGraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-electric-blue group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* Details Content */}
            <div className="flex-1 w-full">
              {/* Header Badges: Degree Type & Period */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-accent/10 dark:bg-electric-blue/10 text-violet-accent dark:text-electric-blue border border-violet-accent/20 dark:border-electric-blue/20">
                  <FiAward className="w-3.5 h-3.5" />
                  Bachelor&apos;s Degree
                </span>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-navy-light px-3.5 py-1 rounded-full border border-slate-200/60 dark:border-navy-border/60">
                  <FiCalendar className="w-3.5 h-3.5 text-violet-accent dark:text-electric-blue" />
                  <span>2020 – 2024</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>4 Years</span>
                </div>
              </div>

              {/* Degree Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 dark:text-white mb-2 group-hover:text-violet-accent dark:group-hover:text-electric-blue transition-colors">
                B.Tech in Information Technology
              </h3>

              {/* University & Accreditation */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium mb-4">
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  Marwadi University
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <TbCertificate className="w-3.5 h-3.5" />
                  NAAC A+ Accredited
                </span>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                  Rajkot, Gujarat, India
                </span>
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Completed comprehensive engineering coursework emphasizing modern software engineering, data structures, algorithms, database systems, and full-stack web application development.
              </p>

              {/* Coursework & Core Modules */}
              <div className="pt-5 border-t border-slate-200/80 dark:border-navy-border/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                  <FiBookOpen className="w-4 h-4 text-violet-accent dark:text-electric-blue" />
                  Key Coursework &amp; Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-navy-border/60 hover:border-violet-accent/40 dark:hover:border-electric-blue/40 transition-colors"
                    >
                      <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
