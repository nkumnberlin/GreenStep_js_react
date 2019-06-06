import React, {Component, Fragment} from 'react';
import {distanceInKm, daysHoursMinutes, adjustEmissionValues} from "../../data_handler/Converter.jsx";
import RenderTransit from './RenderTransit.jsx'
import RenderFlight from './RenderFlight.jsx'
import RenderOthers from './RenderOthers.jsx'
import {Segment, Grid, Header, Container, Icon, Divider} from 'semantic-ui-react'

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
    }
        renderDynamicResults = typeOfTravel => {
        switch (typeOfTravel.toString()) {
            case "Plane":
                return (
                    <RenderFlight
                        flight={this.completeResults.flight}/>);
            case "Train":
                return (
                    <RenderTransit
                        transit={this.completeResults.transit}/>);
            case "Male":
                return (
                    <RenderOthers
                        others={this.completeResults.walking}/>);
            case "Car":
                return (
                    <RenderOthers
                        others={this.completeResults.driving}/>);
            case "Bicycle":
                return (
                    <RenderOthers
                        others={this.completeResults.cycling}/>);
        }
    };

    render() {
        return (
            <Fragment>
                {this.renderDynamicResults(this.props.ActiveTravelItem)}
            </Fragment>
        );
    }
}

export default SpecificResult;