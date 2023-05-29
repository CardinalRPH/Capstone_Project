import { DB_CONFIG } from "../globals/config.js";
import { Sequelize, DataTypes } from "sequelize";

const sequelizes = new Sequelize(
    DB_CONFIG.database,
    DB_CONFIG.user,
    DB_CONFIG.password,
    {
        host: DB_CONFIG.host,
        dialect: DB_CONFIG.dial
    }
);

sequelizes.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export {sequelizes, DataTypes}