import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Card } from '@material-ui/core';
import "./Weather.css";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            weather: "",
        }
        this.getWeather = this.getWeather.bind(this);
    }

    updateLocation = (event) => {
        this.setState(
            { location: event.target.value }
        );
    }

    onEnter = (event) => {
        if (event.key === "Enter") {
            this.getWeather();
        }
    }

    getWeather = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.state.location}`)
            .then(response => {
                axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${response.data[0].woeid}`)
                    .then(response => {
                        this.setState({ weather: response.data })
                    })
                    .catch(error => {
                        console.log(error, "Cannot find weather data for this location")
                    })
            })
            .catch(error => {
                console.log(error, "Cannot fetch API data")
            })
    }

    render() {
        const weatherInfo = this.state.weather && this.state.weather.consolidated_weather;
        return (
            <Paper className="weather-paper">
                <h1>Is it warm yet?</h1>
                <Input type="text" onKeyPress={this.onEnter} onChange={this.updateLocation} value={this.state.location} placeholder="City?" />
                <Button onClick={this.getWeather}>Get Some Weather!</Button>
                {this.state.weather !== "" &&
                    weatherInfo.map(day => (
                        <Card key={day.applicable_date} className="weather-card">
                            <h2>{day.applicable_date}</h2>
                            <img className="weather-icon" alt="Weather Icon" src={`https://www.metaweather.com/static/img/weather/png/${day.weather_state_abbr}.png`} />
                            <h3>{day.weather_state_name}</h3>
                        </Card>
                    ))
                }
            </Paper>
        );
    }
}

export default Weather;
