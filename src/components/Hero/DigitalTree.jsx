import { motion } from 'framer-motion';
import { branches } from '../../data/portfolio.js';

const leaves = [
  { x: 44, y: 19, color: 'cyan' },
  { x: 58, y: 17, color: 'violet' },
  { x: 31, y: 30, color: 'mint' },
  { x: 69, y: 31, color: 'cyan' },
  { x: 39, y: 42, color: 'violet' },
  { x: 61, y: 45, color: 'mint' },
  { x: 50, y: 9, color: 'cyan' },
  { x: 26, y: 49, color: 'cyan' },
  { x: 74, y: 50, color: 'violet' }
];

export function DigitalTree({ compact = false }) {
  return (
    <div className={`digital-tree ${compact ? 'is-compact' : ''}`} aria-label="Animated digital growth tree">
      <svg viewBox="0 0 100 120" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="trunkGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#46f4ff" />
            <stop offset="46%" stopColor="#8f5bff" />
            <stop offset="100%" stopColor="#0b1d3d" />
          </linearGradient>
          <filter id="treeGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          className="tree-path trunk"
          d="M50 112 C48 94 49 80 51 65 C53 48 49 35 50 13"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          filter="url(#treeGlow)"
        />
        <motion.path
          className="tree-path branch"
          d="M50 47 C40 40 34 31 27 17"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.7, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.path
          className="tree-path branch"
          d="M51 37 C61 31 68 24 76 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.7, delay: 0.75, ease: 'easeOut' }}
        />
        <motion.path
          className="tree-path branch"
          d="M50 64 C39 60 28 56 17 47"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.95, ease: 'easeOut' }}
        />
        <motion.path
          className="tree-path branch"
          d="M51 60 C64 58 73 52 86 42"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 1.1, ease: 'easeOut' }}
        />
        <motion.path
          className="tree-path branch"
          d="M50 82 C43 89 36 96 25 105"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.3, ease: 'easeOut' }}
        />
        <motion.path
          className="tree-path branch"
          d="M51 82 C60 90 69 97 80 106"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.4, ease: 'easeOut' }}
        />
        {leaves.map((leaf, index) => (
          <motion.circle
            key={`${leaf.x}-${leaf.y}`}
            className={`tree-leaf ${leaf.color}`}
            cx={leaf.x}
            cy={leaf.y}
            r="2.7"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 1 + index * 0.08 }}
            whileHover={{ scale: 1.8 }}
          />
        ))}
      </svg>
      {!compact && (
        <div className="branch-labels" aria-hidden="true">
          {branches.map((branch, index) => {
            const Icon = branch.icon;
            return (
              <motion.span
                key={branch.label}
                className={`branch-label branch-label-${index}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.11 }}
                data-cursor="magnetic"
              >
                <Icon />
                {branch.label}
              </motion.span>
            );
          })}
        </div>
      )}
    </div>
  );
}
