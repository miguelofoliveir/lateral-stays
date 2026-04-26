import type { RequestHandler } from "express";

import { validate } from "../../shared/utils/validate.js";
import { createReviewSchema } from "./reviews.schemas.js";
import { createReview, listReviewsByStayId } from "./reviews.service.js";

interface StayParams {
  stayId: string;
}

export const getReviewsByStayId: RequestHandler<StayParams> = (request, response) => {
  const reviews = listReviewsByStayId(request.params.stayId);

  if (!reviews) {
    response.status(404).json({
      error: {
        message: "Stay not found."
      }
    });

    return;
  }

  response.status(200).json({
    data: reviews
  });
};

export const postReview: RequestHandler<StayParams> = (request, response) => {
  const input = validate(createReviewSchema, request.body);
  const review = createReview(request.params.stayId, input);

  if (!review) {
    response.status(404).json({
      error: {
        message: "Stay not found."
      }
    });

    return;
  }

  response.status(201).json({
    data: review
  });
};
