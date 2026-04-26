import { z } from "zod";

export const reviewSchema = z.object({
  author: z.string().trim().min(2, "Enter your name.").max(80, "Name is too long."),
  rating: z.coerce.number().int().min(1, "Choose a rating.").max(5, "Rating cannot exceed 5."),
  comment: z
    .string()
    .trim()
    .min(10, "Share a little more detail.")
    .max(800, "Review is too long.")
});

export type ReviewFormInput = z.input<typeof reviewSchema>;
export type ReviewFormValues = z.output<typeof reviewSchema>;
