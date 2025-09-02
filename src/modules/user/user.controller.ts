import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/response-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { GenericApiResponse } from '@/common/dtos';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('Default')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ operationId: 'createAccount', summary: 'Create account' })
  @ApiResponse({
    status: 201,
    description: 'Account created',
    type: UserResponseDto,
  })
  createAccount(
    @Body() createAccountDto: CreateUserDto,
  ): Promise<GenericApiResponse<UserResponseDto>> {
    this.logger.log('create account');
    return this.userService.create(createAccountDto);
  }
}
