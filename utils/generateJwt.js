import { g_variable } from "../globals/config.js"
import jwt from "jsonwebtoken";

const GentToken = (payload) => {
    const token = jwt.sign(payload, g_variable.jwt_code, { expiresIn: "10h" });
    return token;
}

export default GentToken;