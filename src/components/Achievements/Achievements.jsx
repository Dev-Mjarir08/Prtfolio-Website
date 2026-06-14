import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { achievements } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';

export function Achievements() {
  return (
    <section id="achievements" className="section-root achievements-section">
      <SectionTitle
        eyebrow="Achievement Leaves"
        title="Measurable growth markers."
        copy="A compact view of output, capability, and performance goals across the developer ecosystem."
      />
      <div className="achievement-leaves">
        {achievements.map((item, index) => (
          <CounterLeaf key={item.label} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function CounterLeaf({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const spring = useSpring(value, { duration: 1400, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${item.suffix}`);

  useEffect(() => {
    if (inView) value.set(item.value);
  }, [inView, item.value, value]);

  return (
    <motion.article
      ref={ref}
      className={`achievement-leaf achievement-leaf-${index}`}
      initial={{ opacity: 0, rotate: -8, y: 20 }}
      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <motion.strong>{rounded}</motion.strong>
      <span>{item.label}</span>
    </motion.article>
  );
}
