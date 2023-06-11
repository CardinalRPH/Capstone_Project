import sequelizes from "../libs/db.config.js";
import { Model, DataTypes } from "sequelize";

class Plant extends Model { }
Plant.init({
    plantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
}, {
    sequelize: sequelizes,
    modelName: 'plant'
});

export default Plant;