import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Rocks() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/rocks.glb");

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}