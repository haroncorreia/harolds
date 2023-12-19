/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthSignUpDto } from './dto/auth-signup-dto';

@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    return await this.userRepository.singUp(authSignUpDto);
  }
  
}
