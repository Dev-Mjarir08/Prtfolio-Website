import { AnimatePresence, motion } from 'framer-motion';

export function LoadingScreen({ loaded }) {
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(70,244,255,.22),transparent_34%),radial-gradient(circle_at_50%_60%,rgba(143,91,255,.2),transparent_42%)]" />
          <motion.div
            className="relative h-48 w-40"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.span className="loader-root left-1/2 h-24" variants={lineVariant} />
            <motion.span className="loader-root left-[32%] top-16 h-20 -rotate-45" variants={lineVariant} />
            <motion.span className="loader-root left-[68%] top-16 h-20 rotate-45" variants={lineVariant} />
            <motion.span className="loader-orb left-[45%] top-4" variants={orbVariant} />
            <motion.span className="loader-orb left-[18%] top-16" variants={orbVariant} />
            <motion.span className="loader-orb right-[15%] top-20" variants={orbVariant} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const lineVariant = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
};

const orbVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
