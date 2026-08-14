import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function FloatingKnot({ mousePos, scrollVelocity }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth rotation based on time and scroll velocity
    const velFactor = 1 + Math.abs(scrollVelocity) * 0.005;
    meshRef.current.rotation.x += delta * 0.2 * velFactor;
    meshRef.current.rotation.y += delta * 0.3 * velFactor;

    // Subtle mouse reaction
    const targetX = (mousePos.x / window.innerWidth - 0.5) * 0.6;
    const targetY = -(mousePos.y / window.innerHeight - 0.5) * 0.6;

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#C6A56B"
          wireframe
          roughness={0.2}
          metalness={0.8}
          emissive="#2A2111"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default React.memo(function HeroCanvas({ mousePos, scrollVelocity }) {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // Detect WebGL support and reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setWebglSupported(false);
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const hasSupport = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(hasSupport);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Viewport IntersectionObserver to pause rendering when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!webglSupported) {
    return <div className="hero-canvas-fallback" />;
  }

  return (
    <div ref={containerRef} className="hero-canvas-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.45 }}>
      {isVisible && (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} color="#F5E3BD" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C6A56B" />
          <FloatingKnot mousePos={mousePos} scrollVelocity={scrollVelocity} />
        </Canvas>
      )}
    </div>
  );
});

