import React from "react";
import { useCubeTexture } from "@react-three/drei";
import { MeshBasicMaterial } from "three";

export default function Box() {
  /* const boxTexture = useCubeTexture([
    "Relleno.png",
    "Arcilla.png",
    "Grava.png",
  ], {path:'../../Images/'}); */


  // const ref = useRef();
  // const texture = useLoader(THREE.TextureLoader, "../../Images/Arcilla.png");
  // useFrame((state) => {
  //   ref.current.rotation.y += 0.01;
  // });

  // <mesh ref={ref} castShadow receiveShadow position={[0, 6 - globalDif, 0]}>
  //   <boxGeometry attach="geometry" args={[20, dif, 20]} />
  //   <meshPhysicalMaterial map={texture} />
  // </mesh>;
  return (
    <mesh position={[0, 6 , 0]}>
      <boxGeometry attach="geometry" args={[20, 5, 20]} />
      <meshLambertMaterial
        attach="material"
        color={0xffffff}
        opacity={0.4}
        transparent
      />
    </mesh>
  );
}
