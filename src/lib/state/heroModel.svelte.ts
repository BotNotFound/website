// Shared between HeroRobotModel (sets `ready` once the GLTF has loaded) and
// LoadingScreen (reads it to keep the splash up until the model is visible).
export const heroModel = $state({ ready: false });
