import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const organization = sequelize.define("organization",
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
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
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

export default organization;
