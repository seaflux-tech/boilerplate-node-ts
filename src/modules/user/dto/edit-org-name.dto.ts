import { IsNotEmpty, MaxLength } from "class-validator";

export class EditOrgNameDto {
  @MaxLength(70)
  @IsNotEmpty()
  public organizationName: string;
}
