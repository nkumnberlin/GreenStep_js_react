import React, {Component} from 'react';

import Script from 'react-load-script';
import {Segment, Grid, Form, Button} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Departure from './departure.js'
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import PythonPost from "../python_endpoint/PythonPost";


const form_style = {
    margin: '0 auto',
    maxWidth: 800,
};


export default class Search extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // // Declare State
        this.state = {
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
                                <Button positive> SEARCH </Button>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>


                </Segment>
            </div>
        );
    }
}