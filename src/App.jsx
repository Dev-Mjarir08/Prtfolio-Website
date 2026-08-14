import React, { useState, lazy, Suspense } from 'react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { MotionProvider, useMotion } from './context/MotionContext';
import LazyBoundary from './components/LazyBoundary';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/hero/Hero';
import About from './components/About';

// Lazy-loaded components below the fold for bundle & performance optimization
const ProjectShowcase = lazy(() => import('./components/ProjectShowcase'));
const SkillsNetwork = lazy(() => import('./components/SkillsNetwork'));
const ProcessTimeline = lazy(() => import('./components/ProcessTimeline'));
const StatsCounter = lazy(() => import('./components/StatsCounter'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const SectionSkeleton = () => (
  <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '0.15em' }}>
    LOADING...
  </div>
);

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

        <Suspense fallback={<SectionSkeleton />}>
          <LazyBoundary>
            <ProjectShowcase 
              projects={PORTFOLIO_DATA.projects} 
              setCursor={setCursor} 
              mousePos={mousePos} 
            />
          </LazyBoundary>

          <LazyBoundary>
            <SkillsNetwork 
              skills={PORTFOLIO_DATA.skills} 
              technologies={PORTFOLIO_DATA.technologies} 
              setCursor={setCursor} 
              preloaderComplete={preloaderComplete}
            />
          </LazyBoundary>

          <LazyBoundary>
            <ProcessTimeline 
              steps={PORTFOLIO_DATA.processSteps} 
              setCursor={setCursor} 
            />
          </LazyBoundary>

          <LazyBoundary>
            <StatsCounter 
              stats={PORTFOLIO_DATA.stats} 
              setCursor={setCursor} 
            />
          </LazyBoundary>

          <LazyBoundary>
            <Testimonials 
              testimonials={PORTFOLIO_DATA.testimonials} 
              setCursor={setCursor} 
            />
          </LazyBoundary>

          <LazyBoundary>
            <Contact 
              data={PORTFOLIO_DATA} 
              setCursor={setCursor} 
            />
          </LazyBoundary>

          <LazyBoundary>
            <Footer 
              data={PORTFOLIO_DATA} 
              setCursor={setCursor} 
              lenis={lenis} 
            />
          </LazyBoundary>
        </Suspense>
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



