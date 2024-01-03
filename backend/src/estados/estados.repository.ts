import { DataSource, Repository } from 'typeorm';
import {
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
   * Save object
   * @param dto
   * @returns
   */
  async saveObject(dto: CreateEstadoDto, loggedUser: User, id?: number): Promise<Estados> {
    
    let e;
    const { estado, uf } = dto;

    if (id) {
      e = await this.findOne({ where: { id } });
    } else {
      e = new Estados();
    }

    e.estado = estado;
    e.uf = uf;
    e.created_by = loggedUser.username;
    e.updated_by = loggedUser.username;

    try {
      await this.save(e);
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
    
    return e;

  }

  /**
   * List all objects
   * @param filterDto
   * @returns
   */
  async listObjects(): Promise<Estados[]> {
    const q = this.createQueryBuilder('estados');
    const r = await q.getMany();
    return r;
  }

  /**
   * List all objects
   * @param filterDto
   * @returns
   */
  async filterObjects(filterDto: GetEstadosFilterDto): Promise<Estados[]> {
    const { campo, valor } = filterDto;
    const q = this.createQueryBuilder('estados');
    if (campo) {
      if (valor)
        q.andWhere('(estados.:campo LIKE :valor)', { campo: `${campo}`, valor: `%${valor}%`});
    } else {
      if (valor)
        q.andWhere('(estados.estado LIKE :valor OR estados.uf LIKE :valor)', { valor: `%${valor}%`});
    }
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
