// Based on how Remix recommends handling environment variables
// https://remix.run/docs/en/main/guides/envvars

// None of these are secrets, but all of them are required
// Throughout the app server and client side
declare global {
  interface Window {
    ENV: {
      VITE_SANITY_PROJECT_ID: string;
      VITE_SANITY_DATASET: string;
      VITE_SANITY_API_VERSION: string;
    };
  }
}

// Support both build-time (Node.js) and runtime (browser) environments
const projectId =
  (typeof process !== "undefined" && process.env?.VITE_SANITY_PROJECT_ID) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_SANITY_PROJECT_ID) ||
  "your-project-id";

const dataset =
  (typeof process !== "undefined" && process.env?.VITE_SANITY_DATASET) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_SANITY_DATASET) ||
  "production";

const apiVersion =
  (typeof process !== "undefined" && process.env?.VITE_SANITY_API_VERSION) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_SANITY_API_VERSION) ||
  "2024-02-13";

export { apiVersion, dataset, projectId };

export const projectDetails = () => ({
  projectId,
  dataset,
  apiVersion,
});

// If any of these values are missing, throw errors as the app requires them
// Only throw errors at runtime, not during build/extraction
if (typeof window !== "undefined") {
  if (!projectId || projectId === "your-project-id") {
    throw new Error(
      `Missing VITE_SANITY_PROJECT_ID in .env, run npx sanity@latest init --env`,
    );
  }
  if (!dataset) {
    throw new Error(
      `Missing VITE_SANITY_DATASET in .env, run npx sanity@latest init --env`,
    );
  }
  if (!apiVersion) {
    throw new Error(
      `Missing VITE_SANITY_API_VERSION in .env, run npx sanity@latest init --env`,
    );
  }
}
