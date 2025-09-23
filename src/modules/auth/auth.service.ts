import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { throwErrorResponse, successResponse } from '@/common/utils';
import {
  API_FAIL_MSG,
  API_SUCCESS_MSG,
  NO_EMAIL_MSG,
  RESET_PW_EMAIL_MSG,
  TEST_EMAIL_MSG,
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
    const user = await this.userService.findUser(loginUserDto);
    if (!user) {
      throwErrorResponse(API_FAIL_MSG);
    }
    return successResponse(API_SUCCESS_MSG, mapToUserDto(user));
  }

  async guestLogin() {
    const user = await this.userService.findUser({
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PW,
    });
    if (!user) {
      throwErrorResponse(API_FAIL_MSG);
    }
    return successResponse(API_SUCCESS_MSG, mapToUserDto(user));
  }

  generateToken(user: UserResponseDto) {
    const payload = { id: user.id, email: user.email, name: user.name };
    return this.jwtService.sign(payload);
  }

  async forgotPassword(forgotPwReq: ForgotPasswordDto) {
    const currentuser = await this.userService.getResetPWUser(
      forgotPwReq.email,
    );
    if (!currentuser) {
      throwErrorResponse(NO_EMAIL_MSG);
    }
    if (currentuser.email === process.env.DEFAULT_USER_EMAIL) {
      throwErrorResponse(TEST_EMAIL_MSG);
    }
    await sendResetLinkEmail(currentuser.email, currentuser.resetToken);
    return successResponse(RESET_PW_EMAIL_MSG);
  }

  async resetPassword(resetPwReq: ResetPasswordDto) {
    await this.userService.resetPassword(resetPwReq);
  }
}
