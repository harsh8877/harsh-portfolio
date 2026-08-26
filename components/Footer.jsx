"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";
import { useLenis } from "./SmoothScrollProvider";
import Magnetic from "./Magnetic";

export default function Footer() {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const footerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.3 }
        : {
            staggerChildren: 0.12,
            delayChildren: 0.1,
          },
    },
  };

  const footerItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        lenis?.scroll !== undefined ? lenis.scroll : window.scrollY;
      if (currentScroll > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    if (lenis) {
      lenis.on("scroll", handleScroll);
      handleScroll();
      return () => {
        lenis.off("scroll", handleScroll);
      };
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { offset: 0, duration: 1.2 });
    } else if (typeof window !== "undefined" && window.lenis) {
      window.lenis.scrollTo(0, { offset: 0, duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/harsh8877",
      icon: FiGithub,
      hoverClass: "hover:text-[#6e5494] hover:bg-[#6e5494]/10 hover:border-[#6e5494]/30",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/harsh-vasoya-459b7722a",
      icon: FiLinkedin,
      hoverClass: "hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30",
    },
    {
      name: "Email",
      href: "mailto:vasoyaharsh123@gmail.com",
      icon: FiMail,
      hoverClass: "hover:text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue/30",
    },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (href === "#home") {
      scrollToTop();
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else if (typeof window !== "undefined" && window.lenis) {
        window.lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-navy-border/50 bg-white/70 dark:bg-navy-dark/80 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        variants={footerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        {/* Top Row: Brand, Nav Links & Social Icons */}
        <motion.div
          variants={footerItemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-200/80 dark:border-navy-border/50"
        >
          {/* Left: Brand Logo & Title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Magnetic maxDistance={8}>
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, "#home")}
                data-cursor="hover"
                className="flex items-center gap-2 text-lg font-bold font-poppins text-slate-900 dark:text-white group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-accent to-electric-blue text-white text-xs font-extrabold shadow-md shadow-violet-accent/20">
                  HV
                </span>
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent group-hover:from-violet-accent group-hover:to-electric-blue transition-all">
                  Harsh Vasoya
                </span>
              </a>
            </Magnetic>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs">
              MERN Stack Developer building modern, responsive, and high-performance web applications.
            </p>
          </div>

          {/* Middle: Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                data-cursor="hover"
                className="hover:text-violet-accent dark:hover:text-electric-blue transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Social Icons Row */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Magnetic key={social.name} maxDistance={6}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    data-cursor="hover"
                    className={`p-2.5 rounded-xl border border-slate-200 dark:border-navy-border bg-slate-50 dark:bg-navy-card/80 text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-200 cursor-pointer block ${social.hoverClass}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </Magnetic>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Copyright & Credit Row */}
        <motion.div
          variants={footerItemVariants}
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left"
        >
          <p>© 2026 Harsh Vasoya. All rights reserved.</p>
          <p className="flex items-center gap-1.5 justify-center">
            <span>Built with Next.js, Tailwind CSS &amp; Framer Motion</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Animated Back to Top Button with Magnetic Hover */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.7, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.7, y: shouldReduceMotion ? 0 : 20 }}
            transition={shouldReduceMotion ? { duration: 0.2 } : undefined}
            className="fixed bottom-6 right-6 z-40"
          >
            <Magnetic maxDistance={12}>
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                onClick={scrollToTop}
                data-cursor="hover"
                aria-label="Back to top"
                className="p-3.5 rounded-2xl bg-gradient-to-tr from-violet-accent to-electric-blue text-white shadow-xl shadow-violet-accent/30 hover:shadow-electric-blue/40 transition-shadow cursor-pointer flex items-center justify-center"
              >
                <FiArrowUp className="w-5 h-5" />
              </motion.button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
