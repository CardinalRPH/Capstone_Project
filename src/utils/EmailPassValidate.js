import { g_variable } from "../globals/config";

const EmailValidate = (email) => {
    if ((String(email).match(g_variable.mailformat)) && (email != null) && (email != '')) {
        return true
    } else {
        return false
    }
}

const PassValidate = (pass) => {
    if ((String(pass).match(g_variable.passwordformat)) && (pass != null) && (pass != '')) {
        return true;
    } else {
        return false;
    }
}

const PassEmailValidate = (pass, email) => {
    if ((String(pass).match(g_variable.passwordformat)) && (pass != null) && (pass != '') && (String(email).match(g_variable.mailformat)) && (email != null) && (email != '')) {
        return true;
    } else {
        return false;
    }
}

export { EmailValidate, PassValidate, PassEmailValidate };