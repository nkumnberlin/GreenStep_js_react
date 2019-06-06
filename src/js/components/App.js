import React, {Component, useRef} from 'react';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './menubar/MenuBar.js';
import Footer from './footer/Footer.js';
import Results from './result/Results.jsx';
import Title from './title/Title.js';
import {Steps} from './result/display_result/PlaceholderResult.js'
import '../../style.css'
import Search from "./search/Search.js"
import {postCords}  from "./python_backend/PostCords.js";
import controlDistance from "./python_backend/PostCords.js"
import Script from "react-load-script";
import Vision from './Vision/vision.jsx'


// const mock_data ={"data":{"cycling":{"dist":369270.6,"time":108861.3,"emission":1.1816659200000001,"travel_mode":"CYCLING"},"driving":{"dist":395843.6,"time":14995.9,"emission":84.11676499999999,"travel_mode":"DRIVING"},"flight":{"dist":372822.945250751,"time":32493.57089380632,"emission":100.4603401030598,"travel_mode":"FLYING","steps":[{"transit":{"dist":4621,"time":1550,"emission":0.18484000000000003,"travel_mode":"TRANSIT","steps":[{"travel_mode":"WALKING","duration":133,"distance":163,"start_location":"Wandschneiderstraße 8, 28195 Bremen, Germany","end_location":"Bremen Am Brill (Bgm.-Smidt-Straße)"},{"travel_mode":"TRANSIT","duration":360,"distance":2551,"start_location":"Bremen Am Brill (Bgm.-Smidt-Straße)","end_location":"Bremen Solinger Straße"},{"travel_mode":"WALKING","duration":1409,"distance":1907,"start_location":"Bremen Solinger Straße","end_location":"Bremen Airport (BRE), Flughafenallee 20, 28199 Bremen, Germany"}]}},{"flight":{"dist":357340.945250751,"time":28600.57089380632,"emission":64.32137014513518,"travel_mode":"FLYING","steps":[{"travel_mode":"FLYING","duration":28600.57089380632,"distance":357340.945250751,"start_location":"BRE","end_location":"TXL"}]}},{"transit":{"dist":10861,"time":2343,"emission":0.43444000000000005,"travel_mode":"TRANSIT","steps":[{"travel_mode":"WALKING","duration":58,"distance":80,"start_location":"Berlin Tegel Airport (TXL), Zufahrt zum Flughafen Tegel, 13405 Berlin, Germany","end_location":"Airport Tegel Berlin Bus Station"},{"travel_mode":"TRANSIT","duration":2220,"distance":10724,"start_location":"Airport Tegel Berlin Bus Station","end_location":"Spandauer Straße/Marienkirche"},{"travel_mode":"WALKING","duration":64,"distance":57,"start_location":"Spandauer Straße/Marienkirche","end_location":"B2 7, 10178 Berlin, Germany"}]}}]},"transit":{"dist":404631,"time":12604,"emission":16.18524,"steps":[{"travel_mode":"WALKING","duration":714,"distance":969,"start_location":"Wandschneiderstraße 8, 28195 Bremen, Germany","end_location":"Bremen Central Station"},{"travel_mode":"TRANSIT","duration":3300,"distance":115121,"start_location":"Bremen Central Station","end_location":"Hamburg Central Station"},{"travel_mode":"TRANSIT","duration":6240,"distance":285721,"start_location":"Hamburg Central Station","end_location":"Berlin Central Station"},{"travel_mode":"WALKING","duration":58,"distance":57,"start_location":"Berlin Central Station","end_location":"Berlin Central Station"},{"travel_mode":"TRANSIT","duration":240,"distance":2372,"start_location":"Berlin Central Station","end_location":"S Hackescher Markt (Berlin)"},{"travel_mode":"WALKING","duration":309,"distance":391,"start_location":"S Hackescher Markt (Berlin)","end_location":"B2 7, 10178 Berlin, Germany"}]},"walking":{"dist":348326.2,"time":246397,"emission":0.0,"travel_mode":"WALKING"}}}
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
            TravelChoices: [],
            activeItem: "",
            activeMenuItem: "",
            loadingStatusChange: this.changeLoading,
            loading: ""
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
        return place.geometry  ?  {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }:
            console.log("No details available for input: '" + place.name + "'");
    };

    // submitCordsAndGetResult = async () => {
    //     console.log("SUBMIT GEDRÜCKT ")
    //     let returnData = await postCords(this.state);
    //     this.handleResults(returnData.data)
    //
    //     // this.handleResults(mock_data)
    //     // console.log("RESULTS: ", json_mockup)
    //
    //
    // };

    handleResults = (data) => {
        const newResultData = {resultData: data}
        this.setState(newResultData);
    };

    handleClickedItem = (item) => {
        const activeItem = {activeItem: item.target.id};
        this.setState(activeItem);
        this.changeLoading();
    };

    handleMenuItemClick = (e, {item}) => {
        const itemValue ={activeMenuItem: e.target.id};
        this.setState(itemValue);
    };

    changeLoading = () => {
        this.setState({loading:true});
        this.chooseCorrectPost().then((result)=>{
            console.log("RESULT VON APP:_" , result)
            this.setState({loading: false});
                const resultData = result;
                this.handleResults(resultData.data)
        });
    };

    chooseCorrectPost = async () => {
        const lengthOfOption = this.state.TravelChoices.length;
        const {TravelChoices} = this.state;
        console.log("WAT IS TRYPE: " , typeof(TravelChoices))
        console.log(TravelChoices.hasOwnProperty("Car") )
        switch (lengthOfOption) {
            case 1: return postCords(this.state,`http://127.0.0.1:8000/getWalking/`);
            case 2: return TravelChoices.hasOwnProperty("Car") ?
                    postCords(this.state,`http://127.0.0.1:8000/getTransitAndDriving/`) :
                    postCords(this.state,`http://127.0.0.1:8000/getWalkingCycling/`);
            case 3: return postCords(this.state,`http://127.0.0.1:8000/getTransitDrivingAndFlying/`);
        }
    };

    checkLocation = () =>{
        controlDistance(this.state).then(response=>{
            console.log("DIES IS RES:", response)
            this.setState({TravelChoices: response});
            console.log("AKTUALSIIERTER STATE:", this.state.TravelChoices)

        });
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
                <Search
                    clickedItem={this.handleClickedItem}
                    activeItem={this.state.activeItem}
                    TravelChoices={this.state.TravelChoices}
                    locationArrival={this.state.LocationArrival}
                    locationDeparture={this.state.LocationDeparture}
                    checkLocation={this.checkLocation}
                />
                {Steps(this.state.StepContent)}
                <Results
                    resultData={resultData}
                    locationDeparture={LocationDeparture}
                    locationArrival={LocationArrival}
                    loading={this.state.loading}
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
