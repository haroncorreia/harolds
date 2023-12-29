/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateEstadoDto {

  @IsString({ message: 'Estado deve ser do tipo string.' })
  @IsNotEmpty({ message: 'Estado não pode ser vazio.' })
  @MinLength(3, { message: 'Estado deve conter no mínimo 3 dígitos.' })
  @MaxLength(250, { message: 'Estado deve conter no máximo 250 dígitos.' })
  estado: string;

  @IsString({ message: 'UF deve ser do tipo string.' })
  @IsNotEmpty({ message: 'UF não pode ser vazio.' })
  @Matches(/^[A-Z]+$/, { message: 'UF deve conter apenas caracteres alfabéticos maiúculos.' })
  @Matches(/^[A-Z]{2}$/, { message: 'UF deve conter 2 dígitos.' })
  uf: string;
  
}