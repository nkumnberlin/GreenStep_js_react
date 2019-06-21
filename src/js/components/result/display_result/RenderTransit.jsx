import React, {Component, Fragment} from 'react';
import {
    renderTotal, renderIconsTransitFlight,
    renderHeaderOfIcon, renderStepsToGoal,
    renderStepsToGoalSecondary, renderStepsToGoalTertiary
} from './render_result/RenderResults.jsx'
import {Segment, Grid, Header, Divider} from 'semantic-ui-react'

class RenderTransit extends Component {

    renderResultsTransit = currentType => {
        console.log("TRAIN RENDER: ", currentType);
        return (
            <Fragment>
                {renderTotal(currentType)}
                {this.iconsTransit(currentType)}
                <br/>
                <Divider horizontal>
                    <Header as='h4'>
                        Steps
                    </Header>
                </Divider>
                {this.renderStepsOfTransit(currentType)}
            </Fragment>
        )
    };

    iconsTransit = currentType => {
        return (
            <>
                {renderHeaderOfIcon()}
                <Segment>
                    <br/>
                    <Grid centered>
                        {Object.values(currentType.steps).map((key, value) => {
                            return (<Fragment key={key.distance}>
                                {renderIconsTransitFlight(currentType, key, value)}
                            </Fragment>)
                        })}
                    </Grid>
                    <br/>
                </Segment>
            </>
        )
    };


    renderStepsOfTransit = currentType => {
        return Object.values(currentType.steps).map((key) => {
            if (key.distance === 0) {
                console.log("key dist = null")
            } else {
                {
                    return key.travel_mode === "DRIVING" ? renderStepsToGoalSecondary(key) :
                        key.travel_mode === "FLYING" ? renderStepsToGoalTertiary(key) :
                            renderStepsToGoal(key)
                }
            }
        });
    };

    render() {
        return (
            <div>
                {this.renderResultsTransit(this.props.transit)}
            </div>
        );
    }
}


export default RenderTransit;
