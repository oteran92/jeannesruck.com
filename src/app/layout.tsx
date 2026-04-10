import type { Metadata } from "next";
import { Inter, Italiana } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"] 
});

const italiana = Italiana({ 
  variable: "--font-italiana", 
  weight: "400", 
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "Jeanne S R. | Portfolio",
  description: "Portfolio of Lausanne-based watercolor artist Jeanne S R.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${italiana.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
