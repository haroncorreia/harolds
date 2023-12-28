/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";

export class GetEstadosFilterDto {
  
  @IsOptional()
  @IsNotEmpty()
  searchWord: string;
  
}