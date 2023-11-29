import { error } from "console";
import { Request, Response } from "express";
import * as _ from "lodash";
import { Constants } from "./configs/constants";
import { Jwt } from "./helpers/jwt.helper";
import organization from "./models/organization.model";
import user from "./models/user.model";

export class Middleware {
    public static destructPager(req: Request, _: Response, next: () => void) {
        const {
            page = Constants.PAGER.page,
            limit = Constants.PAGER.limit,
        } = req.query as any;

        req.pager = {
            page: +page,
            limit: +limit
        }
        next();
    }

    public static auth = async (req: Request, res: Response, next: () => void) => {
        if (req.headers.authorization && !_.isEmpty(req.headers.authorization)) {
            const tokenInfo = Jwt.decode(req.headers.authorization.toString().replace("Bearer ", ""));
            if (tokenInfo) {
                const _user = await user.findOne({
                    attributes: { exclude: ["password", "inviteById", "inviteStatus", "status", "updatedAt"] },
                    where: {
                        id: tokenInfo.id,
                    },
                    include: {
                        model: organization,
                        attributes: ["name"],
                    },
                });
                if (_user) {
                    req.me = _user as any;
                    next();
                } else {
                    res.status(401).json({ error: "Unauthorized", code: 401 });
                    return;
                }
            } else {
                res.status(401).json({ error: "Unauthorized", code: 401 });
                return;
            }
        } else {
            res.status(401).json({ error: "Unauthorized", code: 401 });
            return;
        }
    }

    public static acl = (roles: string | string[]) => {
        let allowedRoles = roles;
        if (typeof roles === "string") {
            allowedRoles = [roles];
        }
        return (req: Request, res: Response, next: () => void) => {
            const { me: { role } } = req;
            allowedRoles.includes(role) ? next() : res.status(403).json({ error: "Access Denied" });
        }
    }
}
