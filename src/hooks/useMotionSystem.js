import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useMotionSystem() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [mouseVelocity, setMouseVelocity] = useState({ vx: 0, vy: 0, speed: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [cursorState, setCursorState] = useState({ type: 'default', label: '' });
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  
  const lenisRef = useRef(null);
  const prevMouseRef = useRef({ x: 0, y: 0, time: Date.now() });

  // Initialize Lenis smooth scroll & sync with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const currentScroll = e.scroll || window.scrollY;
      const vel = currentScroll - (lastScrollRef.current || 0);
      setScrollVelocity(vel);
      lastScrollRef.current = currentScroll;
    });

    const lastScrollRef = { current: 0 };

    function updateRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(updateRaf);
    }

    const rafId = requestAnimationFrame(updateRaf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Refresh ScrollTrigger when preloader completes
  useEffect(() => {
    if (preloaderComplete) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [preloaderComplete]);

  // Global mouse position & velocity tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = Math.max(1, now - prevMouseRef.current.time);
      const vx = (e.clientX - prevMouseRef.current.x) / dt;
      const vy = (e.clientY - prevMouseRef.current.y) / dt;
      const speed = Math.sqrt(vx * vx + vy * vy);

      setMousePos({ x: e.clientX, y: e.clientY });
      setMouseVelocity({ vx, vy, speed });

      prevMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const setCursor = (type, label = '') => {
    setCursorState({ type, label });
  };

  return {
    mousePos,
    mouseVelocity,
    scrollVelocity,
    cursorState,
    setCursor,
    lenis: lenisRef.current,
    preloaderComplete,
    setPreloaderComplete
  };
}
