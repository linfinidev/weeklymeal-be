import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { errorResponse, successResponse } from '@/common/utils';
import {
  API_FAIL_MSG,
  API_SUCCESS_MSG,
  NO_EMAIL_MSG,
  RESET_FAILED_MSG,
  RESET_PW_EMAIL_MSG,
} from '@/common/constants/messages';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { mapToUserDto } from '@/mappers/userMapper';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/dtos/response-user.dto';
import { ForgotPasswordDto } from '../user/dtos/forgot-password.dto';
import { sendResetLinkEmail } from '@/common/utils/email.util';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.findUser(loginUserDto);
      if (!user) {
        return errorResponse(API_FAIL_MSG);
      }
      return successResponse(API_SUCCESS_MSG, mapToUserDto(user));
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  generateToken(user: UserResponseDto) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return this.jwtService.sign(payload);
  }

  async forgotPassword(forgotPwReq: ForgotPasswordDto) {
    try {
      const currentuser = await this.userService.getResetPWUser(
        forgotPwReq.email,
      );
      if (!currentuser) {
        return errorResponse(NO_EMAIL_MSG);
      }
      await sendResetLinkEmail(currentuser.email, currentuser.resetToken);
      return successResponse(RESET_PW_EMAIL_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async resetPassword(resetPwReq: ResetPasswordDto) {
    try {
      const currentuser = await this.userService.resetPassword(resetPwReq);
      if (!currentuser) {
        return errorResponse(RESET_FAILED_MSG);
      }
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }
}
