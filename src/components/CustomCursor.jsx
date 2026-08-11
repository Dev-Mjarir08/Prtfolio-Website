import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ mousePos, mouseVelocity, cursorState }) {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const initializedRef = useRef(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    if (!initializedRef.current && (mousePos.x > 0 || mousePos.y > 0)) {
      posRef.current = { x: mousePos.x, y: mousePos.y };
      initializedRef.current = true;
    }

    let rafId;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, mousePos.x, 0.16);
      posRef.current.y = lerp(posRef.current.y, mousePos.y, 0.16);

      if (cursorRef.current && dotRef.current) {
        const speed = Math.min(mouseVelocity.speed * 3, 0.25);

        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${1 + speed})`;
        dotRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [mousePos, mouseVelocity, isTouchDevice]);

  if (isTouchDevice) return null;

  const { type, label } = cursorState;
  const isHovered = type !== 'default';

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`cursor ${isHovered ? `is-${type}` : ''}`}
      >
        {isHovered && (
          <span className="cursor__label">
            {label || (type === 'view' ? 'VIEW' : type === 'hover' ? 'EXPLORE' : type === 'drag' ? 'DRAG' : '')}
          </span>
        )}
      </div>
      {/* Hide center dot completely when hovered so it never overlaps label text! */}
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isHovered ? 'is-hidden' : ''}`} 
      />
    </>
  );
}
