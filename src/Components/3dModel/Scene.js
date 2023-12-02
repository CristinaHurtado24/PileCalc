import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Cylinder from "./Cylinder";
import styles from "./3dModel.modules.css";
import { OrbitControls, useCubeTexture } from "@react-three/drei";

export default function Scene() {
  const perfil = [
    { type: "1", start: "0", end: "5", ngp: "10" },
    { type: "2", start: "5", end: "10", ngp: "24" },
    { type: "4", start: "10", end: "20", ngp: "35" },
  ];

  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "TestImages/" }
  );

  let pileHeight = 30; //cambiar con lo que ingresa el usuario
  let globalDif = 0;

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 40] }}>
      <OrbitControls enableZoom={true} />
      <ambientLight />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        {perfil.map((estrato, key) => {
          const { type, start, end, ngp } = estrato;
          let staart = parseFloat(start);
          let eend = parseFloat(end);
          let dif = eend - staart;
          globalDif += dif;
          let dist = globalDif - dif;
          if (key == 0) {
            return (
              <Suspense fallback={null}>
                <mesh position={[0, pileHeight / 2 - dif / 2, 0]}>
                  <boxGeometry attach="geometry" args={[20, dif, 20]} />
                  <meshBasicMaterial
                    color={0xffffff}
                    envMap={texture}
                    opacity={0.4}
                    transparent
                  />
                </mesh>
              </Suspense>
            );
          } else {
            return (
              <Suspense fallback={null}>
                <mesh position={[0, pileHeight / 2 - dif / 2 - dist, 0]}>
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
          }
        })}
        <Cylinder />
      </Suspense>
    </Canvas>
  );
}
