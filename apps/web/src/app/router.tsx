import { Navigate, createBrowserRouter } from "react-router-dom";

import { BookingConfirmationPage } from "../features/booking/pages/BookingConfirmationPage";
import { CheckoutPage } from "../features/booking/pages/CheckoutPage";
import { StayDetailsPage } from "../features/stay-details/pages/StayDetailsPage";
import { StaysPage } from "../features/stays/pages/StaysPage";
import { AppShell } from "../shared/components/AppShell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/stays" replace />
      },
      {
        path: "stays",
        element: <StaysPage />
      },
      {
        path: "stays/:id",
        element: <StayDetailsPage />
      },
      {
        path: "stays/:id/checkout",
        element: <CheckoutPage />
      },
      {
        path: "booking-confirmation/:id",
        element: <BookingConfirmationPage />
      }
    ]
  }
]);
