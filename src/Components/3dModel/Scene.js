import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import Box from "./Box";
import Cylinder from "./Cylinder";
import styles from "./3dModel.modules.css";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  const perfil = [
    { type: "1", start: "0", end: "5", ngp: "10" },
    { type: "2", start: "5", end: "10", ngp: "24" },
    { type: "4", start: "10", end: "20", ngp: "35" },
  ];

  var globalDif = 0;

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 40] }}>
      <OrbitControls enableZoom={false} />
      <ambientLight />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        {perfil.map((estrato, key) => {
          const { type, start, end, ngp } = estrato;
          let staart = parseFloat(start);
          let eend = parseFloat(end);
          let dif = eend - staart;
          globalDif += dif;
          return (
            <Suspense fallback={null}>
              <mesh position={[0, 6 - globalDif, 0]}>
                <boxGeometry attach="geometry" args={[20, dif, 20]} />
                <meshLambertMaterial
                  attach="material"
                  color={0xffffff}
                  opacity={0.4}
                  transparent
                />
              </mesh>
            </Suspense>
          );
        })}
        <Cylinder />
      </Suspense>
    </Canvas>
  );
}
