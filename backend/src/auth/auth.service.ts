/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthSignUpDto } from './dto/auth-signup-dto';
import { AuthSignInDto } from './dto/auth-signin-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    return await this.userRepository.singUp(authSignUpDto);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<{token: string}> {

    // Validating user password
    const username = await this.userRepository.validateUserPassword(authSignInDto);
    if (!username) throw new UnauthorizedException('Invalid credencials.');

    // Creating JWT
    const payload: JwtPayload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };

  }  
}
