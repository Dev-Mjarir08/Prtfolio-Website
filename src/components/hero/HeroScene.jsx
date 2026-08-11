import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Pre-allocate particle buffer memory outside render loop to eliminate GC lag spikes
const PARTICLE_COUNT = 45;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
  PARTICLE_POSITIONS[i] = (Math.random() - 0.5) * 4.5;
}

function DigitalNodes({ mousePos, scrollVelocity }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Cap delta to 33ms to prevent frame jumps during CPU spikes
    const safeDelta = Math.min(delta, 0.033);
    const speedFactor = 1 + Math.min(Math.abs(scrollVelocity) * 0.005, 2);

    groupRef.current.rotation.y += safeDelta * 0.2 * speedFactor;
    groupRef.current.rotation.x += safeDelta * 0.1 * speedFactor;

    // Smooth lerped mouse parallax
    const targetX = (mousePos.x / window.innerWidth - 0.5) * 0.6;
    const targetY = -(mousePos.y / window.innerHeight - 0.5) * 0.6;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.04;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Core Geometry Cluster */}
        <mesh scale={1.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#C6A56B"
            wireframe
            roughness={0.2}
            metalness={0.8}
            emissive="#1A150B"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Ambient Particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={PARTICLE_COUNT}
              array={PARTICLE_POSITIONS}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#F5E3BD" transparent opacity={0.5} />
        </points>
      </group>
    </Float>
  );
}

export default function HeroScene({ mousePos, scrollVelocity }) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 768) {
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

  if (!webglSupported) {
    return <div className="hero-canvas-fallback" />;
  }

  return (
    <div className="hero-scene-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
      <Canvas 
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#F5E3BD" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#C6A56B" />
        <DigitalNodes mousePos={mousePos} scrollVelocity={scrollVelocity} />
      </Canvas>
    </div>
  );
}
