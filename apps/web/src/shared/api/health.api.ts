import { getJson } from "./http-client";

export interface HealthResponse {
  status: "ok";
  service: "api";
}

export const getHealth = (): Promise<HealthResponse> => getJson<HealthResponse>("/health");
