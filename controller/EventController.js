import { createEvent, findOnePlant, findAllEvent, findMaxId, findOneEvent, updateOneEvent, deleteOneEvent } from "./SQLDBController.js";
import cType from "../utils/general_check.js";
import {JWT_check} from "../utils/jwt_checker.js";
import { for_CreateEvent, for_getValue, for_updateEvent } from "../utils/component_check.js";
import { getFertilization, getHarvest, getWatering } from "../utils/dateCalculator.js";
import genColor from "../utils/colorGenerator.js";
import UID_JWT from "../utils/UID_jwt.js";

export const CreateNewEvent = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            if (for_CreateEvent(req, res)) {
                const id = UID_JWT(req);

                const { name, plantId, date } = req.body;
                findOnePlant({
                    attributes: ['onWatering', 'onFertilizer', 'onHarvest'],
                    where: {
                        plantId: plantId
                    }
                }).then((resolvePlant) => {
                    if (resolvePlant != false) {
                        findMaxId().then((idevent) => {
                            if (idevent != false) {
                                let EventId = 0;

                                if (idevent == null) {
                                    EventId = 1;
                                } else {
                                    EventId = parseInt(idevent) + 1;
                                }

                                const color = genColor();
                                const onHarvest = getHarvest(date, resolvePlant.onHarvest);
                                const Planting = {
                                    id: `1${EventId}`,
                                    groupId: EventId,
                                    title: `Planting: ${name}`,
                                    start: date,
                                    end: date,
                                    color: color
                                }

                                const Harvest = {
                                    id: `4${EventId}`,
                                    groupId: EventId,
                                    title: `Harvest: ${name}`,
                                    start: onHarvest,
                                    end: onHarvest,
                                    color: color
                                }

                                const Watering = getWatering(date, resolvePlant.onWatering, onHarvest, name, color, EventId);
                                const Fertilization = getFertilization(date, resolvePlant.onFertilizer, onHarvest, name, color, EventId);

                                createEvent({
                                    eventId: EventId,
                                    name: name,
                                    plantId: plantId,
                                    tanam: Planting,
                                    pupuk: Fertilization,
                                    siram: Watering,
                                    panen: Harvest,
                                    uid: id
                                }).then(() => {
                                    res.status(201).json({
                                        ok: true,
                                        code: 201,
                                        data: false,
                                        message: 'Success Create Event'
                                    });
                                }).catch((reject) => {
                                    res.status(500).json({
                                        ok: false,
                                        code: 500,
                                        data: false,
                                        message: 'Internal Server Error',
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
                                message: 'Internal Server Error',
                                error: reject
                            });
                        });
                    }
                }).catch((reject) => {
                    res.status(500).json({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject
                    });
                });
            }
        }
    }
}

export const GetAllEvent = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const id = UID_JWT(req);
            findAllEvent({
                attributes: ['tanam', 'pupuk', 'siram', 'panen'],
                where: {
                    uid: id
                }
            }).then((resolve) => {
                if (resolve != false) {
                    let mergedArray = [];
                    for (let i in resolve) {
                        mergedArray.push(resolve[i].dataValues.tanam);
                        mergedArray.push(...resolve[i].dataValues.siram);
                        mergedArray.push(...resolve[i].dataValues.pupuk);
                        mergedArray.push(resolve[i].dataValues.panen);
                    }
                    res.status(200).json({
                        ok: true,
                        code: 200,
                        data: mergedArray,
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
            });
        }
    }
}

export const getOneEvent = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const uid = UID_JWT(req);
            const { id } = req.params
            if (for_getValue(id)) {
                findOneEvent({
                    attributes: ['plantId'],
                    where: {
                        eventId: id,
                        uid: uid
                    }
                }).then((resolve) => {
                    if (resolve != false) {
                        res.status(200).json({
                            ok: true,
                            code: 200,
                            data: resolve,
                            message: 'Success Get One Event',
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
                    });
                });

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

export const UpdateOneEvent = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const uid = UID_JWT(req);
            if (for_updateEvent(req, res)) {
                let { name, id } = req.body;
                findOneEvent({
                    attributes: ['tanam', 'pupuk', 'siram', 'panen'],
                    where: {
                        eventId: id,
                        uid: uid
                    }
                }).then((resolve) => {
                    if (resolve != false) {
                        let tanam = JSON.parse(resolve.tanam);
                        let pupuk = JSON.parse(resolve.pupuk);
                        let siram = JSON.parse(resolve.siram);
                        let panen = JSON.parse(resolve.panen);

                        //changing value
                        tanam.title = `Planting: ${name}`;
                        const newPupuk = pupuk.map(event => {
                            return { ...event, title: `Fertilization: ${name}` };
                        });
                        const newSiram = siram.map(event => {
                            return { ...event, title: `Watering: ${name}` };
                        });
                        panen.title = `Harvest: ${name}`;

                        //updateing in DB
                        updateOneEvent({
                            tanam: tanam,
                            pupuk: newPupuk,
                            siram: newSiram,
                            panen: panen
                        }, {
                            where: {
                                eventId: id,
                                uid: uid
                            }
                        }).then((resolve) => {
                            if (resolve == true) {
                                res.status(200).json({
                                    ok: true,
                                    code: 200,
                                    data: false,
                                    message: 'Success Update Event'
                                });
                            } else {
                                res.status(500).json({
                                    ok: false,
                                    code: 500,
                                    data: false,
                                    message: 'Internal Server Error',
                                })
                            }
                        }).catch((reject) => {
                            res.status(500).json({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error',
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
                        message: 'Internal Server Error',
                        error: reject
                    });
                });

            }
        }
    }
}

export const DeleteOneEvent = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            const uid = UID_JWT(req);
            const { id } = req.params;
            if (for_getValue(id)) {
                deleteOneEvent({
                    where: {
                        eventId: id,
                        uid: uid
                    }
                }).then((resolve) => {
                    if (resolve == true) {
                        res.status(204).json({
                            ok: true,
                            code: 204,
                            data: false,
                            message: 'Success delete Event'
                        });
                    } else {
                        res.status(500).json({
                            ok: false,
                            code: 500,
                            data: false,
                            message: 'Internal Server Error',
                        })
                    }
                }).catch((reject) => {
                    res.status(500).json({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error',
                        error: reject
                    });
                });

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

export const TestEvent = (req, res, next) => {
    findMaxId().then((resolve) => {
        res.status(200).json({
            ok: parseInt(resolve) + 1,
        })
    }).catch((reject) => {
        res.status(500).json({
            ok: false,
        });
    })
}