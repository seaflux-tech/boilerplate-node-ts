import { Router } from "express";
import { Middleware } from "../../middleware";
import { Validator } from "../../validate";
import { AcceptInviteDto } from "./dto/accept-invite.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { EditOrgNameDto } from "./dto/edit-org-name.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { SigninWithEmailDto } from "./dto/signin-with-email.dto";
import { SignupWithEmailDto } from "./dto/signup-with-email.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UserController } from "./user.controller";

const router: Router = Router();
const v: Validator = new Validator();
const userController = new UserController();

router.post("/signup-with-email", v.validate(SignupWithEmailDto), userController.signUpWithEmail);
router.post("/verify-email", v.validate(VerifyEmailDto), userController.verifyEmail);
router.post("/signin-with-email", v.validate(SigninWithEmailDto), userController.signInWithEmail);
router.post("/forgot-password", v.validate(ForgotPasswordDto), userController.forgotPassword);
router.post("/reset-password", v.validate(ResetPasswordDto), userController.resetPassword);
router.post("/accept-invite", v.validate(AcceptInviteDto), userController.acceptInvite);

// Authenticated Routes
router.get("/my-profile", Middleware.auth, userController.myProfile);
router.post("/edit-profile", Middleware.auth, v.validate(EditProfileDto), userController.editProfile);
router.post("/edit-org-name", Middleware.auth, Middleware.acl("Admin"), v.validate(EditOrgNameDto), userController.editOrgName);
router.post("/change-password", Middleware.auth, v.validate(ChangePasswordDto), userController.changePassword);
router.get("/approvers", Middleware.auth, userController.approvers);

export const userRoute: Router = router;
