import React from "react";
import { useCubeTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Box() {
  /* const boxTexture = useCubeTexture([
    "Relleno.png",
    "Arcilla.png",
    "Grava.png",
  ], {path:'../../Images/'}); */

  return (
    <Canvas>
      <mesh position={[0, 6, 0]}>
        <boxGeometry attach="geometry" args={[20, 5, 20]} />
        <meshBasicMaterial
          attach="material"
          color={0xffffff}
          opacity={0.4}
          transparent
        />
      </mesh>
    </Canvas>
  );
}
