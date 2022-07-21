import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Portal() {
  // thanks to https://sketchfab.com/3d-models/portal-frame-da34b37a224e4e49b307c0b17a50af2c
  const model = useLoader( GLTFLoader, process.env.PUBLIC_URL + "/models/portal.glb" );
  const mask = useLoader( GLTFLoader, process.env.PUBLIC_URL + "/models/portal_mask.glb" );

  useEffect(() => {
    if (!model) return;

    let mesh = model.scene.children[0];
    mesh.material.envMapIntensity = 3.5;

    let maskMesh = mask.scene.children[0];
    maskMesh.material.side = DoubleSide;
  }, [model, mask]);

  return (
    <>
      <primitive object={model.scene} />
      <primitive object={mask.scene} />
    </>
  );
}
