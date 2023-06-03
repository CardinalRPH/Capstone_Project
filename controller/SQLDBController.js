import Users from "../models/userModel.js";
import Event from "../models/eventModel.js";

export const createUser = (data) => new Promise((resolve, reject) => {
    Users.create(data).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    });
});

export const findOne = (data) => new Promise((resolve, reject) => {
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

export const Update = (data, condition) => new Promise((resolve, reject) => {
    Users.update(data, condition).then(() => {
        resolve(true);
    }).catch((error) => {
        reject(error);
    })
});

