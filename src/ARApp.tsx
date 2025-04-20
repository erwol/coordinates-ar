import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { AR_ITEMS } from "./constants";
import logo from "./logo.svg";
import { GeoARItem } from "./types";
import { createXRStore, XR } from "@react-three/xr";

const store = createXRStore({
  hitTest: true,
  depthSensing: true,
});

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
  const texture = useLoader(TextureLoader, src);
  const aspect = texture.image.width / texture.image.height;

  const listener = useRef<THREE.AudioListener>(new THREE.AudioListener());
  const [sound] = useState(() => new THREE.Audio(listener.current));
  const audioBuffer = useLoader(THREE.AudioLoader, src);

  useEffect(() => {
    if (!audioSrc) {
      return;
    }
    sound.setBuffer(audioBuffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
  }, [audioBuffer, sound, audioSrc]);

  const handleClick = useCallback(() => {
    if (!audioSrc) {
      return;
    }
    if (sound.isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  }, [sound, audioSrc]);

  return (
    <mesh position={[0, 1, -3]} onClick={handleClick}>
      <planeGeometry args={[aspect * 2, 2]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export function ARApp() {
  const [item, setItem] = useState<GeoARItem>();
  const [loaded, setLoaded] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    const item = AR_ITEMS.find((item) => item.name === "sol");
    setItem(item || AR_ITEMS[0]);
  }, []);

  const handleEnterAR = useCallback(() => {
    try {
      store.enterAR();
      setLoaded(true);
    } catch (error) {
      console.error("Error entering AR:", error);
      setError("Error entering AR");
    }
  }, []);

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
