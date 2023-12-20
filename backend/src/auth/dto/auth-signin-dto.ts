/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class AuthCredencialsDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  
}