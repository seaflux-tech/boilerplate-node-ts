import { IsNotEmpty, MaxLength, MinLength, Validate } from "class-validator";
import { PasswordValidation, PasswordValidationRequirement } from "class-validator-password-check/lib";
import { CheckCurrentPassword } from "../validators/check-current-password.validator";

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class ChangePasswordDto {
  @CheckCurrentPassword()
  @IsNotEmpty()
  public currentPassword: string;

  @Validate(PasswordValidation, [passwordRequirement])
  @MaxLength(20)
  @MinLength(6)
  @IsNotEmpty()
  public password: string;
}
