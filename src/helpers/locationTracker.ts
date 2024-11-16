function requestPermissionAndTrackLocation() {
  navigator.permissions
    .query({ name: "geolocation" }) // Check geolocation permission status
    .then((result) => {
      if (result.state === "granted") {
        // Permission already granted
        startTracking();
      } else if (result.state === "prompt") {
        // Permission not decided yet, will prompt on watchPosition
        startTracking();
      } else if (result.state === "denied") {
        // Permission denied
        console.error("Geolocation access has been denied.");
        alert("Please enable location access in your browser settings.");
      }
    })
    .catch((error) => {
      console.error("Error checking geolocation permission:", error);
    });
}

function startTracking() {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    (error) => {
      console.error("Error tracking location:", error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
    },
  );

  // Stop tracking (optional)
  // navigator.geolocation.clearWatch(watchId);
}

// Call the function to start the process
requestPermissionAndTrackLocation();
