import React from "react";

export default function Box(props) {
  return (
    <mesh position={[0, props.pile / 2 - props.dif / 2 - props.dist, 0]}>
      <boxGeometry attach="geometry" args={[10, props.dif, 10]} />
      <meshBasicMaterial envMap={props.texture} opacity={0.55} transparent />
    </mesh>
  );
}
