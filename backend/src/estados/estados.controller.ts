import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EstadosService } from './estados.service';
import { GetEstadosFilterDto } from './dto/get-estados-filter-dto';
import { CreateEstadoDto } from './dto/create-estado-dto';
import { Estados } from './estados.entity';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('estados')
@UseGuards(AuthGuard())
export class EstadosController {
  constructor(private service: EstadosService) {}

  /**
   * List
   * @returns 
   */
  @Get('/')
  list(): Promise<Estados[]> {
    return this.service.list();
  }


  /**
   * List
   * @returns 
   */
  @Get('/deleted')
  listDeleted(): Promise<Estados[]> {
    return this.service.listDeleted();
  }

  /**
   * Filter
   * @param filterDto 
   * @returns 
   */
  @Get('/filter')
  filter(
    @Query(ValidationPipe) filterDto: GetEstadosFilterDto
    ): Promise<Estados[]> {
    return this.service.filter(filterDto);
  }  

  /**
   * Get by ID
   * @param id 
   * @returns 
   */
  @Get('/:id')
  getById(
    @Param('id', ParseIntPipe) id: number
    ): Promise<Estados> {
    return this.service.getById(id);
  }

  /**
   * Create
   * @param dto 
   * @param loggedUser 
   * @returns 
   */
  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() dto: CreateEstadoDto,
    @GetUser() loggedUser: User,
  ): Promise<Estados> {
    return this.service.save(dto, loggedUser);
  }

  /**
   * Update
   * @param id 
   * @param dto 
   * @param loggedUser 
   * @returns 
   */
  @Put('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateEstadoDto,
    @GetUser() loggedUser: User,
  ): Promise<Estados> {
    return this.service.save(dto, loggedUser, id);
  }
  
  /**
   * Delete
   * @param id 
   * @param loggedUser 
   * @returns 
   */
  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() loggedUser: User,
    ): Promise<void> {
    return this.service.delete(id, loggedUser);
  }

  /**
   * Restore
   * @param id 
   * @param dto 
   * @param loggedUser 
   * @returns 
   */
  @Patch('/:id')
  restore(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() loggedUser: User,
  ): Promise<Estados> {
    return this.service.restore(id, loggedUser);
  }

}
