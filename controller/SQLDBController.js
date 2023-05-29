import Users from "../models/userModel.js";

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

