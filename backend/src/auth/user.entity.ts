/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt'
import { Company } from 'src/companies/company.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;  

  @Column()
  active: boolean;

  @OneToMany(type => Company, company => company.user, { eager: true })
  companies: Company[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    // console.log(`hash = ${hash}`);
    // console.log(`password = ${this.password}`);
    return hash === this.password;
  }

}