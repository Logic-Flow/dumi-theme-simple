export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type Query = Record<string, string | number | boolean | null | undefined>;
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Query;
  data?: any;
}
export interface ApiResponse<T = any> {
  code?: number;
  message?: string;
  data: T;
}