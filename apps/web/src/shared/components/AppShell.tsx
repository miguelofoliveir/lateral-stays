import { useQuery } from "@tanstack/react-query";

import { getHealth } from "../api/health.api";
import { StatusCard } from "./StatusCard";

export const AppShell = () => {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: getHealth
  });

  return (
    <main className="min-h-screen px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Lateral Stays
          </p>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Travel booking foundation with a testable API connection.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              This app shell is ready for stays, reviews and bookings while keeping server state in
              TanStack Query.
            </p>
          </div>
        </header>

        {healthQuery.isPending ? (
          <StatusCard
            title="Checking API status"
            description="The frontend is validating the backend health endpoint."
            tone="neutral"
          />
        ) : null}

        {healthQuery.isError ? (
          <StatusCard
            title="API is not reachable"
            description="Start the backend locally and confirm VITE_API_URL points to it."
            tone="error"
          />
        ) : null}

        {healthQuery.isSuccess ? (
          <StatusCard
            title="API is healthy"
            description="The frontend successfully reached the backend health endpoint."
            tone="success"
          >
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium">Service</dt>
                <dd>{healthQuery.data.service}</dd>
              </div>
              <div>
                <dt className="font-medium">Status</dt>
                <dd>{healthQuery.data.status}</dd>
              </div>
            </dl>
          </StatusCard>
        ) : null}
      </div>
    </main>
  );
};
