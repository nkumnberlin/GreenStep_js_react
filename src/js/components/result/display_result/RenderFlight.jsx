import React, {Component, Fragment} from 'react';
import {renderTotal, renderIconsTransitFlight,
    renderHeaderOfIcon, renderStepsToGoal, renderStepsToGoalSecondary,
    renderStepsToGoalTertiary} from './RenderGeneralInformation.jsx'
import {Segment, Grid, Header,  Divider} from 'semantic-ui-react'


class RenderFlight extends Component {
    renderFlyingResults = (currentType) => {
        return (
            <Fragment>
                {renderTotal(currentType)}
                {this.renderIconsOfFlight(currentType)}
                <br/>
                <Divider horizontal>
                    <Header as='h4'>
                        Steps
                    </Header>
                </Divider>
                {this.renderGoalOfFlight(currentType)}
            </Fragment>
        )
    };

    renderIconsOfFlight = currentType => {
        return (
            <>
                {renderHeaderOfIcon()}
                <Segment>
                    <br/>
                    <Grid centered>
                        {Object.values(currentType.steps).map((keySteps, value) => {
                            return Object.values(keySteps).map((key) => {
                                return (<Fragment key={key.dist}>
                                    {renderIconsTransitFlight(currentType, key, value)}
                                </Fragment>)
                            })
                        })}
                    </Grid>
                    <br/>
                </Segment>
            </>)
    };

    renderGoalOfFlight = currentType => {
        return Object.values(currentType.steps).map((keyUpperSteps) => {
            return Object.values(keyUpperSteps).map((keyLower) => {
                return Object.values(keyLower.steps).map((key) => {
                    {
                        return key.travel_mode === "TRANSIT" ? renderStepsToGoalSecondary(key) :
                            key.travel_mode === "FLYING" ? renderStepsToGoalTertiary(key) :
                                renderStepsToGoal(key)
                    }
                })
            })
        })
    };

    render() {
        return (
            <div>
                {this.renderFlyingResults(this.props.flight)}
            </div>
        );
    }
}


export default RenderFlight;
