import { g_variable } from "../globals/config.js"
import jwt from "jsonwebtoken";

const UID_JWT = (req) => {
    let token = req.header("x-auth-token");
    if (!token) {
        return false;
    } else {
        try {
            const decoded = jwt.verify(token, g_variable.jwt_code);
            return decoded.uid;
        } catch (error) {
            return false
        }
    }
}

export default UID_JWT;