import bcrypt, { hash } from 'bcrypt';

const stRounds = 10;

export const Hasher = (password) => new Promise((resolve, reject) => {
    bcrypt.genSalt(stRounds).then((salt) => {
        return bcrypt.hash(password, salt);
    }).then((hash) => {
        resolve(hash);
    }).catch((error) => {
        reject(error);
    });
});

export const comparer = (newPassword, oldPassword) => new Promise((resolve, reject) => {
    bcrypt.compare(newPassword, oldPassword).then((result) => { 
        if (result) {
            resolve(true);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject(error);
    })
})