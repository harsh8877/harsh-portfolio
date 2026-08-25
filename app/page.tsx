import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Me Section */}
      <About />

      {/* 3. Skills & Tech Stack Section */}
      <Skills />

      {/* 4. Work Experience Section */}
      <Experience />

      {/* 5. Highlighted Projects Section */}
      <Projects />

      {/* 6. Education Section */}
      <Education />

      {/* 7. Contact Section */}
      <Contact />
    </main>
  );
}
