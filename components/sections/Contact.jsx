"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiAlertCircle,
  FiMapPin,
  FiClock,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vasoyaharsh123@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactMethods = [
    {
      label: "Email",
      value: "vasoyaharsh123@gmail.com",
      href: "mailto:vasoyaharsh123@gmail.com",
      icon: FiMail,
      color: "hover:text-electric-blue",
      isCopyable: true,
    },
    {
      label: "Phone",
      value: "+91 8866 194937",
      href: "tel:+918866194937",
      icon: FiPhone,
      color: "hover:text-emerald-400",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/harsh-vasoya-459b7722a",
      href: "https://linkedin.com/in/harsh-vasoya-459b7722a",
      icon: FiLinkedin,
      color: "hover:text-[#0077b5]",
    },
    {
      label: "GitHub",
      value: "github.com/harsh8877",
      href: "https://github.com/harsh8877",
      icon: FiGithub,
      color: "hover:text-[#6e5494]",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Animated Blobs and Grid Pattern */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -30, 20, 0],
                  y: [0, 30, -20, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-violet-accent/15 dark:bg-violet-accent/10 blur-[110px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -40, 30, 0],
                  scale: [1, 1.15, 0.9, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-electric-blue/15 dark:bg-electric-blue/10 blur-[110px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-accent/30 bg-violet-accent/10 px-4 py-1.5 text-xs font-semibold text-violet-accent dark:text-electric-blue mb-4">
            <span className="h-2 w-2 rounded-full bg-violet-accent dark:bg-electric-blue animate-pulse"></span>
            Let&apos;s Connect
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-slate-900 dark:text-white mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-violet-accent to-electric-blue bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Have a project idea, opportunity, or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        {/* Two-Column Grid: Left Contact Info / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/85 dark:bg-navy-card/90 border border-slate-200 dark:border-navy-border shadow-xl backdrop-blur-md">
              <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Feel free to reach out via email, phone, or connect on LinkedIn and GitHub. I look forward to hearing from you!
              </p>

              {/* Clickable Animated Contact Rows */}
              <div className="space-y-3.5">
                {contactMethods.map((method, idx) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ x: 4 }}
                      data-cursor="hover"
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-dark/60 border border-slate-200/80 dark:border-navy-border/60 hover:border-violet-accent/40 dark:hover:border-electric-blue/40 transition-all duration-200 shadow-sm"
                    >
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <div className="p-2.5 rounded-xl bg-violet-accent/10 dark:bg-electric-blue/10 text-violet-accent dark:text-electric-blue group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            {method.label}
                          </p>
                          <p
                            className={`text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 truncate transition-colors ${method.color}`}
                          >
                            {method.value}
                          </p>
                        </div>
                      </a>

                      {method.isCopyable && (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          data-cursor="hover"
                          title="Copy Email"
                          aria-label="Copy Email"
                          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-navy-light transition-colors ml-2 cursor-pointer"
                        >
                          {copiedEmail ? (
                            <FiCheck className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <FiCopy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-navy-border/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FiClock className="w-3.5 h-3.5 text-violet-accent dark:text-electric-blue" />
                  Fast Response (Within 24h)
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                  Surat, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-5 sm:p-10 rounded-3xl bg-white/90 dark:bg-navy-card/90 border border-slate-200 dark:border-navy-border shadow-xl backdrop-blur-md">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Animated Success State with Spring & SVG Path Checkmark */
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85, y: shouldReduceMotion ? 0 : 25 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85, y: shouldReduceMotion ? 0 : -20 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.2 }
                        : {
                            type: "spring",
                            damping: 20,
                            stiffness: 260,
                          }
                    }
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    {/* Animated SVG Checkmark drawing itself */}
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-2">
                      <svg
                        className="w-12 h-12 text-emerald-500"
                        viewBox="0 0 52 52"
                        fill="none"
                      >
                        <motion.circle
                          cx="26"
                          cy="26"
                          r="23"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
                        />
                        <motion.path
                          d="M15 27l8 8 16-16"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : {
                                  duration: 0.45,
                                  delay: 0.35,
                                  ease: "easeOut",
                                }
                          }
                        />
                      </svg>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 dark:text-white">
                      Message Sent Successfully!
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out! Harsh will review your message and reply as soon as possible.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      data-cursor="hover"
                      className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Contact Form with Animated Floating Labels */
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-2">
                      Send a Message
                    </h3>

                    {/* Name Floating Field */}
                    <div className="relative pt-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <FiUser className="w-4 h-4" />
                        </div>

                        {/* Floating Label */}
                        <motion.label
                          htmlFor="name"
                          initial={false}
                          animate={{
                            y: focusedField === "name" || formData.name ? -24 : 12,
                            scale: focusedField === "name" || formData.name ? 0.85 : 1,
                            color:
                              focusedField === "name"
                                ? "#6c5ce7"
                                : "#94a3b8",
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-10 pointer-events-none origin-left font-semibold text-xs uppercase tracking-wider z-10"
                        >
                          Your Name <span className="text-rose-500">*</span>
                        </motion.label>

                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          onChange={handleChange}
                          data-cursor="hover"
                          placeholder={focusedField === "name" ? "e.g. John Doe" : ""}
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-navy-dark/70 border ${
                            errors.name
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-200 dark:border-navy-border focus:border-violet-accent dark:focus:border-electric-blue"
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-accent/20 dark:focus:ring-electric-blue/20 transition-all`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-1 text-xs text-rose-500 mt-1.5"
                          >
                            <FiAlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.name}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Floating Field */}
                    <div className="relative pt-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <FiMail className="w-4 h-4" />
                        </div>

                        {/* Floating Label */}
                        <motion.label
                          htmlFor="email"
                          initial={false}
                          animate={{
                            y: focusedField === "email" || formData.email ? -24 : 12,
                            scale: focusedField === "email" || formData.email ? 0.85 : 1,
                            color:
                              focusedField === "email"
                                ? "#6c5ce7"
                                : "#94a3b8",
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-10 pointer-events-none origin-left font-semibold text-xs uppercase tracking-wider z-10"
                        >
                          Email Address <span className="text-rose-500">*</span>
                        </motion.label>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          onChange={handleChange}
                          data-cursor="hover"
                          placeholder={focusedField === "email" ? "e.g. john@example.com" : ""}
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-navy-dark/70 border ${
                            errors.email
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-200 dark:border-navy-border focus:border-violet-accent dark:focus:border-electric-blue"
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-accent/20 dark:focus:ring-electric-blue/20 transition-all`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-1 text-xs text-rose-500 mt-1.5"
                          >
                            <FiAlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.email}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Floating Field */}
                    <div className="relative pt-3">
                      <div className="relative">
                        <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                          <FiMessageSquare className="w-4 h-4" />
                        </div>

                        {/* Floating Label */}
                        <motion.label
                          htmlFor="message"
                          initial={false}
                          animate={{
                            y: focusedField === "message" || formData.message ? -24 : 12,
                            scale: focusedField === "message" || formData.message ? 0.85 : 1,
                            color:
                              focusedField === "message"
                                ? "#6c5ce7"
                                : "#94a3b8",
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-10 pointer-events-none origin-left font-semibold text-xs uppercase tracking-wider z-10"
                        >
                          Message <span className="text-rose-500">*</span>
                        </motion.label>

                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          onChange={handleChange}
                          data-cursor="hover"
                          placeholder={
                            focusedField === "message"
                              ? "Tell me about your project, opportunity, or inquiry..."
                              : ""
                          }
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-navy-dark/70 border ${
                            errors.message
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-200 dark:border-navy-border focus:border-violet-accent dark:focus:border-electric-blue"
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-accent/20 dark:focus:ring-electric-blue/20 transition-all resize-none`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-1 text-xs text-rose-500 mt-1.5"
                          >
                            <FiAlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.message}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm"
                        >
                          <FiAlertCircle className="w-4 h-4 shrink-0" />
                          <span>{submitError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      data-cursor="hover"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-accent to-electric-blue text-white font-medium text-sm sm:text-base shadow-lg shadow-violet-accent/25 hover:shadow-electric-blue/30 transition-all duration-200 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiSend className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
