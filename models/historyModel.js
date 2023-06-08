import { sequelizes, DataTypes } from "../libs/db.config.js";
import Users from "./userModel.js";

const History = sequelizes.define('history', {
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
        type: DataTypes.DATE,
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
});

Users.hasMany(History, { foreignKey: 'uid' });
History.belongsTo(Users, { foreignKey: 'uid' });

sequelizes.sync().then(() => {
    console.log("Create History Success");
}).catch((error) => {
    console.error('Unable to create table History : ', error);
});

export default History;