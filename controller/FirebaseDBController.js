import { getDocs, where, getDoc, doc, updateDoc, query, setDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../globals/FirebaseConfig.js";
import MODELS from "../models/FirebaseFireStore.model.js";

const createUser = (newData, id) => new Promise((resolve, reject) => {
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

const GoogleCheckEmail = (userData) => new Promise((resolve, reject) => {
    
})





export { createUser }  