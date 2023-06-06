const weatherFetcher = () => new Promise((resolve, reject) => {
    const currentDate = new Date();

    fetch('https://api.codetabs.com/v1/proxy/?quest=https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-DKIJakarta.xml', {
    })
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(data, "application/xml");
            let masterEl = xmlDoc.querySelector("data[source='meteofactory']")
            let dx = "Jakarta Selatan"
            let mindex = 0;
            let timeIndex = 0;

            //findIdArea
            masterEl.querySelectorAll("area").forEach((area, index) => {
                if (area.getAttribute("description") == dx) {
                    mindex = index;
                }
            });

            const weather = masterEl.querySelectorAll('area')[mindex].querySelectorAll('parameter')[6];

            // findTime Match
            const dateComparer = (dateSc, index) => {
                const targetYear = parseInt(dateSc.slice(0, 4));
                const targetMonth = parseInt(dateSc.slice(4, 6)) - 1; // Perhatikan: Bulan dimulai dari 0 (Januari) hingga 11 (Desember)
                const targetDay = parseInt(dateSc.slice(6, 8));
                const targetHour = parseInt(dateSc.slice(8, 10));
                const targetMinute = parseInt(dateSc.slice(10, 12));

                const PlusDate = new Date(targetYear, targetMonth, targetDay, targetHour + 6, targetMinute);
                const MinDate = new Date(targetYear, targetMonth, targetDay, targetHour - 1, targetMinute);
                if (PlusDate > currentDate && currentDate > MinDate) {
                    timeIndex = index;
                }
            }

            weather.querySelectorAll("timerange").forEach((time, index) => {
                dateComparer(time.getAttribute('datetime'), index)
            });

            //End Of find Time
            let weatherResult = weather.querySelectorAll('timerange')[timeIndex].querySelector('value').innerHTML;
            resolve(weatherResult);

        }).catch((error) => {
            reject(error)
        })
});

export default weatherFetcher;
