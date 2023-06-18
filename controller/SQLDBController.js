import Users from "../models/userModel.js";
import Event from "../models/eventModel.js";
import Plant from "../models/plantModel.js";
import History from "../models/historyModel.js";
import TipsTrick from "../models/tipsTrickModel.js";

import sequelizes from "../libs/db.config.js";

Event.belongsTo(Users, { foreignKey: 'uid' });
Event.belongsTo(Plant, { foreignKey: 'plantId' });
History.belongsTo(Users, { foreignKey: 'uid' });
Plant.hasMany(Event, { foreignKey: 'plantId',
 });
Users.hasMany(History, {
    foreignKey: 'uid',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
});
Users.hasMany(Event, {
    foreignKey: 'uid',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
});

sequelizes.sync().then(() => {
    console.log("Create All Tablest Success");
}).catch((error) => {
    console.error('Unable to create All Tables: ', error);
});

export const createUser = (data) => new Promise((resolve, reject) => {
    Users.create(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const findOneUser = (data) => new Promise((resolve, reject) => {
    Users.findOne(data).then((result) => {
        if (result != null) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

export const findAllUser = (data) => new Promise((resolve, reject) => {
    Users.findAll(data).then((result) => {
        if (result != null) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

export const UpdateUser = (data, condition) => new Promise((resolve, reject) => {
    Users.update(data, condition).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    })
});

export const SQLDeleteUser = (data) => new Promise((resolve, reject) => {
    Users.destroy(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    })
});

export const SQLCountUser = () => new Promise((resolve, reject) => {
    Users.count().then((result) => {
        resolve(result);
    }).catch((error) => {
        reject(error);
    })
});


//for plant and weather

export const findOnePlant = (data) => new Promise((resolve, reject) => {
    Plant.findOne(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

export const findAllPlant = (data) => new Promise((resolve, reject) => {
    Plant.findAll(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

export const SQLCreatePlant = (data) => new Promise((resolve, reject) => {
    Plant.create(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const SQLUpdatePlant = (data, condition) => new Promise((resolve, reject) => {
    Plant.update(data, condition).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const SQLDeletePlant = (data) => new Promise((resolve, reject) => {
    Plant.destroy(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const SQLCountPlant = () => new Promise((resolve, reject) => {
    Plant.count().then((result) => {
        resolve(result);
    }).catch((error) => {
        reject(error);
    })
});


//for event
export const createEvent = (data) => new Promise((resolve, reject) => {
    Event.create(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const findAllEvent = (data) => new Promise((resolve, reject) => {
    Event.findAll(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

export const findOneEvent = (data) => new Promise((resolve, reject) => {
    Event.findOne(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

export const updateOneEvent = (data, condition) => new Promise((resolve, reject) => {
    Event.update(data, condition).then(() => {
        resolve(true)
    }).catch((error) => {
        reject(error);
    })
});

export const deleteOneEvent = (data) => new Promise((resolve, reject) => {
    Event.destroy(data).then(() => {
        resolve(true)
    }).catch((error) => {
        reject(error);
    })
})

//max id event
export const findMaxId = () => new Promise((resolve, reject) => {
    Event.max('eventId').then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
});

//for history
export const AddHistory = (data) => new Promise((resolve, reject) => {
    History.create(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const GetHistory = (data) => new Promise((resolve, reject) => {
    History.findAll(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    });
});

export const DeleteOneHistory = (data) => new Promise((resolve, reject) => {
    History.destroy(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
})

export const findMaxIdHistory = () => new Promise((resolve, reject) => {
    History.max('historyId').then((result) => {
        resolve(result)
    }).catch((error) => {
        reject(error);
    })
});

//for tips trick
export const GetAllTipsTrick = (data) => new Promise((resolve, reject) => {
    TipsTrick.findAll(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    });
});

export const GetOneTipsTricks = (data) => new Promise((resolve, reject) => {
    TipsTrick.findOne(data).then((result) => {
        if ((result != null) || (result != '')) {
            resolve(result);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    });
});

export const SQLCreateTips = (data) => new Promise((resolve, reject) => {
    TipsTrick.create(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const SQLUpdateTIps = (data, condition) => new Promise((resolve, reject) => {
    TipsTrick.update(data, condition).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const SQLDeleteTips = (data) => new Promise((resolve, reject) => {
    TipsTrick.destroy(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const SQLCountTips = () => new Promise((resolve, reject) => {
    TipsTrick.count().then((result) => {
        resolve(result);
    }).catch((error) => {
        reject(error);
    })
});



