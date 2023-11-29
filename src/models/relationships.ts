import category from "./category.model";
import emailVerificationRequest from "./email-verification-request.model";
import expense from "./expense.model";
import media from "./media.model";
import merchant from "./merchant.model";
import organization from "./organization.model";
import report from "./report.model";
import resetPasswordRequest from "./reset-rassword-request.model";
import userInviteRequest from "./user-invite-request.model";
import user from "./user.model";

export class Relationships {
    public static define() {
        // Relationships
        user.hasMany(userInviteRequest);
        userInviteRequest.belongsTo(user);

        user.hasMany(resetPasswordRequest);
        resetPasswordRequest.belongsTo(user);

        user.hasMany(emailVerificationRequest);
        emailVerificationRequest.belongsTo(user);

        user.hasMany(merchant, {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });
        merchant.belongsTo(user);

        user.hasMany(category, {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        category.belongsTo(user);

        user.hasOne(organization);
        organization.belongsTo(user);

        user.hasMany(report);
        report.belongsTo(user);

        user.hasMany(expense);
        expense.belongsTo(user);

        user.hasMany(report, {
            as: "approver", foreignKey: "approverId",
        });
        report.belongsTo(user, { as: "approver", foreignKey: "approverId" });

        user.hasMany(user, {
            as: "inviter", foreignKey: "inviteById",
        });
        user.belongsTo(user, { foreignKey: "inviteById" });

        user.hasMany(user, {
            as: "submitsTo", foreignKey: "submitsToId",
        });
        user.belongsTo(user, { foreignKey: "submitsToId" });

        expense.belongsTo(report);

        category.hasMany(expense);
        expense.belongsTo(category);

        merchant.hasMany(expense);
        expense.belongsTo(merchant);

        media.hasMany(expense, {
            as: "receipt", foreignKey: "receiptMediaId",
        });
        expense.belongsTo(media, { as: "receipt", foreignKey: "receiptMediaId" });
    }
}
