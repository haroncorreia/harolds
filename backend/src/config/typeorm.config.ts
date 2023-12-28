/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Company } from "src/companies/company.entity";
import * as config from 'config';
import { Estados } from "src/estados/estados.entity";

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  // entities: [__dirname + '/../**/*.entity.ts'],
  entities: [Company, User, Estados],
  synchronize: dbConfig.synchronize,
}