import Users from "../models/userModel.js";
import Event from "../models/eventModel.js";
import Plant from "../models/plantModel.js";


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

export const UpdateUser = (data, condition) => new Promise((resolve, reject) => {
    Users.update(data, condition).then(() => {
        resolve(true);
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
})

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
})

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
})

