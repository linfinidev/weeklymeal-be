import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  API_FAIL_MSG,
  API_SUCCESS_MSG,
  EXISTING_EMAIL_MSG,
} from '@/common/constants/messages';
import { successResponse, throwErrorResponse } from '@/common/utils';
import * as bcrypt from 'bcrypt';
import { mapToUserDto } from '@/mappers/userMapper';
import { LoginUserDto } from './dtos/login-user.dto';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { DateTime } from 'luxon';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throwErrorResponse(EXISTING_EMAIL_MSG, HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    const hashPw = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashPw,
    });
    const res = await this.userRepository.save(user);
    if (res) {
      return successResponse(API_SUCCESS_MSG, mapToUserDto(res));
    }
    throwErrorResponse(API_FAIL_MSG);
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

  async getResetPWUser(email: string) {
    try {
      const currentUser = await this.userRepository.findOneBy({
        email: email,
      });
      if (!currentUser) {
        return null;
      }
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashed = await bcrypt.hash(rawToken, 10);
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
      currentUser.resetToken = hashed;
      currentUser.resetExpiresAt = expiresAt;
      return await this.userRepository.save(currentUser);
    } catch {
      return null;
    }
  }

  async resetPassword(resetPwReq: ResetPasswordDto) {
    const currentUser = await this.userRepository.findOneBy({
      email: resetPwReq.email,
    });
    if (!currentUser) {
      throwErrorResponse('User not found', HttpStatus.NOT_FOUND);
    }
    const isTokenMatched = currentUser.resetToken === resetPwReq.token;
    const isTokenExpired =
      DateTime.fromJSDate(currentUser.resetExpiresAt).toMillis() <
      DateTime.now().toMillis();
    if (!isTokenMatched || isTokenExpired) {
      throwErrorResponse(
        'Token is expired or not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt();
    const hashPw = await bcrypt.hash(resetPwReq.password, salt);
    currentUser.password = hashPw;
    currentUser.resetToken = null;
    currentUser.resetExpiresAt = null;
    await this.userRepository.save(currentUser);
    return successResponse(API_SUCCESS_MSG);
  }
}
