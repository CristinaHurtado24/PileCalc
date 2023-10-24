import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import Cylinder from "./Cylinder";
import styles from "./3dModel.modules.css";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas className={styles.canvas}>
      <OrbitControls />
      <ambientLight />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <Box />
        <Cylinder/>
      </Suspense>
    </Canvas>
  );
}
