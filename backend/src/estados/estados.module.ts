import { Module } from '@nestjs/common';
import { EstadosController } from './estados.controller';
import { EstadosService } from './estados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estados } from './estados.entity';
import { EstadosRepository } from './estados.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Estados]), AuthModule],
  controllers: [EstadosController],
  providers: [EstadosService, EstadosRepository],
})
export class EstadosModule {}
