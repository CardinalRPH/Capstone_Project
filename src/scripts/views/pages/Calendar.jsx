import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import WeatherPlan from "../compoents/PlannerWeather";
import { WeatherandPlant, EventURI, HistoryURI } from "../../../globals/config";
import { for_planner_Save, for_planner_update, for_submit_panen } from "../../utils/component_check";
import { useSelector } from "react-redux";

const Calendar_pg = () => {

    const { isAuthenticated } = useSelector((state) => state.auth)
    const [Option, setOption] = useState([]);
    const [Events, setEvents] = useState([]);
    const [EventId, setEventId] = useState('')


    const toggleLoader = (show) => {
        const loaderElement = document.getElementById('Loader');
        if (loaderElement != null) {
            if (show) {
                loaderElement.style.display = 'flex';
            } else {
                loaderElement.style.display = 'none';
            }
        }
    };
    const toggleBadReq = (show) => {
        const loaderElement = document.getElementById('BadReq');
        if (show) {
            loaderElement.style.display = 'block';
        } else {
            loaderElement.style.display = 'none';
        }
    };
    const toggleBadReq2 = (show) => {
        const loaderElement = document.getElementById('BadReq2');
        if (show) {
            loaderElement.style.display = 'block';
        } else {
            loaderElement.style.display = 'none';
        }
    };

    const SuccesShow = (value) => {
        document.getElementById('SUCCESS-TEXT').innerHTML = value;
        const myModal = new Modal(document.getElementById('SuccesModal'));
        myModal.show();
    }
    const ErrorShow = (value) => {
        document.getElementById('ERROR-TEXT').innerHTML = value;
        const myModal = new Modal(document.getElementById('ErrorModal2'));
        myModal.show();
    }

    const fetchAllEvent = () => {
        fetch(EventURI().getAllEvent(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        })
            .then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok && (resolve.data != false)) {
                    setEvents(resolve.data);
                }
            }).catch((error) => {
                setOption([]);
                console.log(error);
            })
    }

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
            });
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllPlant();
            fetchAllEvent();
        }
    }, []);


    const modalSave = (info) => {
        NewItem();
        toggleBadReq2(false)
        toggleBadReq(false);
        console.log(info.dateStr);
        const myModal = new Modal(document.getElementById('calendarModal'));
        document.getElementById('date-input').value = info.dateStr;
        myModal.show();
    }
    const modalUpdate = (info) => {
        toggleBadReq2(false)
        toggleBadReq(false);
        setEventId(info.event.groupId);
        fetch(EventURI(info.event.groupId).getOneEvent(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.ok == true) {
                    document.getElementById('inputGroupSelect01').style.backgroundColor = '#e9ecef';
                    document.getElementById('inputGroupSelect01').value = result.data.plantId;
                }

            }).catch((error) => {
                console.log(error);
                document.getElementById('inputGroupSelect01').style.backgroundColor = 'red';
            });
        UpdateItem();
        const myModal = new Modal(document.getElementById('calendarModal'));
        document.getElementById('nameOfPlant').value = info.event.title;
        document.getElementById('date-input').value = info.event.startStr;
        myModal.show();
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
        document.getElementById('nameOfPlant').value = null;
        document.getElementById('date-input').value = null;
        document.getElementById('inputGroupSelect01').style.backgroundColor = 'white';
        document.getElementById('forUpdate').style.display = 'none';
        document.getElementById('forSave').style.display = 'block';
        document.getElementById('inputGroupSelect01').disabled = false;
        document.getElementById('inputGroupSelect01').value = '';
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

    const SaveButton = () => {
        toggleLoader(true);
        const Name = document.getElementById('nameOfPlant').value;
        const Type = document.getElementById('inputGroupSelect01').value;
        const Date = document.getElementById('date-input').value;

        if (for_planner_Save(Name, Type, Date)) {
            fetch(EventURI().createEvent(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
                },
                body: JSON.stringify({
                    name: Name,
                    plantId: Type,
                    date: Date
                })
            }).then((result) => {
                if (result.ok == true) {
                    fetchAllEvent();
                    modalHide();
                    toggleLoader(false);
                    SuccesShow('Create Event Successful');
                    //add here for success
                }
            }).catch((error) => {
                modalHide();
                ErrorShow('Failed To Save Event');
                console.log(error);
            })
        } else {
            toggleBadReq(true);
            //component is null
        }
    }

    const UpdateButton = () => {
        const Name = document.getElementById('nameOfPlant').value;
        if (for_planner_update(Name)) {
            fetch(EventURI().updateEvent(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
                },
                body: JSON.stringify({
                    name: Name,
                    id: EventId
                })
            }).then(() => {
                fetchAllEvent();
                modalHide();
                SuccesShow('Update Event Successful');
            }).catch((error) => {
                modalHide();
                ErrorShow('Failed To Update Event');
                console.log(error);
            });
        } else {
            toggleBadReq(true);
            //component is null
        }
    }

    const DeleteButton = () => {
        fetch(EventURI(EventId).deleteEvent(), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        }).then(() => {
            fetchAllEvent();
            modalHide();
            SuccesShow('Delete Event Successful');
        }).catch((error) => {
            console.log(error);
            modalHide();
            ErrorShow('Failed To Delete Event');
        });
    }

    const SubmitPanen = () => {
        const Panen = document.getElementById('Panen-value').value;
        if (for_submit_panen(Panen)) {
            fetch(HistoryURI().createHistory(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
                },
                body: JSON.stringify({
                    result: Panen,
                    id: EventId
                })
            }).then((result) => {
                if (result.ok == true) {
                    fetchAllEvent();
                    modalHide();
                    SuccesShow('Success To Input Harvest Value');
                    //add here for success
                }
            }).catch((error) => {
                console.log(error);
                modalHide();
                ErrorShow('Success To Input Harvest Value');
            })
        } else {
            toggleBadReq2(true);
            //component is null
        }
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
                weekends={true}
                events={Events}
                dateClick={(info) => { modalSave(info) }}
                eventClick={(info) => { modalUpdate(info) }}
            />
            <div className="modal fade" id="calendarModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: "70%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Event</h1>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-row w-100">
                                <div className="w-100 mx-3">
                                    <div className="mb-3">
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
                                                <option value=''>Choose...</option>
                                                {Option.map((option, i) => (<option key={i} value={option.plantId}>{option.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text px-2" id="basic-addon1">Date</span>
                                            </div>
                                            <input type="Date" className="form-control" id="date-input" aria-describedby="basic-addon1" readOnly />
                                        </div>
                                        <p id="BadReq" className="text-danger">All of the above fields are required</p>
                                    </div>
                                    <div id="forUpdate" style={{ display: 'none' }}>
                                        <button type="button" onClick={UpdateButton} className="btn btn-primary mx-1">Update</button>
                                        <button type="button" onClick={DeleteButton} className="btn btn-danger mx-1">Delete</button>

                                        <div className="input-group my-3">
                                            <input type="number" className="form-control" min={0} id="Panen-value" onFocus={OnFocusP} onBlur={OnBlurP} placeholder="Sudah Panen?" aria-label="Sudah Panen?" aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">ton</span>
                                                <button className="btn btn-outline-secondary" onClick={SubmitPanen} type="button">Submit Panen</button>
                                            </div>
                                        </div>
                                        <p id="BadReq2" className="text-danger">Harvest fields are required</p>
                                    </div>
                                    <div id="forSave">
                                        <button type="button" onClick={SaveButton} className="btn btn-primary mx-1">Save</button>
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