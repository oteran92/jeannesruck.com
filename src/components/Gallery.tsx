"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import ArtworkModal from "./ArtworkModal";
import { useLanguage } from "./LanguageContext";
import type { Artwork } from "@/lib/types";

export default function Gallery({ artworks }: { artworks: Artwork[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const { t, language } = useLanguage();

  const handleNext = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    setSelectedArtwork(artworks[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setSelectedArtwork(artworks[prevIndex]);
  };

  return (
    <>
      <div 
        className="w-full pt-32 pb-24 px-6 md:px-12 flex flex-col items-center bg-background"
        ref={containerRef}
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="relative w-full overflow-hidden group aspect-[4/5] bg-neutral-100 cursor-pointer"
              onClick={() => setSelectedArtwork(art)}
            >
              <Image
                src={art.src}
                alt={art.title.en}
                fill
                preload={index < 4}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center"
              />
              {/* Elegant light overlay on hover with floating typography */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] transition-all duration-700 ease-out z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-foreground font-serif text-2xl md:text-3xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out text-center px-4">
                  {art.title[language] || t('untitled')}
                </span>
                <span className="text-accent font-sans tracking-[0.2em] uppercase text-[10px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75 ease-out">
                  {t('viewArtwork')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Modal View */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal 
            artwork={selectedArtwork} 
            onClose={() => setSelectedArtwork(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}
