import { IsNotEmpty, IsUUID } from "class-validator";

export class VerifyEmailDto {
  @IsUUID()
  @IsNotEmpty()
  public token: string;
}
