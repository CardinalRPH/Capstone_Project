import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const GentToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_CODE, { expiresIn: "10h" });
    return token;
}

export const GentTokenEditor = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_CODE_EDITOR, { expiresIn: "10h" });
    return token;
}
