import React, { useState, useEffect } from 'react';
import weatherFetcher from '../../utils/WeatherFeatch';
import weatherCode from '../../../globals/WeatherCode';
import { WeatherandPlant } from '../../../globals/config';

const WeatherPlan = () => {

    let [weather, setWeather] = useState('');
    let [plant, setPlant] = useState('');

    useEffect(() => {
        const fetchingData = () => {     
            weatherFetcher().then((resolve) => {
                for (let i in weatherCode) {
                    if (weatherCode[i].code == resolve) {
                        setWeather(weatherCode[i].text)
                        break;
                    }
                }
                fetch(WeatherandPlant(resolve).getPlant(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
                    }
                }).then((resolve) => {
                    if (resolve.ok && (resolve.data != false)) {
                        setPlant(resolve.data.name);
                    } else {
                        setPlant('Data Not Found')
                    }
                }).catch(() => {
                    setPlant('Something Error')
                })
            }).catch(() => {
                setWeather("Eksternal Error");
            })
        }
        fetchingData();
    },[])

    return (
        <div className="courses-container">
            <div className="course">
                <div className="course-preview">
                    <h6>Cuaca Hari ini</h6>
                    <h2>{weather}</h2>
                </div>
                <div className="course-info">
                    <h6>Tanaman Hari ini</h6>
                    <h2>{plant}</h2>
                    {/* 			add right here */}
                </div>
            </div>
        </div>
    );
};


export default WeatherPlan;