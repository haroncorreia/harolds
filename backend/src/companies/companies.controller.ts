import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.model';
import { CreateCompanyDto } from './dto/create-company-dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  getAllCompanies(): Company[] {
    return this.companiesService.getAllCompanies();
  }

  @Get('/:id')
  getCompanyById(@Param('id') id: string): Company {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto): Company {
    // console.log(name);
    // console.log(registryNumber);
    return this.companiesService.createCompany(createCompanyDto);
  }

  @Delete('/:id')
  deleteCompanyById(@Param('id') id: string): Company {
    return this.companiesService.deleteCompanyById(id);
  }

  /**
   * 
   * Controller recebendo o atributo individualizado
   * 
  createCompany(
    @Body('name') name: string,
    @Body('registryNumber') registryNumber: string,
  ): Company {
    // console.log(name);
    // console.log(registryNumber);
    return this.companiesService.createCompany(name, registryNumber);
  }
   */

  /**
   * 
   * Controller recebendo todo o body
   * 
  createCompany(@Body body) {
    console.log(body);
  }
   */
}
