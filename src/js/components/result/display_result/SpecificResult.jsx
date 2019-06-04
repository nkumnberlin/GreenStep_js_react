import React, {Component, Fragment} from 'react';
import {Grid, Segment} from 'semantic-ui-react'
import traverse from 'traverse'

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
    }

    extractAllSteps = results => {
        console.log(results)
        const stepsOfObject = Object.values(results.flight.steps).map(transit =>
            this.handleFlightTransits(transit, results.flight.travel_mode)
        );

        console.log("STEPS OF OB", stepsOfObject)
        return stepsOfObject
    };

    handleFlightTransits = (transits, flightMode) => {
        let tmpArray = [];
        let stepsOfObject;
        Object.values(transits).map((key_steps, value) => {
            tmpArray.push({
                currentDataName: flightMode,
                upper_travelMode: key_steps.travel_mode,
                upper_dist: key_steps.dist,
                upper_emission: key_steps.emission,
                upper_time: key_steps.time,
                stepsOfLowerTravel: key_steps.steps,
            })

        })
        if (tmpArray) {
            stepsOfObject = tmpArray;
        }
        return stepsOfObject;
    };

    extractSubSteps = (steps) => {
        console.log("steps: " , steps)

        return Object.values(steps).map((key, value) => {

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

    render() {

        const upperSteps = this.extractAllSteps(this.completeResults);

        const renderUpperSteps = Object.values(upperSteps).map((key, value) => {
            const subSteps = this.extractSubSteps(key.stepsOfLowerTravel);
            return (
                <Fragment key={key.upper_emission}>
                    <Segment>
                        {key.currentDataName}
                    </Segment>
                    <Segment>
                        <Segment>
                            {key.upper_travelMode}
                        </Segment>
                        {key.upper_dist + " " + key.upper_emission + " " + key.upper_time}
                    </Segment>
                    <Segment>
                        {subSteps}
                    </Segment>
                </Fragment>
            )
        });


        return (
            <div>
                {renderUpperSteps}
            </div>
        );
    }
}

export default SpecificResult;