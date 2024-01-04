// import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company-dto';
import { CompanyStatus } from './company-status.enum';
import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';
import { User } from 'src/auth/user.entity';

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
  async createCompany(
    createCompanyDto: CreateCompanyDto,
    loggedUser: User
    ): Promise<Company> {
    
    // Create using Entity
    const { name, registryNumber } = createCompanyDto;
    
    const e = new Company();
    
    e.name = name;
    e.registryNumber = registryNumber;
    e.active = CompanyStatus.DEACTIVE;
    // e.user = loggedUser
    
    try {
      await this.save(e);
    } catch (error) {
      if (error.code === '23505') {
        // console.log(error.code);
        throw new ConflictException('Registry number given already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
    
    // Deleting user to return only company entity back do frontend
    // delete e.user;
    return e;

  }
  

  async getCompanies(
    filterDto: GetCompaniesFilterDto,
    loggedUser: User
    ): Promise<Company[]> {
    const { status, search } = filterDto;
    const q = this.createQueryBuilder('company')
    q.where('company.userId = :userId', { userId: loggedUser.id })
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