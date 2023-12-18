/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateCompanyDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  registryNumber: string;
  
}