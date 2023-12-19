/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthSignUpDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(250)
  username: string;  

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^.*(?=.*\d).*$/, { message: 'Your password must contain one digit from 0-9.' })
  @Matches(/^.*(?=.*[a-z]).*$/, { message: 'Your password must contain one lowercase character a-z.' })
  @Matches(/^.*(?=.*[A-Z]).*$/, { message: 'Your password must contain one uppercase character A-Z.' })
  @Matches(/^.*(?=.*[!#$%&?"]).*$/, { message: 'Your password must contain one special character !, #, $, %, & or ?.' })
  password: string;

}