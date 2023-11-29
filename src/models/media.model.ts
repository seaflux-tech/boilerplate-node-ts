import { DataTypes } from "sequelize";
import { DB } from "../configs/db";

const sequelize = DB.sq();

const media = sequelize.define("media",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        mime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
    timestamps: true,
},
);

export default media;
