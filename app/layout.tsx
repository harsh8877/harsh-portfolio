import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Vasoya - MERN Stack Developer Portfolio",
  description:
    "Personal portfolio website of Harsh Vasoya - MERN Stack Developer specializing in React.js, Next.js, and modern full-stack web applications.",
  keywords: [
    "Harsh Vasoya",
    "MERN Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Full-Stack Developer",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Surat",
    "Portfolio",
  ],
  authors: [{ name: "Harsh Vasoya", url: "https://github.com/harsh8877" }],
  creator: "Harsh Vasoya",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Harsh Vasoya - MERN Stack Developer Portfolio",
    description:
      "Passionate MERN Stack Developer crafting dynamic, responsive, and scalable web applications.",
    type: "website",
    locale: "en_US",
    siteName: "Harsh Vasoya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Vasoya - MERN Stack Developer Portfolio",
    description:
      "Passionate MERN Stack Developer crafting dynamic, responsive, and scalable web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} dark`}
    >
      <body className="bg-slate-50 dark:bg-navy text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-violet-accent selection:text-white font-sans transition-colors duration-300">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <div className="pt-20 flex-1 flex flex-col">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
