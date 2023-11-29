import { Router } from "express";
import { Middleware } from "../../middleware";
import { Validator } from "../../validate";
import { CategoryController } from "./category.controller";
import { CreateCategoryDto } from "./dto/create.dto";
import { UpdateCategoryDto } from "./dto/update.dto";

const router: Router = Router();
const v: Validator = new Validator();
const categoryController = new CategoryController();

router.post("/", v.validate(CreateCategoryDto), categoryController.create);
router.get("/", categoryController.read);
router.get("/:categoryId", categoryController.readOne);
router.post("/:categoryId", Middleware.acl("Admin"), v.validate(UpdateCategoryDto), categoryController.update);
router.delete("/:categoryId", Middleware.acl("Admin"), categoryController.delete);

export const categoryRoute: Router = router;
