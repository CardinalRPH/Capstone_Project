import sequelizes from "../libs/db.config.js";
import { Model, DataTypes } from "sequelize";

class TipsTrick extends Model { }
TipsTrick.init({
    tipsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    article: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Imguri: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ImgRef: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categories: {
        type: DataTypes.STRING,
        allowNull:false
    },
    Author: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize: sequelizes,
    modelName: 'tipstrick'
});

export default TipsTrick;