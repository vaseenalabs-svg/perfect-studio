'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Scene5To7MeshesProps {
  scrollProgress: number; // 0.0 to 1.0
  mousePosition: { x: number; y: number };
}

const getSceneProgress = (global: number, start: number, end: number): number => {
  return THREE.MathUtils.clamp((global - start) / (end - start), 0, 1);
};

export const Scene5To7Meshes: React.FC<Scene5To7MeshesProps> = ({
  scrollProgress,
  mousePosition,
}) => {
  // Group References
  const scene5Ref = useRef<THREE.Group>(null);
  const photoPlaneRef = useRef<THREE.Group>(null);
  const sweepBeamRef = useRef<THREE.Group>(null);
  const sweepLightRef = useRef<THREE.PointLight>(null);

  const scene6Ref = useRef<THREE.Group>(null);
  const timelineGroupRef = useRef<THREE.Group>(null);
  const playheadRef = useRef<THREE.Group>(null);
  const waveformGroupRef = useRef<THREE.Group>(null);

  const scene7Ref = useRef<THREE.Group>(null);
  const albumGroupRef = useRef<THREE.Group>(null);
  const frontCoverRef = useRef<THREE.Group>(null);
  const innerPageRef = useRef<THREE.Group>(null);

  /* -------------------------------------------------------------------------
     SCENE 5: PROCEDURAL RAW VS GRADED TEXTURES & SHADER
     ------------------------------------------------------------------------- */
  const { rawTexture, gradedTexture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { rawTexture: null, gradedTexture: null };
    }

    // RAW Canvas: flat, desaturated, low-contrast portrait
    const rawCanvas = document.createElement('canvas');
    rawCanvas.width = 600;
    rawCanvas.height = 800;
    const rCtx = rawCanvas.getContext('2d');
    if (rCtx) {
      rCtx.fillStyle = '#403D38';
      rCtx.fillRect(0, 0, 600, 800);

      // Desaturated couple silhouette
      rCtx.fillStyle = '#6E6A63';
      rCtx.beginPath();
      rCtx.arc(300, 320, 90, 0, Math.PI * 2);
      rCtx.fill();

      rCtx.beginPath();
      rCtx.ellipse(300, 500, 140, 190, 0, 0, Math.PI * 2);
      rCtx.fill();

      // RAW label
      rCtx.font = 'bold 24px monospace';
      rCtx.fillStyle = '#9E9A91';
      rCtx.fillText('RAW · S-LOG3 FLAT PROFILE', 40, 60);
      rCtx.font = '16px monospace';
      rCtx.fillText('ISO 800 | f/1.4 | 1/250s | 50mm Prime', 40, 90);
    }

    // GRADED Canvas: rich warm champagne gold tones, deep blacks, blooming highlights
    const gradedCanvas = document.createElement('canvas');
    gradedCanvas.width = 600;
    gradedCanvas.height = 800;
    const gCtx = gradedCanvas.getContext('2d');
    if (gCtx) {
      const grad = gCtx.createRadialGradient(300, 360, 50, 300, 400, 450);
      grad.addColorStop(0, '#5C441E');
      grad.addColorStop(0.6, '#21170A');
      grad.addColorStop(1, '#0C0A06');
      gCtx.fillStyle = grad;
      gCtx.fillRect(0, 0, 600, 800);

      // Rich golden couple silhouette with glow
      gCtx.fillStyle = '#D4AF37';
      gCtx.shadowColor = '#F3E5AB';
      gCtx.shadowBlur = 30;
      gCtx.beginPath();
      gCtx.arc(300, 320, 90, 0, Math.PI * 2);
      gCtx.fill();

      gCtx.beginPath();
      gCtx.ellipse(300, 500, 140, 190, 0, 0, Math.PI * 2);
      gCtx.fill();

      // Graded label & crest
      gCtx.shadowBlur = 0;
      gCtx.font = 'bold 24px Georgia, serif';
      gCtx.fillStyle = '#F3E5AB';
      gCtx.fillText('PERFECT STUDIO · SIGNATURE GRADE', 40, 60);
      gCtx.font = '14px sans-serif';
      gCtx.fillStyle = '#D4AF37';
      gCtx.fillText('Fine Art Film Emulation · Retouched', 40, 90);
    }

    const rawTex = new THREE.CanvasTexture(rawCanvas);
    const gradedTex = new THREE.CanvasTexture(gradedCanvas);
    rawTex.minFilter = THREE.LinearFilter;
    gradedTex.minFilter = THREE.LinearFilter;

    return { rawTexture: rawTex, gradedTexture: gradedTex };
  }, []);

  // Custom Shader Material for Scene 5
  const revealShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uRawTexture: { value: rawTexture },
        uGradedTexture: { value: gradedTexture },
        uSplitProgress: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uRawTexture;
        uniform sampler2D uGradedTexture;
        uniform float uSplitProgress;

        void main() {
          vec4 rawCol = texture2D(uRawTexture, vUv);
          vec4 gradedCol = texture2D(uGradedTexture, vUv);
          float edge = smoothstep(uSplitProgress - 0.02, uSplitProgress + 0.02, vUv.x);
          vec4 color = mix(gradedCol, rawCol, edge);
          gl_FragColor = color;
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [rawTexture, gradedTexture]);

  /* -------------------------------------------------------------------------
     SCENE 7: HEIRLOOM ALBUM TEXTURE
     ------------------------------------------------------------------------- */
  const albumInnerTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Warm alabaster ivory paper
      ctx.fillStyle = '#FAF9F6';
      ctx.fillRect(0, 0, 512, 700);

      // Gold foil border
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 6;
      ctx.strokeRect(25, 25, 462, 650);

      // Outer thin hairline
      ctx.lineWidth = 1;
      ctx.strokeRect(34, 34, 444, 632);

      // Gold emblem
      ctx.fillStyle = '#AA820A';
      ctx.beginPath();
      ctx.arc(256, 260, 48, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FAF9F6';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('PS', 256, 273);

      // Typography
      ctx.fillStyle = '#1A1815';
      ctx.font = 'bold 24px Georgia, serif';
      ctx.fillText('PERFECT STUDIO', 256, 380);

      ctx.fillStyle = '#AA820A';
      ctx.font = 'italic 16px Georgia, serif';
      ctx.fillText('Heirloom Wedding Collection', 256, 415);

      ctx.fillStyle = '#59554D';
      ctx.font = '12px sans-serif';
      ctx.fillText('ETERNITY IN EVERY FRAME', 256, 450);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, []);

  /* -------------------------------------------------------------------------
     ANIMATION LOOP
     ------------------------------------------------------------------------- */
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const { x: mx, y: my } = mousePosition;

    // -----------------------------------------------------------------------
    // SCENE 5 CHOREOGRAPHY (0.57 -> 0.71)
    // -----------------------------------------------------------------------
    const s5Enter = getSceneProgress(scrollProgress, 0.56, 0.61);
    const s5Sweep = getSceneProgress(scrollProgress, 0.60, 0.68);
    const s5Exit = getSceneProgress(scrollProgress, 0.69, 0.73);

    if (scene5Ref.current) {
      if (scrollProgress >= 0.54 && scrollProgress <= 0.75) {
        scene5Ref.current.visible = true;

        // Update shader reveal progress uniform
        revealShaderMaterial.uniforms.uSplitProgress.value = s5Sweep;

        // Position sweeping light beam along the photo plane width (width = 2.4, range -1.2 to 1.2)
        const beamX = (s5Sweep - 0.5) * 2.4;
        if (sweepBeamRef.current) {
          sweepBeamRef.current.position.x = beamX;
        }
        if (sweepLightRef.current) {
          sweepLightRef.current.position.x = beamX;
          sweepLightRef.current.intensity = 2.0 + Math.sin(time * 6) * 0.4;
        }

        // Tilt photo plane slightly with mouse
        if (photoPlaneRef.current) {
          photoPlaneRef.current.rotation.y = THREE.MathUtils.damp(
            photoPlaneRef.current.rotation.y,
            mx * 0.25,
            3,
            delta
          );
          photoPlaneRef.current.rotation.x = THREE.MathUtils.damp(
            photoPlaneRef.current.rotation.x,
            -my * 0.2,
            3,
            delta
          );
          photoPlaneRef.current.position.z = THREE.MathUtils.lerp(-3.0, 0.0, s5Enter) - s5Exit * 3.5;
        }
      } else {
        scene5Ref.current.visible = false;
      }
    }

    // -----------------------------------------------------------------------
    // SCENE 6 CHOREOGRAPHY (0.71 -> 0.85)
    // -----------------------------------------------------------------------
    const s6Enter = getSceneProgress(scrollProgress, 0.70, 0.75);
    const s6Play = getSceneProgress(scrollProgress, 0.73, 0.83);
    const s6Exit = getSceneProgress(scrollProgress, 0.83, 0.88);

    if (scene6Ref.current) {
      if (scrollProgress >= 0.68 && scrollProgress <= 0.90) {
        scene6Ref.current.visible = true;

        // Scrub playhead across timeline tracks (width = 4.4, range -2.2 to 2.2)
        if (playheadRef.current) {
          const playheadX = THREE.MathUtils.lerp(-2.2, 2.2, s6Play);
          playheadRef.current.position.x = playheadX;
        }

        // Timeline base low-angle hero tilt
        if (timelineGroupRef.current) {
          timelineGroupRef.current.rotation.x = 0.45 - my * 0.15;
          timelineGroupRef.current.rotation.y = mx * 0.2;
          timelineGroupRef.current.position.z = THREE.MathUtils.lerp(-3.0, 0.0, s6Enter) - s6Exit * 4.0;
        }

        // Pulse audio waveform bars
        if (waveformGroupRef.current) {
          waveformGroupRef.current.children.forEach((child, idx) => {
            const mesh = child as THREE.Mesh;
            const wave = Math.abs(Math.sin(time * 5 + idx * 0.35 + s6Play * 8));
            mesh.scale.y = 0.2 + wave * 1.4;
          });
        }
      } else {
        scene6Ref.current.visible = false;
      }
    }

    // -----------------------------------------------------------------------
    // SCENE 7 CHOREOGRAPHY (0.85 -> 1.00)
    // -----------------------------------------------------------------------
    const s7Enter = getSceneProgress(scrollProgress, 0.84, 0.91);
    const s7Open = getSceneProgress(scrollProgress, 0.89, 0.98);

    if (scene7Ref.current) {
      if (scrollProgress >= 0.82) {
        scene7Ref.current.visible = true;

        // Album flying in and opening
        if (albumGroupRef.current) {
          albumGroupRef.current.position.z = THREE.MathUtils.lerp(-3.5, 0.0, s7Enter);
          albumGroupRef.current.rotation.y = THREE.MathUtils.damp(
            albumGroupRef.current.rotation.y,
            mx * 0.2,
            3,
            delta
          );
          albumGroupRef.current.rotation.x = THREE.MathUtils.damp(
            albumGroupRef.current.rotation.x,
            0.15 - my * 0.15,
            3,
            delta
          );
          albumGroupRef.current.position.y = Math.sin(time * 1.5) * 0.06;
        }

        // Open front cover (rotates along spine at x = -1.0)
        if (frontCoverRef.current) {
          const coverAngle = THREE.MathUtils.lerp(0.0, -Math.PI * 0.75, s7Open);
          frontCoverRef.current.rotation.y = coverAngle;
        }

        // Slight page lift
        if (innerPageRef.current) {
          const pageAngle = THREE.MathUtils.lerp(0.0, -Math.PI * 0.12, s7Open);
          innerPageRef.current.rotation.y = pageAngle;
        }
      } else {
        scene7Ref.current.visible = false;
      }
    }
  });

  return (
    <>
      {/* ===================================================================
          SCENE 5: RAW TO COLOR-GRADED SWEEP REVEAL
          =================================================================== */}
      <group ref={scene5Ref} visible={false}>
        <group ref={photoPlaneRef} position={[0, 0, 0]}>
          {/* Gold Beveled Frame */}
          <mesh position={[0, 0, -0.03]}>
            <boxGeometry args={[2.55, 3.35, 0.06]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.16}
              metalness={0.92}
              emissive="#382806"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Central Split Photo Plane (Shader Reveal) */}
          <mesh position={[0, 0, 0.01]} material={revealShaderMaterial}>
            <planeGeometry args={[2.4, 3.2]} />
          </mesh>

          {/* Sweeping Golden Light Beam Bar */}
          <group ref={sweepBeamRef} position={[-1.2, 0, 0.025]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 3.25, 16]} />
              <meshStandardMaterial
                color="#F3E5AB"
                emissive="#D4AF37"
                emissiveIntensity={1.8}
              />
            </mesh>
            {/* Volumetric Gold Halo */}
            <mesh>
              <planeGeometry args={[0.22, 3.25]} />
              <meshBasicMaterial
                color="#D4AF37"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>

          {/* Point Light attached to light beam */}
          <pointLight
            ref={sweepLightRef}
            color="#F3E5AB"
            intensity={2.2}
            distance={4.5}
            position={[-1.2, 0, 0.3]}
          />
        </group>
      </group>

      {/* ===================================================================
          SCENE 6: 3D NON-LINEAR EDITING TIMELINE & AUDIO WAVEFORM
          =================================================================== */}
      <group ref={scene6Ref} visible={false}>
        <group ref={timelineGroupRef} position={[0, -0.2, 0]}>
          {/* Main Timeline Base Track Plate */}
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[4.8, 2.2, 0.06]} />
            <meshStandardMaterial
              color="#0A0A0C"
              roughness={0.5}
              metalness={0.8}
            />
          </mesh>

          {/* Hairline Golden Track Dividers */}
          {[-0.65, 0.0, 0.65].map((yPos, tIdx) => (
            <mesh key={tIdx} position={[0, yPos, -0.015]}>
              <boxGeometry args={[4.6, 0.015, 0.01]} />
              <meshStandardMaterial
                color="#D4AF37"
                emissive="#AA820A"
                emissiveIntensity={0.35}
              />
            </mesh>
          ))}

          {/* Track 1: Snapped Video Clip Blocks */}
          {[
            { x: -1.4, w: 1.2, col: '#1E252E', label: 'CAM A' },
            { x: 0.1, w: 1.6, col: '#2E2218', label: 'CAM B' },
            { x: 1.5, w: 1.0, col: '#1B2C24', label: 'DRONE' },
          ].map((clip, cIdx) => (
            <mesh key={cIdx} position={[clip.x, 0.35, 0.02]}>
              <boxGeometry args={[clip.w, 0.5, 0.04]} />
              <meshStandardMaterial
                color={clip.col}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
          ))}

          {/* Track 2: B-Roll & Cutaways */}
          {[
            { x: -0.8, w: 1.8, col: '#2D1B28' },
            { x: 1.1, w: 1.4, col: '#28241A' },
          ].map((clip, bIdx) => (
            <mesh key={bIdx} position={[clip.x, -0.32, 0.02]}>
              <boxGeometry args={[clip.w, 0.45, 0.04]} />
              <meshStandardMaterial
                color={clip.col}
                roughness={0.35}
                metalness={0.4}
              />
            </mesh>
          ))}

          {/* Golden Gliding Playhead */}
          <group ref={playheadRef} position={[-2.2, 0, 0.06]}>
            {/* Vertical Indicator Needle */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.025, 2.3, 0.03]} />
              <meshStandardMaterial
                color="#D4AF37"
                emissive="#F3E5AB"
                emissiveIntensity={1.5}
              />
            </mesh>
            {/* Playhead Diamond Cap */}
            <mesh position={[0, 1.15, 0.01]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.16, 0.16, 0.04]} />
              <meshStandardMaterial
                color="#D4AF37"
                emissive="#AA820A"
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>

          {/* 32 3D Golden Audio Waveform Bars underneath */}
          <group ref={waveformGroupRef} position={[0, -0.82, 0.03]}>
            {Array.from({ length: 32 }).map((_, barIdx) => {
              const xPos = -2.1 + (barIdx / 31) * 4.2;
              return (
                <mesh key={barIdx} position={[xPos, 0, 0]}>
                  <boxGeometry args={[0.065, 0.25, 0.02]} />
                  <meshStandardMaterial
                    color="#D4AF37"
                    roughness={0.2}
                    metalness={0.9}
                    emissive="#AA820A"
                    emissiveIntensity={0.6}
                  />
                </mesh>
              );
            })}
          </group>
        </group>
      </group>

      {/* ===================================================================
          SCENE 7: CONVERGING HEIRLOOM WEDDING ALBUM
          =================================================================== */}
      <group ref={scene7Ref} visible={false}>
        <group ref={albumGroupRef} position={[0, 0, 0]}>
          {/* Back Cover */}
          <mesh position={[0, 0, -0.08]}>
            <boxGeometry args={[2.2, 2.9, 0.08]} />
            <meshStandardMaterial
              color="#12100D"
              roughness={0.3}
              metalness={0.85}
            />
          </mesh>

          {/* Spine (Hinge at Left x = -1.1) */}
          <mesh position={[-1.1, 0, -0.04]}>
            <boxGeometry args={[0.08, 2.92, 0.16]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.18}
              metalness={0.9}
              emissive="#382806"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Inner Pages Stack */}
          <mesh position={[0.05, 0, -0.02]}>
            <boxGeometry args={[2.08, 2.78, 0.05]} />
            <meshStandardMaterial
              color="#F5F3EC"
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Inner Right Page with Foil Typography & Logo */}
          <mesh position={[0.05, 0, 0.01]}>
            <planeGeometry args={[2.04, 2.74]} />
            <meshStandardMaterial
              map={albumInnerTexture || null}
              roughness={0.4}
            />
          </mesh>

          {/* Liftable Inner Left Page */}
          <group ref={innerPageRef} position={[-1.0, 0, 0.015]}>
            <mesh position={[1.0, 0, 0]}>
              <planeGeometry args={[2.0, 2.7]} />
              <meshStandardMaterial
                color="#FAF9F6"
                roughness={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Front Cover (Hinged at left x = -1.1) */}
          <group ref={frontCoverRef} position={[-1.1, 0, 0.02]}>
            <mesh position={[1.1, 0, 0]}>
              <boxGeometry args={[2.2, 2.9, 0.06]} />
              <meshStandardMaterial
                color="#0F0E0B"
                roughness={0.25}
                metalness={0.8}
              />
            </mesh>
            {/* Front Gold Foil Crest & Border */}
            <mesh position={[1.1, 0, 0.035]}>
              <planeGeometry args={[1.9, 2.6]} />
              <meshStandardMaterial
                color="#D4AF37"
                roughness={0.15}
                metalness={0.92}
                emissive="#382806"
                emissiveIntensity={0.3}
                wireframe={true}
              />
            </mesh>
          </group>

          {/* Golden God-Ray Inner Light */}
          <pointLight
            color="#F3E5AB"
            intensity={2.8}
            distance={5.0}
            position={[0, 0, 0.4]}
          />
        </group>
      </group>
    </>
  );
};

export default Scene5To7Meshes;
