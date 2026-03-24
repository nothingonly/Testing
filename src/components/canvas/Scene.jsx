import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCloud() {
  const ref = useRef();
  const count = 1500;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00f3ff" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

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
    if (ref.current) ref.current.rotation.y -= delta * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00f3ff" size={0.08} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function WireframeCore({ isDashboard }) {
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.2;
    // Animate camera based on screen state
    if (isDashboard) {
      state.camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.05);
    } else {
      state.camera.position.lerp(new THREE.Vector3(0, 0, 25), 0.05);
    }
  });

  return (
    <Icosahedron ref={coreRef} args={[8.5, 2]}>
      <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={isDashboard ? 0.35 : 0.8} />
    </Icosahedron>
  );
}

export default function Scene({ currentScreen }) {
  const isDashboard = currentScreen === 'dashboard';

  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
      <fog attach="fog" args={['#020005', 10, 40]} />
      <ParticleCloud />
      <OrbitDust />
      <WireframeCore isDashboard={isDashboard} />
    </Canvas>
  );
}
