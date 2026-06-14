import { motion } from 'framer-motion';
import { reveal } from '../../animations/variants.js';

export function SectionTitle({ eyebrow, title, copy, align = 'center' }) {
  return (
    <motion.div
      className={`section-title ${align === 'left' ? 'items-start text-left' : 'items-center text-center'}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}
