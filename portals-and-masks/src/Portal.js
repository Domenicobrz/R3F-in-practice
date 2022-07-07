import { useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useMemo } from 'react';
import { Color, Scene, WebGLRenderTarget, DoubleSide, RGBFormat, TextureLoader, Mesh, SphereGeometry, MeshBasicMaterial, EquirectangularReflectionMapping } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new Scene();
scene.background = new TextureLoader().load(process.env.PUBLIC_URL + "textures/satara_night.jpg", (texture) => {


  // the reason why the mapping looks wrong is because we're trying to 
  // display what should normally be on a full screen quad, in a 3d plane that can be 
  // seen from different angles. to properly fix this we need to start using the masks from R3F


  texture.mapping = EquirectangularReflectionMapping;
});

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  stencilBuffer: false
});

window.addEventListener("resize", () => {
  target.setSize(window.innerWidth, window.innerHeight);
});

export function Portal() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/portal.glb");

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  useEffect(() => {
    if(!gltf) return;

    let mesh = gltf.scene.children[0];
    mesh.material.envMapIntensity = 3.5;
  }, [gltf]);


  return (
    <Suspense fallback={null}>

      <primitive object={gltf.scene} />

      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial side={DoubleSide} map={target.texture} />
      </mesh>
    </Suspense>
  )
}