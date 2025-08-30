"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function InteractiveCube({
    draggedTask,
    isDark,
}: {
  draggedTask: {
    id: string;
    sourceColumn: string;
    destinationColumn?: string;
        } | null;
        isDark: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      // Base rotation
      ref.current.rotation.y += 0.05;

      // Enhanced rotation while dragging
      if (draggedTask) {
        ref.current.rotation.x += 0.07;
        ref.current.rotation.z += 0.065;
      }

      // Floating animation
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getColor = () => {
    if (hovered) return "hotpink";
    if (!draggedTask) return isDark ?'#fff' : "#6b7280"; // default gray

    const { destinationColumn } = draggedTask;

    if (destinationColumn === "Done") return "#78d700"; // green
    if (destinationColumn === "To do") return "#ff7979"; // pink
    if (destinationColumn === "In progress") return "#ffa048"; // orange

    return "#ff7979";
  };

  const getEmissiveColor = () => {
    if (!draggedTask) return isDark ? '#fff' : "#374151";
    if (draggedTask.destinationColumn === "Done") return "#78d700";
    if (draggedTask.destinationColumn === "To do") return "#ff7979"; // pink
    if (draggedTask.destinationColumn === "In progress") return "#ffa048"; // orange
    return "#ff7979";
  };

  return (
    <mesh
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={getColor()}
        emissive={getEmissiveColor()}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function CubeWidget({
    draggedTask,
    isDark,
}: {
  draggedTask: {
    id: string;
    sourceColumn: string;
    destinationColumn?: string;
  } | null;
        isDark: boolean;
}) {
  return (
    <div className="absolute -top-10 right-0 w-20 h-20 z-50">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <InteractiveCube draggedTask={draggedTask} isDark={isDark} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
