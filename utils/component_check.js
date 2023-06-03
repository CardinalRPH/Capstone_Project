export const for_LoginEmail = (req) => {
    let { email, password } = req.body;
    if (email == null || password == null) {
        return false;
    } else {
        return true; j
    }
}

export const for_SignUp = (req) => {
    let { email, fullname, password } = req.body;
    if (email === null || fullname === null || password === null) {
        return false
    } else {
        return true
    }
}

export const for_LoginorSignUpGoogle = (req, res) => {
    let { name, email, verif, uid } = req.body;
    if (name == null || email == null || verif == null || uid == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "Bad Request"
        });
        return false;
    } else {
        return true;
    }
}

export const for_UID = (uid) => {
    if (uid == null) {
        return false;
    } else {
        return true;
    }
}

export const for_Pass = (pass) => {
    if (pass == null) {
        return false;
    } else {
        return true;
    }
}


export const for_setLocation = (req, res) => {
    let { province, city, mail } = req.body;
    if (province === null || city === null || mail == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "email, name, GSub required",
        });
        return false;
    } else {
        return true;
    }

}
