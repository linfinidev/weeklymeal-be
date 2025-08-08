import { ApiResponse } from '../dto/api-response.dto';

export function successResponse<T>(message: string, data?: T): ApiResponse<T> {
  return new ApiResponse({ success: true, message, data });
}

export function errorResponse(message: string): ApiResponse<null> {
  return new ApiResponse({ success: false, message });
}
