import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginReq {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
