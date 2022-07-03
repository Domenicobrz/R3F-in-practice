import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { FloatingIsland } from "./FloatingIsland";
import { FloatingRocks } from "./FloatingRocks";
import { Grass } from "./Grass";
import { Portal } from "./Portal";
import { Rocks } from "./Rocks";
import { Trees } from "./Trees";

export function SceneContainer() {
  return (
    <Suspense fallback={null}>

      <PerspectiveCamera makeDefault fov={50} position={[0, 10, 21]} />
      <pointLight color={[1, 1, 1]} intensity={2} position={[-60, 40, 0]} />
      <OrbitControls target={[0, 5, 0]}/>

      <FloatingIsland />
      <Portal />
      <Trees />
      <Rocks />
      <FloatingRocks />
      <Grass />

    </Suspense>
  );
}