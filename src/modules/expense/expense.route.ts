import { Router } from "express";
import { Validator } from "../../validate";
import { BulkCreateExpenseDto } from "./dto/bulk-create.dto";
import { CreateExpenseDto } from "./dto/create.dto";
import { UpdateExpenseDto } from "./dto/update.dto";
import { ExpenseController } from "./expense.controller";

const router: Router = Router();
const v: Validator = new Validator();
const expenseController = new ExpenseController();

router.post("/", v.validate(CreateExpenseDto), expenseController.create);
router.post("/bulk", v.validate(BulkCreateExpenseDto), expenseController.bulkCreate);
router.get("/", expenseController.read);
router.get("/:expenseId", expenseController.readOne);
router.post("/:expenseId", v.validate(UpdateExpenseDto), expenseController.update);
router.delete("/:expenseId", expenseController.delete);

export const expenseRoute: Router = router;
