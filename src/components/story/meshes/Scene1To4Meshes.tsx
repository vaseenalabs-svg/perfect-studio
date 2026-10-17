'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneMeshesProps {
  scrollProgress: number; // 0.0 to 1.0 master progress
  mousePosition: { x: number; y: number }; // normalized -1 to 1
}

// Scene progress helper: maps global [start, end] to 0.0 -> 1.0 clamped
const getSceneProgress = (global: number, start: number, end: number): number => {
  return THREE.MathUtils.clamp((global - start) / (end - start), 0, 1);
};

export const Scene1To4Meshes: React.FC<SceneMeshesProps> = ({
  scrollProgress,
  mousePosition,
}) => {
  // References for Scene Groups
  const scene1Ref = useRef<THREE.Group>(null);
  const lensGroupRef = useRef<THREE.Group>(null);

  const scene2Ref = useRef<THREE.Group>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);
  const memoryFramesGroupRef = useRef<THREE.Group>(null);

  const scene3Ref = useRef<THREE.Group>(null);
  const apertureBladesGroupRef = useRef<THREE.Group>(null);
  const galleryArcGroupRef = useRef<THREE.Group>(null);

  const scene4Ref = useRef<THREE.Group>(null);
  const cinemaRigGroupRef = useRef<THREE.Group>(null);
  const filmRibbonRef = useRef<THREE.Group>(null);

  /* -------------------------------------------------------------------------
     PROCEDURAL TEXTURES FOR PHOTO FRAMES (Memory frames & Gallery photos)
     ------------------------------------------------------------------------- */
  const photoTextures = useMemo(() => {
    // Generates warm, luxury gold-toned editorial textures via HTML5 Canvas
    if (typeof document === 'undefined') return [];

    const palettes = [
      { bg1: '#1F1A12', bg2: '#4A3B21', accent: '#D4AF37', label: 'THE FIRST GLANCE' },
      { bg1: '#16181C', bg2: '#3D3425', accent: '#F3E5AB', label: 'SACRED VOWS' },
      { bg1: '#261B16', bg2: '#593D22', accent: '#D4AF37', label: 'EUPHORIC DANCE' },
      { bg1: '#12191B', bg2: '#2F3C3B', accent: '#EBE9E1', label: 'ETERNAL PROMISE' },
      { bg1: '#22151B', bg2: '#542E3B', accent: '#F3E5AB', label: 'GOLDEN HOUR' },
      { bg1: '#181B15', bg2: '#3B4028', accent: '#D4AF37', label: 'FOREVER TIED' },
    ];

    return palettes.map((item) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 680;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Gradient base
        const grad = ctx.createLinearGradient(0, 0, 512, 680);
        grad.addColorStop(0, item.bg1);
        grad.addColorStop(0.5, item.bg2);
        grad.addColorStop(1, item.bg1);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 680);

        // Subtle editorial photo border
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, 472, 640);

        // Stylized couple silhouette geometry
        ctx.fillStyle = item.accent;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(256, 260, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(256, 390, 90, 130, 0, 0, Math.PI * 2);
        ctx.fill();

        // Typography
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#FAF9F6';
        ctx.font = 'bold 22px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, 256, 580);

        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#D4AF37';
        ctx.fillText('PERFECT STUDIO · ARCHIVE', 256, 610);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    });
  }, []);

  /* -------------------------------------------------------------------------
     SCENE 4: PROCEDURAL SPIRAL FILM STRIP CURVE
     ------------------------------------------------------------------------- */
  const filmStripCurve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 2.5;
    const totalPoints = 80;
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * turns;
      const radius = 2.2 + Math.sin(t * Math.PI) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = (t - 0.5) * 4.5;
      const z = Math.sin(angle) * radius - 1.0;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const filmStripGeometry = useMemo(() => {
    return new THREE.TubeGeometry(filmStripCurve, 90, 0.28, 6, false);
  }, [filmStripCurve]);

  /* -------------------------------------------------------------------------
     ANIMATION LOOP (useFrame)
     ------------------------------------------------------------------------- */
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const { x: mx, y: my } = mousePosition;

    // -----------------------------------------------------------------------
    // SCENE 1 CHOREOGRAPHY (0.00 -> 0.14)
    // -----------------------------------------------------------------------
    const s1Prog = getSceneProgress(scrollProgress, 0.0, 0.14);
    const s1Exit = getSceneProgress(scrollProgress, 0.11, 0.17);

    if (scene1Ref.current && lensGroupRef.current) {
      if (scrollProgress <= 0.2) {
        scene1Ref.current.visible = true;

        // Smooth mouse tilt parallax
        lensGroupRef.current.rotation.x = THREE.MathUtils.damp(
          lensGroupRef.current.rotation.x,
          my * 0.35,
          4,
          delta
        );
        lensGroupRef.current.rotation.y = THREE.MathUtils.damp(
          lensGroupRef.current.rotation.y,
          mx * 0.45,
          4,
          delta
        );

        // Continuous subtle rotation of outer focus ring
        lensGroupRef.current.rotation.z += delta * 0.15;

        // Scale and glide forward as user scrolls toward Scene 2
        const s1Scale = THREE.MathUtils.lerp(1.0, 2.6, s1Exit);
        const s1Z = THREE.MathUtils.lerp(0.0, 3.2, s1Exit);
        lensGroupRef.current.scale.setScalar(s1Scale);
        lensGroupRef.current.position.z = s1Z;

        // Fade out
        const s1Opacity = 1.0 - s1Exit;
        scene1Ref.current.position.y = THREE.MathUtils.lerp(0, -0.6, s1Exit);
      } else {
        scene1Ref.current.visible = false;
      }
    }

    // -----------------------------------------------------------------------
    // SCENE 2 CHOREOGRAPHY (0.14 -> 0.28)
    // -----------------------------------------------------------------------
    const s2Enter = getSceneProgress(scrollProgress, 0.12, 0.18);
    const s2Exit = getSceneProgress(scrollProgress, 0.25, 0.31);
    const s2Active = s2Enter * (1 - s2Exit);

    if (scene2Ref.current) {
      if (scrollProgress >= 0.1 && scrollProgress <= 0.34) {
        scene2Ref.current.visible = true;

        // Floating memory frames bobbing motion
        if (memoryFramesGroupRef.current) {
          memoryFramesGroupRef.current.position.y = Math.sin(time * 1.4) * 0.08;
          memoryFramesGroupRef.current.rotation.y = THREE.MathUtils.damp(
            memoryFramesGroupRef.current.rotation.y,
            mx * 0.2,
            3,
            delta
          );
          memoryFramesGroupRef.current.position.z = THREE.MathUtils.lerp(-4.0, 0.0, s2Enter) - s2Exit * 4.0;
        }

        // Drifting golden veil light ribbon wave
        if (ribbonRef.current) {
          ribbonRef.current.rotation.z = Math.sin(time * 0.6) * 0.12;
          ribbonRef.current.position.x = Math.cos(time * 0.8) * 0.25;
        }
      } else {
        scene2Ref.current.visible = false;
      }
    }

    // -----------------------------------------------------------------------
    // SCENE 3 CHOREOGRAPHY (0.28 -> 0.42)
    // -----------------------------------------------------------------------
    const s3Enter = getSceneProgress(scrollProgress, 0.27, 0.33);
    const s3Open = getSceneProgress(scrollProgress, 0.30, 0.38);
    const s3Exit = getSceneProgress(scrollProgress, 0.40, 0.45);

    if (scene3Ref.current) {
      if (scrollProgress >= 0.25 && scrollProgress <= 0.47) {
        scene3Ref.current.visible = true;

        // Aperture blades retraction / opening
        if (apertureBladesGroupRef.current) {
          const bladeAngle = THREE.MathUtils.lerp(0.0, Math.PI * 0.38, s3Open);
          const bladeScale = THREE.MathUtils.lerp(1.0, 1.8, s3Open);
          apertureBladesGroupRef.current.rotation.z = bladeAngle;
          apertureBladesGroupRef.current.scale.setScalar(bladeScale);
        }

        // Gallery Arc outward burst & tilt
        if (galleryArcGroupRef.current) {
          const arcSpread = THREE.MathUtils.lerp(0.2, 1.0, s3Open) * (1 - s3Exit * 0.5);
          galleryArcGroupRef.current.scale.setScalar(arcSpread);
          galleryArcGroupRef.current.rotation.y = THREE.MathUtils.damp(
            galleryArcGroupRef.current.rotation.y,
            mx * 0.35,
            3,
            delta
          );
          galleryArcGroupRef.current.rotation.x = THREE.MathUtils.damp(
            galleryArcGroupRef.current.rotation.x,
            -my * 0.2,
            3,
            delta
          );
          galleryArcGroupRef.current.position.z = THREE.MathUtils.lerp(-3.0, 0.2, s3Enter) - s3Exit * 3.5;
        }
      } else {
        scene3Ref.current.visible = false;
      }
    }

    // -----------------------------------------------------------------------
    // SCENE 4 CHOREOGRAPHY (0.42 -> 0.57)
    // -----------------------------------------------------------------------
    const s4Enter = getSceneProgress(scrollProgress, 0.41, 0.47);
    const s4Prog = getSceneProgress(scrollProgress, 0.43, 0.55);
    const s4Exit = getSceneProgress(scrollProgress, 0.55, 0.60);

    if (scene4Ref.current) {
      if (scrollProgress >= 0.39 && scrollProgress <= 0.62) {
        scene4Ref.current.visible = true;

        // Cinema Rig appearance
        if (cinemaRigGroupRef.current) {
          cinemaRigGroupRef.current.position.x = THREE.MathUtils.lerp(-3.0, -1.2, s4Enter) + mx * 0.2;
          cinemaRigGroupRef.current.rotation.y = THREE.MathUtils.lerp(0.6, 0.25, s4Prog) + mx * 0.25;
          cinemaRigGroupRef.current.rotation.x = my * 0.15;
          cinemaRigGroupRef.current.position.z = THREE.MathUtils.lerp(-2.0, 0.0, s4Enter) - s4Exit * 3.0;
        }

        // Spiraling film ribbon rotation & unroll scrub
        if (filmRibbonRef.current) {
          filmRibbonRef.current.rotation.y = time * 0.2 + s4Prog * Math.PI * 3;
          filmRibbonRef.current.position.x = THREE.MathUtils.lerp(2.5, 0.6, s4Enter) - s4Exit * 2.0;
          filmRibbonRef.current.position.y = Math.sin(time * 1.2) * 0.1;
          filmRibbonRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.0, s4Enter) * (1 - s4Exit * 0.6));
        }
      } else {
        scene4Ref.current.visible = false;
      }
    }
  });

  return (
    <>
      {/* ===================================================================
          SCENE 1: LUXURY ROTATING CAMERA LENS
          =================================================================== */}
      <group ref={scene1Ref}>
        <group ref={lensGroupRef} position={[0, 0, 0]}>
          {/* Outer Knurled Matte Charcoal Barrel */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.0, 2.08, 1.6, 64]} />
            <meshStandardMaterial
              color="#0B0B0D"
              roughness={0.45}
              metalness={0.65}
            />
          </mesh>

          {/* Front Champagne Gold Bezel Ring */}
          <mesh position={[0, 0, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.02, 0.09, 24, 72]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.16}
              metalness={0.92}
              emissive="#382806"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Golden Focus Scale Metric Ring */}
          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.06, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#F3E5AB"
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>

          {/* Rear Champagne Gold Accent Ring */}
          <mesh position={[0, 0, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.02, 0.07, 24, 64]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.18}
              metalness={0.9}
            />
          </mesh>

          {/* Optical Element 1: Front Convex Sapphire-Coated Glass */}
          <mesh position={[0, 0, 0.65]}>
            <sphereGeometry args={[1.82, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.28]} />
            <meshPhysicalMaterial
              color="#132338"
              roughness={0.05}
              metalness={0.15}
              transmission={0.72}
              thickness={0.8}
              ior={1.52}
              reflectivity={0.95}
              specularColor={new THREE.Color('#F3E5AB')}
            />
          </mesh>

          {/* Optical Element 2: Deep Inner Glass Element */}
          <mesh position={[0, 0, 0.1]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[1.5, 36, 36, 0, Math.PI * 2, 0, Math.PI * 0.22]} />
            <meshPhysicalMaterial
              color="#1A3344"
              roughness={0.08}
              metalness={0.1}
              transmission={0.82}
              thickness={0.5}
            />
          </mesh>

          {/* Inner Golden Aperture Rim Highlight */}
          <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.04, 16, 48]} />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#AA820A"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      </group>

      {/* ===================================================================
          SCENE 2: FLOATING 3D EMOTIONAL PHOTO FRAMES + GOLDEN LIGHT VEIL
          =================================================================== */}
      <group ref={scene2Ref} visible={false}>
        {/* Floating 3D Memory Frames */}
        <group ref={memoryFramesGroupRef}>
          {[
            { pos: [-2.2, 1.1, -0.4], rot: [0.1, 0.22, -0.05], texIdx: 0, scale: 0.95 },
            { pos: [2.1, 0.8, -0.9], rot: [-0.08, -0.28, 0.08], texIdx: 1, scale: 1.05 },
            { pos: [-1.6, -1.3, -1.2], rot: [0.15, 0.18, 0.04], texIdx: 2, scale: 0.88 },
            { pos: [1.8, -1.1, -0.2], rot: [-0.12, -0.15, -0.06], texIdx: 3, scale: 0.92 },
          ].map((item, i) => (
            <group key={i} position={item.pos as [number, number, number]} rotation={item.rot as [number, number, number]}>
              {/* Gold Beveled Frame Border */}
              <mesh position={[0, 0, -0.02]}>
                <boxGeometry args={[1.55 * item.scale, 2.05 * item.scale, 0.05]} />
                <meshStandardMaterial
                  color="#D4AF37"
                  roughness={0.2}
                  metalness={0.88}
                  emissive="#382806"
                  emissiveIntensity={0.2}
                />
              </mesh>

              {/* Photo Canvas Artwork */}
              <mesh position={[0, 0, 0.015]}>
                <planeGeometry args={[1.42 * item.scale, 1.92 * item.scale]} />
                <meshStandardMaterial
                  map={photoTextures[item.texIdx] || null}
                  color="#FAF9F6"
                  roughness={0.35}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Drifting Golden Veil / Ribbon of Light */}
        <mesh ref={ribbonRef} position={[0, 0, -1.5]} rotation={[0.2, 0.4, 0]}>
          <planeGeometry args={[7.5, 4.5, 32, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.2}
            metalness={0.6}
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            wireframe={true}
          />
        </mesh>
      </group>

      {/* ===================================================================
          SCENE 3: MECHANICAL SHUTTER BLADES & 3D GALLERY ARC
          =================================================================== */}
      <group ref={scene3Ref} visible={false}>
        {/* Central Mechanical Shutter / Iris Blades */}
        <group ref={apertureBladesGroupRef} position={[0, 0, -1.0]}>
          {Array.from({ length: 9 }).map((_, idx) => {
            const angle = (idx / 9) * Math.PI * 2;
            const bladeRadius = 1.35;
            return (
              <mesh
                key={idx}
                position={[Math.cos(angle) * bladeRadius, Math.sin(angle) * bladeRadius, idx * 0.015]}
                rotation={[0, 0, angle + 0.65]}
              >
                <boxGeometry args={[1.2, 0.55, 0.02]} />
                <meshStandardMaterial
                  color="#151518"
                  roughness={0.3}
                  metalness={0.85}
                />
                {/* Thin gold edge along each blade */}
                <mesh position={[0, 0.28, 0.015]}>
                  <boxGeometry args={[1.2, 0.03, 0.01]} />
                  <meshStandardMaterial
                    color="#D4AF37"
                    emissive="#AA820A"
                    emissiveIntensity={0.4}
                  />
                </mesh>
              </mesh>
            );
          })}
        </group>

        {/* 3D Curved Gallery Arc of Wedding Photos */}
        <group ref={galleryArcGroupRef} position={[0, 0, 0]}>
          {Array.from({ length: 6 }).map((_, idx) => {
            const arcAngle = (idx - 2.5) * 0.38; // Spread across arc
            const radius = 3.6;
            const x = Math.sin(arcAngle) * radius;
            const z = -Math.cos(arcAngle) * radius + 3.0;

            return (
              <group
                key={idx}
                position={[x, (idx % 2 === 0 ? 0.25 : -0.25), z]}
                rotation={[0, -arcAngle, 0]}
              >
                {/* Gold Floating Frame */}
                <mesh position={[0, 0, -0.02]}>
                  <boxGeometry args={[1.25, 1.65, 0.04]} />
                  <meshStandardMaterial
                    color="#D4AF37"
                    roughness={0.18}
                    metalness={0.9}
                    emissive="#382806"
                    emissiveIntensity={0.2}
                  />
                </mesh>

                {/* Photo Plane */}
                <mesh position={[0, 0, 0.01]}>
                  <planeGeometry args={[1.14, 1.54]} />
                  <meshStandardMaterial
                    map={photoTextures[idx % photoTextures.length] || null}
                    roughness={0.3}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* ===================================================================
          SCENE 4: CINEMA CAMERA RIG & SPIRALING GOLDEN FILM STRIP
          =================================================================== */}
      <group ref={scene4Ref} visible={false}>
        {/* Cinema Camera Rig Silhouette */}
        <group ref={cinemaRigGroupRef} position={[-1.2, 0, 0]}>
          {/* Matte Box Sunshade */}
          <mesh position={[0, 0, 0.8]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[1.35, 0.9, 0.8, 4]} />
            <meshStandardMaterial
              color="#101012"
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>

          {/* Camera Body Box */}
          <mesh position={[0, 0, -0.2]}>
            <boxGeometry args={[1.4, 1.3, 1.6]} />
            <meshStandardMaterial
              color="#09090A"
              roughness={0.4}
              metalness={0.7}
            />
          </mesh>

          {/* Top Handle in Champagne Gold */}
          <mesh position={[0, 0.85, -0.1]}>
            <boxGeometry args={[0.2, 0.15, 1.1]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.2}
              metalness={0.88}
            />
          </mesh>

          {/* Dual 15mm Base Support Rods */}
          {[-0.35, 0.35].map((xOffset, rodIdx) => (
            <mesh key={rodIdx} position={[xOffset, -0.75, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 2.2, 16]} />
              <meshStandardMaterial
                color="#C0C0C0"
                roughness={0.2}
                metalness={0.95}
              />
            </mesh>
          ))}

          {/* Follow Focus Knob Dial */}
          <mesh position={[0.82, -0.2, 0.3]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.18, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.15}
              metalness={0.92}
              emissive="#382806"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>

        {/* 3D Spiraling Golden 35mm Film Ribbon */}
        <group ref={filmRibbonRef} position={[0.8, 0, 0]}>
          <mesh geometry={filmStripGeometry}>
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.25}
              metalness={0.8}
              wireframe={false}
              emissive="#382806"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Floating Golden Film Frames along spiral */}
          {Array.from({ length: 8 }).map((_, fIdx) => {
            const t = (fIdx + 0.5) / 8;
            const pt = filmStripCurve.getPointAt(t);
            return (
              <mesh key={fIdx} position={[pt.x, pt.y, pt.z]} rotation={[0, t * Math.PI * 4, 0]}>
                <planeGeometry args={[0.65, 0.45]} />
                <meshStandardMaterial
                  color="#F3E5AB"
                  emissive="#D4AF37"
                  emissiveIntensity={0.35}
                  transparent
                  opacity={0.85}
                  side={THREE.DoubleSide}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </>
  );
};

export default Scene1To4Meshes;
