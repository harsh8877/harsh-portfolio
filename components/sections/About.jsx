"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCode,
  FiAward,
  FiCheckCircle,
  FiUser,
  FiArrowRight,
  FiDownload,
} from "react-icons/fi";

export default function About() {
  const stats = [
    {
      icon: FiBriefcase,
      value: "1+ Year",
      label: "Experience",
      description: "Hands-on Development",
      gradient: "from-violet-accent to-indigo-500",
    },
    {
      icon: FiCode,
      value: "4+ Projects",
      label: "Built",
      description: "Full-Stack & Frontend",
      gradient: "from-electric-blue to-cyan-500",
    },
    {
      icon: FiAward,
      value: "B.Tech IT",
      label: "Graduate",
      description: "Information Technology",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const coreStrengths = [
    "Modern React.js & Next.js Ecosystem",
    "Clean, Maintainable & Scalable Code",
    "Responsive & Pixel-Perfect UI Design",
    "REST APIs & Backend Integration",
    "Fast Debugging & Problem Solving",
    "Continuous Learning & Quick Adoption",
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-accent/10 dark:bg-violet-accent/5 blur-[120px] pointer-events-none -z-10" />

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
            Know More About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A passionate engineer dedicated to building seamless, responsive, and impactful digital experiences.
          </p>
        </motion.div>

        {/* Two-Column Grid: Left Photo Card / Right Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Profile Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-sm sm:max-w-md">
              {/* Outer Decorative Gradient Glow Border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-accent via-electric-blue to-purple-600 opacity-60 group-hover:opacity-100 blur-lg transition duration-500 group-hover:duration-300" />

              {/* Photo Frame Container */}
              <div className="relative rounded-2xl bg-white dark:bg-navy-card border border-slate-200 dark:border-navy-border p-5 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-md">
                {/* Photo Placeholder Area */}
                {/* TODO: replace with my profile photo */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-navy-dark dark:via-navy dark:to-navy-light flex flex-col items-center justify-center border border-slate-300/60 dark:border-navy-border/80 group-hover:scale-[1.02] transition-transform duration-500">
                  {/* Stylized Avatar Placeholder */}
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-violet-accent to-electric-blue p-1 shadow-xl mb-4 flex items-center justify-center">
                      <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-white">
                        <FiUser className="w-12 h-12 text-electric-blue" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-violet-accent dark:text-electric-blue uppercase bg-violet-accent/10 px-3 py-1 rounded-full border border-violet-accent/20 mb-2">
                      Profile Picture
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">
                      /* TODO: replace with my profile photo */
                    </p>
                  </div>

                  {/* Decorative corner grid & accents */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-electric-blue/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-violet-accent/15 to-transparent pointer-events-none" />
                </div>

                {/* Floating Bottom Card Badge */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-navy-border/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-poppins font-bold text-slate-900 dark:text-white text-base">
                      Harsh Vasoya
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      MERN Stack Developer
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Bio Title Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-violet-accent"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-violet-accent dark:text-electric-blue">
                Who I Am
              </span>
            </div>

            {/* Main Bio Headings */}
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-6 leading-tight">
              Passionate about creating clean code and{" "}
              <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">
                exceptional web experiences.
              </span>
            </h3>

            {/* Naturally Reworded First-Person Bio Paragraphs */}
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              <p>
                Hello! I am a motivated and detail-oriented <strong className="text-slate-900 dark:text-white font-semibold">MERN Stack Developer</strong> with <strong className="text-slate-900 dark:text-white font-semibold">1+ year of hands-on experience</strong> in building dynamic, high-performance, and responsive web applications.
              </p>
              <p>
                My expertise lies in translating complex requirements into clean, user-friendly interfaces with modern React.js and Next.js. I thrive on problem-solving, debugging tricky workflows, and writing maintainable code that scales smoothly.
              </p>
              <p>
                Driven by curiosity, I constantly stay ahead with modern web technologies, best development practices, and performance optimization techniques to deliver impactful digital solutions.
              </p>
            </div>

            {/* Small Stat Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-navy-border bg-white/70 dark:bg-navy-card/70 backdrop-blur-md shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 dark:text-white">
                        {stat.value}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Core Strengths Checklist */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                Key Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coreStrengths.map((strength) => (
                  <div
                    key={strength}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-sm shadow-md shadow-violet-accent/20 hover:shadow-electric-blue/30 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>View My Projects</span>
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Harsh_Vasoya_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-white/80 dark:bg-navy-card/80 text-slate-800 dark:text-slate-200 hover:text-violet-accent dark:hover:text-electric-blue hover:border-violet-accent/40 font-medium text-sm backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FiDownload className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
