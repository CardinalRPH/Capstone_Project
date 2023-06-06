import { findOnePlant, findAllPlant } from "./SQLDBController.js";
import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_CheckWeather } from "../utils/component_check.js";
import { Op } from "sequelize";

export const GetPlant = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            if (for_CheckWeather) {
                let { weather } = req.params;
                findAllPlant({
                    attributes: ['id', 'name'],
                    where: {
                        inWeatherFrom: {
                            [Op.lte]: weather
                        },
                        inWeatherTo: {
                            [Op.gte]: weather
                        }
                    }
                }).then((resolve) => {
                    if (resolve != false) {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: resolve,
                        });
                    } else {
                        res.status(404).json({
                            ok: false,
                            code: 404,
                            data: false,
                            message: "Data Not Found"
                        });
                    }
                }).catch((reject) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject
                    });
                })
            }
        }
    }
}

export const GetAllPlant = (req, res, next) => {
    if (cType(req, res)) {
        findAllPlant({
            attributes: ['id', 'name']
        }).then((resolve) => {
            if (resolve != false) {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: resolve,
                });
            } else {
                res.status(404).json({
                    ok: false,
                    code: 404,
                    data: false,
                    message: "Data Not Found"
                });
            }
        }).catch((reject) => {
            res.status(500).send({
                ok: false,
                code: 500,
                data: false,
                message: 'Internal Server Error',
                error: reject
            });
        })
    }
}

