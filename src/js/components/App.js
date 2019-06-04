import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './menubar/MenuBar.js';
import Footer from './footer/Footer.js';
import Results from './result/Results.jsx';
import Title from './title/Title.js';
import '../../style.css'
import Search from "./search/Search.js"
import {postCords} from "./python_backend/PostCords.js";
import Script from "react-load-script";
import Vision from './Vision/vision.jsx'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            departure: {},
            arrival: {},
            LocationDeparture: {},
            LocationArrival: {},
            resultData: {},
            StepContent: {
                Icons: ['truck', 'search', 'credit card'],
                Header: ["Planning", 'Searching', 'Donating'],
                Description: ["Plan your Route!", "Choose the best Route!", "Compensate your Emission!"]
            },
            TravelChoices: ["Bicycle", "Car", "Plane", "Train", "Male"],
            activeItem: "",
        }
    }


    initComponent = () => {
        this.fields = ['address_components', 'geometry', 'icon', 'name'];
        this.departure = new google.maps.places.Autocomplete(
            document.getElementById('departure'));
        this.arrival = new google.maps.places.Autocomplete(
            document.getElementById('arrival'));
        this.departure.setFields(this.fields);
        this.departure.addListener('place_changed', this.handleDeparture);
        this.arrival.setFields(this.fields);
        this.arrival.addListener('place_changed', this.handleArrival);
    };

    getLocation = place => {
        return place.name;
    };

    handleDeparture = () => {
        let place = this.departure.getPlace();
        if (place) {
            let cords = this.determineCords(place);
            this.changeCordsOfDeparture(cords.lat, cords.lng);
            this.setDepartureLocation(place);
            console.log("LOG State FormField: ", this.state)
        }
    };

    changeCordsOfDeparture = (lat, lng) => {
        const departure = {
            departure: {
                lat: lat,
                lng: lng
            }
        };
        this.setState(departure);
    };

    setDepartureLocation = place => {
        let tmpLocation = {LocationDeparture: this.getLocation(place)};
        this.setState(tmpLocation);
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
        const arrival = {
            arrival: {
                lat: lat,
                lng: lng
            }
        };
        this.setState(arrival);
    };

    setArrivalLocation = place => {
        let tmpLocation = {LocationArrival: this.getLocation(place)};
        this.setState(tmpLocation)
    };

    // ?:
    determineCords = (place) => {
        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }

        return {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
    };

    submitCordsAndGetResult = async () => {
        console.log("SUBMIT GEDRÜCKT ")
        let returnData = await postCords(this.state);
        this.handleResults(returnData.data)
        //   let data = {
        //       data: {
        //           cycling: {dist: 369270.6, time: 108861.3, emission: 1.1816659200000001},
        //           driving: {dist: 407345.8, time: 15023.9, emission: 86.5609825},
        //           flight: {dist: 308469.945250751,  emission: 55.36653014513517, steps: [
        //
        //
        //           ]
        //           time: 25551.57089380632,},
        //           transit: {dist: 404634, time: 12424, emission: 16.18536}
        //       }
        //   };
        // this.handleResults(json_mockup)
        // console.log("RESULTS: ", json_mockup)


    };

    handleResults = (data) => {
        console.log("RESULTS:", data)
        const newResultData = {resultData: data}
        this.setState(newResultData);
    };

    handleClickedItem = (item) => {
        const activeItem = {activeItem: item.target.id};
        console.log("LOL KLICKED ITEM!!", activeItem)
        this.setState(activeItem);
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
                <Search
                    submitCords={this.submitCordsAndGetResult}
                    clickedItem={this.handleClickedItem}
                    activeItem={this.state.activeItem}
                    TravelChoices={this.state.TravelChoices}
                />
                <Results
                    resultData={resultData}
                    locationDeparture={LocationDeparture}
                    locationArrival={LocationArrival}
                    StepContent={this.state.StepContent}
                    TravelChoices={this.state.TravelChoices}
                    ActiveTravelItem={this.state.activeItem}
                />

                <Vision/>
                <Footer/>
            </div>
        )
    }

}
