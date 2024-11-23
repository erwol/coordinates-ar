import {
  useXRAnchor,
  useXRInputSourceEvent,
  useXRInputSourceState,
  XRSpace,
} from "@react-three/xr";

export function Anchor() {
  const [anchor, requestAnchor] = useXRAnchor();
  const controllerState = useXRInputSourceState("controller", "right");
  const handState = useXRInputSourceState("hand", "right");
  const inputSource = controllerState?.inputSource ?? handState?.inputSource;
  useXRInputSourceEvent(
    inputSource,
    "select",
    async () => {
      if (inputSource == null) {
        return;
      }
      requestAnchor({ relativeTo: "space", space: inputSource.targetRaySpace });
    },
    [requestAnchor, inputSource],
  );
  if (anchor == null) {
    return null;
  }
  return (
    <XRSpace space={anchor.anchorSpace}>
      <mesh scale={0.1}>
        <boxGeometry />
      </mesh>
    </XRSpace>
  );
}
