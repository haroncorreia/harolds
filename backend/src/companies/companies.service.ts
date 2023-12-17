import { Injectable } from '@nestjs/common';
import { Company, CompanyActive } from './company.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompanyDto } from './dto/create-company-dto';

@Injectable()
export class CompaniesService {
  private companies: Company[] = [];

  getAllCompanies(): Company[] {
    return this.companies;
  }

  getCompanyById(id: string): Company {
    return this.companies.find((company) => company.id === id);
  }

  createCompany(createCompanyDto: CreateCompanyDto): Company {
    const { name, registryNumber } = createCompanyDto;
    const company: Company = {
      id: uuidv4(),
      name,
      registryNumber,
      active: CompanyActive.DEACTIVE,
    };
    this.companies.push(company);
    return company;
  }
  deleteCompanyById(id: string): void {
    this.companies = this.companies.filter((company) => company.id !== id);
  }
}
