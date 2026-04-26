import cors from "cors";
import express, { type Express } from "express";

import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { healthRouter } from "./routes/health.routes.js";

export const createApp = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN
    })
  );
  app.use(express.json());

  app.use("/health", healthRouter);

  app.use(errorHandler);

  return app;
};

export const app = createApp();
