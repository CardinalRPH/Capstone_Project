import { createEvent, findOnePlant, findAllEvent, findMaxId } from "./SQLDBController.js";
import cType from "../utils/general_check.js";
import JWT_check from "../utils/jwt_checker.js";
import { for_CreateEvent } from "../utils/component_check.js";
import { getFertilization, getHarvest, getWatering } from "../utils/dateCalculator.js";
import genColor from "../utils/colorGenerator.js";

export const CreateNewEvent = (req, res, next) => {
    if (cType(req, res)) {
        if (JWT_check(req, res)) {
            if (for_CreateEvent(req, res)) {
                const { name, plantId, date, uid } = req.body;
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
                                    id: EventId,
                                    groupId: EventId,
                                    title: `Planting: ${name}`,
                                    start: date,
                                    end: date,
                                    color: color
                                }
                                
                                const Harvest = {
                                    id: EventId,
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
                                    uid: uid
                                }).then(() => {
                                    res.status(200).json({
                                        ok: true,
                                        code: 200,
                                        data: false,
                                        message: 'Success Create Event'
                                    });
                                }).catch((reject) => {
                                    res.status(500).json({
                                        ok: false,
                                        code: 500,
                                        data: false,
                                        message: 'Internal Server Error cc',
                                        error: reject
                                    });
                                })

                            } else {
                                res.status(500).json({
                                    ok: false,
                                    code: 500,
                                    data: false,
                                    message: 'Internal Server Error',
                                });

                            }
                        }).catch((reject) => {
                            res.status(500).json({
                                ok: false,
                                code: 500,
                                data: false,
                                message: 'Internal Server Error hehe',
                                error: reject
                            });
                        });
                    }
                }).catch((reject) => {
                    res.status(500).json({
                        ok: false,
                        code: 500,
                        data: false,
                        message: 'Internal Server Error haha',
                        error: reject
                    });
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
        })
    })
}