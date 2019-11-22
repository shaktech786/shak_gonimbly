import React from "react";
import { Card } from '@material-ui/core';

const WeatherCard = ({ day }) => {
    return (
        <Card className="weather-card">
            <h2>{day.applicable_date}</h2>
            <img className="weather-icon" alt="Weather Icon" src={`https://www.metaweather.com/static/img/weather/png/${day.weather_state_abbr}.png`} />
            <h3>{day.weather_state_name}</h3>
        </Card>
    )
}

export default WeatherCard;