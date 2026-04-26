import { getJson, type ApiResponse } from "../../../shared/api/http-client";
import type { Stay, StaySearchParams } from "../types/stay.types";

const appendParam = (params: URLSearchParams, key: string, value: string | undefined): void => {
  if (value?.trim()) {
    params.set(key, value.trim());
  }
};

export const getStays = async (filters: StaySearchParams): Promise<Stay[]> => {
  const params = new URLSearchParams();

  appendParam(params, "query", filters.query);
  appendParam(params, "minPrice", filters.minPrice);
  appendParam(params, "maxPrice", filters.maxPrice);
  appendParam(params, "guests", filters.guests);
  appendParam(params, "sort", filters.sort);

  const queryString = params.toString();
  const response = await getJson<ApiResponse<Stay[]>>(`/stays${queryString ? `?${queryString}` : ""}`);

  return response.data;
};

export const getStayById = async (stayId: string): Promise<Stay> => {
  const response = await getJson<ApiResponse<Stay>>(`/stays/${stayId}`);

  return response.data;
};
