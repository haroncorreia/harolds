/* eslint-disable prettier/prettier */
// import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company-dto';
import { CompanyStatus } from './company-status.enum';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager())
  }

  /**
   * Create company
   * @param createCompanyDto 
   * @returns 
   */
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    
    // Create using Entity
    const { name, registryNumber } = createCompanyDto;
    
    const company = new Company();
    
    company.name = name;
    company.registryNumber = registryNumber;
    company.active = CompanyStatus.DEACTIVE;
    
    await this.save(company);
    
    return company;

  }
  

  async getCompanies(filterDto: GetCompaniesFilterDto): Promise<Company[]> {
    const { status, search } = filterDto;
    const q = this.createQueryBuilder('company')
    if (status)
      q.andWhere('company.active = :status', { status })
    if (search)
      q.andWhere('(company.name LIKE :search OR company.registryNumber LIKE :search)', { search: `%${search}%` })
    const r = await q.getMany();
    return r;
  }

  async customWhere(column: string, value: string | number, operator = '='): Promise<Company> {
    return await this.createQueryBuilder()
      .where(`Company.${column} ${operator} :value`, {value: value})
      .getOne();
  }
  
  // constructor(
  //   @InjectRepository(Company)
  //   private companyRepository: Repository<Company>
  // ) {
  //   super(
  //     companyRepository.target, 
  //     companyRepository.manager, 
  //     companyRepository.queryRunner
  //   );
  // }
  
}