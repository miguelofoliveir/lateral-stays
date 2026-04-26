import { Router } from "express";

import { getStayById, getStays } from "./stays.controller.js";

export const staysRouter = Router();

staysRouter.get("/", getStays);
staysRouter.get("/:id", getStayById);
