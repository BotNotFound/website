// Shared between HeroRobotModel (sets `ready` once the GLTF has loaded) and
// LoadingScreen (reads it to keep the splash up until the model is visible).
// `progress` is 0-1 and covers the model download only; `ready` flips after
// the first frame is presented. Draco decode sits between the two, which is
// why the download is capped below 1 rather than running to the end.
export const heroModel = $state({ ready: false, progress: 0 });
