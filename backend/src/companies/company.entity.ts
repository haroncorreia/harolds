/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CompanyStatus } from "./company-status.enum";

@Entity()
export class Company extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  registryNumber: string;

  @Column()
  active: CompanyStatus

}