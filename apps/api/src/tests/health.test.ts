import request from "supertest";

import { app } from "../app.js";

describe("GET /health", () => {
  it("returns the API health status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body).toEqual({
      status: "ok",
      service: "api"
    });
  });
});
