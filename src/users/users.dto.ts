import { IsString, IsEmail } from "class-validator";

export class RegisterUser {
  @IsEmail()
  email: string;

  @IsString()
  password: number;
}

export class LoginUser {
  @IsEmail()
  email: string;

  @IsString()
  password: number;
}
