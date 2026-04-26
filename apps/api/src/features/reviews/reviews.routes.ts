import { Router } from "express";

import { getReviewsByStayId, postReview } from "./reviews.controller.js";

export const reviewsRouter = Router({ mergeParams: true });

reviewsRouter.get("/", getReviewsByStayId);
reviewsRouter.post("/", postReview);
