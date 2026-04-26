import type { ErrorRequestHandler } from "express";

interface ErrorResponse {
  message: string;
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const message = error instanceof Error ? error.message : "Internal server error";

  response.status(500).json({
    message
  } satisfies ErrorResponse);
};
