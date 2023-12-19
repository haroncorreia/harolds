/* eslint-disable prettier/prettier */
// import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

export class CompanyRepository extends Repository<Company> {
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

  // // sample method for demo purposes
  // async findByRegistryNumber(registryNumber: string): Promise<Company> {
  //   return await this.companyRepository.findOneBy({ registryNumber }); 
  //   // could also be this.findOneBy({ email });, but depending on your IDE/TS settings, 
  //   // could warn that userRepository is not used though. Up to you to use either of the 
  //   // 2 methods
  // }
  
  // // your other custom methods in your repo...
}