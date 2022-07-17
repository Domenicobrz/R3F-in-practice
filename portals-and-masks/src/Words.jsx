import { Float, Text3D } from "@react-three/drei";

export function Words() {
  return (
    <>
      <Float position={[3.75, 5.65, 0.75]} rotation={[0, -0.2, -0.05]} rotationIntensity={0.35} floatIntensity={0.5}>
        <Text3D
          font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
          size={0.275}
          height={0.065}
          curveSegments={12}
        >
          CZ1657
          <meshStandardMaterial color={[1, 0.15, 0.1]} emissive={[1, 0.1, 0]} />
        </Text3D>
      </Float>

      <Float position={[3.5, 6, 0]} rotation={[0, -0.35, -0.05]} rotationIntensity={0.35} floatIntensity={0.5}>
        <Text3D
          font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
          size={0.575}
          height={0.065}
          curveSegments={12}
        >
          Portal
          <meshStandardMaterial color={[1, 0.15, 0.1]} emissive={[1, 0.1, 0]} />
        </Text3D>
      </Float>
    </>
  );
}
