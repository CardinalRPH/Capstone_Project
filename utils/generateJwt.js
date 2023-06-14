import { g_variable } from "../globals/config.js"
import jwt from "jsonwebtoken";

export const GentToken = (payload) => {
    const token = jwt.sign(payload, g_variable.jwt_code, { expiresIn: "10h" });
    return token;
}

export const GentTokenEditor = (payload) => {
    const token = jwt.sign(payload, g_variable.jwt_codeEditor, { expiresIn: "10h" });
    return token;
}
