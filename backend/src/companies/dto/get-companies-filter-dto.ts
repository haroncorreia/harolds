/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { CompanyActive } from "../company.model";

export class GetCompaniesFilterDto {
  @IsOptional()
  @IsIn([CompanyActive.ACTIVE, CompanyActive.DEACTIVE])
  status: CompanyActive;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}