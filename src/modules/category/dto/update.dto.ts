import { IsNotEmpty, MaxLength } from "class-validator";
import { IsCategoryAlreadyExist } from "../validators/is-category-already-exist.validator";

export class UpdateCategoryDto {
  @IsNotEmpty()
  public categoryId: number;

  @IsCategoryAlreadyExist()
  @MaxLength(100)
  @IsNotEmpty()
  public name: string;
}
