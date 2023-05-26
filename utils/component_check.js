const for_LoginEmail = (req) => {
    let { email, password } = req.body;
    if (email == null || password == null) {
        return false;
    } else {
        return true; j
    }
}

const for_SignUp = (req) => {
    let { email, fullname, password } = req.body;
    if (email === null || fullname === null || password === null) {
        return false
    } else {
        return true
    }
}

const for_google_signup = (req, res) => {
    let { email, name, GSub } = req.body;
    if (email === null || name === null || GSub == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "email, name, GSub required",
        });
        return false
    } else {
        return true
    }
}

const for_setLocation = (req, res) => {
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

export { for_LoginEmail, for_SignUp }