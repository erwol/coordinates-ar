import { useEffect, useState } from "react";
import "./App.css";
import { useLocationStore } from "./useLocationStore";

function App() {
  const { requestPermissionAndTrack, permissionState, watchId, location } =
    useLocationStore();

  useEffect(() => {
    if (permissionState === "notRequested") {
      if (confirm("¿Quieres compartir tu ubicación?")) {
        requestPermissionAndTrack();
      }
    }
  }, [permissionState]);

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
      <ul style={{ textAlign: "left" }}>
        <li>Permission state: {permissionState}</li>
        <li>
          Current coordinates:
          <ul>
            <li>Longitude: {location?.longitude}</li>
            <li>Latitude: {location?.latitude}</li>
            <li>Timestamp: {location?.timestamp}</li>
            <li>Watch id: {watchId}</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
