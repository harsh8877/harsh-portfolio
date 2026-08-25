import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";

export default function Home() {
  const sections = [
    { id: "education", title: "Education & Certifications", desc: "Degrees, academic achievements, and courses." },
    { id: "contact", title: "Get In Touch", desc: "Contact form, email, and social links." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <Projects />

      {/* Remaining Portfolio Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`min-h-[70vh] flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 ${
            idx % 2 === 0
              ? "bg-slate-100/60 dark:bg-navy-dark border-t border-slate-200 dark:border-navy-border/40"
              : "bg-slate-50 dark:bg-navy border-t border-slate-200 dark:border-navy-border/40"
          }`}
        >
          <div className="relative z-10 max-w-3xl rounded-2xl border border-slate-200 dark:border-navy-border bg-white/80 dark:bg-navy-card/80 p-8 md:p-12 shadow-xl backdrop-blur-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-accent/30 bg-violet-accent/10 px-4 py-1.5 text-xs font-medium text-violet-accent dark:text-electric-blue mb-4">
              <span className="h-2 w-2 rounded-full bg-electric-blue animate-pulse"></span>
              #{section.id}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight text-slate-900 dark:text-white mb-3">
              {section.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto">
              {section.desc}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
