import {
  Body,
  Controller,
  Get,
  Post,
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

  @Get()
  getAll(@Query(ValidationPipe) filterDto: GetEstadosFilterDto) {
    return this.service.getAll(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() dto: CreateEstadoDto,
    @GetUser() loggedUser: User,
  ): Promise<Estados> {
    return this.service.create(dto, loggedUser);
  }
}
