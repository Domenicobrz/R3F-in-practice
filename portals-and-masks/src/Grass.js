import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Color, DoubleSide, FrontSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Grass() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/grass.glb");

  useEffect(() => {
    if(!gltf) return;

    gltf.scene.children[0].material.alphaToCoverage = true;
    gltf.scene.children[0].material.transparent = true;

    // setting 1
    // gltf.scene.children[0].material.map = gltf.scene.children[0].material.emissiveMap;
    // gltf.scene.children[0].material.emissiveMap = null;
    // gltf.scene.children[0].material.emissive = null;
    
    // setting 2
    gltf.scene.children[0].material.map = gltf.scene.children[0].material.emissiveMap;
    gltf.scene.children[0].material.emissive = new Color(1,1,1);
    
    gltf.scene.children[0].material.side = DoubleSide;

  }, [gltf]);

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}