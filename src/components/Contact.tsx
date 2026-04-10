"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full bg-[#f4f2ef] overflow-hidden pt-32 pb-12 px-6 md:px-12 flex flex-col items-center">
      
      {/* Huge artistic watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[70vw] h-[150vw] md:h-[70vw] opacity-[0.04] pointer-events-none mix-blend-multiply">
        <Image
          src="/assets/logo/butterfly_logo_uncompressed.jpeg"
          alt="Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start">
        
        {/* Left Side: Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-neutral-800 tracking-tight">
            {t("contact")}
          </h2>
          <div className="w-16 h-[1px] bg-neutral-300" />
          <div className="space-y-2">
            <p className="text-neutral-500 font-light text-lg md:text-xl max-w-sm">
              {t("forInquiries")}
            </p>
            <p className="text-neutral-400 font-light text-sm md:text-base max-w-sm">
              {t("feelFree")}
            </p>
          </div>
        </motion.div>

        {/* Right Side: Contact Links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col md:items-end space-y-12 md:pt-4"
        >
          <a
            href="tel:+41795207427"
            className="group flex flex-col md:items-end gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition-colors group-hover:text-accent">{t("phone")}</span>
            <span className="text-2xl md:text-3xl font-light text-neutral-800 transition-colors duration-500 relative">
              +41 79 520 74 27
              {/* Elegant underline reveal */}
              <span className="absolute -bottom-2 right-0 w-0 h-[1px] bg-accent transition-all duration-700 ease-out group-hover:w-full" />
            </span>
          </a>

          <a
            href="mailto:jeanne.ruck@hotmail.com"
            className="group flex flex-col md:items-end gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition-colors group-hover:text-accent">Email</span>
            <span className="text-2xl md:text-3xl font-light text-neutral-800 transition-colors duration-500 relative">
              jeanne.ruck@hotmail.com
              {/* Elegant underline reveal */}
              <span className="absolute -bottom-2 right-0 w-0 h-[1px] bg-accent transition-all duration-700 ease-out group-hover:w-full" />
            </span>
          </a>

          <a
            href="https://instagram.com/j_s_ruck"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:items-end gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition-colors group-hover:text-accent">Instagram</span>
            <span className="text-2xl md:text-3xl font-light text-neutral-800 transition-colors duration-500 relative">
              @j_s_ruck
              {/* Elegant underline reveal */}
              <span className="absolute -bottom-2 right-0 w-0 h-[1px] bg-accent transition-all duration-700 ease-out group-hover:w-full" />
            </span>
          </a>
        </motion.div>

      </div>

      {/* Footer Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-6xl mt-32 pt-8 border-t border-neutral-300/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-400 font-light tracking-[0.2em] uppercase relative z-10"
      >
        <p>© {new Date().getFullYear()} JEANNE S R.</p>
        <p>{t("allRightsReserved")}</p>
      </motion.div>

    </footer>
  );
}
