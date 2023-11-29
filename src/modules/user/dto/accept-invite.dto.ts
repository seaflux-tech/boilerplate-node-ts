import { IsNotEmpty, IsUUID, MaxLength, MinLength, Validate } from "class-validator";
import { PasswordValidation, PasswordValidationRequirement } from "class-validator-password-check/lib";
import { CheckInviteRequestExist } from "../validators/check-invite-request-exist.validator";
import { IsUserExistInviteRequestExist } from "../validators/is-user-exist-invite-request.validator";

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class AcceptInviteDto {
  @IsUserExistInviteRequestExist()
  @CheckInviteRequestExist()
  @IsUUID()
  @IsNotEmpty()
  public token: string;

  @Validate(PasswordValidation, [passwordRequirement])
  @MaxLength(20)
  @MinLength(6)
  @IsNotEmpty()
  public password: string;
}
