import React, {Component, Fragment} from 'react';
import {Grid, Segment} from 'semantic-ui-react'
import traverse from 'traverse'

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
    }

    extractAllSteps = results => {
        let stepsOfObject;
        let tmpArray = [];
        Object.values(results).map((keyStart) => {
            Object.values(keyStart.steps).map((keyFirstStep) => {
                Object.values(keyFirstStep).map((key_steps, value) => {
                    tmpArray.push({
                        currentDataName: keyStart.travel_mode,
                        upper_travelMode: key_steps.travel_mode,
                        upper_dist: keyStart.dist,
                        upper_emission: keyStart.emission,
                        upper_time: keyStart.time,
                        stepsOfLowerTravel: key_steps.steps,
                    });
                })
            });
        });
        if (tmpArray) {
            stepsOfObject = tmpArray;
        }
        return stepsOfObject
    };

    extractSubSteps = (steps) => {
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
                        <Segment>
                            {key.currentDataName}
                        </Segment>
                        {key.upper_dist + " " + key.upper_emission + " " + key.upper_time + " " + key.upper_travelMode}
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