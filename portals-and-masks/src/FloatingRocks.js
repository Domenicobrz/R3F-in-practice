import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function FloatingRocks() {
  const rock1 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_rock_1.glb");
  const rock2 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_rock_2.glb");
  const rock3 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_rock_3.glb");

  return (
    <Suspense fallback={null}>
      <primitive object={rock1.scene} />
      <primitive object={rock2.scene} />
      <primitive object={rock3.scene} />
    </Suspense>
  )
}