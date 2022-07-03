import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Trees() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/trees.glb");

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}