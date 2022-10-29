import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

createRoot(document.getElementById("root")).render(
  <Canvas>
    <Scene />
  </Canvas>
);
