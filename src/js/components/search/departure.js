import React, {Component} from 'react';
import {Form} from "semantic-ui-react";
const form_style = {
    margin: '0 auto',
    maxWidth: 800,
};

export default class Departure extends Component{
    render() {
        return (
            <Form.Input id={'departure'}
                        placeholder={'Departure'}
                        style={form_style}
                        onChange={this.props.action}
                        value={this.props.value}
            />
        )
    }
}

    //
    // handleScriptLoad() {
    //     this.departure = new google.maps.places.Autocomplete(
    //         document.getElementById('departure'));
    //     this.departure.setFields(this.fields);
    //     this.departure.addListener('place_changed', this.handleDeparture);
    //
    // }
    // fields = ['address_components', 'geometry', 'icon', 'name'];

    //
    // handleDeparture = () => {
    //     let place = this.departure.getPlace();
    //     if (!place.geometry) {
    //         // User entered the name of a Place that was not suggested and
    //         // pressed the Enter key, or the Place Details request failed.
    //         console.log("No details available for input: '" + place.name + "'");
    //         return;
    //     }
    //
    //     this.lat = place.geometry.location.lat();
    //     this.lng = place.geometry.location.lng();
    //
    // };

