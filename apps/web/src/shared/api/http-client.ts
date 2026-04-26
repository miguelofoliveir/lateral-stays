import { env } from "../config/env";

export class HttpClientError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "HttpClientError";
  }
}

export const getJson = async <TResponse>(path: string): Promise<TResponse> => {
  const response = await fetch(`${env.API_URL}${path}`, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new HttpClientError("Request failed", response.status);
  }

  return response.json() as Promise<TResponse>;
};
