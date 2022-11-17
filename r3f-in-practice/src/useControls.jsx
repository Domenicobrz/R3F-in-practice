import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({
    // w: boolean,   
    // a: boolean,   
    // s: boolean,   
    // d: boolean,   

    // r: boolean,   
  });

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ 
        ...controls, 
        [e.key.toLowerCase()]: true 
      }));
    }

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({ 
        ...controls, 
        [e.key.toLowerCase()]: false 
      }));
    }
  
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    }
  }, []);

  useEffect(() => {
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}