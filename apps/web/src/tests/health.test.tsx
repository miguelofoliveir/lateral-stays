import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppShell } from "../shared/components/AppShell";
import { getHealth } from "../shared/api/health.api";

vi.mock("../shared/api/health.api", () => ({
  getHealth: vi.fn()
}));

const mockedGetHealth = vi.mocked(getHealth);

const renderWithQueryClient = (children: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("AppShell health check", () => {
  it("shows loading and then the healthy API state", async () => {
    mockedGetHealth.mockResolvedValue({
      status: "ok",
      service: "api"
    });

    renderWithQueryClient(<AppShell />);

    expect(screen.getByText("Checking API status")).toBeInTheDocument();
    expect(await screen.findByText("API is healthy")).toBeInTheDocument();
    expect(screen.getByText("The frontend successfully reached the backend health endpoint.")).toBeInTheDocument();
  });

  it("shows an error state when the API request fails", async () => {
    mockedGetHealth.mockRejectedValue(new Error("Network error"));

    renderWithQueryClient(<AppShell />);

    expect(await screen.findByText("API is not reachable")).toBeInTheDocument();
    expect(screen.getByText("Start the backend locally and confirm VITE_API_URL points to it.")).toBeInTheDocument();
  });
});
