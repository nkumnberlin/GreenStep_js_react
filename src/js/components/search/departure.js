import React, {Component} from 'react';
import Script from 'react-load-script';
import {Segment, Grid, Form, Button} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";

export default class Departure extends Component {
    // Define Constructor
    // Define Constructor
    constructor(props) {
        super(props);

        // // Declare State
        this.state = {
            lat: '',
            lng: ''
        };

        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        // Bind Functions
    }

    initialize = () => {
        this.geocoder = new google.maps.Geocoder();
    };

    handleScriptLoad = () => {
        this.initialize();

        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('departure')
        );
        this.autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        let place = this.autocomplete.getPlace();
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
    };




}