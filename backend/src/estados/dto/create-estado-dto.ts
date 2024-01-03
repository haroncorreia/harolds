import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateEstadoDto {

  @IsString({ message: 'O campo Estado deve ser do tipo alfanumérico (string).' })
  @IsNotEmpty({ message: 'O campo Estado não pode ser vazio.' })
  @MinLength(3, { message: 'O campo Estado deve conter pelo menos 3 dígitos.' })
  @MaxLength(100, { message: 'O campo Estado deve conter no máximo 100 dígitos.' })
  estado: string;

  @IsString({ message: 'O campo UF deve ser do tipo alfabético (string).' })
  @IsNotEmpty({ message: 'O campo UF não pode ser vazio.' })
  @Matches(/^[A-Z]+$/, { message: 'O campo UF deve conter apenas caracteres alfabéticos maiúculos (de A a Z).' })
  @Matches(/^[A-Z]{2}$/, { message: 'O campo UF deve conter 2 dígitos.' })
  uf: string;
  
}