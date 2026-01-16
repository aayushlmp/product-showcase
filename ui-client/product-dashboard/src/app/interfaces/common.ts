
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface UploadResponse {
  url: string;
  filename: string;
  size?: number;
  mime_type?: string;
  created_at?: string;
  updated_at?: string;
}