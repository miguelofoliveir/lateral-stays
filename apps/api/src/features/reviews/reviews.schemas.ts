import { z } from "zod";

export const createReviewSchema = z.object({
  author: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(800)
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;
