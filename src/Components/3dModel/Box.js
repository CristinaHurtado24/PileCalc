import React from "react";

export default function Box(){
    return (
    <mesh rotation={[90,0,40]}>
        <boxGeometry attach="geometry" args={[3,3,3]} />
        <meshLambertMaterial attach="material" color={0x000FF}/>
    </mesh>)
    
}
