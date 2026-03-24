import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. INNER PARTICLE CLOUD ---
function ParticleCloud() {
  const ref = useRef();
  const count = 1500;
  
  // Generate random positions only once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  // Slowly rotate the cloud every frame
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#00f3ff" 
        size={0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// --- 2. OUTER ORBIT DUST ---
function OrbitDust() {
  const ref = useRef();
  const count = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.05; // Rotates opposite way
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#00f3ff" 
        size={0.08} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4} 
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// --- 3. THE WIREFRAME CORE & CAMERA ANIMATOR ---
function WireframeCore({ currentScreen }) {
  const coreRef = useRef();
  const isDashboard = currentScreen === 'dashboard';

  useFrame((state, delta) => {
    // Spin the core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.05;
    }
    
    // Smoothly animate the camera based on what screen we are on
    const targetZ = isDashboard ? 15 : 25;
    state.camera.position.lerp(new THREE.Vector3(0, 0, targetZ), 0.05);
  });

  return (
    <Icosahedron ref={coreRef} args={[8.5, 2]}>
      <meshBasicMaterial 
        color="#00f3ff" 
        wireframe 
        transparent 
        opacity={isDashboard ? 0.2 : 0.6} 
        blending={THREE.AdditiveBlending}
      />
    </Icosahedron>
  );
}

// --- MAIN SCENE WRAPPER ---
export default function Scene({ currentScreen }) {
  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 75 }} gl={{ antialias: true, alpha: true }}>
      {/* Fog to make the background fade into black */}
      <fog attach="fog" args={['#020005', 10, 40]} />
      
      <ParticleCloud />
      <OrbitDust />
      <WireframeCore currentScreen={currentScreen} />
    </Canvas>
  );
}
