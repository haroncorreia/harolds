import { Injectable, NotFoundException } from '@nestjs/common';
import { Company, CompanyActive } from './company.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompanyDto } from './dto/create-company-dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';

@Injectable()
export class CompaniesService {
  private companies: Company[] = [];

  getAllCompanies(): Company[] {
    return this.companies;
  }

  filterCompanies(filter: GetCompaniesFilterDto): Company[] {
    const { status, search } = filter;

    let companies = this.getAllCompanies();

    if (status)
      companies = companies.filter((company) => company.active === status);

    if (search) {
      companies = companies.filter(
        (company) =>
          company.name.includes(search) ||
          company.registryNumber.includes(search),
      );
    }

    return companies;
  }

  getCompanyById(id: string): Company {
    const r = this.companies.find((company) => company.id === id);
    if (!r) throw new NotFoundException(`Company with ID ${id} not found.`);
    return r;
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
  deleteCompany(id: string): void {
    const r = this.getCompanyById(id);
    this.companies = this.companies.filter((company) => company.id !== r.id);
  }
  updateCompanyStatus(id: string, status: CompanyActive): Company {
    const company = this.getCompanyById(id);
    company.active = status;
    return company;
  }
}
