import React, { Suspense, useMemo, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import { Canvas } from "@react-three/fiber";
import Cylinder from "./Cylinder";
import Box from "./Box";
import styles from "./3dModel.modules.css";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

export default function Scene(props) {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  // Cargar las texturas de manera síncrona antes de renderizar la escena
  const loadedTextures = useMemo(() => {
    const loader = new THREE.CubeTextureLoader();
    return {
      relleno: loader.load(
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
      grava: loader.load(
        [
          "ImagesTypes/ImagesGravel/px.png",
          "ImagesTypes/ImagesGravel/nx.png",
          "ImagesTypes/ImagesGravel/py.png",
          "ImagesTypes/ImagesGravel/ny.png",
          "ImagesTypes/ImagesGravel/pz.png",
          "ImagesTypes/ImagesGravel/nz.png",
        ],
        () => {}
      ),
      arena: loader.load(
        [
          "ImagesTypes/ImagesSand/px.png",
          "ImagesTypes/ImagesSand/nx.png",
          "ImagesTypes/ImagesSand/py.png",
          "ImagesTypes/ImagesSand/ny.png",
          "ImagesTypes/ImagesSand/pz.png",
          "ImagesTypes/ImagesSand/nz.png",
        ],
        () => {}
      ),
      arcillaAlta: loader.load(
        [
          "ImagesTypes/ImagesArcA/px.png",
          "ImagesTypes/ImagesArcA/nx.png",
          "ImagesTypes/ImagesArcA/py.png",
          "ImagesTypes/ImagesArcA/ny.png",
          "ImagesTypes/ImagesArcA/pz.png",
          "ImagesTypes/ImagesArcA/nz.png",
        ],
        () => {}
      ),
      arcillaBaja: loader.load(
        [
          "ImagesTypes/ImagesArcB/px.png",
          "ImagesTypes/ImagesArcB/nx.png",
          "ImagesTypes/ImagesArcB/py.png",
          "ImagesTypes/ImagesArcB/ny.png",
          "ImagesTypes/ImagesArcB/pz.png",
          "ImagesTypes/ImagesArcB/nz.png",
        ],
        () => {}
      ),
      limoAlta: loader.load(
        [
          "ImagesTypes/ImagesLimoA/px.png",
          "ImagesTypes/ImagesLimoA/nx.png",
          "ImagesTypes/ImagesLimoA/py.png",
          "ImagesTypes/ImagesLimoA/ny.png",
          "ImagesTypes/ImagesLimoA/pz.png",
          "ImagesTypes/ImagesLimoA/nz.png",
        ],
        () => {}
      ),
      limoBaja: loader.load(
        [
          "ImagesTypes/ImagesLimoB/px.png",
          "ImagesTypes/ImagesLimoB/nx.png",
          "ImagesTypes/ImagesLimoB/py.png",
          "ImagesTypes/ImagesLimoB/ny.png",
          "ImagesTypes/ImagesLimoB/pz.png",
          "ImagesTypes/ImagesLimoB/nz.png",
        ],
        () => {}
      ),
      organica: loader.load(
        [
          "ImagesTypes/ImagesMat/px.png",
          "ImagesTypes/ImagesMat/nx.png",
          "ImagesTypes/ImagesMat/py.png",
          "ImagesTypes/ImagesMat/ny.png",
          "ImagesTypes/ImagesMat/pz.png",
          "ImagesTypes/ImagesMat/nz.png",
        ],
        () => {}
      ),
      gravaLimo: loader.load(
        [
          "ImagesTypes/ImagesGM/px.png",
          "ImagesTypes/ImagesGM/nx.png",
          "ImagesTypes/ImagesGM/py.png",
          "ImagesTypes/ImagesGM/ny.png",
          "ImagesTypes/ImagesGM/pz.png",
          "ImagesTypes/ImagesGM/nz.png",
        ],
        () => {}
      ),
      gravaArc: loader.load(
        [
          "ImagesTypes/ImagesGC/px.png",
          "ImagesTypes/ImagesGC/nx.png",
          "ImagesTypes/ImagesGC/py.png",
          "ImagesTypes/ImagesGC/ny.png",
          "ImagesTypes/ImagesGC/pz.png",
          "ImagesTypes/ImagesGC/nz.png",
        ],
        () => {}
      ),
      GCM: loader.load(
        [
          "ImagesTypes/ImagesGCM/px.png",
          "ImagesTypes/ImagesGCM/nx.png",
          "ImagesTypes/ImagesGCM/py.png",
          "ImagesTypes/ImagesGCM/ny.png",
          "ImagesTypes/ImagesGCM/pz.png",
          "ImagesTypes/ImagesGCM/nz.png",
        ],
        () => {}
      ),
      arenaLimo: loader.load(
        [
          "ImagesTypes/ImagesSM/px.png",
          "ImagesTypes/ImagesSM/nx.png",
          "ImagesTypes/ImagesSM/py.png",
          "ImagesTypes/ImagesSM/ny.png",
          "ImagesTypes/ImagesSM/pz.png",
          "ImagesTypes/ImagesSM/nz.png",
        ],
        () => {}
      ),
      arenaArc: loader.load(
        [
          "ImagesTypes/ImagesSC/px.png",
          "ImagesTypes/ImagesSC/nx.png",
          "ImagesTypes/ImagesSC/py.png",
          "ImagesTypes/ImagesSC/ny.png",
          "ImagesTypes/ImagesSC/pz.png",
          "ImagesTypes/ImagesSC/nz.png",
        ],
        () => {}
      ),
      SCM: loader.load(
        [
          "ImagesTypes/ImagesSCM/px.png",
          "ImagesTypes/ImagesSCM/nx.png",
          "ImagesTypes/ImagesSCM/py.png",
          "ImagesTypes/ImagesSCM/ny.png",
          "ImagesTypes/ImagesSCM/pz.png",
          "ImagesTypes/ImagesSCM/nz.png",
        ],
        () => {}
      ),
      limoAren: loader.load(
        [
          "ImagesTypes/ImagesLimoAren/px.png",
          "ImagesTypes/ImagesLimoAren/nx.png",
          "ImagesTypes/ImagesLimoAren/py.png",
          "ImagesTypes/ImagesLimoAren/ny.png",
          "ImagesTypes/ImagesLimoAren/pz.png",
          "ImagesTypes/ImagesLimoAren/nz.png",
        ],
        () => {}
      ),
      limoArc: loader.load(
        [
          "ImagesTypes/ImagesLimoArc/px.png",
          "ImagesTypes/ImagesLimoArc/nx.png",
          "ImagesTypes/ImagesLimoArc/py.png",
          "ImagesTypes/ImagesLimoArc/ny.png",
          "ImagesTypes/ImagesLimoArc/pz.png",
          "ImagesTypes/ImagesLimoArc/nz.png",
        ],
        () => {}
      ),
      arcAren: loader.load(
        [
          "ImagesTypes/ImagesArcAren/px.png",
          "ImagesTypes/ImagesArcAren/nx.png",
          "ImagesTypes/ImagesArcAren/py.png",
          "ImagesTypes/ImagesArcAren/ny.png",
          "ImagesTypes/ImagesArcAren/pz.png",
          "ImagesTypes/ImagesArcAren/nz.png",
        ],
        () => {}
      ),
      arcLimo: loader.load(
        [
          "ImagesTypes/ImagesArcillaLimosa/px.png",
          "ImagesTypes/ImagesArcillaLimosa/nx.png",
          "ImagesTypes/ImagesArcillaLimosa/py.png",
          "ImagesTypes/ImagesArcillaLimosa/ny.png",
          "ImagesTypes/ImagesArcillaLimosa/pz.png",
          "ImagesTypes/ImagesArcillaLimosa/nz.png",
        ],
        () => {}
      ),
      esquisto: loader.load(
        [
          "ImagesTypes/ImagesEsquisto/px.png",
          "ImagesTypes/ImagesEsquisto/nx.png",
          "ImagesTypes/ImagesEsquisto/py.png",
          "ImagesTypes/ImagesEsquisto/ny.png",
          "ImagesTypes/ImagesEsquisto/pz.png",
          "ImagesTypes/ImagesEsquisto/nz.png",
        ],
        () => {}
      ),
      gneiss: loader.load(
        [
          "ImagesTypes/ImagesGneiss/px.png",
          "ImagesTypes/ImagesGneiss/nx.png",
          "ImagesTypes/ImagesGneiss/py.png",
          "ImagesTypes/ImagesGneiss/ny.png",
          "ImagesTypes/ImagesGneiss/pz.png",
          "ImagesTypes/ImagesGneiss/nz.png",
        ],
        () => {}
      ),
      arenisca: loader.load(
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
      lutita: loader.load(
        [
          "ImagesTypes/ImagesLutita/px.png",
          "ImagesTypes/ImagesLutita/nx.png",
          "ImagesTypes/ImagesLutita/py.png",
          "ImagesTypes/ImagesLutita/ny.png",
          "ImagesTypes/ImagesLutita/pz.png",
          "ImagesTypes/ImagesLutita/nz.png",
        ],
        () => {}
      ),
    };
  }, []);

  const returnPileHeihght = (props) => {
    if (projectValues.units["unitValue"] == 2) {
      return props.result[0]["length"];
    }
    if (projectValues.units["unitValue"] == 1) {
      return props.result[0]["length"] / 100;
    }
  };

  const returnPileDiam = (props) => {
    if (projectValues.units["unitValue"] == 2) {
      return props.result[0]["diam"];
    }
    if (projectValues.units["unitValue"] == 1) {
      return props.result[0]["diam"] / 100;
    }
  };

  let pileHeight = returnPileHeihght(props); // Cambiar con lo que ingresa el usuario
  let globalDif = 0;
  let diameter = returnPileDiam(props);

  let dist = 0;
  let dif = 0;

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 20] }}>
      <OrbitControls enableZoom={true} />
      <ambientLight />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        {projectValues.soilList.map((estrato, key) => {
          const {
            typeValue,
            typeDescription,
            espesor,
            ngp,
            peso,
            cohesion,
            phi,
            isRelleno,
            errorMsg,
          } = estrato;
          if (projectValues.units["unitValue"] == 2) {
            dif = parseFloat(espesor);

            globalDif += dif;
            dist = globalDif - dif;
          } else if (projectValues.units["unitValue"] == 1) {
            dif = parseFloat(espesor) / 100;

            globalDif += dif;
            dist = globalDif - dif;
          }

          if (typeValue == 1 || typeValue == 2) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.relleno}
                key={key}
              />
            );
          } else if (typeValue == 3 || typeValue == 4) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.grava}
                key={key}
              />
            );
          } else if (typeValue == 5 || typeValue == 6) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arena}
                key={key}
              />
            );
          } else if (typeValue == 7) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arcillaAlta}
                key={key}
              />
            );
          } else if (typeValue == 8) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arcillaBaja}
                key={key}
              />
            );
          } else if (typeValue == 9) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.limoAlta}
                key={key}
              />
            );
          } else if (typeValue == 10) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.limoBaja}
                key={key}
              />
            );
          } else if (typeValue == 11) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.organica}
                key={key}
              />
            );
          } else if (typeValue == 12 || typeValue == 13 || typeValue == 14) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.gravaLimo}
                key={key}
              />
            );
          } else if (typeValue == 15 || typeValue == 16 || typeValue == 17) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.gravaArc}
                key={key}
              />
            );
          } else if (typeValue == 18 || typeValue == 19 || typeValue == 20) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.GCM}
                key={key}
              />
            );
          } else if (typeValue == 21 || typeValue == 22 || typeValue == 23) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arenaLimo}
                key={key}
              />
            );
          } else if (typeValue == 24 || typeValue == 25 || typeValue == 26) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arenaArc}
                key={key}
              />
            );
          } else if (typeValue == 27 || typeValue == 28 || typeValue == 29) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.SCM}
                key={key}
              />
            );
          } else if (typeValue == 30) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.limoAren}
                key={key}
              />
            );
          } else if (typeValue == 31) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.limoArc}
                key={key}
              />
            );
          } else if (typeValue == 32) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arcAren}
                key={key}
              />
            );
          } else if (typeValue == 33 || typeValue == 34) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.esquisto}
                key={key}
              />
            );
          } else if (typeValue == 35) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.gneiss}
                key={key}
              />
            );
          } else if (typeValue == 36) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.arenisca}
                key={key}
              />
            );
          } else if (typeValue == 37) {
            return (
              <Box
                pile={pileHeight}
                dif={dif}
                dist={dist}
                texture={loadedTextures.lutita}
                key={key}
              />
            );
          }
        })}
        <Cylinder len={pileHeight} diam={diameter} />
      </Suspense>
    </Canvas>
  );
}
