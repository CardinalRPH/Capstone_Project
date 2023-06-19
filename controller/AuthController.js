import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../libs/FirebaseConfig.js";
import FirebaseAdmin from "../libs/FirebaseAdminConfig.js";
import cType from "../utils/general_check.js";
import { JWT_check, JWT_checkEditor } from "../utils/jwt_checker.js";
import { for_LoginEmail, for_SignUp, for_LoginorSignUpGoogle, for_getValue, checkIsValued } from "../utils/component_check.js";
import { createUser, deleteOneEvent, DeleteOneHistory, findAllUser, findOneUser, SQLCountUser, SQLDeleteUser, UpdateUser } from "./SQLDBController.js";
import { GentToken, GentTokenEditor } from "../utils/generateJwt.js";
import { g_variable } from "../globals/config.js";
import { UID_JWT, UID_JWTEditor } from "../utils/UID_jwt.js";

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
                        // res.set('Access-Control-Allow-Origin', '*');
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
                            },
                            message: 'Login Success',
                        });
                    } else {
                        res.status(200).json({
                            ok: false,
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
                    ok: false,
                    code: 500,
                    data: false,
                    message: 'External Server Error',
                    error: error
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

export const LoginEmailEditor = (req, res, next) => {
    if (cType(req, res)) {
        if (for_LoginEmail(req, res)) {
            let { email, password } = req.body;
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                findOneUser({
                    attributes: ['email', 'Fname', 'Lname', 'uid'],
                    where: {
                        uid: userCredential.user.uid,
                        role: 'editor'
                    }
                }).then((resolve) => {
                    if ((resolve != false) || (resolve != '')) {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: {
                                token: GentTokenEditor({
                                    uid: resolve.uid,
                                    fname: resolve.Fname,
                                    lname: resolve.Lname,
                                    email: resolve.email,
                                    xth: g_variable.jwt_key
                                })
                            },
                            message: 'Login Success',
                        });
                    } else {
                        res.status(200).json({
                            ok: false,
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
                    message: 'External Server Error',
                    error: error
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
        if (checkIsValued(req, res)) {
            let { email, fname, lname, password, province, regence } = req.body;

            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                createUser({
                    uid: userCredential.user.uid,
                    Fname: fname,
                    Lname: lname,
                    regence: regence,
                    province: province,
                    email: userCredential.user.email,
                    isGoogle: false,
                    role: 'user',
                    disabled: false

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
                            },
                            message: 'Sign Up Success',
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

        }
    }
}

export const Login_Google = (req, res) => {
    if (cType(req, res)) {
        if (for_LoginorSignUpGoogle(req, res)) {
            let { name, email, uid } = req.body;

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
                        },
                        message: 'Login Success',
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
                        role: 'user',
                        disabled: false

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
                                },
                                message: 'Sign Up Success',
                            });
                        } else {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error 1',
                            });
                        }
                    }).catch((reject) => {
                        res.status(500).send({
                            ok: false,
                            code: 500,
                            data: false,
                            message: 'Internal Server Error 2',
                            error: reject.message
                        });
                    })
                }
            }).catch((reject) => {
                res.status(500).send({
                    ok: false,
                    code: 500,
                    data: false,
                    message: 'Internal Server Error 3',
                    error: reject.message
                });
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
                    message: 'External Server Error',
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
                if (checkIsValued(req, res)) {
                    const { Fname, Lname, province, regence, email } = req.body;
                    findOneUser({
                        attributes: ['email', 'province', 'regence', 'Fname', 'Lname'],
                        where: {
                            uid: id
                        }
                    }).then((resolve) => {
                        if (resolve != false) {
                            if (resolve.Fname != Fname) {
                                UpdateUser({ Fname: Fname }, {
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
                            if (resolve.Lname != Lname) {
                                UpdateUser({ Lname: Lname }, {
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
                }
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
                                message: 'External Server Error',
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
                    attributes: ['Fname', 'Lname', 'province', 'regence', 'email', 'isGoogle'],
                    where: { uid: id }
                }).then((resolve) => {
                    if (resolve != false) {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: resolve,
                            message: 'User Info Goted',
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
                            data: resolve,
                            message: 'User Location Goted',
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


//edditor controller

export const getAllUsers = (req, res) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            findAllUser({}).then((resolve) => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: resolve,
                    message: 'All Users Goted',
                });
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
    }
}

export const disableUser = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { uid } = req.params;
            if (for_getValue(uid)) {
                adminAuth.updateUser(uid, {
                    disabled: true
                }).then(() => {
                    UpdateUser({
                        disabled: true
                    }, {
                        where: {
                            uid: uid
                        }
                    }).then(() => {
                        res.status(201).json({
                            ok: true,
                            code: 201,
                            data: false,
                            message: 'User Disabled'
                        });
                    }).catch((reject) => {
                        adminAuth.updateUser(uid, {
                            disabled: false
                        }).then(() => {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
                                error: reject
                            });
                        }).catch((error) => {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'External Server Error',
                                error: error
                            });
                        });
                    });
                }).catch((error) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'External Server Error',
                        error: error
                    });
                })
            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}

export const EnableUser = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { uid } = req.params;
            if (for_getValue(uid)) {
                adminAuth.updateUser(uid, {
                    disabled: false
                }).then(() => {
                    UpdateUser({
                        disabled: false
                    }, {
                        where: {
                            uid: uid
                        }
                    }).then(() => {
                        res.status(201).json({
                            ok: true,
                            code: 201,
                            data: false,
                            message: 'User Enabled'

                        });
                    }).catch((reject) => {
                        adminAuth.updateUser(uid, {
                            disabled: true
                        }).then(() => {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
                                error: reject
                            });
                        }).catch((error) => {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'External Server Error',
                                error: error
                            });
                        });
                    });
                }).catch((error) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'External Server Error',
                        error: error
                    });
                })
            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}

