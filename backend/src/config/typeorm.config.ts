/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Company } from "src/companies/company.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'vertrigo',
  database: 'harolds',
  // entities: [__dirname + '/../**/*.entity.ts'],
  entities: [Company, User],
  synchronize: true,
}