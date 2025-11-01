/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { mockReqHeader, mockUserResponse } from '../user/user.mock';
import { successResponse } from '@/common/utils';
import { MAX_COOKIES_AGE } from '@/common/constants';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login as guest, set cookie, and return message', async () => {
    const token = 'mocked.jwt.token';

    jest
      .spyOn(authService, 'guestLogin')
      .mockResolvedValue(successResponse('Success', mockUserResponse));
    jest.spyOn(authService, 'generateToken').mockReturnValue(token);

    const result = await controller.guestLogin(mockReqHeader);

    expect(authService.guestLogin).toHaveBeenCalled();
    expect(authService.generateToken).toHaveBeenCalledWith(mockUserResponse);
    expect(mockReqHeader.cookie).toHaveBeenCalledWith(
      'authToken',
      token,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: MAX_COOKIES_AGE,
        partitioned: true,
      }),
    );
    expect(result).toEqual({ message: 'Logged in as guest' });
  });
});
