import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { IsDateOnly } from "../../shared/validators/is-date-only.validator";

export class UpdateExpenseDto {
  @MaxLength(20)
  @IsOptional()
  public refNo: string;

  @IsInt()
  @IsNotEmpty()
  public categoryId: number;

  @IsInt()
  @IsNotEmpty()
  public merchantId: number;

  @IsInt()
  @IsOptional()
  public reportId: number;

  @IsDateOnly()
  @IsNotEmpty()
  public expDate: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @MaxLength(500)
  @IsOptional()
  public description: string;

  @IsBoolean()
  @IsOptional()
  public canReimburse: boolean;

  @IsInt()
  @IsOptional()
  public receiptMediaId: number;
}
