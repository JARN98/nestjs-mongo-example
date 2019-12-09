import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class PublicationDto {
  @Length(1, 250)
  @IsNotEmpty()
  readonly title: String;

  @Length(1, 10000)
  readonly content: String;
}