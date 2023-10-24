import React from "react";

export default function Cylinder() {
  return (
    <mesh>
      <cylinderGeometry attach="geometry" args={[5, 5, 15,10]} />
      <meshLambertMaterial attach="material" color={0x808080} />
    </mesh>
  );
}
