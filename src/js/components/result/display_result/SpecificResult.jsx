import React, {Component, Fragment} from 'react';
import {distanceInKm, daysHoursMinutes, adjustEmissionValues} from "../../data_handler/Converter.jsx";
import {Segment} from 'semantic-ui-react'

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
    }

    extractFlySteps = results => {
        return (Object.values(results.flight.steps).map(transit =>
            this.handleFlightTransits(transit, results.flight.travel_mode)
        ));
    };

    handleFlightTransits = (transits, flightMode) => {
        let tmpArray = [];
        Object.values(transits).map((key_steps) => {
            tmpArray.push({
                currentDataName: flightMode,
                upper_travelMode: key_steps.travel_mode,
                upper_dist: key_steps.dist,
                upper_emission: key_steps.emission,
                upper_time: key_steps.time,
                stepsOfLowerTravel: key_steps.steps,
            })
        });
        return tmpArray;
    };

    extractSubStepsOfFlight = (steps) => {
        return Object.values(steps).map((key, value) => {
            return (
                <Segment key={key.distance}>{
                    key.travel_mode + " " +
                    distanceInKm(key.distance) + " " +
                    daysHoursMinutes(key.duration) + " " +
                    key.start_location + " " +
                    key.end_location}
                </Segment>
            )
        })
    };

    renderFlyingResults = () => {
        let flySteps = this.extractFlySteps(this.completeResults);
        let flightRender = Object.values(flySteps).map((keyOfArray) => {
            return Object.values(keyOfArray).map((key) => {
                return (
                    <Fragment key={key.upper_emission}>
                        <Segment>
                            <Segment>
                                {key.upper_travelMode}
                            </Segment>
                            {distanceInKm(key.upper_dist) + " " + adjustEmissionValues(key.upper_emission) + " " + daysHoursMinutes(key.upper_time)}
                        </Segment>
                        <Segment>
                            {this.extractSubStepsOfFlight(key.stepsOfLowerTravel)}
                        </Segment>
                    </Fragment>
                )
            })
        });
        return (
            <Fragment>
                <Segment>
                    {"Flight"}
                </Segment>
                {flightRender}
            </Fragment>
        )
    };

    extractTrainSteps = results => {
        let tmpArray = [];
        (Object.values(results.transit.steps).map(transit =>
            tmpArray.push({
                upper_travelMode: transit.travel_mode,
                upper_dist: transit.distance,
                upper_time: transit.duration,
                start_location: transit.start_location,
                end_location: transit.end_location,
            })
        ));
        return tmpArray;
    };

    transitSubSteps = trainSteps => {
        return Object.values(trainSteps).map((key) => {
                return (
                    <Segment key={key.upper_dist}>
                        <Segment> {key.upper_travelMode}

                            {distanceInKm(key.upper_dist) + " " + daysHoursMinutes(key.upper_time)
                            + " " + key.start_location + " " + key.end_location}
                        </Segment>
                    </Segment>
                )
            })
    };

    renderTransitResults = () => {
        let trainSteps = this.extractTrainSteps(this.completeResults);
        const {transit} = this.completeResults;
        return (
            <Fragment>
                <Segment>
                    {"Train"}
                </Segment>
                <Segment>

                    {distanceInKm(transit.dist) + daysHoursMinutes(transit.time) + adjustEmissionValues(transit.emission)}
                </Segment>
                    {this.transitSubSteps(trainSteps)}
            </Fragment>
        )

    };

    renderDynamicResults = typeOfTravel => {
        switch (typeOfTravel.toString()) {
            case "Plane":
                return this.renderFlyingResults();
            case "Train":
                return this.renderTransitResults();
        }
    };

    render() {
        return (
            <div>
                {this.renderDynamicResults(this.props.ActiveTravelItem)}
            </div>
        );
    }
}

export default SpecificResult;