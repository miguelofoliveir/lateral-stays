import { useState } from "react";

import { PageState } from "../../../shared/components/PageState";
import { StayCard } from "../components/StayCard";
import { StaySearchFilters } from "../components/StaySearchFilters";
import { useStays } from "../hooks/useStays";
import type { StaySearchParams } from "../types/stay.types";

const StayListSkeleton = () => (
  <div className="space-y-4" aria-label="Loading stays">
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-600" />
      Finding stays that match your trip...
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-44 animate-pulse bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100" />
          <div className="space-y-4 p-5">
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-3 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const StaysPage = () => {
  const [filters, setFilters] = useState<StaySearchParams>({ sort: "rating_desc" });
  const staysQuery = useStays(filters);
  const showInitialLoading = staysQuery.isLoading;
  const showRefetching = staysQuery.isFetching && !staysQuery.isLoading;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="mb-8 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Find your stay</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Browse curated stays for your next trip.
        </h1>
        <p className="text-base leading-7 text-slate-600">
          Search by destination, compare prices and move from discovery to booking without leaving
          the flow.
        </p>
      </section>

      <StaySearchFilters filters={filters} onChange={setFilters} />

      <section className="mt-8" aria-label="Available stays">
        {showRefetching ? (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-600" />
            Updating results...
          </div>
        ) : null}

        {showInitialLoading ? (
          <StayListSkeleton />
        ) : null}

        {staysQuery.isError ? (
          <PageState title="Unable to load stays" description="Check that the API is running locally." />
        ) : null}

        {staysQuery.isSuccess && staysQuery.data.length === 0 ? (
          <PageState title="No stays found" description="Try adjusting your filters." />
        ) : null}

        {staysQuery.isSuccess && staysQuery.data.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staysQuery.data.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
