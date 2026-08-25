"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";

const TYPING_PHRASES = [
  "MERN Stack Developer",
  "React.js Developer",
  "Frontend Engineer",
];

// Custom typewriter hook
function useTypewriter(phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1800) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, deletingSpeed);
    } else {
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

export default function Hero() {
  const typedRole = useTypewriter(TYPING_PHRASES);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/harsh8877",
      icon: FiGithub,
      hoverClass: "hover:text-[#6e5494] hover:border-[#6e5494]/40 hover:bg-[#6e5494]/10",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/harsh-vasoya-459b7722a",
      icon: FiLinkedin,
      hoverClass: "hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10",
    },
    {
      name: "Email",
      href: "mailto:vasoyaharsh123@gmail.com",
      icon: FiMail,
      hoverClass: "hover:text-electric-blue hover:border-electric-blue/40 hover:bg-electric-blue/10",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle Background Glows and Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Animated Gradient Blob 1 */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-violet-accent/20 dark:bg-violet-accent/15 blur-[100px]"
        />

        {/* Animated Gradient Blob 2 */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-electric-blue/15 dark:bg-electric-blue/10 blur-[110px]"
        />

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Location & Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 dark:border-navy-border bg-white/80 dark:bg-navy-card/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 backdrop-blur-md shadow-sm mb-6 sm:mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Available for opportunities</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <FiMapPin className="h-3.5 w-3.5 text-violet-accent" />
            Surat, Gujarat, India
          </span>
        </motion.div>

        {/* Name / Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-sm sm:text-base md:text-lg font-medium text-violet-accent dark:text-electric-blue mb-2 font-poppins tracking-wide uppercase">
            Hi, I&apos;m
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Harsh Vasoya
            </span>
          </h1>
        </motion.div>

        {/* Animated Typing Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-6"
        >
          <p className="text-lg sm:text-2xl md:text-3xl font-semibold font-poppins text-slate-700 dark:text-slate-200">
            I am a{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent font-bold">
              {typedRole}
            </span>
            <span className="inline-block w-[3px] h-6 sm:h-8 ml-1 bg-electric-blue align-middle animate-pulse" />
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-600 dark:text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          Passionate about crafting dynamic, responsive, and high-performance web
          applications with modern React.js, Next.js, and clean scalable code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10 sm:mb-12"
        >
          {/* Download Resume Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Harsh_Vasoya_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-base shadow-lg shadow-violet-accent/25 hover:shadow-electric-blue/30 transition-all duration-300 cursor-pointer"
          >
            <FiDownload className="h-5 w-5" />
            <span>Download Resume</span>
          </motion.a>

          {/* Contact Me Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-slate-300 dark:border-navy-border bg-white/70 dark:bg-navy-card/80 text-slate-800 dark:text-slate-200 hover:text-violet-accent dark:hover:text-electric-blue hover:border-violet-accent/40 dark:hover:border-electric-blue/40 font-medium text-base backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>Contact Me</span>
            <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className={`p-3 rounded-xl border border-slate-200 dark:border-navy-border bg-white/80 dark:bg-navy-card/80 text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer ${social.hoverClass}`}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
