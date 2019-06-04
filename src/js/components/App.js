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

const json_mockup =
    {
        data: {
            flight:
                {
                    dist: 371803.9452502751,
                    emission: 100.41958010305981,
                    time: 32200.57089380632,
                    travel_mode: "flight",
                    steps: [
                        {
                            transit: {
                                dist: 3602,
                                time: 123,
                                emission: 0.1440799999999,
                                travel_mode: "transit",
                                steps:
                                    [
                                        {

                                            distance: 20,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 21,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 22,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 23,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                    ]
                            }
                        },
                        {
                            flying: {
                                dist: 3602,
                                time: 1234,
                                emission: 0.1440799999999,
                                travel_mode: "flying",
                                steps:
                                    [
                                        {

                                            distance: 24,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 25,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 26,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 27,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                    ]
                            }
                        },
                        {
                            transit: {
                                dist: 3602,
                                time: 12346,
                                emission: 0.1440799999999,
                                travel_mode: "transit",
                                steps:
                                    [
                                        {

                                            distance: 28,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 29,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 30,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 31,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                    ]
                            }
                        }
                    ],
                },
            fl2:
                {
                    dist: 371803.94522502751,
                    emission: 100.41958010305981,
                    time: 32200.57089380632,
                    travel_mode: "fl2",
                    steps: [
                        {
                            transit: {
                                dist: 3602,
                                time: 1197,
                                emission: 0.1440799999999,
                                travel_mode: "transit",
                                steps:
                                    [
                                        {

                                            distance: 1,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 2,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 3,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 4,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                    ]
                            }
                        },
                        {
                            flying: {
                                dist: 3602,
                                time: 1197,
                                emission: 0.1440799999999,
                                travel_mode: "flying",
                                steps:
                                    [
                                        {

                                            distance: 5,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 6,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 7,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 8,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                    ]
                            }
                        },
                        {
                            transit: {
                                dist: 3602,
                                time: 1197,
                                emission: 0.1440799999999,
                                travel_mode: "transit",
                                steps:
                                    [
                                        {

                                            distance: 9,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 10,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 11,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                        {

                                            distance: 12,
                                            duration: 133,
                                            end_location: "Bremen Am Brill (Bgm.-Smidt-Straße)",
                                            start_location: "Wandschneiderstraße 8, 28195 Bremen, Germany",
                                            travel_mode: "WALKING"
                                        },
                                    ]
                            }
                        }
                    ],
                },
        }
    };


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
        // let returnData = await postCords(this.state);
        // this.handleResults(returnData.data)
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
        this.handleResults(json_mockup)
        console.log("RESULTS: ", json_mockup)


    };

    handleResults = (data) => {
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
                />

                <Vision/>
                <Footer/>
            </div>
        )
    }

}
