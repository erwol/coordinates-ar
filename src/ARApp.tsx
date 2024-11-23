import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useRef } from "react";
import * as THREE from "three";

const store = createXRStore();

const TexturedPlane = () => {
  const textureRef = useRef<THREE.CanvasTexture>();

  // Create a canvas and draw text on it
  const createTextTexture = () => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = 512;
    canvas.height = 512;

    // Draw background
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.fillStyle = "white";
    context.font = "48px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      "Hello, React Three Fiber!",
      canvas.width / 2,
      canvas.height / 2,
    );

    return new THREE.CanvasTexture(canvas);
  };

  // Assign the texture to a ref
  if (!textureRef.current) {
    textureRef.current = createTextTexture();
  }

  return (
    <mesh>
      {/* A simple plane geometry */}
      <planeGeometry args={[5, 5]} />
      {/* Material using the generated texture */}
      <meshBasicMaterial map={textureRef.current} />
    </mesh>
  );
};

export function ARApp() {
  //const [red, setRed] = useState(false);
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          {/* <mesh
            pointerEventsType={{ deny: "grab" }}
            onClick={() => setRed(!red)}
            position={[0, 1, -1]}
          >
            <boxGeometry />
            <meshBasicMaterial color={red ? "red" : "blue"} />
          </mesh> */}
          <TexturedPlane />
        </XR>
      </Canvas>
    </>
  );
}
