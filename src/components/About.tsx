"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
      <motion.div
        key={language} // Re-animate when language changes
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8 text-foreground/80 leading-relaxed font-light text-lg"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-12">
          JEANNE S RÜCK
        </h2>
        
        {language === "fr" ? (
          <>
            <p>
              Artiste basée à Lausanne, Jeanne S R. travaille principalement à l’aquarelle depuis son atelier. Formée en arts visuels à l’ECAL (Lausanne) ainsi qu’à la HGK à Bâle, elle développe une pratique sensible et intime, ancrée dans son parcours et ses expériences.
            </p>
            <p>
              À travers ses œuvres, elle explore des notions liées à l’identité, aux espaces que l’on habite et à ceux que l’on s’autorise à occuper. Son travail est nourri par des expériences communautaires et des environnements empreints de solidarité, qui influencent profondément son regard et sa manière de créer.
            </p>
            <p>
              Ses aquarelles traduisent une recherche de douceur, de lien et d’attention portée aux détails. Elles invitent à un moment de pause et de contemplation, tout en laissant place à des récits personnels et sensibles.
            </p>
            <p>
              Aujourd’hui, elle poursuit son travail entre Lausanne et Fribourg, avec l’envie de créer des œuvres qui résonnent, accompagnent et trouvent leur place dans des espaces de vie.
            </p>
          </>
        ) : (
          <>
            <p>
              Jeanne S R. is a Lausanne-based artist working primarily with watercolor from her studio. She holds a Master’s degree in Visual Arts from ECAL (Lausanne) and previously studied at HGK in Basel. Her practice is intimate and sensitive, deeply rooted in her personal journey and lived experiences.
            </p>
            <p>
              Through her work, she explores questions of identity and the spaces we inhabit — as well as those we allow ourselves to occupy. Her artistic approach is shaped by community-oriented environments and experiences of solidarity, which strongly influence her perspective and creative process.
            </p>
            <p>
              Her watercolor pieces reflect a search for softness, connection, and attention to detail. They invite quiet moments of contemplation while leaving space for personal and emotional narratives.
            </p>
            <p>
              She currently works between Lausanne and Fribourg, creating artworks that are meant to resonate, accompany, and find a place within everyday living spaces.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
