import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserResponseDto } from './dtos/response-user.dto';
import { User } from './entities/user.entity';

export const mockUser: User = {
  id: '1',
  email: 'john_doe@example.com',
  password: 'hashpw',
  name: 'John Doe',
  resetToken: null,
  resetExpiresAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserResponse: UserResponseDto = {
  id: '1',
  email: 'john_doe@example.com',
  name: 'John Doe',
};

export const mockUserId = '1';

export const mockUserLogin: LoginUserDto = {
  email: 'john_doe@example.com',
  password: '123@Abcd',
};

export const mockReqHeader = {
  cookie: jest.fn(),
} as any;

export const mockCreateUserDto: CreateUserDto = {
  email: 'john_doe@example.com',
  password: '123@Abcd',
  name: 'Test User',
};
