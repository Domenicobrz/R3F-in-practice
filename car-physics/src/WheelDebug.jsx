const debug = false;

export const WheelDebug = ({ leftSide, radius, wheelRef }) => {
  return debug && (
    <group ref={wheelRef}>
      <group rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
        <mesh>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
};
