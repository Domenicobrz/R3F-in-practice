import { useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function FloatingRocks() {
  const rock1 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_1.glb");
  const rock2 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_2.glb");
  const rock3 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_3.glb");
  
  return (
    <>
      <Float
        speed={1.5} 
        rotationIntensity={1.6} 
        floatIntensity={0}
        position={[-20.5, -7, -19]}
      >
        <primitive object={rock2.scene} />
      </Float>


      <Float
        speed={1.5} 
        rotationIntensity={1.6} 
        floatIntensity={0}
        position={[-5, 10, -33]}
      >
        <primitive object={rock1.scene} />
      </Float>
  
  
      <Float
        speed={1.5} 
        rotationIntensity={1.1} 
        floatIntensity={0}
        position={[20, 3.5, -9]}
      >
        <primitive object={rock3.scene} />
      </Float>
    </>
  )
}