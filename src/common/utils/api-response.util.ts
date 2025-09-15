import { HttpException, HttpStatus } from '@nestjs/common';
import { GenericApiResponse } from '../dtos';

export function successResponse<T>(
  message: string,
  data?: T,
): GenericApiResponse<T> {
  return new GenericApiResponse({ success: true, message, data });
}

export function throwErrorResponse(
  message: string,
  status: number = HttpStatus.INTERNAL_SERVER_ERROR,
): never {
  throw new HttpException(message, status);
}
