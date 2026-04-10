"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import ArtworkModal, { Artwork } from "./ArtworkModal";
import { useLanguage } from "./LanguageContext";

const artworks: Artwork[] = [
  { src: "/assets/artworks/garden.jpg", alt: "Garden Watercolor", aspect: "aspect-[4/5]", title: { en: "Garden", fr: "Jardin" }, dimensions: "50 x 70 cm" },
  { src: "/assets/artworks/nailstory.jpg", alt: "Nailstory Watercolor", aspect: "aspect-[3/4]", title: { en: "Nail Story", fr: "Nail Story" }, dimensions: "40 x 50 cm" },
  { src: "/assets/artworks/full_Boo.jpg", alt: "Full Boo Watercolor", aspect: "aspect-square", title: { en: "Boo", fr: "Boo" }, dimensions: "60 x 60 cm" },
  { src: "/assets/artworks/IMG_1782 2.JPG", alt: "Watercolor Artwork 1", aspect: "aspect-[3/4]", title: { en: "Untitled I", fr: "Sans Titre I" }, dimensions: "30 x 40 cm" },
  { src: "/assets/artworks/IMG_4164 2.JPG", alt: "Watercolor Artwork 2", aspect: "aspect-[4/5]", title: { en: "Untitled II", fr: "Sans Titre II" }, dimensions: "50 x 70 cm" },
  { src: "/assets/artworks/Sans titre-1.JPG", alt: "Untitled Artwork 1", aspect: "aspect-[3/4]", title: { en: "Sans Titre", fr: "Sans Titre" }, dimensions: "40 x 50 cm" },
  { src: "/assets/artworks/Untitled-1.jpg", alt: "Untitled Artwork 2", aspect: "aspect-square", title: { en: "Study", fr: "Étude" }, dimensions: "30 x 30 cm" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const { t, language } = useLanguage();

  const handleNext = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(a => a.src === selectedArtwork.src);
    const nextIndex = (currentIndex + 1) % artworks.length;
    setSelectedArtwork(artworks[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(a => a.src === selectedArtwork.src);
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
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="relative w-full overflow-hidden group aspect-[4/5] bg-neutral-100 cursor-pointer"
              onClick={() => setSelectedArtwork(art)}
            >
              <Image
                src={art.src}
                alt={art.alt}
                fill
                priority={index < 4}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center"
              />
              {/* Elegant light overlay on hover with floating typography */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] transition-all duration-700 ease-out z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-foreground font-serif text-2xl md:text-3xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out text-center px-4">
                  {art.title?.[language] || t('untitled')}
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
