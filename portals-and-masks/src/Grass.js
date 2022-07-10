import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Color, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Grass() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/grass.glb");

  useEffect(() => {
    if(!gltf) return;

    gltf.scene.children[0].material.alphaToCoverage = true;
    gltf.scene.children[0].material.transparent = true;
    gltf.scene.children[0].material.map = gltf.scene.children[0].material.emissiveMap;
    gltf.scene.children[0].material.emissive = new Color(0.5, 0.5, 0.5);
    gltf.scene.children[0].material.side = DoubleSide;

  }, [gltf]);

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}