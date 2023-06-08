import { sequelizes, DataTypes } from "../libs/db.config.js";
import Users from "./userModel.js";
import Plant from "./plantModel.js";

const Event = sequelizes.define('Event', {
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
});

Users.hasMany(Event, { foreignKey: 'uid' });
Event.belongsTo(Users, { foreignKey: 'uid' });

Plant.hasMany(Event, { foreignKey: 'plantId' });
Event.belongsTo(Users, { foreignKey: 'plantId' });

sequelizes.sync().then(() => {
    console.log("Create Event Success");
}).catch((error) => {
    console.error('Unable to create table Event : ', error);
});

export default Event;