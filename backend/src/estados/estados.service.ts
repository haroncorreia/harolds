import { Injectable } from '@nestjs/common';
import { EstadosRepository } from './estados.repository';
import { GetEstadosFilterDto } from './dto/get-estados-filter-dto';
import { Estados } from './estados.entity';
import { CreateEstadoDto } from './dto/create-estado-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EstadosService {
  constructor(private repository: EstadosRepository) {}

  async create(dto: CreateEstadoDto, loggedUser: User): Promise<Estados> {
    return await this.repository.createObject(dto, loggedUser);
  }

  async getAll(filterDto: GetEstadosFilterDto): Promise<Estados[]> {
    return await this.repository.getAllObjects(filterDto);
  }
}
