import sequelizes from "../libs/db.config.js";
import { Model, DataTypes } from "sequelize";

class Event extends Model { }
Event.init({
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanam: {
        type: DataTypes.JSON,
        allowNull: false
    },
    pupuk: {
        type: DataTypes.JSON,
        allowNull: false
    },
    siram: {
        type: DataTypes.JSON,
        allowNull: false
    },
    panen: {
        type: DataTypes.JSON,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizes,
    modelName: 'Event'
});

export default Event;