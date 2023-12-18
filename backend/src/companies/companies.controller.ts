import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company, CompanyActive } from './company.model';
import { CreateCompanyDto } from './dto/create-company-dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
import { CompanyStatusValidationPipe } from './pipes/company-status-validation.pipe';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  getCompanies(
    @Query(ValidationPipe) filterDto: GetCompaniesFilterDto,
  ): Company[] {
    // console.log(filterDto);
    if (Object.keys(filterDto).length) {
      return this.companiesService.filterCompanies(filterDto);
    } else {
      return this.companiesService.getAllCompanies();
    }
  }

  @Get('/:id')
  getCompanyById(@Param('id') id: string): Company {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCompanyDto: CreateCompanyDto): Company {
    // console.log(name);
    // console.log(registryNumber);
    return this.companiesService.createCompany(createCompanyDto);
  }

  @Delete('/:id')
  deleteCompany(@Param('id') id: string): void {
    this.companiesService.deleteCompany(id);
  }

  @Patch('/:id/status')
  updateCompany(
    @Param('id') id: string,
    @Body('status', CompanyStatusValidationPipe) status: CompanyActive,
  ): Company {
    return this.companiesService.updateCompanyStatus(id, status);
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
