import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, deleteUser } from "firebase/auth";
import firebaseApp from "../globals/FirebaseConfig.js";

import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_LoginEmail, for_SignUp, for_LoginorSignUpGoogle } from "../utils/component_check.js";
import { createUserDB, checkEmail } from "./FirebaseDBController.js";
import jwt_decode from 'jwt-decode';
import getNameEmail from "../utils/name_generate.js";

const auth = getAuth(firebaseApp);

const LoginEmail = (req, res, next) => {
    if (cType(req)) {
        if (for_LoginEmail(req, res)) {
            let { email, password } = req.body;

            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                if (checkEmail(userCredential.user.stsTokenManager.accessToken.user_id))
                    res.status(200).json({
                        ok: true,
                        code: 200,
                        data: userCredential.user.stsTokenManager.accessToken
                    });

                checkEmail(userCredential.user.stsTokenManager.accessToken.user_id).then((resolve) => {
                    if (resolve == true) {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: false,
                            message: "data not found"
                        })
                    } else {
                        res.status(200).json({
                            ok: true,
                            code: 404,
                            data: userCredential.user.stsTokenManager.accessToken
                        })
                    }
                }).catch((reject) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject.message
                    });
                })
            }).catch((error) => {
                res.status(500).json({
                    ok: true,
                    code: 500,
                    data: false,
                    message: error
                });
            })
        } else {
            res.status(400).json({
                ok: false,
                code: 400,
                data: false,
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

                    createUserDB(newData, userCredential.user.uid).then((resolve) => {
                        if (resolve.ok) {
                            res.status(200).json({
                                ok: true,
                                code: 200,
                                message: 'Users Created',
                                data: userCredential.user.uid
                            });

                        } else {
                            deleteUser(auth, userCredential.user.uid).then(() => {
                                res.status(500).send({
                                    ok: false,
                                    code: 500,
                                    data: false,
                                    message: 'Internal Server Error',
                                });
                            }).catch((error) => {
                                res.status(500).send({
                                    ok: false,
                                    code: 500,
                                    data: false,
                                    message: 'Internal Server Error',
                                    error: error
                                });
                            })
                        }
                    }).catch((reject) => {
                        res.status(500).send({
                            ok: false,
                            code: 500,
                            data: false,
                            message: 'Internal Server Error',
                            error: reject.message
                        });
                    })
                }).catch((error) => {
                    res.status(200).send({
                        ok: false,
                        code: 200,
                        data: false,
                        message: 'Email already exist',
                    })
                })

            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    data: false,
                    message: "email, fullname, password, required",
                })
            }
        }
    }
}

const Login_Google = (req, res) => {
    if (cType(req)) {
        if (for_LoginorSignUpGoogle(req, res)) {
            let { Jtoken } = req.body;
            let credential;
            try {
                credential = jwt_decode(Jtoken);
                checkEmail(credential.sub).then((resolve) => {
                    if (resolve == true) {
                        let newData = {
                            location: null,
                            name: getNameEmail(credential.email),
                            verif: credential.email_verified,
                            email: credential.email
                        }

                        createUserDB(newData, credential.sub).then((resolve) => {
                            if (resolve.ok) {
                                res.status(200).json({
                                    ok: true,
                                    code: 200,
                                    message: 'Users Created',
                                    data: credential.sub
                                });

                            } else {
                                deleteUser(auth, credential.user.uid).then(() => {
                                    res.status(500).send({
                                        ok: false,
                                        code: 500,
                                        data: false,
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
                                data: false,
                                message: 'Internal Server Error',
                                error: reject.message
                            });
                        })
                    } else {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            Data: credential.sub
                        })
                    }
                }).catch((reject) => {
                    res.status(500).json(reject);

                })
            } catch (error) {
                res.status(400).json({
                    ok: false,
                    code: 400,
                    message: "Wrong Token"
                });
            }
        } else {
            res.status(400).json({
                ok: false,
                code: 400,
                message: "token required"
            });
        }
    }
}

const forgetPass = (req, res, next) => {
    const { email } = req.body;
    sendPasswordResetEmail(auth, email).then(() => {
        res.status(200).json({
            ok: true,
            code: 200,
            data: false,
            message: 'Forget Password Link sented to email'
        });
    }).catch((error) => {
        res.status(500).send({
            ok: false,
            code: 500,
            data: false,
            message: 'Internal Server Error',
        });
    })
}


export { LoginEmail, Login_Google, SignUp, forgetPass }