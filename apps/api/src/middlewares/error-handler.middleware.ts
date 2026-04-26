import type { ErrorRequestHandler } from "express";

import { HttpError } from "../shared/utils/http-error.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      error: {
        message: error.message,
        ...(error.details ? { details: error.details } : {})
      }
    });

    return;
  }

  const message = error instanceof Error ? error.message : "Internal server error";

  response.status(500).json({
    error: {
      message
    }
  });
};
