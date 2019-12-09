import { IsNotEmpty, Length, IsOptional, IsEmail, IsEnum } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @Length(5, 240)
  @IsEmail()
  readonly username: String;

  @Length(5, 20)
  @IsNotEmpty()
  readonly pass: String;

  readonly roles: String[];
}