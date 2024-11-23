import { useRef } from "react";
import * as THREE from "three";

export const TexturedPlane = () => {
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
    // <mesh position={[0, 1, -3]} pointerEventsType={{ deny: "grab" }}>
    //   {/* <boxGeometry args={[1, 2, 0.2]} /> */}
    //   <planeGeometry args={[1, 2, 0.2]} />

    //   {/* Material using the generated texture */}
    //   <meshBasicMaterial map={textureRef.current} side={THREE.DoubleSide} />
    // </mesh>
    <mesh position={[0, 1, -3]}>
      {/* A simple plane geometry */}
      <planeGeometry args={[5, 5]} />
      {/* Material using the generated texture */}
      <meshBasicMaterial map={textureRef.current} />
    </mesh>
  );
};
