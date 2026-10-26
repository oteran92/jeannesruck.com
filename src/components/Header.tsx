"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 py-4 px-6 md:px-12 flex justify-between items-center bg-white/70 backdrop-blur-lg border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] text-foreground transition-all">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 relative rounded-full overflow-hidden border border-neutral-200">
            <Image
              src="/assets/logo/butterfly_logo_uncompressed.jpeg"
              alt="Jeanne S R. Logo"
              fill
              preload
              sizes="36px"
              className="object-cover"
            />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl">JEANNE S R.</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 text-sm md:text-base font-light tracking-widest uppercase">
            <a href="#gallery" className="hover:text-accent transition-colors">{t('gallery')}</a>
            <a href="#about" className="hover:text-accent transition-colors">{t('about')}</a>
            <a href="#contact" className="hover:text-accent transition-colors">{t('contact')}</a>
          </nav>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center text-xs tracking-[0.2em] uppercase gap-2 hover:opacity-70 transition-opacity ml-4"
          >
            <span className={language === 'fr' ? "font-medium text-foreground" : "text-foreground/40"}>FR</span>
            <span className="text-foreground/20 font-light">|</span>
            <span className={language === 'en' ? "font-medium text-foreground" : "text-foreground/40"}>EN</span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center text-[10px] tracking-[0.2em] uppercase gap-1.5 hover:opacity-70 transition-opacity mr-2"
          >
            <span className={language === 'fr' ? "font-medium text-foreground" : "text-foreground/40"}>FR</span>
            <span className="text-foreground/20 font-light">|</span>
            <span className={language === 'en' ? "font-medium text-foreground" : "text-foreground/40"}>EN</span>
          </button>

          <button 
            className="p-2 -mr-2 text-foreground"
            onClick={() => setIsOpen(true)}
            title="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-foreground"
              onClick={() => setIsOpen(false)}
              title="Close Menu"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-12 text-2xl font-light tracking-widest uppercase items-center">
              <motion.a 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                href="#gallery" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors"
              >
                {t('gallery')}
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                href="#about" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors"
              >
                {t('about')}
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                href="#contact" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors"
              >
                {t('contact')}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
