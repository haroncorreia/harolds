/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateEstadoDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  estado: string;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  @Matches(/^[A-Z]+$/, { message: 'Your password must contain uppercase characters.' })
  uf: string;
  
}