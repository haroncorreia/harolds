/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company-dto';
import { CompanyStatusValidationPipe } from './pipes/company-status-validation.pipe';
import { CompanyStatus } from './company-status.enum';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('companies')
@UseGuards(AuthGuard())
export class CompaniesController {
  
  constructor(private companiesService: CompaniesService) {}

  @Get()
  getAll(
    @Query(ValidationPipe) filterDto: GetCompaniesFilterDto,
    @GetUser() loggedUser: User,
    ) {
    // console.log(filterDto);
    return this.companiesService.getCompanies(filterDto, loggedUser);
  }

  @Get('/:id')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() loggedUser: User,
    ): Promise<Company> {
    return this.companiesService.getCompanyById(id, loggedUser);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', CompanyStatusValidationPipe) status: CompanyStatus,
    @GetUser() loggedUser: User,
  ): Promise<Company> {
    return this.companiesService.updateCompanyStatus(id, status, loggedUser);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() loggedUser: User,
    ): Promise<Company> {
    return this.companiesService.createCompany(createCompanyDto, loggedUser);
  }  

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() loggedUser: User,
    ): Promise<void> {
    return this.companiesService.deleteCompany(id, loggedUser);
  }
}
