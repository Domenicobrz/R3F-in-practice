import { useFrame, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function FloatingRocks() {
  const rock1 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_rock_1.glb");
  const rock2 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_rock_2.glb");
  const rock3 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_rock_3.glb");
  
  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    rock1.scene.children[0].translateY(Math.sin(elapsed * 0.4) * 0.00025);
    rock1.scene.children[0].rotateOnAxis(new Vector3(1, 0, 0), Math.sin(elapsed * 0.4) * 0.001);
    rock1.scene.children[0].rotateOnAxis(new Vector3(0, 1, 0), -delta * 0.05);

    rock2.scene.children[0].translateY(Math.sin(elapsed * 0.65) * 0.005);
    rock2.scene.children[0].rotateOnAxis(new Vector3(1, 0, 0), Math.sin(elapsed * 1.0) * 0.002);
    rock2.scene.children[0].rotateOnAxis(new Vector3(0, 1, 0), delta * 0.08);

    rock3.scene.children[0].translateY(Math.sin(elapsed * 0.50) * 0.003);
    rock3.scene.children[0].rotateOnAxis(new Vector3(1, 0, 0), Math.sin(elapsed * 0.35) * 0.001);
    rock3.scene.children[0].rotateOnAxis(new Vector3(0, 1, 0), delta * 0.1);
  });
  
  return (
    <Suspense fallback={null}>
      <primitive object={rock1.scene} />
      <primitive object={rock2.scene} />
      <primitive object={rock3.scene} />
    </Suspense>
  )
}