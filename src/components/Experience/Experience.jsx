import { motion } from 'framer-motion';
import { experiences } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { reveal } from '../../animations/variants.js';

export function Experience() {
  return (
    <section id="experience" className="section-root journey-section">
      <SectionTitle
        eyebrow="Growth Path"
        title="A vertical journey through the stack."
        copy="The timeline grows upward through frontend craft, backend systems, product delivery, and immersive web experiences."
      />
      <div className="journey-path">
        <div className="journey-stem grow-line" />
        {experiences.map((item, index) => (
          <motion.article
            key={item.title}
            className={`journey-milestone ${index % 2 ? 'is-right' : 'is-left'}`}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <span>{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
