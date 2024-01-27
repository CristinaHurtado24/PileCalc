import React from "react";
import { useCubeTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Box(props) {
  return (
    <mesh
      position={[0, props.pile / 2 - props.dif / 2 - props.dist, 0]}
      key={props.key}
    >
      <boxGeometry attach="geometry" args={[10, props.dif, 10]} />
      <meshBasicMaterial envMap={props.texture} opacity={0.55} transparent />
    </mesh>
  );
}
