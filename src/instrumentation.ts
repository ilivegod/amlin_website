export async function register() {
  if (typeof window === "undefined") {
    const storage = globalThis.localStorage as Storage | undefined;

    // Node 22+ can expose a broken global localStorage during SSR.
    if (storage && typeof storage.getItem !== "function") {
      Reflect.deleteProperty(globalThis, "localStorage");
    }
  }
}
