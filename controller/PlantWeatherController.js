import { findAllPlant, SQLCountPlant, SQLCreatePlant, SQLDeletePlant, SQLUpdatePlant } from "./SQLDBController.js";
import cType from "../utils/general_check.js";
import {JWT_check, JWT_checkEditor} from "../utils/jwt_checker.js";
import { checkIsValued, for_CheckWeather, for_getValue } from "../utils/component_check.js";
import { Op } from "sequelize";

export const GetPlant = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            if (for_CheckWeather(req, res)) {
                let { weather } = req.params;
                findAllPlant({
                    attributes: ['plantId', 'name'],
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
            attributes: ['plantId', 'name', 'inWeatherFrom', 'inWeatherto', 'onWatering', 'onFertilizer', 'onHarvest']
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


//Editor q
export const CreatePlant = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            if (checkIsValued(req, res)) {
                SQLCreatePlant(req.body).then(() => {
                    res.status(201).json({
                        ok: true,
                        code: 201,
                        data: false,
                        message: 'Success Create Plant'
                    });
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
export const UpdatePlant = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { id } = req.params;
            if (for_getValue(id)) {
                if (checkIsValued(req, res)) {
                    SQLUpdatePlant(req.body, {
                        where: {
                            plantId: id
                        }
                    }).then(() => {
                        res.status(201).json({
                            ok: true,
                            code: 201,
                            data: false,
                            message: 'Success Update Plant'
                        });
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
            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}

export const DeletePlant = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { id } = req.params;
            if (for_getValue(id)) {
                SQLDeletePlant({
                    where: {
                        plantId: id
                    }
                }).then(() => {
                    res.status(201).json({
                        ok: true,
                        code: 201,
                        data: false,
                        message: 'Success Delete Plant'
                    });
                }).catch((reject) => {
                    res.status(500).send({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject
                    });
                })
            } else {
                res.status(400).send({
                    ok: false,
                    code: 400,
                    message: "Bad Request",
                });
            }
        }
    }
}

export const CountPlant = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            SQLCountPlant().then((resolve) => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: resolve,
                    message: 'Plant Counted'
                });
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


