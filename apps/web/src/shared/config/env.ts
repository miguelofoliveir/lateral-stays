interface WebEnv {
  API_URL: string;
}

const trimTrailingSlash = (value: string): string => value.replace(/\/$/, "");

export const env: WebEnv = Object.freeze({
  API_URL: trimTrailingSlash(import.meta.env.VITE_API_URL ?? "http://localhost:4000")
});
