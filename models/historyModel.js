import sequelizes from "../libs/db.config.js";
import { Model, DataTypes } from "sequelize";

class History extends Model { }
History.init({
    historyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
    },
    jenisTanaman: {
        type: DataTypes.STRING,
        allowNull: false
    },
    onPlant: {
        type: DataTypes.STRING,
        allowNull: false
    },
    onHarvest: {
        type: DataTypes.STRING,
        allowNull: false
    },
    harvestResult: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizes,
    modelName: 'history'
});

export default History;