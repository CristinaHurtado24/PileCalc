import React from "react";

export default function Box() {
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[20, 20, 20]} />
      <meshLambertMaterial attach="material" color={0xffffff} opacity={0.4} transparent/>
    </mesh>
  );
}
