import sequelizes from "../libs/db.config.js";
import { Model, DataTypes } from "sequelize";

class Users extends Model { }

Users.init({
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Lname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    regence: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isGoogle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: sequelizes,
    modelName: 'users'
});

export default Users;