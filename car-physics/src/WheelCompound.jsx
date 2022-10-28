import { useCompoundBody } from "@react-three/cannon";
import { forwardRef } from "react";

const debug = false;

export const WheelCompound = forwardRef(({ radius, leftSide }, ref) => {
  useCompoundBody(
    () => ({
      collisionFilterGroup: 0,
      mass: 1,
      shapes: [{
        args: [radius, radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      }],
      type: "Kinematic",
    }),
    ref
  );

  return debug && (
    <group ref={ref}>
      <group rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
        <mesh>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
});
