import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from "class-validator";
import { PasswordValidation, PasswordValidationRequirement } from "class-validator-password-check";
import { IsUserAlreadyExist } from "../../shared/validators/is-user-already-exist.validator";

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class SignupWithEmailDto {
  @MaxLength(100)
  @IsNotEmpty()
  public firstName: string;

  @MaxLength(100)
  @IsNotEmpty()
  public lastName: string;

  @IsUserAlreadyExist()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @Validate(PasswordValidation, [passwordRequirement])
  @MaxLength(20)
  @MinLength(6)
  @IsNotEmpty()
  public password: string;

  @MaxLength(70)
  @IsNotEmpty()
  public organizationName: string;
}
