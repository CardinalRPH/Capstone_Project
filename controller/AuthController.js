import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../libs/FirebaseConfig.js";
import FirebaseAdmin from "../libs/FirebaseAdminConfig.js";
import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_LoginEmail, for_SignUp, for_LoginorSignUpGoogle, for_getValue } from "../utils/component_check.js";
import { createUser, findOneUser, UpdateUser } from "./SQLDBController.js";
import GentToken from "../utils/generateJwt.js";
import { g_variable } from "../globals/config.js";
import UID_JWT from "../utils/UID_jwt.js";

const auth = getAuth(firebaseApp);
const adminAuth = FirebaseAdmin.auth();

export const LoginEmail = (req, res, next) => {
    if (cType(req, res)) {
        if (for_LoginEmail(req, res)) {
            let { email, password } = req.body;
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                findOneUser({
                    attributes: ['email', 'Fname', 'Lname', 'uid'],
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
                                    fname: resolve.Fname,
                                    lname: resolve.Lname,
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
            let { email, fname, lname, password } = req.body;

            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                createUser({
                    uid: userCredential.user.uid,
                    Fname: fname,
                    Lname: lname,
                    regence: null,
                    province: null,
                    email: userCredential.user.email,
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
                                    fname: fname,
                                    lname: lname,
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
                                fname: name,
                                lname: name,
                                email: email,
                                xth: g_variable.jwt_key
                            })
                        }
                    });
                } else {
                    createUser({
                        uid: uid,
                        Fname: name,
                        Lname: name,
                        regence: null,
                        province: null,
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
                                        fname: name,
                                        lname: name,
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
            res.status(403).json({
                ok: false,
                code: 403,
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
    let fm = true;
    let lm = true;
    let regc = true;
    let prov = true;
    let em = true;
    let ErrorOn = '';
    let Debug = 'Debug : ';
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const id = UID_JWT(req);
            if (for_getValue(id)) {
                const { fname, lname, province, regence, email } = req.body;
                findOneUser({
                    attributes: ['email', 'province', 'regence', 'Fname', 'Lname'],
                    where: {
                        uid: id
                    }
                }).then((resolve) => {
                    if (resolve != false) {
                        if (resolve.Fname != fname) {
                            UpdateUser({ Fname: fname }, {
                                where: {
                                    uid: id
                                }
                            }).then(() => {
                                fm = true;
                                Debug += ' FName ';
                            }).catch((reject) => {
                                ErrorOn += ' FName ';
                                fm = false;
                                console.log(reject);
                            });
                        }
                        if (resolve.Lname != lname) {
                            UpdateUser({ Lname: lname }, {
                                where: {
                                    uid: id
                                }
                            }).then(() => {
                                lm = true;
                                Debug += ' LName ';
                            }).catch((reject) => {
                                ErrorOn += ' LName ';
                                lm = false;
                                console.log(reject);
                            });
                        }
                        if (resolve.province != province) {
                            UpdateUser({ province: province }, {
                                where: {
                                    uid: id
                                }
                            }).then(() => {
                                prov = true;
                                Debug += ' province ';
                            }).catch((reject) => {
                                ErrorOn += ' province ';
                                prov = false;
                                console.log(reject);
                            });
                        }
                        if (resolve.regence != regence) {
                            UpdateUser({ regence: regence }, {
                                where: {
                                    uid: id
                                }
                            }).then(() => {
                                regc = true;
                                Debug += ' regence ';
                            }).catch((reject) => {
                                ErrorOn += ' regence ';
                                regc = false;
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
                                    Debug += ' EMail ';
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
                        console.log(Debug);
                        if (fm == false || em == false || regc == false || lm == false || prov == false) {
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
    if (cType(req, res)) {
        const id = UID_JWT(req);
        if (JWT_check(req, res)) {
            if (for_getValue(id)) {
                const { newPassword } = req.body;
                findOneUser({
                    where: {
                        uid: id
                    }
                }).then((resolve) => {
                    if (resolve) {
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
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const id = UID_JWT(req);
            if (for_getValue(id)) {
                findOneUser({
                    attributes: ['Fname', 'Lname', 'province', 'regence', 'email', 'verif', 'isGoogle'],
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
}

export const getUserLoaction = (req, res) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const id = UID_JWT(req);
            if (for_getValue(id)) {
                findOneUser({
                    attributes: ['province', 'regence'],
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
}

export const CheckJwt = (req, res) => {
    if (cType(req, res)) {        
        if (JWT_check(req, res)) {
            res.status(200).send({
                ok: true,
                code: 200,
                message: "Token Active"
            });
        }
    }
}