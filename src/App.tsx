import { useCallback, useEffect } from "react";
import "./App.css";
import { PermissionState, useLocationStore } from "./useLocationStore";

function App() {
  const {
    requestPermissionAndTrack,
    stopTracking,
    permissionState,
    watchId,
    location,
  } = useLocationStore();

  const handleStartDemo = useCallback(() => {
    requestPermissionAndTrack();
  }, [requestPermissionAndTrack]);

  const handleStopDemo = useCallback(() => {
    stopTracking();
  }, [stopTracking]);

  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div className="App">
      <h1>Coordinates AR demo</h1>
      {permissionState === PermissionState.Waiting && (
        <button onClick={handleStartDemo}>Start demo</button>
      )}
      {permissionState === PermissionState.Accepted && (
        <button onClick={handleStopDemo}>Stop demo</button>
      )}
      <ul style={{ textAlign: "left" }}>
        <li>
          Permission state:
          <b
            style={{ color: permissionState === "accepted" ? "green" : "red" }}
          >
            {` ${permissionState}`}
          </b>
        </li>
        {permissionState === PermissionState.Accepted && (
          <li>
            Current coordinates:
            <ul>
              <li>Longitude: {location?.longitude}</li>
              <li>Latitude: {location?.latitude}</li>
              <li>Timestamp: {location?.timestamp}</li>
              <li>Watch id: {watchId}</li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
