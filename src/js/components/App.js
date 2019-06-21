import React, {Component, useRef} from 'react';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './menubar/MenuBar.js';
import Results from './result/Results.jsx';
import Title, {LowerTitle} from './title/Title.js';
import {GreenstepHeader} from './result/display_result/Placeholder.js'
import '../../style.css'
import Search from "./search/Search.js"
import {postCords} from "./python_backend/PostCords.js";
import controlDistance from "./python_backend/PostCords.js"
import Script from "react-load-script";
import Vision from './Vision/vision.jsx'
import MyFootprint from './compensation/MyFootprint.jsx'
import Comparison from './compensation/Comparison.jsx'
import {ListExampleHeader} from './compensation/CompensationList.jsx';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";


export default class App extends Component {
    constructor(props) {
        super(props);
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
            TravelChoices: "",
            activeItem: "",
            activeMenuItem: "",
            loadingStatusChange: this.changeLoading,
            loading: ""
        };

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
        return place.geometry ? {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            } :
            console.log("No details available for input: '" + place.name + "'");
    };


    handleClickedItem = (item) => {
        console.log("ES WURDE GEKLICKT ITEM TARGET: ", item.target)
        this.resetResultData();
        this.setState(({activeItem: item.target.id}), () => {
            this.changeLoading();
            console.log("ES WURDE GEKLICKT:", this.state.activeItem)
        });
    };

    resetResultData = () => {
        this.setState({resultData: {}});
    };

    handleMenuItemClick = (e, {item}) => {
        const itemValue = {activeMenuItem: e.target.id};
        this.setState(itemValue);
    };

    changeLoading = () => {
        this.setState({loading: true});
        this.chooseCorrectPost().then((result) => {
            console.log("RESULT VON APP:_", result)
            this.setState({loading: false});
            const resultData = result;
            this.handleResults(resultData.data)
        });
        // this.handleResults(mock_data);
    };

    chooseCorrectPost = async () => {
        switch (this.state.activeItem.toString()) {
            case "Plane":
                return postCords(this.state, `http://127.0.0.1:8000/getPlane/`);
            case "Train":
                return postCords(this.state, `http://127.0.0.1:8000/getTransit/`);
            case "Male":
                return postCords(this.state, `http://127.0.0.1:8000/getWalking/`);
            case "Car":
                return postCords(this.state, `http://127.0.0.1:8000/getDriving/`);
            case "Bicycle":
                return postCords(this.state, `http://127.0.0.1:8000/getCycling/`);
        }
    };

    handleResults = (data) => {
        const newResultData = {resultData: data};
        this.setState(newResultData);
    };

    checkLocation = () => {
        controlDistance(this.state).then(response => {
            this.setState({TravelChoices: response});
        }).catch(error => {
                this.showErrorMessage();
            }
        );
    };

    showErrorMessage = () => {
        alert(
            "Please type a valid Departure and Arrival Address")
    };


    render() {
        const {LocationDeparture, LocationArrival, resultData} = this.state;
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
                    onLoad={this.initComponent}>
                </Script>
                <MenuBar
                    activeMenuItem={this.state.activeMenuItem}
                    changeMenuItem={this.handleMenuItemClick}/>
                <Title/>
                {GreenstepHeader(this.state.StepContent)}
                <Search
                    clickedItem={this.handleClickedItem}
                    activeItem={this.state.activeItem}
                    TravelChoices={this.state.TravelChoices}
                    locationArrival={this.state.LocationArrival}
                    locationDeparture={this.state.LocationDeparture}
                    checkLocation={this.checkLocation}
                />
                <Comparison
                    clickedItem={this.state.activeItem}
                    resultData={this.state.resultData.data}
                />
                <Results
                    resultData={resultData}
                    locationDeparture={LocationDeparture}
                    locationArrival={LocationArrival}
                    loading={this.state.loading}
                    StepContent={this.state.StepContent}
                    TravelChoices={this.state.TravelChoices}
                    ActiveTravelItem={this.state.activeItem}
                />

                <MyFootprint
                    resultData={this.state.resultData.data}
                    clickedItem={this.state.activeItem}
                />


                {ListExampleHeader(this.state.resultData.data)}
                {/*<Footer/>*/}

                <LowerTitle/>
            </div>
        )
    }

}
