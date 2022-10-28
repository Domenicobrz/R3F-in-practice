import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "./useControls";
import { WheelCompound } from "./WheelCompound";

export function Car({ firstPerson }) {
  // thanks to the_86_guy!
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car.glb"
  ).scene;

  const position = [-1.5, 0.5, 3];
  const radius = 0.05;
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;

  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)]

  const wheelInfo = {
    radius: radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence:  0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true
  }

  const wheelInfo1 = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
    isFrontWheel: true,
  }
  const wheelInfo2 = {
    ...wheelInfo,
    chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
    isFrontWheel: true,
  }
  const wheelInfo3 = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
    isFrontWheel: false,
  }
  const wheelInfo4 = {
    ...wheelInfo,
    chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
    isFrontWheel: false,
  }

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null),
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels,
    }),
    useRef(null),
  );

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    if(!firstPerson) return;

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0,0,1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));
    
    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    if (!result) return;

    let mesh = result;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0].position.set(-365, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive object={result} rotation-y={Math.PI} position={[0, -0.09, 0]}/>
      </group>
      
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

      <WheelCompound ref={wheels[0]} radius={radius} leftSide />
      <WheelCompound ref={wheels[1]} radius={radius} />
      <WheelCompound ref={wheels[2]} radius={radius} leftSide />
      <WheelCompound ref={wheels[3]} radius={radius} />
    </group>
  );
}
