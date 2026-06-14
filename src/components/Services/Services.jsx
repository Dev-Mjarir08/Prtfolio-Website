import { motion } from 'framer-motion';
import { services } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { reveal, stagger } from '../../animations/variants.js';

export function Services() {
  return (
    <section id="services" className="section-root services-section">
      <SectionTitle
        eyebrow="Service Branches"
        title="Ways I help digital products grow."
        copy="From interface craft to API connections and optimization, each branch is built for usable outcomes."
      />
      <motion.div
        className="service-branches"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article key={service.title} className={`service-branch service-branch-${index}`} variants={reveal}>
              <span>
                <Icon />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
