import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import {
    textInput,
    Radio,
    Button
} from './Forecast.module.css';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperials');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

function getForecast(e) {
    
    e.preventDefault();

    if (city.length === 0) {
       // return setError(true);
    }

    // Clear state in preparation for new data
   setError(false);
    setResponseObj({});
    
   setLoading(true);
    
    const uriEncodedCity = encodeURIComponent(city);

    let datas = {};

fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&lat=1&lon=1&&id=2172797&lang=en&units=${unit}&mode=xml%2C%20html`, {
	"method": "GET",
	"headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "10302e7209msh5a64883cecdfd2cp1e8446jsndae7a232cb1c"
		
	}
})

.then(response => response.json()) 
.then(response =>{
    console.log(response);
        if (response.cod !== 200) {
            throw new Error()
        }
        setResponseObj(response);
        setLoading(false);
    })
    .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
    });

}


    return (
        <div>
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
            
                <button className={Button} type="submit">Get Forecast</button>
                {/* <button className={Button} onClick={getForecast}>Get Forecast</button> */}
            </form>
            <Conditions
               responseObj={responseObj}
               error={error}
               loading={loading}
            />
        </div>
    )
}

export default Forecast;


// test(
//     {"coord":{"lon":126.9778,"lat":37.5683},
//     "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
//     "base":"stations",
//     "main":{"temp":90.81,"feels_like":93.43,
//     "temp_min":85.44,"temp_max":93.61,"pressure":1008,
//     "humidity":44,"sea_level":1008,"grnd_level":1002},
//     "visibility":10000,"wind":{"speed":7.47,"deg":236,"gust":7.18},
//     "rain":{"1h":0.87},"clouds":{"all":0},"dt":1628050479,
//     "sys":{"type":1,
//     "id":5509,"country":"KR",
//     "sunrise":1628023096,
//     "sunset":1628073485},
//     "timezone":32400,
//     "id":1835848,
//     "name":"Seoul","cod":200}
//     )