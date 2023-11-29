import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
import { Constants } from "../../configs/constants";
import env from "../../configs/env";
import { Cryptic } from "../../helpers/cryptic.helper";
import { Jwt } from "../../helpers/jwt.helper";
import { Notification } from "../../helpers/notification.helper";
import emailVerificationRequest from "../../models/email-verification-request.model";
import organization from "../../models/organization.model";
import resetPasswordRequest from "../../models/reset-rassword-request.model";
import userInviteRequest from "../../models/user-invite-request.model";
import user from "../../models/user.model";
import { AcceptInviteDto } from "./dto/accept-invite.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { EditOrgNameDto } from "./dto/edit-org-name.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { SigninWithEmailDto } from "./dto/signin-with-email.dto";
import { SignupWithEmailDto } from "./dto/signup-with-email.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";

export class UserController {
    public async signUpWithEmail(req: Request, res: Response) {
        const {
            firstName, lastName, organizationName, email, password,
        } = req.dto as SignupWithEmailDto;

        const crypticPass = await Cryptic.crypt(password);
        const _user = await user.create({
            firstName,
            lastName,
            email,
            password: crypticPass,
        }) as any;

        const _organization = await organization.create({
            name: organizationName,
            userId: _user.id,
        }) as any;

        _user.update({
            organizationId: _organization.id,
        }, {
            where: {
                id: _user.id,
            },
        });

        //  Create Verification token
        const _emailVerificationRequest = await emailVerificationRequest.create({
            userId: _user.id,
        }) as any;

        // Send verification email
        const notification = new Notification();
        notification.email("signup", {
            link: `${env.webAppUrl}/auth/verify/${_emailVerificationRequest.uuid}`,
        }, _user.email);

        res.status(200).json({ msg: "Please check your email to activate your account" });
    }

    public async verifyEmail(req: Request, res: Response) {
        const { token } = req.dto as VerifyEmailDto;

        const _emailVerificationRequest = await emailVerificationRequest.findOne({
            attributes: ["userId", "id"],
            where: {
                uuid: token,
                status: "Unused",
            },
        }) as any;

        if (_emailVerificationRequest) {
            // Verify success
            user.update({
                emailVerificationStatus: "Accepted",
            }, {
                where: {
                    id: _emailVerificationRequest.userId,
                },
            });
            _emailVerificationRequest.status = "Used";
            _emailVerificationRequest.save();
        } else {
            return res.status(400).json({ error: "Invalid verification token!" });
        }

        res.status(200).json({ msg: "Email verified successfully!" });
    }

    public async signInWithEmail(req: Request, res: Response) {
        const { email, password } = req.dto as SigninWithEmailDto;

        const _user = await user.findOne({
            attributes: ["id", "password", "emailVerificationStatus", "role"],
            where: {
                email,
            },
        }) as any;

        if (_user.emailVerificationStatus !== "Accepted") {
            return res.status(400).json({ error: "Please verify email account!" });
        }

        const checkPass = await Cryptic.compare(password, _user.password);

        if (!checkPass) {
            return res.status(400).json({ error: "Please check your password!" });
        }

        // Create token
        const token = Jwt.encode({ id: _user.id });
        res.status(200).json({ token, role: _user.role });
    }

    public async forgotPassword(req: Request, res: Response) {
        const { email } = req.dto as ForgotPasswordDto;

        const _user = await user.findOne({
            attributes: ["id"],
            where: {
                email,
            },
        }) as any;

        //  Create Reset Password token
        const _resetPasswordRequest = await resetPasswordRequest.create({
            userId: _user.id,
        }) as any;

        // Send verification email
        const notification = new Notification();
        await notification.email("forgot-password", {
            link: `${env.webAppUrl}/auth/reset-password/${_resetPasswordRequest.uuid}`,
        }, email);

        res.status(200).json({ msg: "Please check your email for reset password instructions!" });
    }

    public async resetPassword(req: Request, res: Response) {
        const { token, password } = req.dto as ResetPasswordDto;

        const _resetPasswordRequest = await resetPasswordRequest.findOne({
            attributes: ["userId", "id"],
            where: {
                uuid: token,
                createdAt: {
                    [Op.gte]: moment().subtract(Constants.RESET_PASS_EXPIRY, "seconds").toDate(),
                },
                status: "Unused",
            },
        }) as any;

        if (_resetPasswordRequest) {
            // Update Password
            const crypticPass = await Cryptic.crypt(password);
            user.update({
                password: crypticPass,
            }, {
                where: {
                    id: _resetPasswordRequest.userId,
                },
            });

            _resetPasswordRequest.status = "Used";
            _resetPasswordRequest.save();
        } else {
            return res.status(400).json({ error: "Request invalid or expired, please try again!" });
        }

        res.status(200).json({ msg: "Password updated successfully!" });
    }

    public async myProfile(req: Request, res: Response) {
        const { me } = req;
        res.status(200).json(me);
    }

    public async editProfile(req: Request, res: Response) {
        const { firstName, lastName } = req.dto as EditProfileDto;
        const { me } = req;

        await user.update({
            firstName, lastName,
        }, {
            where: {
                id: me.id,
            },
        });

        res.status(200).json({ msg: "Profile updated successfully!" });
    }

    public async editOrgName(req: Request, res: Response) {
        const { organizationName } = req.dto as EditOrgNameDto;
        const { me } = req;

        await organization.update({
            name: organizationName,
        }, {
            where: {
                id: me.organizationId,
            },
        });

        res.status(200).json({ msg: "Organization name updated successfully!" });
    }

    public async changePassword(req: Request, res: Response) {
        const { password } = req.dto as ChangePasswordDto;
        const { me } = req;

        const crypticPass = await Cryptic.crypt(password);
        user.update({
            password: crypticPass,
        }, {
            where: {
                id: me.id,
            },
        });
        res.status(200).json({ msg: "Password updated successfully!" });
    }


    public async acceptInvite(req: Request, res: Response) {
        const { token, password } = req.dto as AcceptInviteDto;

        const _userInviteRequest = await userInviteRequest.findOne({
            where: {
                uuid: token,
            },
        }) as any;

        const { firstName, lastName, email, role, userId } = _userInviteRequest;

        const inviter = await user.findByPk(userId) as any;

        const crypticPass = await Cryptic.crypt(password);

        await user.create({
            organizationId: inviter.organizationId,
            role,
            firstName,
            lastName,
            email,
            password: crypticPass,
            inviteById: userId,
            emailVerificationStatus: "Accepted",
        }) as any;

        await _userInviteRequest.destroy();

        res.status(200).json({ msg: "Invitation accepted and signup successful!" });
    }

    public async approvers(req: Request, res: Response) {
        const { me } = req;
        const approvers = await user.findAll({
            attributes: ["id", "name", "firstName", "lastName"],
            where: {
                organizationId: me.organizationId,
                role: ["Approver", "Admin"],
                id: {
                    [Op.ne]: me.id,
                },
            },
        });
        res.status(200).json(approvers);
    }
}
