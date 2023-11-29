
import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const userInviteRequest = sequelize.define("userInviteRequest",
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("Admin", "Approver", "Submitter"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Pending", "Accepted"),
            allowNull: false,
            defaultValue: "Pending",
        },
    }, {
    timestamps: true,
},
);

export default userInviteRequest;
