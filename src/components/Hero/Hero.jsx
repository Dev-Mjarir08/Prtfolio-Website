import { motion } from 'framer-motion';
import { FiArrowDown, FiSend } from 'react-icons/fi';
import { profile } from '../../data/portfolio.js';
import { MagneticButton } from '../Shared/MagneticButton.jsx';
import { Particles } from '../Shared/Particles.jsx';
import { DigitalTree } from './DigitalTree.jsx';
import heroTexture from '../../assets/digital-tree-hero.png';
import { useEffect, useState } from 'react';

export function Hero() {
  const typed = useTyping(profile.typed);

  return (
    <section id="hero" className="hero-section min-h-screen">
      <img className="hero-texture" src={heroTexture} alt="" loading="eager" decoding="async" />
      <Particles amount={58} />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
                    <h1>{profile.name}</h1>
          <div className="hero-role">
            <span>{profile.role}</span>
            <strong>{typed}</strong>
          </div>
          <p>
            I grow complete web products from first interaction to backend logic, database structure, and deployment.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#projects">
              Explore Work <FiArrowDown />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Start a Project <FiSend />
            </MagneticButton>
          </div>
        </motion.div>
        <motion.div
          className="hero-tree-wrap"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <DigitalTree />
        </motion.div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about" data-cursor="magnetic">
        <span />
        <FiArrowDown />
      </a>
    </section>
  );
}

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const speed = deleting ? 42 : 78;
    const timer = window.setTimeout(() => {
      if (!deleting && letters.length < word.length) {
        setLetters(word.slice(0, letters.length + 1));
        return;
      }

      if (!deleting && letters.length === word.length) {
        window.setTimeout(() => setDeleting(true), 900);
        return;
      }

      if (deleting && letters.length > 0) {
        setLetters(word.slice(0, letters.length - 1));
        return;
      }

      setDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
    }, speed);

    return () => window.clearTimeout(timer);
  }, [letters, deleting, wordIndex, words]);

  return letters;
}
