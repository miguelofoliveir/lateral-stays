import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateReview } from "../hooks/useReviews";
import { reviewSchema, type ReviewFormInput, type ReviewFormValues } from "../schemas/review.schema";

interface ReviewFormProps {
  stayId: string;
}

export const ReviewForm = ({ stayId }: ReviewFormProps) => {
  const createReviewMutation = useCreateReview(stayId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ReviewFormInput, unknown, ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      author: "",
      rating: 5,
      comment: ""
    }
  });

  const onSubmit = handleSubmit((values) => {
    createReviewMutation.mutate(values, {
      onSuccess: () => reset()
    });
  });

  return (
    <form className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5" onSubmit={onSubmit}>
      <h2 className="text-2xl font-semibold text-slate-950">Add a review</h2>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Name</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          {...register("author")}
        />
        {errors.author ? <p className="mt-1 text-sm text-rose-700">{errors.author.message}</p> : null}
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Rating</span>
        <select
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          {...register("rating")}
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
        {errors.rating ? <p className="mt-1 text-sm text-rose-700">{errors.rating.message}</p> : null}
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Comment</span>
        <textarea
          className="mt-2 min-h-28 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          {...register("comment")}
        />
        {errors.comment ? <p className="mt-1 text-sm text-rose-700">{errors.comment.message}</p> : null}
      </label>
      {createReviewMutation.isError ? (
        <p className="text-sm text-rose-700">We could not save your review. Please try again.</p>
      ) : null}
      <button
        type="submit"
        disabled={createReviewMutation.isPending}
        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        {createReviewMutation.isPending ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
};
