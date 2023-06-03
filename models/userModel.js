import { sequelizes, DataTypes } from "../libs/db.config.js";

const Users = sequelizes.define('Users', {
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
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
});



sequelizes.sync().then(() => {
    console.log("Create User Success");
}).catch((error) => {
    console.error('Unable to create table user : ', error);
});

export default Users;