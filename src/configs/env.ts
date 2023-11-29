import { IsIn, IsInt, IsNotEmpty, IsOptional, IsUrl, Max, Min } from "class-validator";
import * as dotenv from "dotenv";
import { Constants } from "./constants";
dotenv.config();

export class Env {
    @IsInt()
    @Min(2000)
    @Max(9999)
    public port: number;

    @IsNotEmpty()
    public dbName: string;

    @IsNotEmpty()
    public dbHost: string;

    @IsNotEmpty()
    public dbUser: string;

    @IsInt()
    @Min(2000)
    @Max(9999)
    public dbPort: number;

    @IsNotEmpty()
    public dbPassword: string;

    @IsNotEmpty()
    public jwtSecret: string;

    @IsNotEmpty()
    public corsDomain: string;

    @IsNotEmpty()
    @IsIn(Constants.ENVIRONMENTS)
    public nodeEnv: string;

    @IsOptional()
    @IsIn(["true", "false"])
    public dropAndCreate: string;

    @IsNotEmpty()
    public smtpHost;

    @IsNotEmpty()
    public smtpUser;

    @IsNotEmpty()
    public smtpPass;

    @IsInt()
    @Min(25)
    @Max(587)
    public smtpPort;

    @IsUrl({
        require_tld: false,
    })
    public webAppUrl;
}

const env = new Env();

env.dbName = process.env.DB_NAME;
env.dbHost = process.env.DB_HOST;
env.dbUser = process.env.DB_USER;
env.dbPort = +(process.env.DB_PORT || 3306);
env.dbPassword = process.env.DB_PASSWORD;
env.jwtSecret = process.env.JWT_SECRET;
env.corsDomain = process.env.CORS_DOMAIN;
env.port = +process.env.PORT;
env.nodeEnv = process.env.NODE_ENV;
env.dropAndCreate = process.env.DROP_AND_RECREATE_TABLE;
env.smtpHost = process.env.SMTP_HOST;
env.smtpUser = process.env.SMTP_USER;
env.smtpPass = process.env.SMTP_PASS;
env.smtpPort = +(process.env.SMTP_PORT || 587);
env.webAppUrl = process.env.WEB_APP_URL;

export default env;
