import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home.jsx';
import { LoadingScreen } from './components/Shared/LoadingScreen.jsx';
import { CustomCursor } from './components/Shared/CustomCursor.jsx';
import { ScrollProgress } from './components/Shared/ScrollProgress.jsx';
import { BackToTop } from './components/Shared/BackToTop.jsx';
import { Navigation } from './components/Shared/Navigation.jsx';
import { ThemeToggle } from './components/Shared/ThemeToggle.jsx';
import { useLenis } from './hooks/useLenis.js';

export default function App() {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useLenis();

  useEffect(() => {
    const saved = localStorage.getItem('jarir-theme') || 'dark';
    document.documentElement.dataset.theme = saved;
    const timer = window.setTimeout(() => setLoaded(true), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen loaded={loaded} />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <ThemeToggle />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(18px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(18px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <BackToTop />
    </>
  );
}
