import "dotenv/config";

export interface Env {
  PORT: number;
  CORS_ORIGIN: string;
}

const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? "4000");

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer.");
  }

  return port;
};

export const env: Env = Object.freeze({
  PORT: parsePort(process.env.PORT),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173"
});
