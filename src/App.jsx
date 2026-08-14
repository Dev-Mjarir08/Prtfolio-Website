import React, { useState } from 'react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { MotionProvider, useMotion } from './context/MotionContext';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/hero/Hero';
import About from './components/About';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsNetwork from './components/SkillsNetwork';
import ProcessTimeline from './components/ProcessTimeline';
import StatsCounter from './components/StatsCounter';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function MainContent() {
  const {
    mousePos,
    mouseVelocity,
    scrollVelocity,
    cursorState,
    setCursor,
    lenis,
    preloaderComplete,
    setPreloaderComplete
  } = useMotion();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Cinematic Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* Context-Aware Custom Cursor */}
      <CustomCursor 
        mousePos={mousePos} 
        mouseVelocity={mouseVelocity} 
        cursorState={cursorState} 
      />

      {/* Top Navbar */}
      <Navbar 
        data={PORTFOLIO_DATA} 
        setCursor={setCursor} 
        onToggleMenu={() => setMenuOpen(!menuOpen)} 
        menuOpen={menuOpen} 
      />

      {/* Fullscreen Mobile Menu */}
      <MobileMenu 
        data={PORTFOLIO_DATA} 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />

      {/* Main Content Sections */}
      <main data-scroll-container>
        <Hero 
          data={PORTFOLIO_DATA} 
          mousePos={mousePos} 
          scrollVelocity={scrollVelocity} 
          setCursor={setCursor} 
        />

        <About 
          data={PORTFOLIO_DATA} 
          setCursor={setCursor} 
        />

        <ProjectShowcase 
          projects={PORTFOLIO_DATA.projects} 
          setCursor={setCursor} 
          mousePos={mousePos} 
        />

        <SkillsNetwork 
          skills={PORTFOLIO_DATA.skills} 
          technologies={PORTFOLIO_DATA.technologies} 
          setCursor={setCursor} 
          preloaderComplete={preloaderComplete}
        />

        <ProcessTimeline 
          steps={PORTFOLIO_DATA.processSteps} 
          setCursor={setCursor} 
        />

        <StatsCounter 
          stats={PORTFOLIO_DATA.stats} 
          setCursor={setCursor} 
        />

        <Testimonials 
          testimonials={PORTFOLIO_DATA.testimonials} 
          setCursor={setCursor} 
        />

        <Contact 
          data={PORTFOLIO_DATA} 
          setCursor={setCursor} 
        />

        <Footer 
          data={PORTFOLIO_DATA} 
          setCursor={setCursor} 
          lenis={lenis} 
        />
      </main>
    </>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <MainContent />
    </MotionProvider>
  );
}




