'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import Scene1To4Meshes from './meshes/Scene1To4Meshes';
import Scene5To7Meshes from './meshes/Scene5To7Meshes';

interface Story3DCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeScene?: number; // 1 to 7
}

/* =========================================================================
   GOLDEN BOKEH PARTICLE FIELD
   Procedural floating golden bokeh lights with smooth floating animation
   ========================================================================= */
const GoldenBokehField: React.FC<{ count: number; scrollProgress: number }> = ({
  count,
  scrollProgress,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      scl[i] = 0.5 + Math.random() * 1.5;
    }

    return [pos, scl];
  }, [count]);

  const bokehTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(243, 229, 171, 1)');
      grad.addColorStop(0.35, 'rgba(212, 175, 55, 0.7)');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle floating upward & wave
      array[i * 3 + 1] += delta * 0.25;
      array[i * 3 + 0] += Math.sin(time * 0.5 + i) * 0.003;

      // Wrap around Y boundary
      if (array[i * 3 + 1] > 6.0) {
        array[i * 3 + 1] = -6.0;
      }
    }
    posAttr.needsUpdate = true;

    // Subtle drift with scroll
    pointsRef.current.rotation.y = time * 0.04 + scrollProgress * 0.5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={bokehTexture || undefined}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        color="#F3E5AB"
      />
    </points>
  );
};

/* =========================================================================
   MASTER CAMERA CONTROLLER & RIG
   Smoothly interpolates camera position & target across 7 scene waypoints
   ========================================================================= */
const CameraController: React.FC<{
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}> = ({ scrollProgress, mousePosition }) => {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const { x: mx, y: my } = mousePosition;

    // 7 Scene Waypoint Camera Positions
    let targetX = 0;
    let targetY = 0;
    let targetZ = 7.8;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (scrollProgress <= 0.14) {
      // Scene 1: Hero Lens
      const p = scrollProgress / 0.14;
      targetX = mx * 0.35;
      targetY = my * 0.25;
      targetZ = THREE.MathUtils.lerp(7.8, 6.2, p);
    } else if (scrollProgress <= 0.28) {
      // Scene 2: Through the Lens / Floating Frames
      const p = (scrollProgress - 0.14) / 0.14;
      targetX = THREE.MathUtils.lerp(0.0, -0.4, p) + mx * 0.25;
      targetY = THREE.MathUtils.lerp(0.0, 0.2, p) + my * 0.2;
      targetZ = THREE.MathUtils.lerp(6.2, 5.2, p);
    } else if (scrollProgress <= 0.42) {
      // Scene 3: Aperture Blades & Gallery Arc
      const p = (scrollProgress - 0.28) / 0.14;
      targetX = THREE.MathUtils.lerp(-0.4, -0.6, p) + mx * 0.3;
      targetY = THREE.MathUtils.lerp(0.2, 0.2, p) + my * 0.2;
      targetZ = THREE.MathUtils.lerp(5.2, 4.6, p);
    } else if (scrollProgress <= 0.57) {
      // Scene 4: Cinema Rig & Spiraling Film Strip
      const p = (scrollProgress - 0.42) / 0.15;
      targetX = THREE.MathUtils.lerp(-0.6, 0.6, p) + mx * 0.3;
      targetY = THREE.MathUtils.lerp(0.2, 0.3, p) + my * 0.2;
      targetZ = THREE.MathUtils.lerp(4.6, 4.4, p);
    } else if (scrollProgress <= 0.71) {
      // Scene 5: Photo Editing Reveal
      const p = (scrollProgress - 0.57) / 0.14;
      targetX = THREE.MathUtils.lerp(0.6, 0.0, p) + mx * 0.25;
      targetY = THREE.MathUtils.lerp(0.3, 0.0, p) + my * 0.2;
      targetZ = THREE.MathUtils.lerp(4.4, 4.0, p);
    } else if (scrollProgress <= 0.85) {
      // Scene 6: Video Editing Timeline
      const p = (scrollProgress - 0.71) / 0.14;
      targetX = THREE.MathUtils.lerp(0.0, 0.0, p) + mx * 0.25;
      targetY = THREE.MathUtils.lerp(0.0, -0.35, p) + my * 0.15;
      targetZ = THREE.MathUtils.lerp(4.0, 4.4, p);
      lookY = 0.2;
    } else {
      // Scene 7: Heirloom Album Finale
      const p = Math.min((scrollProgress - 0.85) / 0.15, 1.0);
      targetX = THREE.MathUtils.lerp(0.0, 0.0, p) + mx * 0.2;
      targetY = THREE.MathUtils.lerp(-0.35, 0.0, p) + my * 0.2;
      targetZ = THREE.MathUtils.lerp(4.4, 5.0, p);
    }

    // Smoothly interpolate camera position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4.5, delta);

    // Smoothly interpolate lookAt target
    targetLookAt.current.set(lookX, lookY, lookZ);
    currentLookAt.current.lerp(targetLookAt.current, delta * 4);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

/* =========================================================================
   SCENE COMPOSER
   Mounts all lighting, bokeh, and modular scene mesh groups
   ========================================================================= */
const SceneComposer: React.FC<{
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  particleCount: number;
}> = ({ scrollProgress, mousePosition, particleCount }) => {
  return (
    <>
      {/* Studio Lighting Architecture */}
      <ambientLight color="#1A1610" intensity={1.3} />

      {/* Main Champagne Gold Key Light */}
      <directionalLight
        color="#F3E5AB"
        intensity={2.4}
        position={[5, 8, 6]}
      />

      {/* Rim Gold Light for Edge Highlights */}
      <spotLight
        color="#D4AF37"
        intensity={3.2}
        position={[-6, -2, -3]}
        angle={0.6}
        penumbra={0.8}
      />

      {/* Subtle Front Warm Soft Fill */}
      <pointLight
        color="#FAF9F6"
        intensity={0.8}
        position={[0, 0, 5]}
        distance={10}
      />

      {/* Golden Bokeh Particle Field */}
      <GoldenBokehField count={particleCount} scrollProgress={scrollProgress} />

      {/* Modular Scene Meshes */}
      <Scene1To4Meshes
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
      />
      <Scene5To7Meshes
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
      />

      {/* Dynamic Camera Rig Controller */}
      <CameraController
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
      />
    </>
  );
};

/* =========================================================================
   FIXED WEBGL STORY CANVAS COMPONENT
   ========================================================================= */
export const Story3DCanvas: React.FC<Story3DCanvasProps> = ({
  scrollProgress,
}) => {
  const perfProfile = useDevicePerformance();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse / Pointer tracker for desktop parallax
  useEffect(() => {
    if (!perfProfile.enableTilt) return;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [perfProfile.enableTilt]);

  // Canvas opacity fades smoothly when scrolling past Scene 7 into post-story sections
  const canvasOpacity = scrollProgress >= 1.0 ? 0.18 : 1.0;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-out"
      style={{ opacity: canvasOpacity }}
      aria-hidden="true"
    >
      <Canvas
        dpr={perfProfile.dpr}
        camera={{ position: [0, 0, 7.8], fov: 45, near: 0.1, far: 50 }}
        gl={{
          antialias: !perfProfile.isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <SceneComposer
          scrollProgress={scrollProgress}
          mousePosition={mousePos}
          particleCount={perfProfile.particleCount}
        />
      </Canvas>
    </div>
  );
};

export default Story3DCanvas;
