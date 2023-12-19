/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Company } from "src/companies/company.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'vertrigo',
  database: 'harolds',
  // entities: [__dirname + '/../**/*.entity.ts'],
  entities: [Company],
  synchronize: true,
}