export const MakeItEditor = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { uid } = req.params;
            if (for_getValue(uid)) {
                UpdateUser({
                    role: 'editor'
                }, {
                    where: {
                        uid: uid
                    }
                }).then(() => {
                    res.status(201).json({
                        ok: true,
                        code: 201,
                        data: false,
                        message: 'User has Editor role'

                    });
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
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}
export const MakeItUser = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { uid } = req.params;
            if (for_getValue(uid)) {
                UpdateUser({
                    role: 'user'
                }, {
                    where: {
                        uid: uid
                    }
                }).then(() => {
                    res.status(201).json({
                        ok: true,
                        code: 201,
                        data: false,
                        message: 'User has Editor role'

                    });
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
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}


export const deleteUser = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { uid } = req.params;
            if (for_getValue(uid)) {
                adminAuth.deleteUser(uid).then(() => {
                    DeleteOneHistory({
                        where: {
                            uid: uid
                        }
                    }).then(() => {
                        deleteOneEvent({
                            where: {
                                uid: uid
                            }
                        }).then(() => {
                            SQLDeleteUser({
                                where: {
                                    uid: uid
                                }
                            }).then(() => {
                                res.status(204).json({
                                    ok: true,
                                    code: 204,
                                    data: false,
                                    message: 'User Deleted'
                                });
                            }).catch((reject) => {
                                res.status(204).json({
                                    ok: true,
                                    code: 204,
                                    data: false,
                                    message: 'User Deleted NoDB'
                                });
                                console.log(reject);
                            });
                        }).catch((error) => {
                            res.status(500).send({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error E',
                                error: error
                            });
                        })
                    }).catch((error) => {
                        res.status(500).send({
                            ok: false,
                            code: 500,
                            data: false,
                            message: 'Internal Server Error H',
                            error: error
                        });
                    })
                }).catch((error) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'External Server Error',
                        error: error
                    });
                });
            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}

export const CountUser = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            SQLCountUser().then((resolve) => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: resolve,
                    message: 'User Counted'
                });
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
    }
}

export const getEditorInfo = (req, res) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const id = UID_JWTEditor(req);
            if (for_getValue(id)) {
                findOneUser({
                    attributes: ['Fname', 'Lname', 'province', 'regence', 'email', 'isGoogle'],
                    where: { uid: id }
                }).then((resolve) => {
                    if (resolve != false) {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: resolve,
                            message: 'User Info Goted',
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

export const CheckJwtEditor = (req, res) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            res.status(200).send({
                ok: true,
                code: 200,
                message: "Token Active"
            });
        }
    }
}