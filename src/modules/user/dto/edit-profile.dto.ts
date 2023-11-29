import { IsNotEmpty, MaxLength } from "class-validator";

export class EditProfileDto {
  @MaxLength(100)
  @IsNotEmpty()
  public firstName: string;

  @MaxLength(100)
  @IsNotEmpty()
  public lastName: string;
}
