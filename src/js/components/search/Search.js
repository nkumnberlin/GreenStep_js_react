import React, {Component} from 'react';

import Script from 'react-load-script';
import {Segment, Grid, Form, Button} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Departure from './departure.js'
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import postCords from "../python_endpoint/PythonPost";
<<<<<<< HEAD
import GooglePlacesSuggest from "react-google-places-suggest"
import GoogleMapLoader from "react-google-maps-loader"

const MY_API_KEY = "AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM";
=======
import Result from "../result/Result";
>>>>>>> parent of 7449b079... prep for code testing



const form_style = {
    margin: '0 auto',
    maxWidth: 800,
};

export let data_export = "";

export default class Search extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // // Declare State
        this.state = {
<<<<<<< HEAD
            depSearch: "",
            depValue: "",
            arrSearch: "",
            arrValue: ""
        }
    }

    handleInputChange = e => {
        console.log(e.target.id)
        this.currentId = e.target.id
        if(e.target.id === 'departure') {
            this.setState({depSearch: e.target.value, depValue: e.target.value})
        }else{
            this.setState({arrSearch: e.target.value, arrValue: e.target.value})

        }
    };

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        console.log("SUGGEST:")
        if(this.currentId === 'departure'){
            this.setState({depSearch: "", depValue: geocodedPrediction.formatted_address})
        }else{
            this.setState({arrSearch: "", arrValue: geocodedPrediction.formatted_address})
        }
    };

    handleNoResult = () => {
        if(this.currentId === 'departure') {
            console.log('No results for ', this.state.depSearch)
        }else{
            console.log('No results for ', this.state.arrSearch)
=======
            lat: '',
            lng: ''
        };
        // Bind Functions
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handleDeparture = this.handleDeparture.bind(this);
        this.handleArrival = this.handleArrival.bind(this);

    }

    fields = ['address_components', 'geometry', 'icon', 'name'];
    initialize = () => {
        this.geocoder = new google.maps.Geocoder();
    };

    handleScriptLoad = () => {
        this.initialize();
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
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            console.log("No details available for input: '" + place.name + "'");
            return;
        }
        let address = place.address_components;
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        // Check if address is valid
        console.log(address);
        if (address) {
            // Set State
            this.setState(
                {
                    lat: lat,
                    lng: lng
                }
            );
            this.codeLatLng(lat, lng);
            console.log(this.state)
        }
    };

    handleArrival = () => {
        let place = this.arrival.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            console.log("No details available for input: '" + place.name + "'");
            return;
        }
        let address = place.address_components;
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        // Check if address is valid
        console.log(address);
        if (address) {
            // Set State
            this.setState(
                {
                    lat: lat,
                    lng: lng
                }
            );
            this.codeLatLng(lat, lng);
            console.log(this.state)
>>>>>>> parent of 7449b079... prep for code testing
        }
    };


    codeLatLng = (lat, lng) => {
        let latlng = new google.maps.LatLng(lat, lng);
        this.geocoder.geocode({
            'latLng': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log(results[1]);
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });

        // PythonPost.setState()
    };


    render() {
<<<<<<< HEAD
        const {depSearch, arrSearch} = this.state;
        return (
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (

                            <div>
                                <Segment padded className={'search'}>
                                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your
                                        Emission </Header>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={12}>
                                                <Form>
                                                    <Departure
                                                        action={this.handleInputChange}
                                                        value={this.state.depValue}
                                                    />
                                                    <Arrival
                                                        actionArrival={this.handleInputChange}
                                                        valueArrival={this.state.value}
                                                     />
                                                </Form>
                                            </Grid.Column>
                                            <Grid.Column verticalAlign={'middle'} textAlign={'center'} width={4}>
                                                <Button onClick={data_export = postCords} positive> Submit </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </div>

                    )
                }
            />
        )
=======
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
                    onLoad={this.handleScriptLoad}
                />
                <Segment padded className={'search'}>
                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Form>
                                    <Form.Input id={'departure'} placeholder={'Departure'}
                                                style={form_style}
                                    />
                                </Form>
                                <Form>
                                    <Form.Input id={'arrival'} placeholder={'Arrival'}
                                                style={form_style}/>
                                </Form>
                            </Grid.Column>
                            <Grid.Column verticalAlign={'middle'} textAlign={'center'} width={4}>
                                <Button onClick={ data_export = postCords} positive> Submit </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
>>>>>>> parent of 7449b079... prep for code testing
    }
}