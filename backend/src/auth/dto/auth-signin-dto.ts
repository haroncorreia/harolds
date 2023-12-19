/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty } from "class-validator";

export class AuthCredencialsDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;  

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  active: boolean;
  
}