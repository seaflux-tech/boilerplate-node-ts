import { IsNotEmpty, IsUUID, MaxLength, MinLength, Validate } from "class-validator";
import { PasswordValidation, PasswordValidationRequirement } from "class-validator-password-check/lib";

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class ResetPasswordDto {
  @IsUUID()
  @IsNotEmpty()
  public token: string;

  @Validate(PasswordValidation, [passwordRequirement])
  @MaxLength(20)
  @MinLength(6)
  @IsNotEmpty()
  public password: string;
}
