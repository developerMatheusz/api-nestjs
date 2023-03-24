import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsDateString
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  name: string;

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

  @IsOptional()
  @IsDateString()
  birthAt: string;
}
