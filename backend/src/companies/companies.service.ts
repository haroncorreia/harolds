import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company-dto';
import { CompanyStatus } from './company-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CompaniesService {
  
  constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto, 
    loggedUser: User
    ): Promise<Company> {
    // Using repository
    return this.companyRepository.createCompany(createCompanyDto, loggedUser);
  }

  async getCompanies(
    filterDto: GetCompaniesFilterDto,
    loggedUser: User
    ): Promise<Company[]> {
    return await this.companyRepository.getCompanies(filterDto, loggedUser);
  }

  async getCompanyById(
    id: number,
    loggedUser: User
    ): Promise<Company> {
    const r = await this.companyRepository.findOne({ where: { id, userId: loggedUser.id } });
    // console.log(r);
    if (!r) throw new NotFoundException();
    // if (!r) throw new NotFoundException(`Company with ID ${id} not found.`);
    return r;
  }

  async deleteCompany(
    id: number,
    loggedUser: User
    ): Promise<void> {
    const r = await this.companyRepository.delete({ id, userId: loggedUser.id });
    // console.log(r);
    if ( r.affected === 0 ) throw new NotFoundException(`Company with ID ${id} not found.`);
  }

  async updateCompanyStatus(
    id: number, 
    status: CompanyStatus,
    loggedUser: User
    ): Promise<Company> {
    const r = await this.getCompanyById(id, loggedUser);
    r.active = status;
    await r.save();
    return r;
  }  

}
