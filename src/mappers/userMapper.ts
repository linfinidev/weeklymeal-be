import { UserResponseDto } from '@/modules/user/dtos/response-user.dto';
import { User } from '@/modules/user/entities/user.entity';

export const mapToUserDto = (user: User): UserResponseDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
