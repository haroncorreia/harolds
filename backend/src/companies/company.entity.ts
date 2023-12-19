/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CompanyStatus } from "./company-status.enum";

@Entity()
export class Company {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  registryNumber: string;

  @Column()
  active: CompanyStatus

}