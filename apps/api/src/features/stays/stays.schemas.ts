import { z } from "zod";

export const staySearchSchema = z
  .object({
    query: z.string().trim().min(1).optional(),
    minPrice: z.coerce.number().int().nonnegative().optional(),
    maxPrice: z.coerce.number().int().nonnegative().optional(),
    guests: z.coerce.number().int().positive().optional(),
    sort: z.enum(["price_asc", "price_desc", "rating_desc"]).optional()
  })
  .refine(
    (value) =>
      value.minPrice === undefined || value.maxPrice === undefined || value.minPrice <= value.maxPrice,
    {
      message: "minPrice must be less than or equal to maxPrice.",
      path: ["minPrice"]
    }
  );

export type StaySearchInput = z.infer<typeof staySearchSchema>;
