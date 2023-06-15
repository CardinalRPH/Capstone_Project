import { Sequelize, DataTypes } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_HOST);
const sequelizes = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIAL,
        port: process.env.DB_PORT
    }
);

sequelizes.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelizes