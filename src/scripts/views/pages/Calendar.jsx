import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import WeatherPlan from "../compoents/PlannerWeather";
import { WeatherandPlant } from "../../../globals/config";

const Calendar_pg = () => {

    const [Option, setOption] = useState([]);

    useEffect(() => {
        const fetchAllPlant = () => {
            fetch(WeatherandPlant().getAllPlant(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((resolve) => {
                    if (resolve.ok && (resolve.data != false)) {
                        setOption(resolve.data);
                    }
                }).catch((error) => {
                    setOption('');
                    console.log(error);
                })
        }

        fetchAllPlant();
    }, []);

    const modalShow = (info) => {
        console.log(info.dateStr);
        const myModal = new Modal(document.getElementById('calendarModal'));
        document.getElementById('date-input').value = info.dateStr;
        myModal.show();
        NewItem();
    }
    const modalHide = () => {
        const myModal = document.getElementById('calendarModal');
        myModal.classList.remove('show'); // Menghapus kelas 'show'
        myModal.style.display = 'none'; // Mengubah properti 'display' menjadi 'none'
        document.body.classList.remove('modal-open'); // Menghapus kelas 'modal-open' pada elemen <body>
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop); // Menghapus elemen modal backdrop jika ada
        }
    }

    const NewItem = () => {
        document.getElementById('forUpdate').style.display = 'none';
        document.getElementById('forSave').style.display = 'block';
        document.getElementById('inputGroupSelect01').disabled = false;

    }

    const UpdateItem = () => {
        document.getElementById('forUpdate').style.display = 'block';
        document.getElementById('forSave').style.display = 'none';
        document.getElementById('inputGroupSelect01').disabled = true;

    }

    const OnFocusP = () => {
        document.getElementById('inputGroupSelect01').disabled = true;
        document.getElementById('nameOfPlant').disabled = true;

    }
    const OnBlurP = () => {
        document.getElementById('inputGroupSelect01').disabled = false;
        document.getElementById('nameOfPlant').disabled = false;

    }



    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Planner</h1>
            </div>
            <WeatherPlan />
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2019-04-01' },
                    { title: 'event 2', date: '2019-04-02' }
                ]}
                dateClick={(info) => { modalShow(info) }}
            />
            <div className="modal fade" id="calendarModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: "80%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Event</h1>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-row w-100">
                                <div className="w-25 list-group mx-3 d-flex align-items-center">
                                    <button type="button" onClick={NewItem} className="btn btn-success mx-1 w-50 my-2">New Item</button>
                                    <button type="button" className="list-group-item list-group-item-action active">
                                        Cras justo odio
                                    </button>
                                    <button type="button" onClick={UpdateItem} className="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
                                    <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
                                    <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac</button>
                                    <button type="button" className="list-group-item list-group-item-action" disabled>Vestibulum at eros</button>
                                </div>
                                <div className="w-75 mx-3">
                                    <div class="mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text px-2" id="basic-addon1">Name of Plant</span>
                                            </div>
                                            <input type="text" id="nameOfPlant" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text px-2" htmlFor="inputGroupSelect01">Type of Plant</label>
                                            </div>
                                            <select className="custom-select" id="inputGroupSelect01">
                                                <option selected>Choose...</option>
                                                {Option.map((option) => (<option value={option.id}>{option.name}</option>))}
                                                {/* <option value={1}>One</option>
                                                <option value={2}>Two</option>
                                                <option value={3}>Three</option> */}
                                            </select>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text px-2" id="basic-addon1">Date</span>
                                            </div>
                                            <input type="Date" className="form-control" id="date-input" aria-describedby="basic-addon1" readOnly />
                                        </div>
                                    </div>
                                    <div id="forUpdate" style={{ display: 'none' }}>
                                        <button type="button" className="btn btn-primary mx-1">Update</button>
                                        <button type="button" className="btn btn-danger mx-1">Delete</button>

                                        <div className="input-group my-3">
                                            <input type="number" className="form-control" onFocus={OnFocusP} onBlur={OnBlurP} placeholder="Sudah Panen?" aria-label="Sudah Panen?" aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <span class="input-group-text">ton</span>
                                                <button className="btn btn-outline-secondary" type="button">Submit Panen</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div id="forSave">
                                        <button type="button" className="btn btn-primary mx-1">Save</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer mx-auto">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={modalHide}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Calendar_pg;