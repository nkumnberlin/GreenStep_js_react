import React, {Component, Fragment} from 'react';
import {Grid, Segment} from 'semantic-ui-react'
import traverse from 'traverse'

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
        console.log("transits: ", transits, flightMode)
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

    extractSubSteps = (steps) => {
        return Object.values(steps).map((key, value) => {
            console.log("steps:", steps, "key: ", key)
            return (
                <Segment>{
                    key.travel_mode + " " +
                    key.distance + " " +
                    key.duration + " " +
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
                        {console.log(key)}
                        <Segment>
                            <Segment>
                                {key.upper_travelMode}
                            </Segment>
                            {key.upper_dist + " " + key.upper_emission + " " + key.upper_time}
                        </Segment>
                        {/*<Segment>*/}
                        {/*    {this.extractSubSteps(key.stepsOfLowerTravel)}*/}
                        {/*</Segment>*/}
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


    render() {
        return (
            <div>
                {this.renderFlyingResults()}
            </div>
        );
    }
}

export default SpecificResult;