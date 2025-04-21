import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { AR_ITEMS } from "./constants";
import logo from "./logo.svg";
import { GeoARItem } from "./types";
import { createXRStore, XR } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import { isIOS } from "./isiOS";

const store = createXRStore({
  hitTest: true,
  depthSensing: true,
});

const CUBE_BACKGROUND_COLOR = "#323234";

const Loader = ({ onClick }: { onClick: () => void }) => (
  <div
    style={{
      position: "fixed",
      background: "#242424",
      top: "0",
      right: "0",
      left: "0",
      bottom: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "2",
      flexDirection: "column",
      gap: "18px",
    }}
  >
    <img
      src={logo}
      alt="Logo Debería Desaparecer"
      style={{ marginBottom: "50px" }}
    />
    <button onClick={onClick}>Accede a la experiencia</button>
    <small>*Disponible en Chrome para Android</small>
  </div>
);

const ImagePlane = ({ src, audioSrc }: { src: string; audioSrc?: string }) => {
  const { camera } = useThree();

  const texture = useLoader(TextureLoader, src);
  const aspect = texture.image.width / texture.image.height;

  const listener = useRef<THREE.AudioListener>(new THREE.AudioListener());
  const soundRef = useRef(new THREE.PositionalAudio(listener.current));
  const audioBuffer = useLoader(THREE.AudioLoader, audioSrc || "");

  useEffect(() => {
    camera.add(listener.current);
  }, [camera]);

  useEffect(() => {
    if (soundRef.current && audioBuffer) {
      soundRef.current.setBuffer(audioBuffer);
      soundRef.current.setLoop(false);
      soundRef.current.setVolume(1);
    }
  }, [audioBuffer]);

  const handleClick = useCallback(() => {
    if (!audioSrc) {
      return;
    }
    if (soundRef.current.isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  }, [audioSrc]);

  return (
    <mesh position={[0, 1, -3]} onClick={handleClick}>
      <boxGeometry args={[aspect * 2, 2]} />
      {[0, 1, 4, 5].map((i) => (
        <meshBasicMaterial key={i} attach={`material-${i}`} map={texture} />
      ))}
      {/* top */}
      <meshBasicMaterial
        attach="material-2"
        args={[{ color: CUBE_BACKGROUND_COLOR }]}
      />
      {/* bottom */}
      <meshBasicMaterial
        attach="material-3"
        args={[{ color: CUBE_BACKGROUND_COLOR }]}
      />
      <positionalAudio ref={soundRef} args={[listener.current]} />
    </mesh>
  );
};

const ENABLE_AR = true;
const ENABLE_DEBUG_SOL = true;
export function ARApp() {
  const [item, setItem] = useState<GeoARItem>();
  const [loaded, setLoaded] = useState(ENABLE_AR ? false : true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isIOS()) {
      alert("loading ios");
      const script = document.createElement("script");
      script.src =
        "https://launchar.app/sdk/v1?key=ZaOqCxoW8k0HFVLfttdd5rzwo8yCp7LP&redirect=true";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const spaceName = ENABLE_DEBUG_SOL ? "sol" : params.get("space");
    const item = AR_ITEMS.find((item) => item.name === spaceName);
    setItem(item || AR_ITEMS[0]);
  }, []);

  const handleEnterAR = useCallback(() => {
    try {
      store.enterAR();
      setLoaded(true);
    } catch (error) {
      console.error("Error entering AR:", error);
      setError("Error entering AR");
      alert("error entering AR");
      setLoaded(false);
    }
  }, []);

  if (!ENABLE_AR) {
    return (
      <>
        {!loaded && <Loader onClick={handleEnterAR} />}
        <Canvas>
          <OrbitControls />
          {item && loaded && (
            <ImagePlane src={item.src} audioSrc={item.audio} />
          )}
        </Canvas>
      </>
    );
  }
  return (
    <>
      {!loaded && <Loader onClick={handleEnterAR} />}
      <Canvas>
        <XR store={store}>
          {item && loaded && (
            <ImagePlane src={item.src} audioSrc={item.audio} />
          )}
        </XR>
      </Canvas>
    </>
  );
}
