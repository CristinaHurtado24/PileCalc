import React from "react";

export default function Cylinder(props) {
  return (
    <mesh>
      <cylinderGeometry
        attach="geometry"
        args={[props.diam, props.diam, props.len, 10]}
        position={[0, 0, 0]}
      />
      <meshLambertMaterial attach="material" color={0x808080} />

    </mesh>
  );
}
