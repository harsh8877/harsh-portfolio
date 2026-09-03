"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";
import { useLenis } from "@/components/SmoothScrollProvider";
import Magnetic from "@/components/Magnetic";

const TYPING_PHRASES = [
  "MERN Stack Developer",
  "React.js Developer",
  "Frontend Engineer",
];

const NAME_WORDS = [
  { word: "Harsh", chars: ["H", "a", "r", "s", "h"] },
  { word: "Vasoya", chars: ["V", "a", "s", "o", "y", "a"] },
];

// Custom typewriter hook
function useTypewriter(phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1800) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing characters
          setText(currentPhrase.substring(0, text.length + 1));

          if (text.length + 1 === currentPhrase.length) {
            // Finished typing word, wait before deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting characters
          setText(currentPhrase.substring(0, text.length - 1));

          if (text.length - 1 === 0) {
            // Finished deleting, move to next phrase
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

export default function Hero() {
  const heroRef = useRef(null);
  const lenis = useLenis();
  const typedRole = useTypewriter(TYPING_PHRASES);
  const shouldReduceMotion = useReducedMotion();

  // Parallax depth transforms based on scroll through the Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawContentY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const rawContentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const rawBlob1Y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const rawBlob2Y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const rawGridY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const contentY = shouldReduceMotion ? 0 : rawContentY;
  const contentOpacity = shouldReduceMotion ? 1 : rawContentOpacity;
  const blob1Y = shouldReduceMotion ? 0 : rawBlob1Y;
  const blob2Y = shouldReduceMotion ? 0 : rawBlob2Y;
  const gridY = shouldReduceMotion ? 0 : rawGridY;

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      if (lenis) {
        lenis.scrollTo(contactSection, { offset: -80, duration: 1.2 });
      } else if (typeof window !== "undefined" && window.lenis) {
        window.lenis.scrollTo(contactSection, { offset: -80, duration: 1.2 });
      } else {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
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

  // Framer Motion variants for character-by-character typewriter reveal
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.3 }
        : {
            staggerChildren: 0.035,
            delayChildren: 0.15,
          },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: shouldReduceMotion
        ? { duration: 0.2 }
        : {
            type: "spring",
            damping: 14,
            stiffness: 220,
            duration: 0.45,
          },
    },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle Background Glows and Grid with Parallax Transform */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Animated Gradient Blob 1 */}
        <motion.div
          style={{ y: blob1Y }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.15, 0.95, 1],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-violet-accent/20 dark:bg-violet-accent/15 blur-[100px]"
        />

        {/* Animated Gradient Blob 2 */}
        <motion.div
          style={{ y: blob2Y }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -50, 30, 0],
                  y: [0, 50, -30, 0],
                  scale: [1, 1.2, 0.9, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-electric-blue/15 dark:bg-electric-blue/10 blur-[110px]"
        />

        {/* Background Grid Pattern */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>

      {/* Main Hero Content Container with Parallax Translation and Fade */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-4xl mx-auto text-center relative z-10 w-full"
      >
        {/* Location & Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-300/80 dark:border-navy-border bg-white/85 dark:bg-navy-card/85 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 backdrop-blur-md shadow-sm mb-6 sm:mb-8 max-w-full"
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="whitespace-nowrap">Available for opportunities</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600 hidden xs:inline">•</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 whitespace-nowrap">
            <FiMapPin className="h-3.5 w-3.5 text-violet-accent" />
            Surat, Gujarat, India
          </span>
        </motion.div>

        {/* Name / Main Heading with Staggered Character Typewriter Reveal */}
        <div className="mb-3 sm:mb-4">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-xs sm:text-base md:text-lg font-medium text-violet-accent dark:text-electric-blue mb-2 font-poppins tracking-wider uppercase"
          >
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white leading-tight flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 select-none"
          >
            {NAME_WORDS.map((wordObj, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-flex whitespace-nowrap overflow-visible"
              >
                {wordObj.chars.map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={charVariants}
                    className="inline-block bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent transform-gpu"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Animated Typing Text */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.35 }}
          className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center mb-5 sm:mb-6"
        >
          <p className="text-base sm:text-2xl md:text-3xl font-semibold font-poppins text-slate-700 dark:text-slate-200">
            I am a{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent font-bold">
              {typedRole}
            </span>
            <span className="inline-block w-[3px] h-5 sm:h-7 ml-1 bg-electric-blue align-middle animate-pulse" />
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.45 }}
          className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
        >
          Passionate about crafting dynamic, responsive, and high-performance web
          applications with modern React.js, Next.js, and clean scalable code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-10 sm:mb-12 w-full max-w-xs sm:max-w-none mx-auto"
        >
          {/* Download Resume Button */}
          <Magnetic maxDistance={12} className="w-full sm:w-auto">
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              href="/resume.pdf?v=2"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-sm sm:text-base shadow-lg shadow-violet-accent/25 hover:shadow-electric-blue/30 transition-all duration-300 cursor-pointer min-h-[48px]"
            >
              <FiDownload className="h-4 sm:h-5 w-4 sm:w-5" />
              <span>Download Resume</span>
            </motion.a>
          </Magnetic>

          {/* Contact Me Button */}
          <Magnetic maxDistance={12} className="w-full sm:w-auto">
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              href="#contact"
              onClick={scrollToContact}
              data-cursor="hover"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl border border-slate-300 dark:border-navy-border bg-white/80 dark:bg-navy-card/80 text-slate-800 dark:text-slate-200 hover:text-violet-accent dark:hover:text-electric-blue hover:border-violet-accent/40 dark:hover:border-electric-blue/40 font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer min-h-[48px]"
            >
              <span>Contact Me</span>
              <FiArrowRight className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.65 }}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Magnetic key={social.name} maxDistance={8}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  data-cursor="hover"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                  className={`p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-navy-border bg-white/80 dark:bg-navy-card/80 text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center ${social.hoverClass}`}
                >
                  <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
                </motion.a>
              </Magnetic>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
