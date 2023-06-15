import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const UID_JWT = (req) => {
    let token = req.header("x-auth-token");
    if (!token) {
        return false;
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_CODE);
            return decoded.uid;
        } catch (error) {
            return false
        }
    }
}
export const UID_JWTEditor = (req) => {
    let token = req.header("x-auth-token");
    if (!token) {
        return false;
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_CODE_EDITOR);
            return decoded.uid;
        } catch (error) {
            return false
        }
    }
}
