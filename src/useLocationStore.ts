import { create } from "zustand";

type PermissionState =
  | "notRequested"
  | "requested"
  | "error"
  | "denied"
  | "accepted";

interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface LocationStore {
  permissionState: PermissionState;
  watchId: number | null;
  location: Location | null;
  error: string | null;
  requestPermissionAndTrack: () => void;
  stopTracking: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  permissionState: "notRequested",
  watchId: null,
  location: null,
  error: null,
  requestPermissionAndTrack: () => {
    if (!navigator.geolocation) {
      set({
        permissionState: "error",
        error: "Su navegador no soporta geolocalización.",
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        set({
          permissionState: "accepted",
          watchId,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          },
          error: null,
        });
      },
      (error) => {
        let permissionState: PermissionState = "error";
        if (error.code === error.PERMISSION_DENIED) permissionState = "denied";

        set({
          permissionState,
          error: error.message,
          watchId: null,
          location: null,
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );

    set({ watchId });
  },

  // Stop tracking and clear watch ID
  stopTracking: () => {
    const { watchId } = useLocationStore.getState();
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
    set({
      watchId: null,
      permissionState: "requested", // Reset to initial state
      location: null,
      error: null,
    });
  },
}));
