import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { getArtworks } from "@/lib/artworks";

export default async function Home() {
  const artworks = await getArtworks();

  return (
    <main className="min-h-screen relative font-sans selection:bg-accent selection:text-white">
      <Preloader />
      <Header />

      {/* Main Content Sections */}
      <div className="flex flex-col">
        <section id="gallery" className="min-h-screen w-full relative">
          <Gallery artworks={artworks} />
        </section>
        
        <section id="about" className="min-h-screen w-full bg-white relative py-24 md:py-32 px-6 md:px-12">
          <About />
        </section>
      </div>

      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
