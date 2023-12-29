import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getById(id: number): Promise<Estados> {
    const r = await this.repository.findOne({ where: { id } });
    // console.log(r);
    if (!r) throw new NotFoundException();
    // if (!r) throw new NotFoundException(`Company with ID ${id} not found.`);
    return r;
  }

  async update(
    id: number,
    dto: CreateEstadoDto,
    loggedUser: User,
  ): Promise<Estados> {
    return await this.repository.updateObject(id, dto, loggedUser);
  }
}
