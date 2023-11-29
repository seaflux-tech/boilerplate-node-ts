import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const report = sequelize.define("report",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purpose: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        durationStart: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        durationEnd: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        approverId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        submittedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reimbursementNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reimbursedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reimbursePaidThrough: {
            type: DataTypes.ENUM("Petty Cash", "Undeposited Funds", "TDS Payable"),
            allowNull: true,
        },
        reimburseRefNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("Unapproved", "PendingApproval", "Approved", "Rejected", "Reimbursed"),
            defaultValue: "Unapproved",
        },
    }, {
    timestamps: true,
},
);

export default report;
