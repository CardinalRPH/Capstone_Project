import React from "react";
import FullCalendar from "@fullcalendar/react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
const Calendar_pg = () => {

    const modalClicked = () => {
        const myModal = new bootstrap.Modal('#calendarModal');
        myModal.show();
        
    }


    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Planner</h1>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2019-04-01' },
                    { title: 'event 2', date: '2019-04-02' }
                ]}
                dateClick={modalClicked}
            />
            <div class="modal fade" id="calendarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar_pg;