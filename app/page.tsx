"use client";

import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio-home-page"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        {/* 1. Hero Section (#home) */}
        <Hero />

        {/* 2. About Me Section (#about) */}
        <About />

        {/* 3. Technical Skills Section (#skills) */}
        <Skills />

        {/* 4. Work Experience Section (#experience) */}
        <Experience />

        {/* 5. Featured Projects Section (#projects) */}
        <Projects />

        {/* 6. Education Section (#education) */}
        <Education />

        {/* 7. Contact Section (#contact) */}
        <Contact />

        {/* 8. Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
