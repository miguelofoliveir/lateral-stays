import type { Review } from "../hooks/useReviews";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-slate-950">Guest reviews</h2>
    {reviews.length === 0 ? (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        No reviews yet. Be the first to share your stay experience.
      </p>
    ) : (
      <div className="space-y-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-slate-950">{review.author}</h3>
              <span className="text-sm font-medium text-amber-700">{review.rating}/5</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
          </article>
        ))}
      </div>
    )}
  </div>
);
