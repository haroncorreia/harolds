import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EstadosModule } from './estados/estados.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CompaniesModule,
    EstadosModule,
  ],
})
export class AppModule {}
