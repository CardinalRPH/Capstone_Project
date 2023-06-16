import React, { useState, useEffect } from 'react';
import weatherFetcher from '../../utils/WeatherFeatch';
import weatherCode from '../../../globals/WeatherCode';
import { WeatherandPlant } from '../../../globals/config';
import provinces from '../../data/provinces.json'

const WeatherPlan = () => {

    let [weather, setWeather] = useState('');
    let [plant, setPlant] = useState([]);


    const fetchLocationUser = () => {
        fetch(WeatherandPlant().getUserLocation(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        })
            .then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok && (resolve.data != false)) {
                    fetchingData(provinces.filter((provCFilter) => provCFilter.id === resolve.data.province)[0].name, resolve.data.regence);
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const fetchingData = (province, regence) => {
        weatherFetcher(province, regence).then((resolve) => {
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
            })
                .then((response) => response.json())
                .then((resolve) => {
                    if (resolve.ok && (resolve.data != false)) {
                        setPlant(resolve.data);
                    } else {
                        setPlant([{
                            name: "Data Not Found"
                        }]);
                    }
                }).catch(() => {
                    setPlant([{
                        name: "Something Error"
                    }]);
                })
        }).catch((error) => {
            console.log(error);
            setWeather("Eksternal Error");
        })
    }

    useEffect(() => {
        fetchLocationUser();
    }, [])

    return (
        <div className="courses-container">
            <div className="course">
                <div className="course-preview">
                    <h6>Current Weather</h6>
                    <h2>{weather}</h2>
                </div>
                <div className="course-info">
                    <h6>Plants Suitable At This Time</h6>
                    {/* <li>{plant.name}</li> */}
                    {plant.slice(0, 3).map((plants, i) => (<li key={i}>{plants.name}</li>))}
                </div>
            </div>
        </div>
    );
};


export default WeatherPlan;