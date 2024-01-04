import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EstadosRepository } from './estados.repository';
import { GetEstadosFilterDto } from './dto/get-estados-filter-dto';
import { Estados } from './estados.entity';
import { CreateEstadoDto } from './dto/create-estado-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EstadosService {
  
  // Repository
  constructor(private repository: EstadosRepository) {}

  /**
   * List all objects
   * @returns 
   */
  async list(): Promise<Estados[]> {
    return await this.repository.listObjects();
  }

  /**
   * Filter objects by params on DTO
   * @param filterDto
   * @returns 
   */
  async filter(filterDto: GetEstadosFilterDto): Promise<Estados[]> {
    return await this.repository.filterObjects(filterDto);
  }

  /**
   * Get by ID
   * @param id 
   * @returns 
   */
  async getById(id: number): Promise<Estados> {
    const r = await this.repository.findOne({ where: { id } });
    // console.log(r);
    if (!r) throw new NotFoundException('O ID informado não foi encontrado.');
    // if (!r) throw new NotFoundException(`Company with ID ${id} not found.`);
    return r;
  }

  /**
   * Create object
   * @param dto 
   * @param loggedUser 
   * @returns 
   */
  async save(dto: CreateEstadoDto, loggedUser: User, id?: number): Promise<Estados> {

    // ID validation (for updates)
    if (id) {
      const v3 = await this.repository.findOne({ where: { id } });
      if (!v3) throw new NotFoundException('O ID informado não foi encontrado.');
    }

    // Unique field estado validation
    const v1 = await this.repository.findOne({ where: { estado: dto.estado } });
    if (v1) {
      if (!id || (id && id !== v1.id)) {
        throw new ConflictException(`Já existe um registro com o valor ${dto.estado} informado.`);
      }
    }

    // Unique field uf validation
    const v2 = await this.repository.findOne({ where: { uf: dto.uf } });
    if (v2) {
      if (!id || (id && id !== v2.id)) {
        throw new ConflictException(`Já existe um registro com o valor ${dto.uf} informado.`);
      }
    }
    
    return await this.repository.saveObject(dto, loggedUser, id);

  }

  /**
   * Delete object
   * @param id 
   * @param loggedUser 
   */
  async delete(id: number, loggedUser: User): Promise<void> {
    
    // ID validation
    const v1 = await this.repository.findOne({ where: { id } });
    if (!v1) throw new NotFoundException('O ID informado não foi encontrado.');

    await this.repository.deleteObject(loggedUser, id);

  }

  /**
   * Restore object
   * @param id 
   * @param loggedUser 
   */
  async restore(id: number, loggedUser: User): Promise<Estados> {
    
    // ID validation
    const v1 = await this.repository.findOne({ where: { id }, withDeleted: true });
    if (!v1) throw new NotFoundException('O ID informado não foi encontrado.');

    // isDeleted validation
    if (!v1.deleted_at) throw new BadRequestException('O registro informado não está deletado.');

    return await this.repository.restoreObject(loggedUser, id);

  }

}
