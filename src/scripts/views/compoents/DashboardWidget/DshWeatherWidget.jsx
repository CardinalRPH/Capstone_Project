import React, { useState } from "react";

const Dshweatherwidget = (props) => {
    const { classIcon, Location, weather } = props;

    const [clocknDate, setClocknDate] = useState({
        clock: '',
        date: ''
    });

    const updateClock = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = currentTime.toLocaleDateString('id-ID', options);

        setClocknDate({
            clock: `${hours}:${minutes}:${seconds}`,
            date: date
        });
    };



    setInterval(updateClock, 1000);

    return (
        <div className="rounded text-dark dashboard-weather p-4 shadow m-3 col dsh-weather-widget" >
            <div className="card-body p-4">
                <h4>Current Weather</h4>
                <div className="d-flex align-items-center">
                    <i className="fas fa-location-dot mr-2 fa-2x" />
                    <div className="flex-grow-1 mb-0">
                        <h6 className="">{Location.province}</h6>
                        <h6>{Location.regence}</h6>
                    </div>
                    <i className={classIcon}></i>
                </div>
                <div className="d-flex flex-column text-center mt-5 mb-4 ">
                    <h5 className="text-info">{weather}</h5>
                    <h6 className="display-4 mb-0 font-weight-bold">{clocknDate.clock}</h6>
                    <span className="small">{clocknDate.date}</span>
                </div>
            </div>
        </div>
    )
}
export default Dshweatherwidget;