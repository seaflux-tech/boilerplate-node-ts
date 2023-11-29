import cors from "cors";
import { Application } from "express";
import env from "../configs/env";

export class Cors {
    public static enable(app: Application): void {
        const corsOptions = {
            origin(origin, callback) {
                if (env.nodeEnv === "development") { // by pass check if dev
                    callback(null, true);
                } else {
                    const whitelist = process.env.CORS_DOMAIN.split(",");
                    if (whitelist.indexOf(origin) !== -1) {
                        callback(null, true);
                    } else {
                        callback(new Error("Not allowed by CORS"));
                    }
                }
            },
        };
        app.use(cors(corsOptions));
        app.options("*", cors());
    }
}
