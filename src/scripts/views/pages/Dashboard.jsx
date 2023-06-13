import React, { useEffect, useState } from "react";
import Dshweatherwidget from "../compoents/DashboardWidget/DshWeatherWidget";
import Dshhistorywidget from "../compoents/DashboardWidget/DshHistoryWidget";
import Dshnewswidget from "../compoents/DashboardWidget/DshNewsWidget";
import { HistoryURI, TipsURI, WeatherandPlant } from "../../../globals/config";
import weatherFetcher from "../../utils/WeatherFeatch";
import weatherCode from "../../../globals/WeatherCode";
import { useSelector } from "react-redux";

const Dashboard_pg = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [history, setHistory] = useState([]);
  const [Tips, setTips] = useState([]);
  const [weather, setWeather] = useState('');
  const [Location, setLocation] = useState({
    regence: '',
    province: ''
  });
  const [classIcon, setClassIcon] = useState('');

  const GetHistory = () => {
    fetch(HistoryURI().getHistory(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
      }
    }).then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != false)) {
          setHistory(resolve.data);
        }
      }).catch((error) => {
        setHistory([])
        console.log(error);
      });
  }

  const getTipsTrick = () => {
    fetch(TipsURI().getTips(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
      }
    }).then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != '')) {
          setTips(resolve.data);
        }
      }).catch((error) => {
        console.log(error);
      })
  }

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
          setLocation(resolve.data)
          fetchingData(resolve.data.province, resolve.data.regence);
        }
      }).catch((error) => {
        console.log(error);
      })
  }

  const fetchingData = (province, regence) => {
    weatherFetcher(province, regence).then((resolve) => {
      setWeatherIcon(resolve);
      for (let i in weatherCode) {
        if (weatherCode[i].code == resolve) {
          setWeather(weatherCode[i].text);
          break;
        }
      }
    }).catch((error) => {
      console.log(error);
      // setWeather("Eksternal Error");
    })
  }

  const setWeatherIcon = (code) => {
    if (code >= 0 && code <= 2) {
      if (isPagiSiangSore()) {
        setClassIcon('fa-solid fa-sun fa-5x text-info');
      } else {
        setClassIcon('fa-solid fa-moon fa-5x text-info');
      }
    } else if (code >= 3 && code <= 4) {
      if (isPagiSiangSore()) {
        setClassIcon('fa-solid fa-cloud-sun fa-5x text-info');
      } else {
        setClassIcon('fa-solid fa-cloud-moon fa-5x text-info');
      }
    } else if (code >= 5 && code <= 45) {
      setClassIcon('fa-solid fa-smog fa-5x text-info');
    } else if (code >= 60 && code <= 61) {
      if (isPagiSiangSore()) {
        setClassIcon('fa-solid fa-cloud-sun-rain fa-5x text-info');
      } else {
        setClassIcon('fa-solid fa-cloud-moon-rain fa-5x text-info');
      }
    } else if (code >= 63 && code <= 80) {
      setClassIcon('fa-solid fa-cloud-showers-heavy fa-5x text-info');
    } else if (code >= 95 && code <= 97) {
      setClassIcon('fa-solid fa-cloud-showers-water fa-5x text-info');
    }
  }

  const isPagiSiangSore = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    return (hours >= 6 && hours <= 18);
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchLocationUser();
      getTipsTrick();
      GetHistory();
    }
  }, []);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <div className="container my-3">
        <div className="row">

          {/* weather  */}
          <Dshweatherwidget classIcon={classIcon} weather={weather} Location={Location} />
          {/* end of weather */}

          {/* history */}
          <Dshhistorywidget history={history} />
          {/* end of history */}

        </div>

        {/* news */}
        <Dshnewswidget Tips={Tips} />
        {/* end of news */}
      </div>
    </>
  );
};

export default Dashboard_pg;
