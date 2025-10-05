import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserResponseDto } from '../user/dtos/response-user.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { Response } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { ForgotPasswordDto } from '../user/dtos/forgot-password.dto';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';

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
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    return user;
  }

  @Public()
  @Post('guest-login')
  @ApiOperation({ operationId: 'guestLogin', summary: 'login as guest' })
  @ApiResponse({
    status: 201,
    description: 'Login as guest',
  })
  async guestLogin(@Res({ passthrough: true }) res: Response) {
    this.logger.log('login default');
    const user = await this.authService.guestLogin();

    const token = this.authService.generateToken(user.data);

    // 👇 Set JWT in HttpOnly cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    return { message: 'Logged in as guest' };
  }

  @Public()
  @Post('logout')
  @ApiOperation({ operationId: 'logout', summary: 'logout' })
  @ApiResponse({
    status: 201,
    description: 'log out',
  })
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
    this.logger.log('forgot password');
    return this.authService.forgotPassword(forgotPwReq);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ operationId: 'resetPassword', summary: 'reset password' })
  @ApiResponse({
    status: 201,
    description: 'Reset password',
  })
  async resetPassword(@Body() resetPwReq: ResetPasswordDto) {
    this.logger.log('reset password');
    return this.authService.resetPassword(resetPwReq);
  }
}
