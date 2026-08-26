"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReacthookform,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRedis,
  SiFirebase,
} from "react-icons/si";
import { TbApi, TbShieldLock } from "react-icons/tb";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiDatabase,
  FiSliders,
  FiCpu,
} from "react-icons/fi";

const CATEGORIES = [
  { id: "all", label: "All Skills", icon: FiCpu },
  { id: "languages", label: "Languages & Markup", icon: FiCode },
  { id: "frontend", label: "Frontend", icon: FiLayout },
  { id: "backend", label: "Backend", icon: FiServer },
  { id: "database", label: "Database", icon: FiDatabase },
  { id: "other", label: "Other & Tools", icon: FiSliders },
];

const SKILLS_DATA = [
  // Languages & Markup
  {
    name: "HTML5",
    category: "languages",
    categoryLabel: "Languages & Markup",
    icon: SiHtml5,
    color: "#E34F26",
    level: "Core",
  },
  {
    name: "CSS3",
    category: "languages",
    categoryLabel: "Languages & Markup",
    icon: SiCss,
    color: "#1572B6",
    level: "Styling",
  },
  {
    name: "JavaScript",
    category: "languages",
    categoryLabel: "Languages & Markup",
    icon: SiJavascript,
    color: "#F7DF1E",
    level: "ES6+",
  },
  {
    name: "TypeScript",
    category: "languages",
    categoryLabel: "Languages & Markup",
    icon: SiTypescript,
    color: "#3178C6",
    level: "Typed JS",
  },

  // Frontend
  {
    name: "React.js",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: SiReact,
    color: "#61DAFB",
    level: "Primary",
  },
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: SiNextdotjs,
    color: "#00d4ff",
    level: "App Router",
  },
  {
    name: "Redux Toolkit",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: SiRedux,
    color: "#764ABC",
    level: "State Mgmt",
  },
  {
    name: "React Hook Form",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: SiReacthookform,
    color: "#EC5990",
    level: "Forms & Validations",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: SiTailwindcss,
    color: "#06B6D4",
    level: "Modern CSS",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend",
    icon: SiNodedotjs,
    color: "#5FA04E",
    level: "Runtime",
  },
  {
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend",
    icon: SiExpress,
    color: "#9ca3af",
    level: "Framework",
  },

  // Database
  {
    name: "MongoDB",
    category: "database",
    categoryLabel: "Database",
    icon: SiMongodb,
    color: "#47A248",
    level: "NoSQL DB",
  },

  // Other
  {
    name: "REST APIs",
    category: "other",
    categoryLabel: "Other",
    icon: TbApi,
    color: "#00d4ff",
    level: "Architecture",
  },
  {
    name: "Redis (basic)",
    category: "other",
    categoryLabel: "Other",
    icon: SiRedis,
    color: "#DC382D",
    level: "Caching",
  },
  {
    name: "RBAC",
    category: "other",
    categoryLabel: "Other",
    icon: TbShieldLock,
    color: "#8B5CF6",
    level: "Security",
  },
  {
    name: "Firebase",
    category: "other",
    categoryLabel: "Other",
    icon: SiFirebase,
    color: "#FFCA28",
    level: "BaaS & Auth",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// 3D Tilt Skill Badge Component
function SkillTiltCard({ skill }) {
  const cardRef = useRef(null);

  // Normalized mouse coordinates relative to badge center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for natural tilt responsiveness and recovery
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 20 });

  // 3D rotation transforms
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["10%", "90%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.06,
        y: -5,
        boxShadow: `0 20px 35px -10px ${skill.color}35`,
        borderColor: `${skill.color}80`,
      }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-white/85 dark:bg-navy-card/90 border border-slate-200 dark:border-navy-border shadow-sm hover:shadow-xl backdrop-blur-md transition-colors duration-200 cursor-pointer overflow-hidden min-h-[135px] sm:min-h-[155px] select-none will-change-transform"
    >
      {/* Dynamic 3D Cursor Ambient Glow */}
      <motion.div
        className="absolute w-28 h-28 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: skill.color,
          left: glowX,
          top: glowY,
        }}
      />

      {/* Skill Icon with 3D Pop (translateZ) */}
      <div
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center p-2 sm:p-2.5 transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${skill.color}15`,
          transform: "translateZ(20px)",
        }}
      >
        <Icon
          className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300"
          style={{ color: skill.color }}
        />
      </div>

      {/* Skill Name & Level Badge */}
      <div
        className="text-center w-full mt-2"
        style={{ transform: "translateZ(15px)" }}
      >
        <h3 className="text-sm sm:text-base font-bold font-poppins text-slate-800 dark:text-slate-100 group-hover:text-violet-accent dark:group-hover:text-electric-blue transition-colors duration-200 truncate">
          {skill.name}
        </h3>
        <span className="inline-block text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-navy-light px-2 py-0.5 rounded-md mt-1 border border-slate-200/60 dark:border-navy-border/60">
          {skill.level}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills =
    activeTab === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50/50 dark:bg-navy-dark/40 border-t border-slate-200/80 dark:border-navy-border/40"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 right-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-electric-blue/10 dark:bg-electric-blue/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-violet-accent/10 dark:bg-violet-accent/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-accent/30 bg-violet-accent/10 px-4 py-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue mb-4">
            <span className="h-2 w-2 rounded-full bg-violet-accent dark:bg-electric-blue animate-pulse"></span>
            My Tech Stack
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A comprehensive set of modern tools, libraries, and frameworks I leverage to engineer robust digital solutions.
          </p>
        </motion.div>

        {/* Category Tabs Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-10 sm:mb-12 px-1"
        >
          {CATEGORIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-cursor="hover"
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer min-h-[36px] sm:min-h-[40px] ${
                  isActive
                    ? "text-white dark:text-white font-semibold shadow-md shadow-violet-accent/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-white/70 dark:bg-navy-card/60 border border-slate-200 dark:border-navy-border hover:border-violet-accent/30"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-accent to-electric-blue -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid with 3D perspective */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ perspective: 1000 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillTiltCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Categorized Summary View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Frontend Architecture */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-border bg-white/70 dark:bg-navy-card/70 backdrop-blur-md shadow-md hover:border-violet-accent/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-violet-accent/10 text-violet-accent">
                <FiLayout className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-slate-900 dark:text-white text-base">
                Frontend Architecture
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Specialized in building modular Next.js &amp; React apps with scalable state management, reusable components, and responsive Tailwind styling.
            </p>
          </div>

          {/* Card 2: Full-Stack Integration */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-border bg-white/70 dark:bg-navy-card/70 backdrop-blur-md shadow-md hover:border-electric-blue/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-electric-blue/10 text-electric-blue">
                <FiServer className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-slate-900 dark:text-white text-base">
                Full-Stack Integration
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Proficient in building RESTful APIs with Node.js and Express.js, integrating MongoDB databases, and implementing secure RBAC workflows.
            </p>
          </div>

          {/* Card 3: Performance & Best Practices */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-border bg-white/70 dark:bg-navy-card/70 backdrop-blur-md shadow-md hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <FiCode className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-slate-900 dark:text-white text-base">
                Clean Code &amp; Speed
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Writing maintainable, typed, and well-structured code with TypeScript, fast debugging, seamless API validations, and Redis caching.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
