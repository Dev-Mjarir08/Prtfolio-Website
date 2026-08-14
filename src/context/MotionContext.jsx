import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionContext = createContext(null);

export function MotionProvider({ children }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [mouseVelocity, setMouseVelocity] = useState({ vx: 0, vy: 0, speed: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [cursorState, setCursorState] = useState({ type: 'default', label: '' });
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  
  const lenisRef = useRef(null);
  const prevMouseRef = useRef({ x: 0, y: 0, time: Date.now() });
  const rafMouseMoveRef = useRef(null);
  const pendingMouseRef = useRef(null);

  // Initialize Lenis smooth scroll & sync with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setPreloaderComplete(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let lastScrollVal = 0;
    let scrollVelocityTimer = null;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const currentScroll = e.scroll || window.scrollY;
      const vel = currentScroll - lastScrollVal;
      lastScrollVal = currentScroll;

      if (Math.abs(vel) > 1) {
        setScrollVelocity(vel);
      }

      clearTimeout(scrollVelocityTimer);
      scrollVelocityTimer = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    });

    function updateRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(updateRaf);
    }

    const rafId = requestAnimationFrame(updateRaf);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollVelocityTimer);
      lenis.destroy();
    };
  }, []);

  // Refresh ScrollTrigger when preloader completes
  useEffect(() => {
    if (preloaderComplete) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [preloaderComplete]);

  // Global mouse position & velocity tracking throttled via RAF
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const processMouseMove = () => {
      if (!pendingMouseRef.current) return;
      const e = pendingMouseRef.current;
      pendingMouseRef.current = null;

      const now = Date.now();
      const dt = Math.max(1, now - prevMouseRef.current.time);
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        const vx = dx / dt;
        const vy = dy / dt;
        const speed = Math.sqrt(vx * vx + vy * vy);

        setMousePos({ x: e.clientX, y: e.clientY });
        setMouseVelocity({ vx, vy, speed });

        prevMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
      }
      rafMouseMoveRef.current = null;
    };

    const handleMouseMove = (e) => {
      pendingMouseRef.current = e;
      if (!rafMouseMoveRef.current) {
        rafMouseMoveRef.current = requestAnimationFrame(processMouseMove);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafMouseMoveRef.current) {
        cancelAnimationFrame(rafMouseMoveRef.current);
      }
    };
  }, []);

  const setCursor = useCallback((type, label = '') => {
    setCursorState((prev) => {
      if (prev.type === type && prev.label === label) return prev;
      return { type, label };
    });
  }, []);

  const refreshScrollTrigger = useCallback(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const value = {
    mousePos,
    mouseVelocity,
    scrollVelocity,
    cursorState,
    setCursor,
    lenis: lenisRef.current,
    preloaderComplete,
    setPreloaderComplete,
    refreshScrollTrigger
  };

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
}
