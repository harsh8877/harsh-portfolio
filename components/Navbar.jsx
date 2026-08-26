"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useLenis } from "./SmoothScrollProvider";
import Magnetic from "./Magnetic";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for sticky background blur & active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        lenis?.scroll !== undefined ? lenis.scroll : window.scrollY;

      if (currentScroll > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const scrollPosition = currentScroll + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const section = document.querySelector(link.href);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(link.href.replace("#", ""));
            break;
          }
        }
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
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lenis]);

  // Initialize theme from localStorage or document class
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && document.documentElement.classList.contains("dark")) ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const rafId = requestAnimationFrame(() => {
      setDarkMode(isDark);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Smooth scroll handler using Lenis
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "#home") {
      if (lenis) {
        lenis.scrollTo(0, { offset: 0, duration: 1.2 });
      } else if (typeof window !== "undefined" && window.lenis) {
        window.lenis.scrollTo(0, { offset: 0, duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection("home");
      return;
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
        });
      } else if (typeof window !== "undefined" && window.lenis) {
        window.lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setActiveSection(href.replace("#", ""));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 dark:bg-navy/85 backdrop-blur-lg shadow-lg shadow-black/5 dark:shadow-violet-accent/5 border-b border-slate-200/80 dark:border-navy-border/60"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Magnetic maxDistance={12}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              data-cursor="hover"
              className="group flex items-center gap-2 text-xl font-bold font-poppins tracking-tight text-slate-900 dark:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-accent to-electric-blue text-white shadow-md shadow-violet-accent/20 group-hover:scale-105 transition-transform duration-200 text-sm font-extrabold">
                HV
              </span>
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent group-hover:from-violet-accent group-hover:to-electric-blue transition-all duration-300">
                Harsh Vasoya
              </span>
            </a>
          </Magnetic>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-violet-accent dark:text-electric-blue font-semibold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-navy-card/60"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-violet-accent/10 dark:bg-electric-blue/10 -z-10 border border-violet-accent/20 dark:border-electric-blue/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-navy-border bg-slate-100/80 dark:bg-navy-card/80 text-slate-700 dark:text-electric-blue hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiSun className="h-5 w-5 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMoon className="h-5 w-5 text-violet-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2.5 rounded-xl border border-slate-200 dark:border-navy-border bg-slate-100/80 dark:bg-navy-card/80 text-slate-700 dark:text-slate-200 hover:text-violet-accent dark:hover:text-electric-blue transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-[65px] bottom-0 w-[80%] max-w-sm bg-white dark:bg-navy-card/95 backdrop-blur-xl border-l border-slate-200 dark:border-navy-border z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="space-y-2">
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                  Navigation
                </p>
                {NAV_LINKS.map((link, idx) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-violet-accent/10 dark:bg-electric-blue/10 text-violet-accent dark:text-electric-blue font-semibold border border-violet-accent/20 dark:border-electric-blue/20"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-light/60 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-violet-accent dark:bg-electric-blue" />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer Bottom Info */}
              <div className="pt-6 border-t border-slate-200 dark:border-navy-border/60">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Theme: {darkMode ? "Dark Navy" : "Light"}</span>
                  <span className="text-violet-accent dark:text-electric-blue font-medium">
                    HV Portfolio
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
