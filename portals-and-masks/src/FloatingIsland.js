import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function FloatingIsland() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_island.glb");

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}