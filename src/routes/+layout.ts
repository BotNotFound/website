// Every route is static content, so the whole site is prerendered to plain HTML
// at build time. adapter-static runs with `strict: true`, which fails the build
// if any route is left dynamic -- that is deliberate, it catches an accidentally
// server-dependent page rather than silently shipping a broken one.
export const prerender = true;
