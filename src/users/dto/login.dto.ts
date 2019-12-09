import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @Length(5, 240)
  @IsEmail()
  readonly username: String;

  @Length(5, 20)
  @IsNotEmpty()
  readonly pass: String;
}