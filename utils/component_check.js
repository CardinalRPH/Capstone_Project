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

export const for_getValue = (value) => {
    if (value == null) {
        return false;
    } else {
        return true;
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

export const for_CheckWeather = (req, res) => {
    let { weather } = req.params;
    if (weather == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "weather required",
        });
        return false;
    } else {
        return true;
    }
}

export const for_CreateEvent = (req, res) => {
    let { name, plantId, date } = req.body;
    if (name == null || plantId == null || date == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "Bad Request",
        });
        return false;
    } else {
        return true;
    }
}

export const for_updateEvent = (req, res) => {
    let { name, id } = req.body;
    if (name == null || id == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "Bad Request",
        });
        return false;
    } else {
        return true;
    }
}

export const for_createHistory = (req, res) => {
    let { result, id } = req.body;
    if (result == null || id == null) {
        res.status(400).send({
            ok: false,
            code: 400,
            message: "Bad Request",
        });
        return false;
    } else {
        return true;
    }
}
