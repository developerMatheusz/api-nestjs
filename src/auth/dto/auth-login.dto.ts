import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1
  })
  password: string;
}
