import { validate } from "class-validator";
import env from "../configs/env";
import { Log } from "./logger.helper";

export class EnvValidator {
    public static logger = Log.getLogger();
    public static async validate() {
        const errors = await validate(env);
        if (errors.length > 0) {
            EnvValidator.logger.error(errors.map(({ constraints }) => constraints));
            throw new Error("ENV file is  invalid");
        } else {
            EnvValidator.logger.info("ENV file validated");
        }
    }
}
