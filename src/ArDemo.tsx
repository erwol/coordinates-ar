import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState } from "react";
import { Box } from "@react-three/drei";

const store = createXRStore();

export function ARDemo() {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter test 2</button>
      <Canvas>
        <XR store={store}>
          {/* 3D objects placed around the user */}
          <Box position={[-1, 1, -3]} args={[1, 1, 1]}>
            <meshStandardMaterial color="red" />
          </Box>

          <Box position={[1, 1, -3]} args={[1, 1, 1]}>
            <meshStandardMaterial color="blue" />
          </Box>

          {/* Add a camera and lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </XR>
      </Canvas>
    </>
  );
}

export function ARTDemo() {
  const [red, setRed] = useState(false);
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          <mesh
            pointerEventsType={{ deny: "grab" }}
            onClick={() => setRed(!red)}
            position={[0, 1, -1]}
          >
            <boxGeometry />
            <meshBasicMaterial color={red ? "red" : "blue"} />
          </mesh>
        </XR>
      </Canvas>
    </>
  );
}
