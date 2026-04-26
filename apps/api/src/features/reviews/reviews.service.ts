import { findStayById, updateStayReviewStats } from "../stays/stays.service.js";
import { reviews } from "./reviews.mock.js";
import type { CreateReviewInput, Review } from "./reviews.types.js";

export const listReviewsByStayId = (stayId: string): Review[] | undefined => {
  const stay = findStayById(stayId);

  if (!stay) {
    return undefined;
  }

  return reviews.filter((review) => review.stayId === stayId);
};

export const createReview = (stayId: string, input: CreateReviewInput): Review | undefined => {
  const stay = updateStayReviewStats(stayId, input.rating);

  if (!stay) {
    return undefined;
  }

  const review: Review = {
    id: `review-${crypto.randomUUID()}`,
    stayId,
    author: input.author,
    rating: input.rating,
    comment: input.comment,
    createdAt: new Date().toISOString()
  };

  reviews.push(review);

  return review;
};
