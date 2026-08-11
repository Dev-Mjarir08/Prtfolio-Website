import React, { useEffect, useRef, useState } from 'react';

export default function CodePanel({ mousePos, setCursor }) {
  const panelRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const [typedIndex, setTypedIndex] = useState(0);

  const codeSnippet = `const developer = {
    name: "Jarir",
    role: "Full Stack MERN Developer",
    stack: ["React 19", "Node.js", "Express", "MongoDB"],
    mindset: "Build. Break. Improve."
};`;

  // Typing effect on initial load
  useEffect(() => {
    if (typedIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setTypedIndex((prev) => prev + 1);
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [typedIndex, codeSnippet.length]);

  // 3D Parallax Tilt on Mouse Move
  useEffect(() => {
    if (window.innerWidth < 768) return;

    let rafId;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animateTilt = () => {
      if (panelRef.current) {
        const targetX = (mousePos.x / window.innerWidth - 0.5) * 14;
        const targetY = (mousePos.y / window.innerHeight - 0.5) * 14;

        tiltRef.current.x = lerp(tiltRef.current.x, targetX, 0.1);
        tiltRef.current.y = lerp(tiltRef.current.y, targetY, 0.1);

        panelRef.current.style.transform = `perspective(1000px) rotateY(${tiltRef.current.x}deg) rotateX(${-tiltRef.current.y}deg)`;
      }

      rafId = requestAnimationFrame(animateTilt);
    };

    rafId = requestAnimationFrame(animateTilt);

    return () => cancelAnimationFrame(rafId);
  }, [mousePos]);

  const displayedText = codeSnippet.substring(0, typedIndex);
  const lines = displayedText.split('\n');

  return (
    <div 
      ref={panelRef} 
      className="code-panel"
      onMouseEnter={() => setCursor('hover', 'VIEW CODE')}
      onMouseLeave={() => setCursor('default')}
    >
      <div className="code-panel__header">
        <div className="code-panel__controls">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <span className="code-panel__filename">developer.config.ts</span>
        <span className="code-panel__status">v2.0 ACTIVE</span>
      </div>

      <div className="code-panel__editor">
        <div className="code-panel__gutter">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>

        <pre className="code-panel__code">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="code-line">
                <span className="code-text">{line}</span>
                {idx === lines.length - 1 && typedIndex < codeSnippet.length && (
                  <span className="code-caret" />
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
