import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { mockCreateUserDto, mockUserResponse } from './user.mock';
import { successResponse } from '@/common/utils';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
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

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create user', async () => {
    jest
      .spyOn(userService, 'create')
      .mockResolvedValue(successResponse('Successful!', mockUserResponse));

    const result = await controller.createAccount(mockCreateUserDto);

    expect(userService.create).toHaveBeenCalledWith(mockCreateUserDto);
    expect(result).toEqual(successResponse('Successful!', mockUserResponse));
  });
});
