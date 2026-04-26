import { useQuery } from "@tanstack/react-query";

import { getStays } from "../api/stays.api";
import type { StaySearchParams } from "../types/stay.types";

export const useStays = (filters: StaySearchParams) =>
  useQuery({
    queryKey: ["stays", filters],
    queryFn: () => getStays(filters)
  });
