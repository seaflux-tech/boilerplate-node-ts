import { json, urlencoded } from "body-parser";
import compression from "compression";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet"; // Security
import * as l10n from "jm-ez-l10n";
import methodOverride from "method-override";
import morgan from "morgan";
import { DB } from "./configs/db";
import { Cors } from "./helpers/cors.helper";
import { EnvValidator } from "./helpers/env-validator.helper";
import { HandleUnhandledPromise } from "./helpers/handle-unhandled-promise.helper";
import { Log } from "./helpers/logger.helper";
import { Middleware } from "./middleware";
import { Relationships } from "./models/relationships";
import { Routes } from "./routes";
import path from "path";
dotenv.config();

export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    // Handle Unhandled Promise Rejections
    new HandleUnhandledPromise().init();

    // Validate ENV file
    EnvValidator.validate();

    // Init Express
    this.app = express();

    // Security
    Cors.enable(this.app);
    this.app.use(helmet());
    this.app.use(morgan("tiny"));
    this.app.use(compression());

    // Enable DELETE and PUT
    this.app.use(methodOverride());

    // Translation
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(l10n.enableL10NExpress);

    // Body Parsing
    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

    // Destruct Pager from query string and typecast to numbers
    this.app.use(Middleware.destructPager);

    // Upload directory
    // this.app.use(express.static('uploads'));
    console.log(path.join(__dirname, '../uploads'));
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Routing
    const routes = new Routes();
    this.app.use("/", routes.configure());

    // Start server
    this.app.listen(process.env.PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
    });

    // init DB.
    DB.sq();
    DB.resetDBIfNeeded();
    Relationships.define();
  }
}
