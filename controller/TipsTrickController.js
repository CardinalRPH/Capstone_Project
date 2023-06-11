import { for_getValue } from "../utils/component_check.js";
import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { GetAllTipsTrick, GetOneTipsTricks } from "./SQLDBController.js";


export const GetTipsTrick = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            GetAllTipsTrick({
                attributes: ['Imguri', 'article', 'date', 'tipsId', 'title', 'categories', 'Author']
            }).then((resolve) => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: resolve,
                });
            }).catch((reject) => {
                res.status(500).json({
                    ok: false,
                    code: 500,
                    data: false,
                    message: 'Internal Server Error 5',
                    error: reject
                });
            })
        }
    }
}

export const GetOneTipsTrick = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const { id } = req.params;
            if (for_getValue) {
                GetOneTipsTricks({
                    attributes: ['Imguri', 'article', 'date', 'tipsId', 'title', 'categories', 'Author', 'ImgRef'],
                    where: {
                        tipsId: id
                    }
                }).then((resolve) => {
                    res.status(200).json({
                        ok: true,
                        code: 200,
                        data: resolve,
                    });
                }).catch((reject) => {
                    res.status(500).json({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error 5',
                        error: reject
                    });
                })
            } else {
                res.status(400).json({
                    ok: false,
                    code: 400,
                    data: false,
                    message: "Bad Request"
                });
            }
        }
    }
}