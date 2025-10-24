import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { mockUser, mockUserResponse } from '../user/user.mock';
import { successResponse } from '@/common/utils';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('guest login', async () => {
    jest.spyOn(userService, 'findUser').mockResolvedValue(mockUser);

    const result = await authService.guestLogin();

    expect(userService['findUser']).toHaveBeenCalledWith({
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PW,
    });
    expect(result).toEqual(successResponse('Successful!', mockUserResponse));
  });
});
