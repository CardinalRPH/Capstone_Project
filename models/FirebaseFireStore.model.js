import { getFirestore, collection } from "firebase/firestore";
import firebaseApp from "../globals/FirebaseConfig.js";

const db = getFirestore(firebaseApp);

const MODELS = {
    USERS: collection(db, 'users'),
    TIPS_TRICKS: collection(db, 'tipsTricks')
}

export default MODELS;