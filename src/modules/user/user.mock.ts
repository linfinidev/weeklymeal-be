import { User } from './entities/user.entity';

export const mockUser: User = {
  id: '1',
  email: 'john_doe@example.com',
  password: 'hashpw',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};
