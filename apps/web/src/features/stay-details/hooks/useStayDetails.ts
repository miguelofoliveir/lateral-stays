import { useQuery } from "@tanstack/react-query";

import { getStayById } from "../../stays/api/stays.api";

export const useStayDetails = (stayId: string) =>
  useQuery({
    queryKey: ["stay", stayId],
    queryFn: () => getStayById(stayId)
  });
