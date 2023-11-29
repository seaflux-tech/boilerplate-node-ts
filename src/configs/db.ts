import { Sequelize } from "sequelize";
import { Log } from "../helpers/logger.helper";
import env from "./env";

export class DB {

    public static resetDBIfNeeded(): void {
        if (
            env.nodeEnv
            &&
            (env.nodeEnv === "development" || env.nodeEnv === "stage")
            &&
            (env.dropAndCreate && env.dropAndCreate === "true")
        ) {
            DB.gI().logger.info("Dropping tables and re-syncing db.");
            DB.sq().sync({ force: true }).then(() => {
                DB.gI().logger.info("DB Reset Done!");
            });
        }
    }

    public static sq(): Sequelize {
        return this.gI().sequelize;
    }
    private static instance: DB;

    private static gI(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }

        return DB.instance;
    }
    public logger = Log.getLogger();
    private sequelize: Sequelize;

    constructor() {
        const db = env.dbName;
        const username = env.dbUser;
        const password = env.dbPassword;
        const host = env.dbHost;

        this.sequelize = new Sequelize(
            db, username, password,
            {
                host,
                dialect: "mysql",
                port: env.dbPort,
                logging: true,
            },
        );

        this.sequelize.authenticate()
            .then(() => {
                this.logger.info("DB Connection has been established successfully.");

            })
            .catch((error) => {
                this.logger.error(`Unable to connect to the database: ${error}`);
            });
    }
}
