import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const user = sequelize.define("user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
            },
            set() {
                throw new Error('Do not try to set the `name` value!');
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM("Admin", "Approver", "Submitter"),
            defaultValue: "Admin",
        },
        provider: {
            type: DataTypes.ENUM("Email", "Google"),
            defaultValue: "Email",
        },
        inviteById: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        submitsToId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        emailVerificationStatus: {
            type: DataTypes.ENUM("Pending", "Accepted"),
            allowNull: true,
            defaultValue: "Pending",
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
    timestamps: true,
},
);

export default user;
