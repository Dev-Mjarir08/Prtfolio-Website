import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import SplashCursor from './components/SplashCursor';
import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import TechStack from './sections/TechStack';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  // Initialize Lenis smooth scroll and GSAP sync
  useLenis();

  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-brand-text font-body selection:bg-accent selection:text-black">
      {/* Intro Movie Sequence Loader */}
      {!loaderComplete && (
        <IntroLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Interactive Fluid Splash Cursor */}
      <SplashCursor
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={1.5}
        PRESSURE={0}
        CURL={3}
        SPLAT_RADIUS={0.12}
        SPLAT_FORCE={3000}
        COLOR_UPDATE_SPEED={8}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#6055f7"
      />

      {/* Fixed Minimal Navigation */}
      <Navbar />

      {/* Main Sections Flow */}
      <main>
        <Hero isReady={loaderComplete} />
        <About />
        <Projects />
        <Experience />
        <TechStack />
        <Education />
        <Contact />
      </main>

      {/* Cinematic Footer */}
      <Footer />
    </div>
  );
}
