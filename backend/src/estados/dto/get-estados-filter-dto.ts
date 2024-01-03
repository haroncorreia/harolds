import { IsNotEmpty, IsOptional } from "class-validator";

export class GetEstadosFilterDto {
  
  @IsOptional()
  @IsNotEmpty()
  campo: string;

  @IsOptional()
  @IsNotEmpty()
  valor: string;
  
}