import { create } from "zustand";

export enum PermissionState {
  Waiting = "waiting",
  Requested = "requested",
  Error = "error",
  Denied = "denied",
  Accepted = "accepted",
}

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
  permissionState: PermissionState.Waiting,
  watchId: null,
  location: null,
  error: null,
  requestPermissionAndTrack: () => {
    if (!navigator.geolocation) {
      set({
        permissionState: PermissionState.Error,
        error: "Su navegador no soporta geolocalización.",
      });
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        set({
          permissionState: PermissionState.Accepted,
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
        let permissionState = PermissionState.Error;
        if (error.code === error.PERMISSION_DENIED)
          permissionState = PermissionState.Denied;

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
      permissionState: PermissionState.Waiting,
      location: null,
      error: null,
    });
  },
}));
