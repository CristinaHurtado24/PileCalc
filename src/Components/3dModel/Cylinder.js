import React from "react";

export default function Cylinder() {
  return (
    <mesh>
      <cylinderGeometry
        attach="geometry"
        args={[5, 5, 30, 10]}
        position={[0, 4, 0]}
      />
      <meshLambertMaterial attach="material" color={0x808080} />
    </mesh>
  );
}
