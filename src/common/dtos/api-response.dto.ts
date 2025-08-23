export class GenericApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;

  constructor(partial: Partial<GenericApiResponse<T>>) {
    Object.assign(this, partial);
  }
}
