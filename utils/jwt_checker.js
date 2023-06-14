import { g_variable } from "../globals/config.js"
import jwt from "jsonwebtoken";

export const JWT_check = (req, res) => {
    let token = req.header("x-auth-token");
    if (!token) {
        res.status(401).send({
            ok:false,
            code: 401,
            message: "Access denied. No token provided"
        });
        return false;
    } else {
        try {
            const decoded = jwt.verify(token, g_variable.jwt_code);
            if (decoded.xth == g_variable.jwt_key) {
                return true;
            }
        } catch (error) {
            res.status(401).send({
                ok: false,
                code: 401,
                message: "Token expired"
            });
            return false
        }
    }
}
export const JWT_checkEditor = (req, res) => {
    let token = req.header("x-auth-token");
    if (!token) {
        res.status(401).send({
            ok:false,
            code: 401,
            message: "Access denied. No token provided"
        });
        return false;
    } else {
        try {
            const decoded = jwt.verify(token, g_variable.jwt_codeEditor);
            if (decoded.xth == g_variable.jwt_key) {
                return true;
            }
        } catch (error) {
            res.status(401).send({
                ok: false,
                code: 401,
                message: "Token expired"
            });
            return false
        }
    }
}