import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherApi() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London`
      )
      //.then is a promise which will contain the data available if its able to retrieve it
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchWeather = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data);
      });
  };

  //Event
  const weatherInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      {weather && (
        <div>
          <div className="search">
            <input onChange={weatherInput} type="text" />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
            <h3>{weather.current.condition.text}</h3>
            <img src={weather.current.condition.icon} />
            <h3>{weather.current.temp_c} Celsius</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApi;
