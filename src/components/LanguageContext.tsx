"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
    viewArtwork: "View Artwork",
    forInquiries: "For inquiries or purchases",
    feelFree: "Please feel free to reach out directly.",
    allRightsReserved: "All rights reserved.",
    watercolor: "Watercolor on paper",
    untitled: "Untitled",
    phone: "Phone",
  },
  fr: {
    gallery: "Galerie",
    about: "À propos",
    contact: "Contact",
    viewArtwork: "Voir l'œuvre",
    forInquiries: "Pour toute demande ou achat",
    feelFree: "N'hésitez pas à me contacter directement.",
    allRightsReserved: "Tous droits réservés.",
    watercolor: "Aquarelle sur papier",
    untitled: "Sans titre",
    phone: "Téléphone",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr"); // Default to French as artist is in Lausanne

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
