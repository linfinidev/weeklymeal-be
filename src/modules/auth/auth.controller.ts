import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserResponseDto } from '../user/dtos/response-user.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { Response } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { ForgotPasswordDto } from '../user/dtos/forgot-password.dto';

@ApiTags('Default')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ operationId: 'login', summary: 'login' })
  @ApiResponse({
    status: 201,
    description: 'Login',
    type: UserResponseDto,
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('login');
    const user = await this.authService.login(loginUserDto);

    const token = this.authService.generateToken(user.data);

    // 👇 Set JWT in HttpOnly cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    return user;
  }

  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authToken');
    return { message: 'Logged out' };
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ operationId: 'forgotPassword', summary: 'forgot password' })
  @ApiResponse({
    status: 201,
    description: 'Forgot password',
  })
  async forgotPassword(@Body() forgotPwReq: ForgotPasswordDto) {
    this.logger.log('login');
    return this.authService.forgotPassword(forgotPwReq);
  }
}
