import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "../shared/components/AppShell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />
  }
]);
