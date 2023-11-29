
import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const emailVerificationRequest = sequelize.define("emailVerificationRequest",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        status: {
            type: DataTypes.ENUM("Unused", "Used"),
            allowNull: false,
            defaultValue: "Unused",
        },
    }, {
    timestamps: true,
},
);

export default emailVerificationRequest;
