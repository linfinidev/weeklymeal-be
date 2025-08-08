export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }
}
