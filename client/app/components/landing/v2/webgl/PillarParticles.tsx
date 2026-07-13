"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PillarParticlesProps {
  /** Normalized [r,g,b] (0–1) accent colour, updated imperatively per scroll frame. */
  colorRef: MutableRefObject<[number, number, number]>;
  /** Park the render loop when the section is off-screen. */
  active?: boolean;
}

const COUNT = 1600;

function Vortex({ colorRef }: { colorRef: MutableRefObject<[number, number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  // Golden-angle spiral disc → reads as a vortex once rotated.
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const radius = Math.pow(t, 0.5) * 5.2;
      const angle = i * 2.399963; // golden angle
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2.2; // depth for parallax
    }
    return arr;
  }, []);

  // Soft round glow sprite (radial-gradient) so particles bloom instead of being square specks.
  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.05; // continuous swirl
      pointsRef.current.rotation.x = Math.sin(pointsRef.current.rotation.z * 0.15) * 0.12;
    }
    if (matRef.current) {
      const [r, g, b] = colorRef.current;
      matRef.current.color.setRGB(r, g, b);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        map={sprite}
        size={0.16}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function PillarParticles({ colorRef, active = true }: PillarParticlesProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Vortex colorRef={colorRef} />
    </Canvas>
  );
}
