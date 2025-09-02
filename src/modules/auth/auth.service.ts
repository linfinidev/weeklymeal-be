import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { errorResponse, successResponse } from '@/common/utils';
import { API_FAIL_MSG, API_SUCCESS_MSG } from '@/common/constants/messages';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { mapToUserDto } from '@/mappers/userMapper';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/dtos/response-user.dto';

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
}
