import { useState } from "react";

import { PageState } from "../../../shared/components/PageState";
import { StayCard } from "../components/StayCard";
import { StaySearchFilters } from "../components/StaySearchFilters";
import { useStays } from "../hooks/useStays";
import type { StaySearchParams } from "../types/stay.types";

export const StaysPage = () => {
  const [filters, setFilters] = useState<StaySearchParams>({ sort: "rating_desc" });
  const staysQuery = useStays(filters);

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
        {staysQuery.isPending ? (
          <PageState title="Loading stays" description="Finding the best available places." />
        ) : null}

        {staysQuery.isError ? (
          <PageState title="Unable to load stays" description="Check that the API is running locally." />
        ) : null}

        {staysQuery.isSuccess && staysQuery.data.length === 0 ? (
          <PageState title="No stays found" description="Try broadening your search or changing filters." />
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
