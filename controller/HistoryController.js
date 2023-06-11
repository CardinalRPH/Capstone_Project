import { AddHistory, DeleteOneHistory, GetHistory, deleteOneEvent, findMaxIdHistory, findOneEvent } from "./SQLDBController.js";
import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_createHistory } from "../utils/component_check.js";
import Plant from "../models/plantModel.js";
import UID_JWT from "../utils/UID_jwt.js";

export const createNewHistory = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const uid = UID_JWT(req);
            if (for_createHistory(req, res)) {
                const { id, result } = req.body;

                findOneEvent({
                    attributes: ['tanam', 'panen'],
                    include: [{
                        model: Plant,
                        required: true,
                        attributes: ['name'],
                    }],
                    where: {
                        eventId: id
                    }
                }).then((resolve) => {
                    console.log('kasdjuyavvduaywd');
                    if (resolve != false) {
                        const tanam = JSON.parse(resolve.tanam);
                        const panen = JSON.parse(resolve.panen);
                        findMaxIdHistory().then((idHistory) => {
                            let HistoryId = 0;

                            if (idHistory == null) {
                                HistoryId = 1;
                            } else {
                                HistoryId = parseInt(idHistory) + 1;
                            }
                            AddHistory({
                                historyId: HistoryId,
                                jenisTanaman: resolve.plant.name,
                                onPlant: tanam.start,
                                onHarvest: panen.start,
                                harvestResult: result,
                                uid: uid
                            }).then(() => {
                                deleteOneEvent({
                                    where: {
                                        eventId: id
                                    }
                                }).then(() => {
                                    res.status(201).json({
                                        ok: true,
                                        code: 201,
                                        data: false,
                                        message: 'Success Create History'
                                    });
                                }).catch((rejectEvent) => {
                                    DeleteOneHistory({
                                        where: {
                                            historyId: idHistory
                                        }
                                    }).then(() => {
                                        res.status(500).json({
                                            ok: false,
                                            code: 500,
                                            data: false,
                                            message: 'Internal Server Error 1',
                                            error: rejectEvent
                                        });
                                    }).catch((reject) => {
                                        res.status(500).json({
                                            ok: false,
                                            code: 500,
                                            data: false,
                                            message: 'Internal Server Error 2',
                                            error: reject
                                        });
                                    })
                                })
                            }).catch((reject) => {
                                res.status(500).json({
                                    ok: false,
                                    code: 500,
                                    data: false,
                                    message: 'Internal Server Error 3',
                                    error: reject
                                });
                            });
                        }).catch((reject) => {
                            res.status(500).json({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error 4',
                                error: reject
                            });
                        });
                    } else {
                        res.status(404).json({
                            ok: false,
                            code: 404,
                            data: false,
                            message: 'Data Not Found',
                        });
                    }
                }).catch((reject) => {
                    res.status(500).json({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error 5',
                        error: reject
                    });
                });
            }
        }
    }
}

export const getAllHistory = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const uid = UID_JWT(req);

            GetHistory({
                where: {
                    uid: uid
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
                        message: 'Data Not Found',
                    });
                }
            }).catch((reject) => {
                res.status(500).json({
                    ok: false,
                    code: 500,
                    data: false,
                    message: 'Internal Server Error',
                    error: reject
                })
            })
        }
    }
}