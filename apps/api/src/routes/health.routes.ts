import { Router, type Request, type Response } from "express";

interface HealthResponse {
  status: "ok";
  service: "api";
}

export const healthRouter = Router();

healthRouter.get("/", (_request: Request, response: Response<HealthResponse>) => {
  response.status(200).json({
    status: "ok",
    service: "api"
  });
});
