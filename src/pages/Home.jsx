import { Hero } from '../components/Hero/Hero.jsx';
import { About } from '../components/About/About.jsx';
import { Skills } from '../components/Skills/Skills.jsx';
import { Experience } from '../components/Experience/Experience.jsx';
import { Projects } from '../components/Projects/Projects.jsx';
import { Services } from '../components/Services/Services.jsx';
import { Testimonials } from '../components/Testimonials/Testimonials.jsx';
import { TechUniverse } from '../components/TechUniverse/TechUniverse.jsx';
import { Achievements } from '../components/Achievements/Achievements.jsx';
import { Contact } from '../components/Contact/Contact.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import { useEffect, useRef } from 'react';
import { animateGrowthTree } from '../animations/gsap.js';

export function Home() {
  const scope = useRef(null);

  useEffect(() => animateGrowthTree(scope), []);

  return (
    <div ref={scope}>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Testimonials />
      <TechUniverse />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
