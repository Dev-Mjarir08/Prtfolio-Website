import { motion } from 'framer-motion';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { roots } from '../../data/portfolio.js';
import { reveal, stagger } from '../../animations/variants.js';

export function About() {
  return (
    <section id="about" className="section-root about-section">
      <SectionTitle
        eyebrow="Root System"
        title="Built from craft, curiosity, and product gravity."
        copy="The roots map the qualities behind the code: practical experience, creative problem solving, and a habit of learning in public."
      />
      <motion.div
        className="roots-map"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="root-core grow-line" />
        {roots.map((root, index) => (
          <motion.article key={root.title} className={`root-thread root-thread-${index}`} variants={reveal}>
            <span className="root-node" />
            <h3>{root.title}</h3>
            <p>{root.copy}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
