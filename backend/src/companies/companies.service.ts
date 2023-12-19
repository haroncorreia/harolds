/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company-dto';
import { CompanyStatus } from './company-status.enum';

@Injectable()
export class CompaniesService {
  
  constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Using repository
    return this.companyRepository.createCompany(createCompanyDto);
  }

  async getCompanies(filterDto: GetCompaniesFilterDto): Promise<Company[]> {
    return await this.companyRepository.getCompanies(filterDto);
  }

  async getCompanyById(id: number): Promise<Company> {
    const r = await this.companyRepository.findOneBy({ id });
    // console.log(r);
    if (!r) throw new NotFoundException(`Company with ID ${id} not found.`);
    return r;
  }

  async deleteCompany(id: number): Promise<void> {
    const r = await this.companyRepository.delete(id);
    // console.log(r);
    if ( r.affected === 0 ) throw new NotFoundException(`Company with ID ${id} not found.`);
  }

  // async filter(filter: GetCompaniesFilterDto): Promise<Company[]> {
    
  //   const { status, search } = filter;

  //   // console.log(filter);

  //   let companies = await this.getCompanies();

  //   if (status)
  //     companies = companies.filter((company) => company.active === status);

  //   if (search) {
  //     companies = companies.filter(
  //       (company) =>
  //         company.name.includes(search) ||
  //         company.registryNumber.includes(search),
  //     );
  //   }

  //   return companies;
  // }

  async updateCompanyStatus(id: number, status: CompanyStatus): Promise<Company> {
    const r = await this.getCompanyById(id);
    r.active = status;
    await r.save();
    return r;
  }  

}
