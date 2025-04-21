export const isIOS = (): boolean => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Classic iOS devices
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;

  // iPadOS 13+ workaround: identifies as Mac, but supports touch
  const isIPadOS = ua.includes("Macintosh") && "ontouchend" in document;

  return iOSDevice || isIPadOS;
};
