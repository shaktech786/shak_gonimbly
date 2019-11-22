import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';
import './App.css';
import axios from 'axios';
import { Card } from '@material-ui/core';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            weather: ""
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
                        this.setState({ weather: response.data.consolidated_weather[0] })
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
        return (
            <Paper className="weather">
                <h1>Is it warm yet?</h1>
                <Input type="text" onKeyPress={this.onEnter} onChange={this.updateLocation} value={this.state.location} placeholder="City?" />
                <Button onClick={this.getWeather}>Get Some Weather!</Button>
                <Card>{this.state.weather.weather_state_name}</Card>
            </Paper>
        );
    }
}

export default Weather;
