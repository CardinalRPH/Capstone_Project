import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, deleteUser } from "firebase/auth";
import firebaseApp from "../globals/FirebaseConfig.js";

import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_LoginEmail, for_SignUp } from "../utils/component_check.js";
import { createUser } from "./FirebaseDBController.js";

const auth = getAuth(firebaseApp);

const LoginEmail = (req, res, next) => {
    if (cType(req)) {
        if (for_LoginEmail(req, res)) {
            let { email, password } = req.body;

            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: userCredential.user.stsTokenManager.accessToken
                });
            }).catch((error) => {
                res.status(500).json({
                    ok: true,
                    code: 500,
                    message: error
                });
            })
        } else {
            res.status(400).json({
                ok: false,
                code: 400,
                message: "Email and Password is required"
            });
        }
    }
}


const SignUp = (req, res, next) => {
    if (JWT_check(req, res)) {
        if (cType(req)) {
            if (for_SignUp(req)) {
                let { email, fullname, password } = req.body;

                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    let newData = {
                        location: null,
                        name: fullname,
                        verif: userCredential.user.emailVerified,
                        email: userCredential.user.email
                    }

                    createUser(newData, userCredential.user.uid).then((resolve) => {
                        if (resolve.ok) {
                            res.status(200).json({
                                ok: true,
                                code: 200,
                                message: 'Users Created'
                            });

                        } else {
                            deleteUser(auth, userCredential.user.uid).then(() => {
                                res.status(500).send({
                                    ok: false,
                                    code: 500,
                                    message: 'Internal Server Error',
                                });
                            }).catch((error) => {
                                res.status(500).send({
                                    ok: false,
                                    code: 500,
                                    message: 'Internal Server Error',
                                    error: error
                                });
                            })
                        }
                    }).catch((reject) => {
                        res.status(500).send({
                            ok: false,
                            code: 500,
                            message: 'Internal Server Error',
                            error: reject.message
                        });
                    })
                })

            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "email, fullname, password, required",
                })
            }
        }
    }
}

const Login_Google = () => { }


export {LoginEmail}