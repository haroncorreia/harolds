/* eslint-disable prettier/prettier */
// import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredencialsDto } from './dto/auth-credencials-dto';
// import { CreateUserDto } from './dto/create-user-dto';
// import { UserStatus } from './User-status.enum';
// import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';

@Injectable()
export class UserRepository extends Repository<User> {
  
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async singUp(authCredencialsDto: AuthCredencialsDto) {

    const { username, password } = authCredencialsDto;
    
    const e = new User();
    
    e.username = username;
    e.password = password;
    
    await this.save(e);
    
    return e;    
    
  }
  // /**
  //  * Create User
  //  * @param createUserDto 
  //  * @returns 
  //  */
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
    
  //   // Create using Entity
  //   const { name, registryNumber } = createUserDto;
    
  //   const User = new User();
    
  //   User.name = name;
  //   User.registryNumber = registryNumber;
  //   User.active = UserStatus.DEACTIVE;
    
  //   await this.save(User);
    
  //   return User;

  // }
  

  // async getCompanies(filterDto: GetCompaniesFilterDto): Promise<User[]> {
  //   const { status, search } = filterDto;
  //   const q = this.createQueryBuilder('User')
  //   if (status)
  //     q.andWhere('User.active = :status', { status })
  //   if (search)
  //     q.andWhere('(User.name LIKE :search OR User.registryNumber LIKE :search)', { search: `%${search}%` })
  //   const r = await q.getMany();
  //   return r;
  // }

  // async customWhere(column: string, value: string | number, operator = '='): Promise<User> {
  //   return await this.createQueryBuilder()
  //     .where(`User.${column} ${operator} :value`, {value: value})
  //     .getOne();
  // }
  
 
}