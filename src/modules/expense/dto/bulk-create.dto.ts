import { ArrayMaxSize, ArrayMinSize, IsArray } from "class-validator";
import { BulkExpenses } from "../validators/bulk-expenses.validator";
import { CreateExpenseDto } from "./create.dto";

export class BulkCreateExpenseDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @BulkExpenses()
  expenses: CreateExpenseDto[];
}
