import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import Cylinder from "./Cylinder";
import styles from "./3dModel.modules.css";
import * as THREE from "three";
import { OrbitControls, useCubeTexture } from "@react-three/drei";

export default function Scene() {
  const perfil = [
    { type: "1", start: "0", end: "5", ngp: "10" },
    { type: "2", start: "5", end: "10", ngp: "24" },
    { type: "4", start: "10", end: "20", ngp: "35" },
    { type: "4", start: "20", end: "32", ngp: "35" },
  ];

  // Cargar las texturas de manera síncrona antes de renderizar la escena
  const loadedTextures = useMemo(() => {
    const loader = new THREE.CubeTextureLoader();
    return {
      texture: loader.load(
        [
          "ImagesTypes/imagesRelleno/px.png",
          "ImagesTypes/imagesRelleno/nx.png",
          "ImagesTypes/imagesRelleno/py.png",
          "ImagesTypes/imagesRelleno/ny.png",
          "ImagesTypes/imagesRelleno/pz.png",
          "ImagesTypes/imagesRelleno/nz.png",
        ],
        () => {}
      ),
      textura: loader.load(
        [
          "ImagesTypes/ImagesArenisca/px.png",
          "ImagesTypes/ImagesArenisca/nx.png",
          "ImagesTypes/ImagesArenisca/py.png",
          "ImagesTypes/ImagesArenisca/ny.png",
          "ImagesTypes/ImagesArenisca/pz.png",
          "ImagesTypes/ImagesArenisca/nz.png",
        ],
        () => {}
      ),
    };
  }, []);

  let pileHeight = 30; // Cambiar con lo que ingresa el usuario
  let globalDif = 0;

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 2, 45] }}>
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
          console.log("key: " + key);
          if (key === 0) {
            console.log("entra key 0");
            return (
              <mesh position={[0, pileHeight / 2 - dif / 2, 0]} key={key}>
                <boxGeometry attach="geometry" args={[20, dif, 20]} />
                <meshBasicMaterial
                  envMap={loadedTextures.texture}
                  opacity={0.55}
                  transparent
                />
              </mesh>
            );
          } else if (key === 1) {
            console.log("entra key 1");
            return (
              <mesh
                position={[0, pileHeight / 2 - dif / 2 - dist, 0]}
                key={key}
              >
                <boxGeometry attach="geometry" args={[20, dif, 20]} />
                <meshBasicMaterial
                  envMap={loadedTextures.textura}
                  opacity={0.55}
                  transparent
                />
              </mesh>
            );
          } else {
            return (
              <mesh
                position={[0, pileHeight / 2 - dif / 2 - dist, 0]}
                key={key}
              >
                <boxGeometry attach="geometry" args={[20, dif, 20]} />
                <meshLambertMaterial
                  attach="material"
                  color={0xffffff}
                  opacity={0.5}
                  transparent
                />
              </mesh>
            );
          }
        })}
        <Cylinder />
      </Suspense>
    </Canvas>
  );
}
