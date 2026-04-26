import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CheckoutPage } from "../features/booking/pages/CheckoutPage";
import { ReviewForm } from "../features/reviews/components/ReviewForm";
import type { Review } from "../features/reviews/hooks/useReviews";
import { StayDetailsPage } from "../features/stay-details/pages/StayDetailsPage";
import { StaysPage } from "../features/stays/pages/StaysPage";
import type { Stay } from "../features/stays/types/stay.types";
import { getJson, postJson } from "../shared/api/http-client";

vi.mock("../shared/api/http-client", () => ({
  getJson: vi.fn(),
  postJson: vi.fn()
}));

const mockedGetJson = vi.mocked(getJson);
const mockedPostJson = vi.mocked(postJson);
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const stay: Stay = {
  id: "stay-lisbon-riverside-loft",
  name: "Riverside Loft in Alfama",
  location: {
    city: "Lisbon",
    country: "Portugal"
  },
  shortDescription: "Bright loft near the river.",
  longDescription: "A calm loft with river views and easy access to restaurants.",
  pricePerNight: 148,
  rating: 4.8,
  reviewCount: 42,
  amenities: ["Wi-Fi", "Kitchen"],
  images: ["https://example.com/image-one.jpg", "https://example.com/image-two.jpg"],
  availableFrom: "2026-05-01",
  availableTo: "2026-10-31",
  maxGuests: 3,
  category: "apartment"
};

const review: Review = {
  id: "review-1",
  stayId: stay.id,
  author: "Maya Chen",
  rating: 5,
  comment: "Beautiful location and a comfortable space.",
  createdAt: "2026-02-12T10:30:00.000Z"
};

const renderWithProviders = (children: ReactNode, initialPath = "/stays") => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const renderRoute = (routePath: string, initialPath: string, element: ReactNode) =>
  renderWithProviders(
    <Routes>
      <Route path={routePath} element={element} />
    </Routes>,
    initialPath
  );

afterEach(() => {
  vi.clearAllMocks();
});

describe("product flow", () => {
  it("renders stays returned by the API", async () => {
    mockedGetJson.mockResolvedValueOnce({ data: [stay] });

    renderWithProviders(<StaysPage />);

    expect(await screen.findByText("Riverside Loft in Alfama")).toBeInTheDocument();
    expect(screen.getByText("Lisbon, Portugal")).toBeInTheDocument();
  });

  it("updates the stays query when filters change", async () => {
    const user = userEvent.setup();
    mockedGetJson.mockResolvedValue({ data: [stay] });

    renderWithProviders(<StaysPage />);

    await screen.findByText("Riverside Loft in Alfama");
    await user.type(screen.getByPlaceholderText("City, country or stay name"), "Lisbon");

    await waitFor(() => {
      expect(mockedGetJson).toHaveBeenLastCalledWith(expect.stringContaining("query=Lisbon"));
    });
  });

  it("renders stay details and reviews", async () => {
    mockedGetJson.mockResolvedValueOnce({ data: stay }).mockResolvedValueOnce({ data: [review] });

    renderRoute("/stays/:id", `/stays/${stay.id}`, <StayDetailsPage />);

    expect(await screen.findByRole("heading", { name: "Riverside Loft in Alfama" })).toBeInTheDocument();
    expect(await screen.findByText("Beautiful location and a comfortable space.")).toBeInTheDocument();
  });

  it("submits a new review", async () => {
    const user = userEvent.setup();
    mockedPostJson.mockResolvedValueOnce({
      data: {
        ...review,
        id: "review-new",
        author: "Jordan Lee",
        comment: "Thoughtful stay with a great location."
      }
    });

    renderWithProviders(<ReviewForm stayId={stay.id} />);

    await user.type(screen.getByLabelText(/name/i), "Jordan Lee");
    await user.type(screen.getByLabelText(/comment/i), "Thoughtful stay with a great location.");
    await user.click(screen.getByRole("button", { name: /submit review/i }));

    await waitFor(() => {
      expect(mockedPostJson).toHaveBeenCalledWith(
        `/stays/${stay.id}/reviews`,
        expect.objectContaining({
          author: "Jordan Lee",
          comment: "Thoughtful stay with a great location."
        })
      );
    });
  });

  it("validates checkout required fields", async () => {
    const user = userEvent.setup();
    mockedGetJson.mockResolvedValueOnce({ data: stay });

    renderRoute("/stays/:id/checkout", `/stays/${stay.id}/checkout`, <CheckoutPage />);

    await screen.findByRole("heading", { name: "Guest details" });
    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    expect(await screen.findByText("Enter the guest name.")).toBeInTheDocument();
    expect(mockedPostJson).not.toHaveBeenCalled();
  });

  it("creates a booking and navigates to confirmation", async () => {
    const user = userEvent.setup();
    mockedGetJson.mockResolvedValueOnce({ data: stay });
    mockedPostJson.mockResolvedValueOnce({
      data: {
        id: "booking-123",
        stayId: stay.id,
        guestName: "Jordan Lee",
        guestEmail: "jordan@example.com",
        checkIn: "2026-06-10",
        checkOut: "2026-06-13",
        guests: 2,
        totalPrice: 444,
        status: "confirmed",
        createdAt: "2026-04-26T00:00:00.000Z"
      }
    });

    renderRoute("/stays/:id/checkout", `/stays/${stay.id}/checkout`, <CheckoutPage />);

    await screen.findByRole("heading", { name: "Guest details" });
    await user.type(screen.getByLabelText(/guest name/i), "Jordan Lee");
    await user.type(screen.getByLabelText(/email/i), "jordan@example.com");
    await user.type(screen.getByLabelText(/check-in/i), "2026-06-10");
    await user.type(screen.getByLabelText(/check-out/i), "2026-06-13");
    await user.clear(screen.getByLabelText(/guests/i));
    await user.type(screen.getByLabelText(/guests/i), "2");
    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/booking-confirmation/booking-123", {
        state: {
          booking: expect.objectContaining({
            id: "booking-123",
            status: "confirmed",
            totalPrice: 444
          })
        }
      });
    });
  });
});
