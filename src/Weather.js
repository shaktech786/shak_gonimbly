import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import "./Weather.css";
import WeatherCard from './WeatherCard';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            weather: "",
            weatherError: ""
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
                        this.setState({ weatherError: "" })
                        this.setState({ weather: response.data })
                    })
                    .catch(error => {
                        this.setState({ weatherError: "Could not find city!" })
                        console.log(error, "Cannot find weather data for this location")
                    })
            })
            .catch(error => {
                this.setState({ weatherError: "Please try again with a valid city!" })
                console.log(error, "Cannot fetch API data")
            })
    }

    render() {
        const weatherInfo = this.state.weather && this.state.weather.consolidated_weather;
        const weatherInfoAvailable = this.state.weather !== "";
        return (
            <Paper className="weather-paper">
                <h1>Is it warm yet?</h1>
                <Input type="text" onKeyPress={this.onEnter} onChange={this.updateLocation} value={this.state.location} placeholder="City?" />
                <Button onClick={this.getWeather}>Get Some Weather!</Button>
                {!this.state.weatherError && <h2>{this.state.weather.title}</h2>}
                {weatherInfoAvailable && this.state.weatherError === "" &&
                    weatherInfo.map(day => (
                        <WeatherCard key={day.applicable_date} day={day} />
                    ))
                }
                <h3>{this.state.weatherError}</h3>
            </Paper>
        );
    }
}

export default Weather;
