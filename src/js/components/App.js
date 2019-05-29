import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './menubar/MenuBar.js';
import Footer from './footer/Footer.js';
import Results from './result/Results.jsx';
import Title from './title/Title.js';
import '../../style.css'
import PythonResponse from "./python_endpoint/PythonResponse.js"
import Search from "./search/Search.js"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {postCords} from "./python_endpoint/PythonPost.js";
import Script from "react-load-script";


const place = {
    0:
        {
            long_name: "Berkeley", short_name:
                "Berkeley"
        },
    1:
        {
            long_name: "Alameda County", short_name:
                "Alameda County"
        },
    2:
        {
            long_name: "Kalifornien", short_name:
                "CA"
        },
    3:
        {
            long_name: "USA", short_name:
                "US"
        }
}


export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departure: {},
            arrival: {},
            LocationDeparture: {},
            LocationArrival: {},
            resultData: {}
        }
    }


    fields = ['address_components', 'geometry', 'icon', 'name'];

    initComponent = () => {
        this.departure = new google.maps.places.Autocomplete(
            document.getElementById('departure'));
        this.arrival = new google.maps.places.Autocomplete(
            document.getElementById('arrival'));
        this.departure.setFields(this.fields);
        this.departure.addListener('place_changed', this.handleDeparture);
        this.arrival.setFields(this.fields);
        this.arrival.addListener('place_changed', this.handleArrival);
    };

    getLocation = place =>{
        let tmpLocation = place.name;
        return tmpLocation;
    };

    handleDeparture = () => {
        let place = this.departure.getPlace();
        if (place) {
            let cords = this.determineCords(place);
            this.changeCordsOfDeparture(cords.lat, cords.lng);
            this.setDepartureLocation(place);
            console.log("LOG State Departure: ", this.state)
        }
    };

    changeCordsOfDeparture = (lat, lng) => {
        this.setState({
            departure: {
                lat: lat,
                lng: lng
            }
        });
    };

    setDepartureLocation = place => {
        let tmpLocation = this.getLocation(place)
        this.setState({LocationDeparture: tmpLocation})
    };

    handleArrival = () => {
        let place = this.arrival.getPlace();
        if (place) {
            let cords = this.determineCords(place);
            this.changeCordsOfArrival(cords.lat, cords.lng);
            this.setArrivalLocation(place);
            console.log("LOG State Arrival: ", this.state)
        }
    };

    changeCordsOfArrival = (lat, lng) => {
        this.setState({
            arrival: {
                lat: lat,
                lng: lng
            }
        });
    };

    setArrivalLocation = place => {
       let tmpLocation = this.getLocation(place);
        this.setState({LocationArrival: tmpLocation})
    };

    determineCords = (place) => {
        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }
        let cords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
        return cords;
    };

    submitCordsAndGetResult = async () => {
        console.log("SUBMIT GEDRÜCKT ")
        let returnData = await postCords(this.state);
        this.handleResults(returnData.data)
        // let data = {data: {
        //     cycling: {dist: 369270.6, time: 108861.3, emission: 1.1816659200000001},
        //     driving: {dist: 407345.8, time: 15023.9, emission: 86.5609825},
        //     flight: {dist: 308469.945250751, time: 25551.57089380632, emission: 55.36653014513517},
        //     transit: {dist: 404634, time: 12424, emission: 16.18536}
        // }}
    };

    handleResults = (data) => {
        this.setState({resultData: data});
    };

    render() {
        const {LocationDeparture, LocationArrival, resultData} = this.state
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
                    onLoad={this.initComponent}>
                </Script>
                <MenuBar/>
                <Title/>
                <Search submitCords={this.submitCordsAndGetResult}/>
                <Results
                    resultData={resultData}
                    locationDeparture={LocationDeparture}
                    locationArrival={LocationArrival}
                />
                <Footer/>
            </div>
        )
    }

}
