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

export interface ApiResponse<TData> {
  data: TData;
}

const parseJson = async <TResponse>(response: Response): Promise<TResponse> =>
  response.json() as Promise<TResponse>;

export const getJson = async <TResponse>(path: string): Promise<TResponse> => {
  const response = await fetch(`${env.API_URL}${path}`, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new HttpClientError("Request failed", response.status);
  }

  return parseJson<TResponse>(response);
};

export const postJson = async <TResponse, TBody>(path: string, body: TBody): Promise<TResponse> => {
  const response = await fetch(`${env.API_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new HttpClientError("Request failed", response.status);
  }

  return parseJson<TResponse>(response);
};
