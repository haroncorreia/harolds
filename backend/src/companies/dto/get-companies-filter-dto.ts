/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { CompanyStatus } from "../company-status.enum";

export class GetCompaniesFilterDto {
  
  @IsOptional()
  @IsIn([CompanyStatus.ACTIVE, CompanyStatus.DEACTIVE])
  status: CompanyStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
  
}