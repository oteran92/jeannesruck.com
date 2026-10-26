"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

import type { Artwork } from "@/lib/types";

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ArtworkModal({ artwork, onClose, onNext, onPrev }: ArtworkModalProps) {
  const { t, language } = useLanguage();

  // Close on Escape key, navigate on arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
    >
      {/* Close Control */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute top-6 right-6 z-50"
      >
        <button
          onClick={onClose}
          className="p-3 bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
          title="Close"
        >
          <X size={20} />
        </button>
      </motion.div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 md:left-8 z-50 flex items-center pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="p-3 bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10 pointer-events-auto"
          title="Previous"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-8 z-50 flex items-center pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="p-3 bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10 pointer-events-auto"
          title="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Details Panel */}
      <motion.div
        key={`details-${artwork.id}-${language}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-8 left-8 z-50 text-white max-w-sm pointer-events-none"
      >
        <h2 className="font-serif text-2xl md:text-4xl mb-2 tracking-wide">
          {artwork.title[language] || t('untitled')}
        </h2>
        <p className="font-light text-white/70 text-sm tracking-widest uppercase">
          {artwork.medium?.[language] || t('watercolor')}
        </p>
        {artwork.dimensions && (
          <p className="font-light text-white/50 text-xs mt-2 tracking-wider">{artwork.dimensions}</p>
        )}
      </motion.div>

      {/* Cinematic View - Full screen focus */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-12 md:p-24" onClick={onClose}>
        <motion.div
          key={`image-${artwork.id}`}
          initial={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full max-w-6xl"
          onClick={(e) => e.stopPropagation()} // prevent click from bubbling to the close handler
        >
          <Image
            src={artwork.src}
            alt={artwork.title.en}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="100vw"
            preload
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
