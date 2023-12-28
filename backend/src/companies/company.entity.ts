import {
  BaseEntity,
  Column,
  Entity,
  // ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CompanyStatus } from './company-status.enum';
// import { User } from "src/auth/user.entity";

@Entity()
@Unique(['registryNumber'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  registryNumber: string;

  @Column()
  active: CompanyStatus;

  // @ManyToOne(type => User, user => user.companies, { eager: false })
  // user: User;

  @Column()
  userId: number;
}
