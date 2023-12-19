/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';

import { Company } from './company.entity';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
import { CreateCompanyDto } from './dto/create-company-dto';
import { CompanyStatusValidationPipe } from './pipes/company-status-validation.pipe';
import { CompanyStatus } from './company-status.enum';

@Controller('companies')
export class CompaniesController {
  
  constructor(private companiesService: CompaniesService) {}

  @Get()
  getAll(@Query(ValidationPipe) filterDto: GetCompaniesFilterDto,) {
    // console.log(filterDto);
    return this.companiesService.getCompanies(filterDto);
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.getCompanyById(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', CompanyStatusValidationPipe) status: CompanyStatus,
  ): Promise<Company> {
    return this.companiesService.updateCompanyStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.createCompany(createCompanyDto);
  }  

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.companiesService.deleteCompany(id);
  }
}
