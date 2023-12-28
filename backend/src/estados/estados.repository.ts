import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Estados } from './estados.entity';
import { GetEstadosFilterDto } from './dto/get-estados-filter-dto';
import { CreateEstadoDto } from './dto/create-estado-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EstadosRepository extends Repository<Estados> {
  constructor(private dataSource: DataSource) {
    super(Estados, dataSource.createEntityManager());
  }

  /**
   * Create
   * @param dto
   * @returns
   */
  async createObject(dto: CreateEstadoDto, loggedUser: User): Promise<Estados> {
    // Create using Entity
    const { estado, uf } = dto;
    const e = new Estados();
    e.estado = estado;
    e.uf = uf;
    console.log(loggedUser);
    e.criado_por = loggedUser.username;
    e.modificado_por = loggedUser.username;
    try {
      await this.save(e);
    } catch (error) {
      // console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('ID or Unique given already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return e;
  }

  async getAllObjects(filterDto: GetEstadosFilterDto): Promise<Estados[]> {
    const { searchWord } = filterDto;
    const q = this.createQueryBuilder('estados');
    if (searchWord)
      q.andWhere('(estados.estado LIKE :param OR estados.uf LIKE :param)', {
        param: `%${searchWord}%`,
      });
    const r = await q.getMany();
    return r;
  }

  async customWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<Estados> {
    return await this.createQueryBuilder()
      .where(`Estados.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
