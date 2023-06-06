import { sequelizes, DataTypes } from "../libs/db.config.js";


const Plant = sequelizes.define('plant', {
    plantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inWeatherFrom: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inWeatherto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    onWatering: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    onFertilizer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onHarvest: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sequelizes.sync().then(() => {
    console.log("Create Plant Success");
}).catch((error) => {
    console.error('Unable to create table Plant : ', error);
});

export default Plant;