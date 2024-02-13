import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Axe(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("../axe3.glb");

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, -Math.PI / 2, 0]} scale={0.035}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material}
          scale={2}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./axe.glb");
