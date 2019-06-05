import React, {Component, Fragment} from 'react';
import {distanceInKm, daysHoursMinutes, adjustEmissionValues} from "../../data_handler/Converter.jsx";
import {Segment, Grid, Header, Container, Icon, Divider} from 'semantic-ui-react'

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
        Object.values(transits).map((key) => {
            let {0: startLoc, length: length, [length - 1]: endLoc} = key.steps;
            tmpArray.push({
                currentDataName: flightMode,
                current_travelMode: key.travel_mode,
                current_dist: key.dist,
                current_time: key.time,
                startLocation: startLoc.start_location,
                endLocation: endLoc.end_location
            })
        });
        return tmpArray;
    };

    prepareFlyingResults = () => {
        let flySteps = this.extractFlySteps(this.completeResults);
        const {dist, emission} = this.completeResults.flight;
        let flightRender = Object.values(flySteps).map((keyOfArray) => {
            return this.renderFlyingResults(keyOfArray);
        });

        return (
            <Fragment>
                <Segment>
                    {"Flight"}
                    <br/>
                    Total <br/>
                    Emission: {adjustEmissionValues(emission)} Distance: {distanceInKm(dist)}
                </Segment>
                {flightRender}
            </Fragment>
        )
    };

    renderFlyingResults = (keyOfArray) => {
        return Object.values(keyOfArray).map((key) => {
            return (
                <Fragment key={key.current_emission}>
                    <Segment>
                        <Segment>
                            {key.current_travelMode}
                        </Segment>
                        Start {key.startLocation + " "}
                        <br/>
                        {distanceInKm(key.current_dist) + "    " +
                        daysHoursMinutes(key.current_time) + " "}
                        <br/>
                        End location:{key.endLocation}
                    </Segment>
                </Fragment>
            )
        })
    }

    extractTrainSteps = results => {
        let tmpArray = [];
        console.log("TEST RESULTS: ", results);
        (Object.values(results.transit.steps).map(transit =>
            tmpArray.push({
                current_travelMode: transit.travel_mode,
                current_dist: transit.distance,
                current_time: transit.duration,
                startLocation: transit.start_location,
                endLocation: transit.end_location,
            })
        ));
        return tmpArray;
    };

    transitSubSteps = trainSteps => {
        console.log("train: ", trainSteps)
        return Object.values(trainSteps).map((key) => {
            return (
                <Segment key={key.current_dist}>
                    <Segment> {key.current_travelMode}

                        {distanceInKm(key.current_dist) + " " + daysHoursMinutes(key.current_time)
                        + " " + key.startLocation + " " + key.endLocation}
                    </Segment>
                </Segment>
            )
        })
    };

    iconTranslator = travel_mode => {
        switch (travel_mode) {
            case "WALKING":
                return "male";
            case "TRANSIT":
                return "train";
            case "FLYING":
                return "plane";
            case "CYCLING":
                return "bicycle";
            case "DRIVING":
                return "car";
        }
    };

    renderAllResults = currentType => {
        let trainSteps = this.extractTrainSteps(this.completeResults);
        return (
            <Fragment>
                {this.renderTotal(currentType)}
                {this.renderIcons(currentType)}
                {this.renderStepsToGoal(currentType)}
            </Fragment>
        )
    };

    renderTotal = currentType => {
        console.log(currentType);
        return (
            <Fragment>
                <br/>
                <br/>
                <Divider horizontal>
                    <Header as='h4'>
                        Total
                    </Header>
                </Divider>
                <Grid columns={'equal'}>
                    <Grid.Column width={5}>
                        <Segment textAlign={"center"}>
                            <Icon loading name='clock outline'/>
                            Duration: {daysHoursMinutes(currentType.time)}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment textAlign={"center"}>
                            Distance: {distanceInKm(currentType.dist)}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment textAlign={"center"}>
                            <Icon name='exclamation circle'/>
                            Emission: {adjustEmissionValues(currentType.emission)}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Fragment>
        )
    };

    renderIcons = currentType => {
        return (
            <Segment>
                <br/>
                <Grid centered>
                    {Object.values(currentType.steps).map((key, value) => {
                        return (
                            <Icon.Group size={"huge"} key={key.distance}>
                                <Icon name={this.iconTranslator(key.travel_mode)} style={{marginRight: 30}}/>
                                {value === currentType.steps.length - 1 ?
                                    <Icon corner name={""}/>
                                    : <Icon corner name={"angle right"}/>
                                }
                            </Icon.Group>)
                    })}
                </Grid>
                <br/>
            </Segment>
        )
    };

    renderStepsToGoal = currentType => {
        return Object.values(currentType.steps).map((key) => {
            console.log("key:",key)
            return (
                <Fragment key={key.duration}>
                    <Segment>
                    <Icon name={this.iconTranslator(key.travel_mode)}/>
                    Start Location: {key.start_location}
                    </Segment>
                    > End Location: {key.end_location}
                    <br/>
                    <Icon name={'clock outline'}/> Duration: {daysHoursMinutes(key.duration)}
                    <br/>
                    Distance: {distanceInKm(key.distance)}
                </Fragment>
            )
        })

    };

    renderDynamicResults = typeOfTravel => {
        switch (typeOfTravel.toString()) {
            case "Plane":
                return this.prepareFlyingResults();
            case "Train":
                return this.renderAllResults(this.completeResults.transit);
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


/*
Feature deactivated
 */
// extractSubStepsOfFlight = (steps) => {
//     return Object.values(steps).map((key, value) => {
//         return (
//             <Segment key={key.distance}>{
//                 key.travel_mode + " " +
//                 distanceInKm(key.distance) + " " +
//                 daysHoursMinutes(key.duration) + " " +
//                 key.startLocation + " " +
//                 key.endLocation}
//             </Segment>
//         )
//     })
// };