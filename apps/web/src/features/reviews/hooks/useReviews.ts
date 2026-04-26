import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getJson, postJson, type ApiResponse } from "../../../shared/api/http-client";
import type { ReviewFormValues } from "../schemas/review.schema";

export interface Review {
  id: string;
  stayId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const reviewsQueryKey = (stayId: string) => ["reviews", stayId] as const;

export const useReviews = (stayId: string) =>
  useQuery({
    queryKey: reviewsQueryKey(stayId),
    queryFn: async () => {
      const response = await getJson<ApiResponse<Review[]>>(`/stays/${stayId}/reviews`);

      return response.data;
    }
  });

export const useCreateReview = (stayId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ReviewFormValues) => {
      const response = await postJson<ApiResponse<Review>, ReviewFormValues>(
        `/stays/${stayId}/reviews`,
        input
      );

      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reviewsQueryKey(stayId) });
      void queryClient.invalidateQueries({ queryKey: ["stay", stayId] });
    }
  });
};
