import { getDocs, where, getDoc, doc, updateDoc, query, setDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../globals/FirebaseConfig.js";
import MODELS from "../models/FirebaseFireStore.model.js";

const createUserDB = (newData, id) => new Promise((resolve, reject) => {
    setDoc(doc(MODELS.USERS, id), newData).then(() => {
        resolve({
            ok: true,
            code: 200
        });
    }).catch((error) => {
        reject({
            ok: false,
            code: 500,
            message: error
        });
    })
});

const GoogleCheckEmail = (id) => new Promise((resolve, reject) => {
    getDoc(doc(MODELS.USERS, id)).then((data) => {
        if (data.data() == null) {
            resolve(true);
        } else {
            resolve(false);
        }
    }).catch((error) => {
        reject({
            ok: false,
            code: 500,
            message: error
        });
    })
});





export { createUserDB, GoogleCheckEmail };