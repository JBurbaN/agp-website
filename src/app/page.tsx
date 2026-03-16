import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/home/HeroSection";
import { StatsSection } from "./components/home/StatsSection";
import { ServicesSection } from "./components/home/ServicesSection";
import { NewsSection } from "./components/home/NewsSection";
import { GallerySection } from "./components/home/GallerySection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <NewsSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}