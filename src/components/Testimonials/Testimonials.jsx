import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { testimonials } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';

export function Testimonials() {
  const [active, setActive] = useState(testimonials[0]);

  return (
    <section id="testimonials" className="section-root testimonials-section">
      <SectionTitle
        eyebrow="Branch Voices"
        title="Signals from collaborators."
        copy="Soft glowing forms perch along the canopy and reveal concise feedback from project partners."
      />
      <div className="testimonial-canopy">
        <div className="testimonial-branch" />
        {testimonials.map((testimonial, index) => (
          <motion.button
            key={testimonial.name}
            type="button"
            className={`testimonial-bird testimonial-bird-${index} ${active.name === testimonial.name ? 'is-active' : ''}`}
            onClick={() => setActive(testimonial)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.12 }}
            data-cursor="magnetic"
          >
            <FiMessageCircle />
          </motion.button>
        ))}
        <motion.article
          className="testimonial-quote"
          key={active.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p>"{active.quote}"</p>
          <h3>{active.name}</h3>
          <span>{active.role}</span>
        </motion.article>
      </div>
    </section>
  );
}
