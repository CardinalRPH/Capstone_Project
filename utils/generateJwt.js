import { g_variable } from "../globals/config.js"
import jwt from "jsonwebtoken";

const oa2 = (req, res) => {
    const token = jwt.sign({
    }, g_variable.jwt_code, { expiresIn: "10m" });
    res.send({
        ok:true,
        token: token,
        cc: "ok"
    });
}

export default oa2;