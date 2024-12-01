import { useEffect, useState } from "react";
import "./weatherWidget.css";

function WeatherWidget() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=30.62&longitude=-96.331&current=temperature_2m,wind_speed_10m")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setWeather(data))
        .catch(err => console.error(err.message));
    }, []);

    const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

    return (
        <div>
            {weather ? (
                <div className="weather-widget">
                    <p>Current Weather in College Station</p>
                    <p>Temperature: {celsiusToFahrenheit(weather.current.temperature_2m).toFixed(2)}°F</p>
                    <p>Wind Speed: {weather.current.wind_speed_10m}m/s</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default WeatherWidget;
