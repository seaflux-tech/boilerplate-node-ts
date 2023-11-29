import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { CheckUserExist } from "../validators/check-user-exist.validator";

export class SigninWithEmailDto {
  @CheckUserExist()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @MaxLength(100)
  @IsNotEmpty()
  public password: string;
}
