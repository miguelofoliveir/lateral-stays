export interface ApiResponse<TData> {
  data: TData;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    details?: string[];
  };
}
