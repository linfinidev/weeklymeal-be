import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  API_FAIL_MSG,
  API_SUCCESS_MSG,
  EXISTING_EMAIL_MSG,
} from '@/common/constants/messages';
import { errorResponse, successResponse } from '@/common/utils';
import * as bcrypt from 'bcrypt';
import { mapToUserDto } from '@/mappers/userMapper';
import { LoginUserDto } from './dtos/login-user.dto';
import crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        return errorResponse(EXISTING_EMAIL_MSG);
      }
      const salt = await bcrypt.genSalt();
      const hashPw = await bcrypt.hash(createUserDto.password, salt);
      const user = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashPw,
      });
      const res = await this.userRepository.save(user);
      return successResponse(API_SUCCESS_MSG, mapToUserDto(res));
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async findUser(loginUserDto: LoginUserDto) {
    try {
      const currentUser = await this.userRepository.findOneBy({
        email: loginUserDto.email,
      });
      if (!currentUser) {
        return null;
      }
      const isPWMatch = await bcrypt.compare(
        loginUserDto.password,
        currentUser.password,
      );
      if (isPWMatch) {
        return currentUser;
      }
      return null;
    } catch {
      return null;
    }
  }

  async isEmailExisting(email: string) {
    try {
      const currentUser = await this.userRepository.findOneBy({
        email: email,
      });
      if (!currentUser) {
        return false;
      }
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashed = await bcrypt.hash(rawToken, 10);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      await this.userRepository.update(currentUser.id, {
        resetToken: hashed,
        resetExpiresAt: expiresAt,
      });
      return true;
    } catch {
      return false;
    }
  }
}
