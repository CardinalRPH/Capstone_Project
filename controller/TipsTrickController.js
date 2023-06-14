import { checkIsValued, for_getValue } from "../utils/component_check.js";
import cType from "../utils/general_check.js";
import { JWT_checkEditor } from "../utils/jwt_checker.js";
import { GetAllTipsTrick, GetOneTipsTricks, SQLCountTips, SQLCreateTips, SQLDeleteTips, SQLUpdateTIps } from "./SQLDBController.js";


export const GetTipsTrick = (req, res, next) => {
    if (cType(req, res)) {
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

export const GetOneTipsTrick = (req, res, next) => {
    if (cType(req, res)) {
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

export const CreateTips = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            if (checkIsValued(req, res)) {
                SQLCreateTips(req.body).then(() => {
                    res.status(201).json({
                        ok: true,
                        code: 201,
                        data: false,
                        message: 'Success Create Tips'
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

export const UpdateTips = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { id } = req.params;
            if (for_getValue(id)) {
                if (checkIsValued(req, res)) {
                    SQLUpdateTIps(req.body, {
                        where: {
                            tipsId: id
                        }
                    }).then(() => {
                        res.status(201).json({
                            ok: true,
                            code: 201,
                            data: false,
                            message: 'Success Update Tips'
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

export const DeleteTips = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            const { id } = req.params;
            if (for_getValue(id)) {
                SQLDeleteTips({
                    where: {
                        tipsId: id
                    }
                }).then(() => {
                    res.status(201).json({
                        ok: true,
                        code: 201,
                        data: false,
                        message: 'Success Delete Tips'
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

export const CountTips = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_checkEditor(req, res)) {
            SQLCountTips().then((resolve) => {
                res.status(200).json({
                    ok: true,
                    code: 200,
                    data: resolve,
                    message: 'Tips Counted'
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