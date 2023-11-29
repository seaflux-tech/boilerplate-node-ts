import Email from "email-templates";
import nodemailer from "nodemailer";
import { Constants } from "../configs/constants";
import env from "../configs/env";
import { Log } from "./logger.helper";

export class Notification {
    private logger = Log.getLogger();

    public async email(template, locals, to) {
        const emailTransport = nodemailer.createTransport({
            host: env.smtpHost,
            port: env.smtpPort,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: env.smtpUser,
                pass: env.smtpPass,
            },
        });

        const email = new Email({
            message: {
                from: Constants.FROM_EMAIL,
            },
            send: true,
            transport: emailTransport,
        });

        await email.send({
            template,
            message: { to },
            locals,
        });
    }
}
