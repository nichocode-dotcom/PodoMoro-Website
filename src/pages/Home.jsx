import { ReactLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { ValueProposition, SpecialMenu, AmbianceTeaser, LocationAndCTA, CinematicSection } from '../components/HomeSections';

export default function Home() {
  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col bg-bg-light">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <ValueProposition />
          <CinematicSection />
          <SpecialMenu />
          <AmbianceTeaser />
          <LocationAndCTA />
          <Features />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
