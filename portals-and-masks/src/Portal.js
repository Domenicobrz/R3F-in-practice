import { Mask } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo } from "react";
import {
  Scene,
  WebGLRenderTarget,
  TextureLoader,
  EquirectangularReflectionMapping,
  AlwaysStencilFunc,
  ReplaceStencilOp,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FillQuad } from "./FillQuad";

const scene = new Scene();
scene.background = new TextureLoader().load(
  process.env.PUBLIC_URL + "textures/satara_night.jpg",
  (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
  }
);

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  stencilBuffer: false,
});

window.addEventListener("resize", () => {
  target.setSize(window.innerWidth, window.innerHeight);
});

export function Portal() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/portal.glb"
  );

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  useEffect(() => {
    if (!gltf) return;

    let mesh = gltf.scene.children[0];
    mesh.material.envMapIntensity = 3.5;
  }, [gltf]);

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />

      <mesh>
        <planeGeometry args={[20, 20]}/>
        <meshBasicMaterial 
          color={"red"} 
          stencilFunc={AlwaysStencilFunc} 
          stencilWrite={true} 
          stencilRef={1} 
          stencilZPass={ReplaceStencilOp} 
        />
      </mesh>

      <FillQuad map={target.texture} maskId={1} />
    </Suspense>
  );
}
