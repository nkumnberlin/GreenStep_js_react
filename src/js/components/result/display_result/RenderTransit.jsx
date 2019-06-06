import React, {Component, Fragment} from 'react';
import {renderTotal, renderIconsTransitFlight,
    renderHeaderOfIcon, renderStepsToGoal,
    renderStepsToGoalSecondary, renderStepsToGoalTertiary} from './RenderGeneralInformation.jsx'
import {Segment, Grid, Header, Divider} from 'semantic-ui-react'

class RenderTransit extends Component {

    renderResultsTransit = currentType => {
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
                {this.renderGoalTransit(currentType)})
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



    renderGoalTransit = currentType => {
        return Object.values(currentType.steps).map((key) => {
            {
                return key.travel_mode === "TRANSIT" ? renderStepsToGoalSecondary(key) :
                    key.travel_mode === "FLYING" ? renderStepsToGoalTertiary(key) :
                        renderStepsToGoal(key)
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
