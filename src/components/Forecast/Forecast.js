import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import {
    textInput,
    Radio,
    Button
} from './Forecast.module.css';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

function getForecast(e) {
    e.preventDefault();
    console.log(e);


    if (city.length === 0) {
        return setError(true);
    }

    // Clear state in preparation for new data
    setError(false);
    setResponseObj({});
    
    setLoading(true);
    
    const uriEncodedCity = encodeURIComponent(city);


  fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${uriEncodedCity}&cnt=0&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=${unit}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "10302e7209msh5a64883cecdfd2cp1e8446jsndae7a232cb1c",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    }
  }).then(response => response.json())
    .then(response => {
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