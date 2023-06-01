import { sequelizes, DataTypes } from "../libs/db.config.js";
import Users from "./userModel.js";

const Event = sequelizes.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull:false
    },
    color: {
        type: DataTypes.STRING,
        allowNull:false
    },
    tanam: {
        type: DataTypes.JSON,
        allowNull:false
    },
    pupuk: {
        type: DataTypes.JSON,
        allowNull:false
    },
    siram: {
        type:DataTypes.JSON,
        allowNull:false
    },
    panen: {
        type: DataTypes.JSON,
        allowNull:false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

Users.hasMany(Event, { foreignKey: 'uid' });
Event.belongsTo(Users, { foreignKey: 'uid' });

sequelizes.sync().then(() => {
    console.log("Create Event Success");
}).catch((error) => {
    console.error('Unable to create table Event : ', error);
});

export default Event;


// const Tanam = {
//     gid: 112,
//     name: "menanam",
//     start: "ab"
// }

// const siram = [{
//     gid: 112,
//     name: "mentiram1",
//     start: "cd"
// }, {
//     gid: 112,
//     name: "mentiram2",
//     start: "ef"
// }]

// const pupuk = [{
//     gid: 112,
//     name: "memupuk1",
//     start: "gh"
// }, {
//     gid: 112,
//     name: "memupuk2",
//     start: "ij"
// }]

// const Panen = {
//     gid: 112,
//     name: "manen",
//     start: "kl"
// }

// const mergedArray = [];

// mergedArray.push(tanam);
// mergedArray.push(...siram);
// mergedArray.push(...pupuk);
// mergedArray.push(panen);

