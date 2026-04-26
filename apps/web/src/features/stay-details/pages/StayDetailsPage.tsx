import { Link, useParams } from "react-router-dom";

import { PageState } from "../../../shared/components/PageState";
import { ReviewForm } from "../../reviews/components/ReviewForm";
import { ReviewList } from "../../reviews/components/ReviewList";
import { useReviews } from "../../reviews/hooks/useReviews";
import { StayHero } from "../components/StayHero";
import { useStayDetails } from "../hooks/useStayDetails";

export const StayDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const stayId = id ?? "";
  const stayQuery = useStayDetails(stayId);
  const reviewsQuery = useReviews(stayId);

  if (!id) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <PageState title="Stay not found" description="Choose a stay from the browse page." />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
      <Link
        to="/stays"
        className="mb-6 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
      >
        Back to stays
      </Link>

      {stayQuery.isPending ? (
        <PageState title="Loading stay" description="Preparing the stay details." />
      ) : null}

      {stayQuery.isError ? (
        <PageState title="Stay not found" description="This stay may no longer be available." />
      ) : null}

      {stayQuery.isSuccess ? (
        <div className="space-y-10">
          <StayHero stay={stayQuery.data} />

          <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-slate-950">About this stay</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{stayQuery.data.longDescription}</p>
                <h3 className="mt-6 font-semibold text-slate-950">Amenities</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {stayQuery.data.amenities.map((amenity) => (
                    <li key={amenity} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              {reviewsQuery.isPending ? (
                <PageState title="Loading reviews" description="Getting guest feedback." />
              ) : null}
              {reviewsQuery.isError ? (
                <PageState title="Unable to load reviews" description="Please try refreshing the page." />
              ) : null}
              {reviewsQuery.isSuccess ? <ReviewList reviews={reviewsQuery.data} /> : null}
            </div>

            <ReviewForm stayId={stayQuery.data.id} />
          </section>
        </div>
      ) : null}
    </main>
  );
};
