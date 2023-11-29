import { Router } from "express";
import * as l10n from "jm-ez-l10n";
import { Middleware } from "./middleware";
import { categoryRoute } from "./modules/category/category.route";
import { expenseRoute } from "./modules/expense/expense.route";
import { mediaRoute } from "./modules/media/media.route";
import { userRoute } from "./modules/user/user.route";

export class Routes {
  public configure() {
    const router = Router();
    router.use("/user", userRoute);
    router.use("/categories", Middleware.auth, categoryRoute);
    router.use("/media", Middleware.auth, mediaRoute);
    router.use("/expenses", Middleware.auth, expenseRoute);

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
