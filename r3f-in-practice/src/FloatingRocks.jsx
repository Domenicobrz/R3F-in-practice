import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function FloatingRocks() {
  const rock1 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_1.glb");
  const rock2 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_2.glb");
  const rock3 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_3.glb");
  
  return (
    <>
      <primitive object={rock2.scene} position={[-20.5, -7, -19]} />
      <primitive object={rock1.scene} position={[-5, 10, -33]} />
      <primitive object={rock3.scene} position={[20, 3.5, -9]} />
    </>
  )
}