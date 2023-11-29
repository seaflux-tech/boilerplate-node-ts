import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";

export class CreateExpenseDto {
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

  @IsDateString()
  @IsNotEmpty()
  public expDate: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @MaxLength(500)
  @IsOptional()
  public description: string;

  @IsBoolean()
  public canReimburse: boolean;

  @IsInt()
  @IsOptional()
  public receiptMediaId: number;
}
