import { useMemo } from 'react';

export function Particles({ amount = 42 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: amount }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        size: `${Math.random() * 3 + 1}px`,
        duration: `${Math.random() * 12 + 8}s`
      })),
    [amount]
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  );
}
