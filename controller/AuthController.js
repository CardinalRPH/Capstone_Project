import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp, firebaseAdmin } from "../globals/FirebaseConfig.js";
import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_LoginEmail, for_SignUp, for_LoginorSignUpGoogle, for_UID } from "../utils/component_check.js";
import { createUser, findOneUser, UpdateUser } from "./SQLDBController.js";
import GentToken from "../utils/generateJwt.js";
import { g_variable } from "../globals/config.js";
import { Hasher, comparer } from "../utils/HasherCompare.js";

const auth = getAuth(firebaseApp);
const adminAuth = firebaseAdmin.auth();

export const LoginEmail = (req, res, next) => {
    if (cType(req, res)) {
        if (for_LoginEmail(req, res)) {
            let { email, password } = req.body;
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                findOneUser({
                    attributes: ['email', 'name', 'uid'],
                    where: {
                        uid: userCredential.user.uid
                    }
                }).then((resolve) => {
                    if (resolve != false) {
                        res.set('Access-Control-Allow-Origin', '*');
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: {
                                token: GentToken({
                                    uid: resolve.uid,
                                    name: resolve.name,
                                    email: resolve.email,
                                    xth: g_variable.jwt_key
                                })
                            }
                        });
                    } else {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: false,
                            message: "data not found"
                        });
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


export const SignUp = (req, res, next) => {
    if (cType(req, res)) {
        if (for_SignUp(req)) {
            let { email, fullname, password } = req.body;

            Hasher(password).then((passwordHash) => {
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    createUser({
                        uid: userCredential.user.uid,
                        name: fullname,
                        location: null,
                        email: userCredential.user.email,
                        password: passwordHash,
                        isGoogle: false,
                        verif: userCredential.user.emailVerified,

                    }).then((resolve) => {
                        if (resolve == true) {
                            res.status(200).json({
                                ok: true,
                                code: 200,
                                data: {
                                    token: GentToken({
                                        uid: userCredential.user.uid,
                                        name: fullname,
                                        email: userCredential.user.email,
                                        xth: g_variable.jwt_key
                                    })
                                }
                            });
                        } else {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
                            });
                        }
                    }).catch((reject) => {
                        res.status(500).send({
                            ok: false,
                            code: 500,
                            data: false,
                            message: 'Internal Server Error',
                            error: reject
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
            }).catch((reject) => {
                res.status(500).send({
                    ok: false,
                    code: 500,
                    data: false,
                    message: 'Internal Server Error',
                    error: reject
                });
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

export const Login_Google = (req, res) => {
    if (cType(req, res)) {
        if (for_LoginorSignUpGoogle(req, res)) {
            let { name, email, verif, uid } = req.body;

            findOneUser({
                attributes: ['email'],
                where: {
                    uid: uid
                }
            }).then((resolve) => {
                if (resolve != false) {
                    res.status(200).json({
                        ok: true,
                        code: 200,
                        data: {
                            token: GentToken({
                                uid: uid,
                                name: name,
                                email: email,
                                xth: g_variable.jwt_key
                            })
                        }
                    });
                } else {
                    createUser({
                        uid: uid,
                        name: name,
                        location: null,
                        email: email,
                        isGoogle: true,
                        verif: verif

                    }).then((resolve) => {
                        if (resolve == true) {
                            res.status(200).json({
                                ok: true,
                                code: 200,
                                message: 'Users Created',
                                data: {
                                    token: GentToken({
                                        uid: uid,
                                        name: name,
                                        email: email,
                                        xth: g_variable.jwt_key
                                    })
                                }
                            });
                        } else {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
                            });
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
                }
            }).catch((reject) => {
                res.status(500).send({
                    ok: false,
                    code: 500,
                    data: false,
                    message: 'Internal Server Error',
                    error: reject.message
                });
            });
        } else {
            res.status(400).json({
                ok: false,
                code: 400,
                message: "token required"
            });
        }
    }
}

export const forgetPass = (req, res, next) => {
    const { email } = req.body;
    findOneUser({
        attributes: ['isGoogle'],
        where: {
            email: email
        }
    }).then((resolve) => {
        if (resolve.isGoogle == false || resolve.isGoogle == '' || resolve.isGoogle == 0) {
            sendPasswordResetEmail(auth, email).then(() => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: false,
                    message: 'Forget Password Link sended to email'
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
        } else {
            res.status(200).json({
                ok: false,
                code: 200,
                data: false,
                message: 'Google Account Cant Reset Password'
            });
        }
    }).catch((reject) => {
        res.status(500).send({
            ok: false,
            code: 500,
            data: false,
            message: 'Internal Server Error',
            error: reject
        });
    })
}

export const updateUserInfo = (req, res, next) => {
    const { id } = req.params;
    let nm = true;
    let loc = true;
    let em = true;
    let ErrorOn = '';
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            if (for_UID(id)) {
                const { name, location, email } = req.body;
                findOneUser({
                    attributes: ['email', 'location', 'name'],
                    where: {
                        uid: id
                    }
                }).then((resolve) => {
                    if (resolve != false) {
                        if (resolve.name != name) {
                            UpdateUser({ name: name }, {
                                where: {
                                    uid: id
                                }
                            }).then(() => {
                                nm = true;
                            }).catch((reject) => {
                                ErrorOn += ' Name ';
                                nm = false;
                                console.log(reject);
                            });
                        }
                        if (resolve.email != email) {
                            adminAuth.updateUser(id, { email: email }).then(() => {
                                UpdateUser({ email: email }, {
                                    where: {
                                        uid: id
                                    }
                                }).then(() => {
                                    em = true;
                                }).catch((reject) => {
                                    ErrorOn += ' Email ';
                                    em = false;
                                    console.log(reject);
                                });
                            }).catch((error) => {
                                ErrorOn += ' Email ';
                                em = false;
                                console.log(error);
                            })
                        }
                        if (resolve.location != location) {
                            UpdateUser({ location: location }, {
                                where: {
                                    uid: id
                                }
                            }).then(() => {
                                loc = true;
                            }).catch((reject) => {
                                ErrorOn += ' Location ';
                                loc = false;
                                console.log(reject);
                            });
                        }

                        if (nm == false || em == false || loc == false) {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
                                error: ErrorOn
                            });
                        } else {
                            res.status(200).send({
                                ok: true,
                                code: 201,
                                data: false,
                                message: 'Update Success'
                            });
                        }
                    } else {
                        res.status(404).send({
                            ok: false,
                            code: 404,
                            data: false,
                            message: 'User Not Found',
                        });
                    }
                }).catch((reject) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject
                    });
                })


            } else {
                res.status(400).json({
                    ok: false,
                    code: 400,
                    data: false,
                    message: "Bad Request"
                });
            }
        }
    }

}

export const updateUserPass = (req, res, next) => { //need add msg on fetch
    const { id } = req.params;
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            if (for_UID(id)) {
                const { oldPassword, newPassword } = req.body;
                findOneUser({
                    attributes: ['password'],
                    where: {
                        uid: id
                    }
                }).then((resolve) => {
                    if (resolve) {
                        comparer(newPassword, oldPassword).then((resolve) => {
                            if (resolve == true) {
                                adminAuth.updateUser(id, { password: newPassword }).then(() => {
                                    res.status(201).json({
                                        ok: true,
                                        code: 201,
                                        data: false,
                                        message: 'Update Success'
                                    });
                                }).catch((error) => {
                                    res.status(500).send({
                                        ok: false,
                                        code: 500,
                                        data: false,
                                        message: 'Internal Server Error',
                                        error: error
                                    });
                                });
                            } else {
                                res.status(401).json({
                                    ok: true,
                                    code: 201,
                                    data: false,
                                    message: 'Password not match' //here need to be attention
                                });
                            }
                        }).catch((reject) => {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
                                error: reject
                            });
                        });
                    } else {
                        res.status(404).send({
                            ok: false,
                            code: 404,
                            data: false,
                            message: 'User Not Found',
                        });
                    }
                }).catch((reject) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject
                    });
                })
            } else {
                res.status(400).json({
                    ok: false,
                    code: 400,
                    data: false,
                    message: "Bad Request"
                });
            }
        }
    }
}

export const getUserInfo = (req, res) => {
    const { id } = req.params;
    if (JWT_check(req, res)) {
        if (for_UID(id)) {
            findOneUser({
                attributes: ['name', 'location', 'email', 'verif'],
                where: { uid: id }
            }).then((resolve) => {
                if (resolve != false) {
                    res.status(200).json({
                        ok: true,
                        code: 200,
                        data: resolve
                    });
                } else {
                    res.status(404).send({
                        ok: false,
                        code: 404,
                        data: false,
                        message: 'User Not Found',
                    });
                }
            })
        } else {
            res.status(400).json({
                ok: false,
                code: 400,
                data: false,
                message: "Bad Request"
            });
        }
    }
}