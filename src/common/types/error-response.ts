export interface ErrorResponse<T> {
  message: string;
  field: keyof T;
}
