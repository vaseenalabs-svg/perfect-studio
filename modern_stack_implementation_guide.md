# PERFECT STUDIO — Modern Stack & Code Patterns Guide (`modern_stack_guide.md`)

Use these exact dependency versions and implementation patterns when generating the codebase in Antigravity IDE to prevent hydration mismatches, Three.js memory leaks, or GSAP scroll jitter.

## 1. Recommended `package.json` Dependencies
```json
{
  "name": "perfect-studio-3d",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@react-three/drei": "^9.105.0",
    "@react-three/fiber": "^8.16.0",
    "clsx": "^2.1.1",
    "framer-motion": "^11.2.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.2",
    "lucide-react": "^0.378.0",
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.3.0",
    "three": "^0.164.1"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.164.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5"
  }
}
```

---

## 2. Pattern A: Zero-Rerender GSAP + React Three Fiber Bridge
Never store continuous scroll progress in `React.useState` (which triggers 60 React re-renders per second). Always pass a mutable ref:

```tsx
// Shared scroll state structure
export interface StoryScrollState {
  progress: number;     // 0.0 to 1.0 across all 7 scenes
  activeScene: number;  // 1 to 7
  mouseX: number;       // -1 to 1
  mouseY: number;       // -1 to 1
}
```

Inside `useFrame((state, delta) => { ... })` in `Story3DMeshes.tsx`, use `THREE.MathUtils.lerp` (or `THREE.MathUtils.damp`) to smoothly interpolate camera positions and mesh transformations for each of the 7 scenes:

```tsx
// Scene progress window helper (returns 0 -> 1 within [start, end])
const getSceneProgress = (globalProgress: number, start: number, end: number) => {
  return THREE.MathUtils.clamp((globalProgress - start) / (end - start), 0, 1);
};
```

---

## 3. Pattern B: Scene 5 Live Before/After 3D Shader / Clip Reveal
To achieve Scene 5 (*"A raw, flat-toned photo floats in the centre. A beam of golden light sweeps across it, and the colours bloom into a rich, polished image"*):
- Render two overlapping 3D planes (or a custom fragment shader `shaderMaterial` mixing `uRawTexture` and `uGradedTexture` based on `vUv.x < uBeamPosition`).
- Attach a thin vertical glowing golden cylinder/plane at `x = (uBeamPosition - 0.5) * planeWidth` with a warm `pointLight` attached to the beam so it physically illuminates the scene as it sweeps across.

---

## 4. Pattern C: WhatsApp Deep-Link & Analytics Utility (`src/utils/whatsapp.ts`)
```ts
export const WHATSAPP_NUMBER = '917096990850';

export interface WhatsAppPayload {
  message: string;
  sourceScene: string;
  service?: string;
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function triggerWhatsApp({ message, sourceScene, service = 'General' }: WhatsAppPayload): void {
  if (typeof window !== 'undefined') {
    // Dispatch custom event for Google Analytics / GTM
    window.dispatchEvent(
      new CustomEvent('perfect_studio_whatsapp_click', {
        detail: {
          sourceScene,
          service,
          timestamp: new Date().toISOString(),
        },
      })
    );
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  }
}
```

---

## 5. Pattern D: Dynamic Import for the 3D Canvas
In `ScrollStoryMaster.tsx`, dynamically import `Story3DCanvas` to guarantee Next.js App Router SSR never attempts to evaluate WebGL on the server:
```tsx
import dynamic from 'next/dynamic';

const Story3DCanvas = dynamic(() => import('./Story3DCanvas'), {
  ssr: false,
});
```