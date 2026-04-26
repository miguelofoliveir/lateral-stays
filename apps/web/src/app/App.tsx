import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "./providers/QueryProvider";
import { router } from "./router";

export const App = () => (
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>
);
