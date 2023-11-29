import { IsEmail, IsNotEmpty } from "class-validator";
import { CheckUserExist } from "../validators/check-user-exist.validator";

export class ForgotPasswordDto {
  @CheckUserExist({
    message: "User with $value not exists.",
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
