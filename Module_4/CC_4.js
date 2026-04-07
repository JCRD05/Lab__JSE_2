function getWeather(cities, info = 'all') {
    const cityList = Array.isArray(cities) ? cities : [cities];
    const infoType = (info === 'all' || !info) ? '' : info;

    cityList.forEach(city => {
        const url = new URL('http://localhost:3000/weather');
        url.searchParams.append('city', city);
        if (infoType) url.searchParams.append('info', infoType);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(`CITY: ${data.city}`);

                if (data.weather) {
                    const w = data.weather;

                    if (w.wind) {
                        console.log(`WIND: ${w.wind.speed} m/s, ${w.wind.deg} deg`);
                        if (w.wind.speed > 15) {
                            console.log("WARNING! Wind speed over 15 m/s");
                        }
                    }

                    if (w.clouds !== undefined) {
                        console.log(`CLOUDS: ${w.clouds} %`);
                    }

                    if (w.temp !== undefined) {
                        console.log(`TEMP: ${w.temp} C`);
                        if (w.temp < -20) {
                            console.log("WARNING! Temperature below -20 degrees");
                        }
                    }

                    if (w.precipitation !== undefined) {
                        console.log(`PRECIPITATION: ${w.precipitation} %`);
                    }
                }
                console.log(""); 
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });
    });
}

// Run this command in the termianl to start the server: node Module_4/server.js
// Kill the terminal to shut down the server

let weather1 = getWeather('Berlin', 'wind');
// CITY: Berlin
// WIND: 16 m/s, 117 deg
// WARNING! Wind speed over 15 m/s

let weather2 = getWeather(['Oslo', 'Yakutsk'], 'all');
// CITY: Oslo
// WIND: 8 m/s, 170 deg
// CLOUDS: 0 %
// TEMP: 0 C
// PRECIPITATION: 0 %
//
// CITY: Yakutsk
// WIND: 0 m/s, 0 deg
// CLOUDS: 0 %
// TEMP: -40 C
// WARNING! Temperature below -20 degrees
// PRECIPITATION: 0 %