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
  async filterObjects(
    filterDto: GetEstadosFilterDto
    ): Promise<Estados[]> {

    const { campo, valor } = filterDto;
    const q = this.createQueryBuilder('estados');
    if (campo) {
      if (valor)
        q.andWhere(`(${campo} LIKE :valor)`, { valor: `%${valor}%`});
    } else {
      if (valor)
        q.andWhere('(estados.estado LIKE :valor OR estados.uf LIKE :valor)', { valor: `%${valor}%`});
    }
    // console.log(q.getQuery())
    const r = await q.getMany();
    return r;

  }

  /**
   * Delete object
   * @param dto
   * @returns
   */
  async deleteObject(loggedUser: User, id: number): Promise<void> {
    
    const e = await this.findOne({ where: { id } });
    
    e.deleted_by = loggedUser.username;
    
    await this.manager.transaction( async (t) => {
    
      await t.save(Estados, e);
      await t.softDelete(Estados, e.id);
    
    }).catch((e) => {
    
      console.log(e);
      throw new InternalServerErrorException('Não foi possível realizar a operação.');
    
    });    
    
  }  

  /**
   * Restore object
   * @param dto
   * @returns
   */
  async restoreObject(loggedUser: User, id: number): Promise<Estados> {
    
    const e = await this.findOne({ where: { id }, withDeleted: true });
    
    e.updated_by = loggedUser.username;
    e.deleted_by = null;

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.startTransaction()

    try {
        // execute some operations on this transaction:
        await queryRunner.manager.save(Estados, e);
        await queryRunner.manager.restore(Estados, e.uf);
        // commit transaction now:
        await queryRunner.commitTransaction()
    } catch (e) {
        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(`Não foi possível realizar a operação (${e.code}).`);
    } finally {
        // you need to release query runner which is manually created:
        await queryRunner.release()
    }    

    return await this.findOne({ where: { id } });
    
  }

  async customWhere(column: string, value: string | number, operator = '='): Promise<Estados> {
    return await this.createQueryBuilder()
      .where(`Estados.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
