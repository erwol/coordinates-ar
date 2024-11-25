import { Box, RenderTexture, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";

const store = createXRStore({
  //controller: false,
  hitTest: true,
  depthSensing: true,
});

const CubeWithText = () => {
  return (
    <Box position={[0, 1, -3]} args={[1, 2, 0.2]}>
      <meshBasicMaterial color={"black"}>
        <RenderTexture attach="map">
          <Text color={"white"}>hello</Text>
        </RenderTexture>
      </meshBasicMaterial>
      {/* <meshStandardMaterial color="white" />
      <Text
        position={[0, 0, 1.1]} // Positioning the text on the front face
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Hello!
      </Text> */}
    </Box>
  );
};

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

export function ARApp() {
  // const [red, setRed] = useState(false);
  // const [bool, setBool] = useState(false);

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          {/* <mesh
            pointerEventsType={{ deny: "grab" }}
            onClick={() => setRed(!red)}
            position={[0, 1, -3]}
          >
            <boxGeometry args={[1, 2, 0.2]} />
            <meshBasicMaterial color={"black"} />
          </mesh> */}
          <CubeWithText />
        </XR>
      </Canvas>
    </>
  );
}
