import React, {Component} from 'react';

import Script from 'react-load-script';
import {Segment, Grid, Form, Button} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";

export default class LocationSearchInput extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // // Declare State
        this.state = {
            lat: '',
            lng: ''
        };
        this.geocoder;
        // Bind Functions
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    }

    initialize = () => {
        this.geocoder = new google.maps.Geocoder();
    }

    handleScriptLoad = () => {
        this.initialize();

        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.departure = new google.maps.places.Autocomplete(
            document.getElementById('departure')
        );
        this.departure.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

        this.departure.addListener('place_changed', this.handlePlaceSelect);


    };

    handlePlaceSelect = () => {
        let departurePlace = this.departure.getPlace();
        if (!departurePlace.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            console.log("No details available for input: '" + place.name + "'");
            return;
        }
        let address = departurePlace.address_components;
        let lat = departurePlace.geometry.location.lat();
        let lng = departurePlace.geometry.location.lng();
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
    };

    idPlaceholder = [{
        0: {
            id: 'departure',
            placeholder: 'Departure'
        },
        1: {
            id: 'arrival',
            placeholder: 'Arrival'
        }
    }];

    render() {
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
                    onLoad={this.handleScriptLoad}
                />


                <Segment padded>
                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>

                    <Grid >
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Form>
                                    <Form.Input id="departure" placeholder="Departure"
                                                style={{
                                                    margin: '0 auto',
                                                    maxWidth: 800,
                                                }}
                                    />
                                </Form>
                                <Form>
                                    <Form.Input id="arrival" placeholder="Arrival"
                                                style={{
                                                    margin: '0 auto',
                                                    maxWidth: 800,
                                                }}/>
                                </Form>
                            </Grid.Column>

                            <Grid.Column verticalAlign={'middle'} textAlign={'center'} width={4}>
                                <Button positive> SEARCH </Button>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>


                </Segment>
            </div>
        );
    }
}