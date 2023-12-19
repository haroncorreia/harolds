/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';

import { Company } from './company.entity';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';

@Controller('companies')
export class CompaniesController {
  
  constructor(
    private companiesService: CompaniesService
  ) {}

  @Get()
  getAll(
    @Query(ValidationPipe) filterDto: GetCompaniesFilterDto,
  ): Promise<Company[]> {
    if (Object.keys(filterDto).length) {
      return this.companiesService.filter(filterDto);
    } else {
      return this.companiesService.findAll();
    }
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

}
