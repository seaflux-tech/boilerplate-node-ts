import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const expense = sequelize.define("expense",
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
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        merchantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        refNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reportId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        expDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        canReimburse: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        receiptMediaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
    timestamps: true,
},
);

export default expense;
