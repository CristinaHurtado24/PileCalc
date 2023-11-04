import React from "react";
import { useCubeTexture } from "@react-three/drei";
import { MeshBasicMaterial } from "three";

export default function Box() {
  /* const boxTexture = useCubeTexture([
    "Relleno.png",
    "Arcilla.png",
    "Grava.png",
  ], {path:'../../Images/'}); */

  return (
    <mesh position={[0, 6 , 0]}>
      <boxGeometry attach="geometry" args={[20, 5, 20]} />
      <meshLambertMaterial
        attach="material"
        color={0xffffff}
        opacity={0.4}
        transparent
      />
    </mesh>
  );
}
