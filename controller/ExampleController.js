import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDocs, where, getDoc, doc, updateDoc, query, setDoc, deleteDoc } from "firebase/firestore";
import {firebaseApp} from "../globals/FirebaseConfig.js";
import MODELS from "../models/FirebaseFireStore.model.js";

const auth = getAuth(firebaseApp);


const createUser = (req, res, next) => {
    const { email, password } = req.body;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            res.send(userCredential);
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorMessage);
            // ..
        });
}

const loginUser = (req, res, next) => {

    const { email, password } = req.body;
    // bcrypt.hash(password, saltRound).then
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            res.send(userCredential.user.stsTokenManager.accessToken);
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorMessage);
        });
}

const SignOut = (req, res, next) => {
    signOut(auth).then(() => {
        res.send('scs out');
        // Sign-out successful.
    }).catch((error) => {
        res.send(error);
        // An error happened.
    });
}

const forgot_pass = (req, res, next) => {
    const { email } = req.body;
    sendPasswordResetEmail(auth, email).then(() => {
        res.send('forget_link send to ur email');
    }).catch((error) => {
        res.send(error)
    })
}


// login google
const provider = new GoogleAuthProvider();

const loginGoogle = (req, res, next) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            res.send({
                Creden: credential,
                tokens: token,
                users: user
            })
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            res.send({
                errorCode: errorCode,
                errorMessage: errorMessage,
                email: email,
                credential: credential
            })
            // ...
        });
}

const readDb = (req, res, next) => {
    getDocs(MODELS.USERS).then((data) => {
        let resData = data.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })
        res.send(resData);
    });
}

const selectWh = (req, res, next) => {
    getDocs(query(
        MODELS.USERS,
        where('location', '==', 'Jakarta')
    )).then((data) => {
        let resData = data.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        });
        res.send(resData);
    })
}

const selectUsrId = (req, res, next) => {
    let { id } = req.body;
    getDoc(doc(MODELS.USERS, id)).then((data) => {
        let resData = data.data();
        res.send(resData);
    })
}

const updateDb = (req, res, next) => {
    let { id, verif } = req.body;
    let updateData = {
        verif: verif
    }
    updateDoc(doc(MODELS.USERS, id), updateData).then(() => {
        res.send('Data Updated');
    }).catch((error) => {
        res.send(error);
    })
}

const AddDb = (req, res, next) => {
    let { id, location, name, verif, verif_exp } = req.body;
    let newData = {
        location: location,
        verif: verif,
        verif_exp: verif_exp,
        name: name
    }

    setDoc(doc(MODELS.USERS, id), newData).then(() => {
        res.send('Data Created');
    }).catch((error) => {
        res.send(error);
    })
}

const DelUser = (req, res, next) => {
    let { id } = req.body;

    deleteDoc(doc(MODELS.USERS, id)).then(() => {
        res.send('Data Deleted');
    }).catch((error) => {
        res.send(error);
    })
}


export { createUser, loginUser, SignOut, forgot_pass, loginGoogle, readDb, selectWh, selectUsrId, updateDb, AddDb, DelUser };
