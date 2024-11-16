import { useCallback, useEffect } from "react";
import "./App.css";
import { PermissionState, useLocationStore } from "./useLocationStore";
import { useObjectStore } from "./useObjectsStore";
import { distanceBetweenCoordinates } from "./helpers/distanceBetweenCoordinates";
import { ARDemo } from "./ArDemo";

function App() {
  const {
    requestPermissionAndTrack,
    stopTracking,
    permissionState,
    watchId,
    location,
  } = useLocationStore();
  const { generateObjects, objects } = useObjectStore();

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

  useEffect(() => {
    if (location && objects.length === 0) {
      generateObjects(location);
    }
  }, [location, objects, generateObjects]);

  return (
    <div className="App">
      <h1>Coordinates AR demo</h1>
      <ARDemo />
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
        {permissionState === PermissionState.Accepted &&
          location &&
          objects.length > 0 && (
            <li>
              Objects around you:
              <ul>
                {objects.map((object) => (
                  <li key={object.id}>
                    Name: {object.name}
                    <ul>
                      <li>Longitude: {object.coordinate.longitude}</li>
                      <li>Latitude: {object.coordinate.latitude}</li>
                      <li>
                        Distance:{" "}
                        {distanceBetweenCoordinates(
                          {
                            latitude: location.latitude,
                            longitude: location.longitude,
                          },
                          {
                            latitude: object.coordinate.latitude,
                            longitude: object.coordinate.longitude,
                          },
                        ).toFixed(2)}
                        {" meters"}
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          )}
      </ul>
    </div>
  );
}

export default App;
