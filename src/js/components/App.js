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


export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departure: {},
            arrival: {},
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

    handleDeparture = () => {
        let place = this.departure.getPlace();
        if (place) {
            let cords = this.determineCords(place);
            this.changeCordsOfDeparture(cords.lat, cords.lng);

        }
    };

    changeCordsOfDeparture = (lat, lng) => {
        this.setState({
            departure: {
                lat: lat,
                lng: lng
            }
        });
        console.log("LOG State: ", this.state)

    };

    handleArrival = () => {
        let place = this.arrival.getPlace();
        if (place) {
            let cords = this.determineCords(place);
            this.changeCordsOfArrival(cords.lat, cords.lng);

        }
    };


    changeCordsOfArrival = (lat, lng) => {
        this.setState({
            arrival: {
                lat: lat,
                lng: lng
            }
        });
        console.log("LOG State: ", this.state)
    };

    determineCords = (place) => {
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
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
    };

    handleResults = (data) => {
        this.setState({resultData: data});
    };

    render() {
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
                    onLoad={this.initComponent}>
                </Script>
                <MenuBar/>
                <Title/>
                <Search submitCords={this.submitCordsAndGetResult}/>
                <Results resultData={this.state.resultData}/>
                <Footer/>
            </div>
        )
    }

}
