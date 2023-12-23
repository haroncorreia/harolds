/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload-interface";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // Inject user repository for strategy propouses...
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      // Collecting information from headers...
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
    })
  }
  async validate(payload: JwtPayload) {
    // The strategy itselfs...
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: [{username}] });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}