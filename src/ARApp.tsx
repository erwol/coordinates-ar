import { Canvas, useLoader } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { TextureLoader } from "three";
import * as THREE from "three";
import { RedWalls } from "./RedWalls";
import { useEffect, useState } from "react";
import { AR_ITEMS } from "./constants";

const store = createXRStore({
  //controller: false,
  hitTest: true,
  depthSensing: true,
});

// function BoxWithTextOnOneFace() {
//   return (
//     <mesh>
//       {/* Box geometry */}
//       <boxGeometry args={[2, 2, 2]} />
//       {/* Array of materials, one for each face */}
//       <meshBasicMaterial attach="material-0" color="blue" /> {/* Front */}
//       <meshBasicMaterial attach="material-1" color="red" /> {/* Back */}
//       <meshBasicMaterial attach="material-2" color="green" /> {/* Top */}
//       <meshBasicMaterial attach="material-3" color="yellow" /> {/* Bottom */}
//       <meshBasicMaterial attach="material-4" color="white">
//         {" "}
//         {/* Right */}
//         <RenderTexture attach="map">
//           <Text
//             fontSize={1} // Size of the text
//             color="white" // Text color
//             anchorX="center" // Center horizontally
//             anchorY="middle" // Center vertically
//           >
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Text>
//         </RenderTexture>
//       </meshBasicMaterial>
//       <meshBasicMaterial attach="material-5" color="purple" /> {/* Left */}
//     </mesh>
//   );
// }

// const CubeWithText = () => {
//   return (
//     <mesh>
//       {/* <boxGeometry args={[1, 2, 0.2]} /> */}
//       <boxGeometry args={[1, 2, 0.2]} />

//       <meshBasicMaterial>
//         <RenderTexture attach="map" frames={1}>
//           <Text
//             fontSize={1} // Size of the text
//             color="white" // Text color
//             anchorX="center" // Align text horizontally
//             anchorY="middle" // Align text vertically
//           >
//             hello
//           </Text>
//         </RenderTexture>
//       </meshBasicMaterial>
//       {/* <Text
//         position={[0, 0, 1.1]} // Positioning the text on the front face
//         fontSize={0.5}
//         color="black"
//         anchorX="center"
//         anchorY="middle"
//       >
//         Hello!
//       </Text> */}
//     </mesh>
//   );
// };

// const AnchoredCube = () => {
//   const [anchor, setAnchor] = useState(null);
//   const requestAnchor = useRequestXRAnchor();

//   useEffect(() => {
//     requestAnchor({}).then((newAnchor) => {
//       setAnchor(newAnchor);
//     });
//   }, [requestAnchor]);

//   return anchor ? (
//     <Box position={[0, 1, -3]} args={[1, 1, 1]}>
//       <meshStandardMaterial color="blue" />
//     </Box>
//   ) : null;
// };

// const FixedCube = () => {
//   return (
//     <Box position={[0, 1, -3]} args={[1, 1, 1]}>
//       <meshStandardMaterial color="blue" />
//     </Box>
//   );
// };

function ImagePlane({ url }: { url: string }) {
  // Load the PNG texture
  const texture = useLoader(TextureLoader, url);

  const aspect = texture.image.width / texture.image.height;

  return (
    <mesh position={[0, 1, -3]}>
      {/* Plane geometry to display the texture */}
      <planeGeometry args={[aspect * 2, 2]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function ARApp() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const item = AR_ITEMS.find((item) => item.name === params.get("space"));
    setSrc(item?.src || AR_ITEMS[0].src);
  }, []);

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>

      <Canvas>
        <XR store={store}>
          <ImagePlane url={src} />
          <RedWalls />
        </XR>
      </Canvas>
    </>
  );
}

// function ScreenshotButton() {
//   const { gl, scene, camera } = useThree();

//   const takeScreenshot = () => {
//     // Render the current scene to a data URL
//     gl.render(scene, camera);
//     const screenshotURL = gl.domElement.toDataURL("image/png");

//     // Create a link to download the image
//     const link = document.createElement("a");
//     link.href = screenshotURL;
//     link.download = "debería desaparecer.png";
//     link.click();
//   };

//   return (
//     <XRDomOverlay>
//       <div
//         style={{
//           position: "absolute",
//           bottom: "100px",
//           left: "50%",
//           transform: "translateX(-50%)",
//         }}
//       >
//         <button
//           onClick={takeScreenshot}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "lightblue",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Take Screenshot
//         </button>
//       </div>
//     </XRDomOverlay>
//   );
// }
