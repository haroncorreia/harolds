/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
// import { CompanyRepository } from './company.repository';

@Injectable()
export class CompaniesService {
  
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    // private readonly companyRepository: CompanyRepository,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const r = await this.companyRepository.findOneBy({ id });
    if (!r) throw new NotFoundException(`Company with registry ${id} not found.`);
    return r;
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async filter(filter: GetCompaniesFilterDto): Promise<Company[]> {
    
    const { status, search } = filter;

    let companies = await this.findAll();

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

}
