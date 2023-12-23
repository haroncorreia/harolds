/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt'
import { AuthSignUpDto } from './dto/auth-signup-dto';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignInDto } from './dto/auth-signin-dto';
// import { CreateUserDto } from './dto/create-user-dto';
// import { UserStatus } from './User-status.enum';
// import { GetCompaniesFilterDto } from './dto/get-companies-filter-dto';

@Injectable()
export class UserRepository extends Repository<User> {
  
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async singUp(authSignUpDto: AuthSignUpDto): Promise<void> {

    const { name, username, password } = authSignUpDto;
    
    const e = new User();
    
    e.name = name;
    e.username = username;
    e.salt = await bcrypt.genSalt();
    e.password = await this.hashPassword(password, e.salt);
    e.active = false;
    // console.log(e.password);
    
    try {
      await this.save(e);
    } catch (error) {
      if (error.code === '23505') {
        // console.log(error.code);
        throw new ConflictException('Username given already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
    
  }

  async validateUserPassword(authSignInDto: AuthSignInDto): Promise<string> {
    
    const { username, password } = authSignInDto;

    const user = await this.findOne({ where: [{username}] });

    if ( user && await user.validatePassword(password) ) {
      return user.username;
    } else {
      return null;
    }

  }

  private async hashPassword(password: string, salt:string): Promise<string> {
    return bcrypt.hash(password, salt);
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