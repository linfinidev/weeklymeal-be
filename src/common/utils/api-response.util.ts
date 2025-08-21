import { GenericApiResponse } from '../dto/api-response.dto';

export function successResponse<T>(
  message: string,
  data?: T,
): GenericApiResponse<T> {
  return new GenericApiResponse({ success: true, message, data });
}

export function errorResponse(message: string): GenericApiResponse<null> {
  return new GenericApiResponse({ success: false, message });
}
