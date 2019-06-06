import React, {Component, Fragment} from 'react';
import {distanceInKm, daysHoursMinutes, adjustEmissionValues} from "../../data_handler/Converter.jsx";
import {Segment, Grid, Header, Container, Icon, Divider} from 'semantic-ui-react'

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
    }

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

    renderTotal = currentType => {
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

    renderFlyingResults = (currentType) => {
        return (
            <Fragment>
                {this.renderTotal(currentType)}
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

    renderGoalOfFlight = currentType => {
        return Object.values(currentType.steps).map((keyUpperSteps) => {
            return Object.values(keyUpperSteps).map((keyLower) => {
                return Object.values(keyLower.steps).map((key) => {
                    {
                        return key.travel_mode === "TRANSIT" ? this.renderStepsToGoalSecondary(key) :
                            key.travel_mode === "FLYING" ? this.renderStepsToGoalTertiary(key) :
                                this.renderStepsToGoal(key)
                    }
                })
            })
        })
    };

    renderIconsOfFlight = currentType => {
        return (
            <>
                <br/>
            <Divider horizontal>
                <Header as='h4'>
                    Change
                </Header>
            </Divider>
            <Segment>
                <br/>
                <Grid centered>
                    {Object.values(currentType.steps).map((keySteps, value) => {
                        return Object.values(keySteps).map((key) => {
                            return (<Fragment key={key.dist}>
                                <Icon.Group size={"huge"}>
                                    <Icon name={this.iconTranslator(key.travel_mode)} style={{marginRight: 30}}/>
                                    {value === currentType.steps.length - 1 ?
                                        <Icon corner name={""}/>
                                        : <Icon corner name={"angle right"}/>
                                    }
                                </Icon.Group>
                            </Fragment>)
                        })
                    })}
                </Grid>
                <br/>
            </Segment>
        </>)
    };

    renderIconsExceptFlight = currentType => {
        return (
            <Segment>
                <Divider horizontal>
                    <Header as='h4'>
                        Change
                    </Header>
                </Divider>
                <br/>
                <Grid centered>
                    {Object.values(currentType.steps).map((key, value) => {
                        return (<Fragment key={key.distance}>
                            <Divider horizontal>
                            </Divider>
                            <Icon.Group size={"huge"}>
                                <Icon name={this.iconTranslator(key.travel_mode)} style={{marginRight: 30}}/>
                                {value === currentType.steps.length - 1 ?
                                    <Icon corner name={""}/>
                                    : <Icon corner name={"angle right"}/>
                                }
                            </Icon.Group>
                        </Fragment>)
                    })}
                </Grid>
                <br/>
            </Segment>
        )
    };

    renderGoalExceptFlight = currentType => {
        return Object.values(currentType.steps).map((key) => {
            {
                return key.travel_mode === "TRANSIT" ? this.renderStepsToGoalSecondary(key) :
                    key.travel_mode === "FLYING" ? this.renderStepsToGoalTertiary(key) :
                        this.renderStepsToGoal(key)
            }
        });
    };

    renderStepsToGoalTertiary = key => (
        <Segment key={key.duration} tertiary>
            {this.renderSteps(key)}
        </Segment>
    );

    renderStepsToGoalSecondary = (key) => (
        <Segment key={key.duration} secondary>
            {this.renderSteps(key)}
        </Segment>
    );

    renderStepsToGoal = key => (
        <Segment key={key.duration}>
            {this.renderSteps(key)}
        </Segment>
    );


    renderSteps = key => (
        <Fragment>
            <br/>
            <Grid style={{padding: 2, marginBottom: 10}}>
                <Grid.Column width={6}>
                    <Icon size='large' name={this.iconTranslator(key.travel_mode)}/>
                    {key.start_location}
                    <br/>
                    <br/>
                    <Icon size='large' name={'clock outline'}/> Duration: {daysHoursMinutes(key.duration)}
                </Grid.Column>
                <Grid.Column width={4}>
                    <Container textAlign={'center'}>
                        <br/>
                        <Icon name={"angle right"}/>
                    </Container>
                </Grid.Column>
                <Grid.Column width={6}>
                    {key.end_location}
                    <br/>
                    <br/>
                    Distance: {distanceInKm(key.distance)}
                </Grid.Column>
            </Grid>
        </Fragment>
    );

    renderAllResultsExceptFlight = currentType => {
        return (
            <Fragment>
                {this.renderTotal(currentType)}
                {this.renderIconsExceptFlight(currentType)}
                <br/>
                <Divider horizontal>
                    <Header as='h4'>
                        Steps
                    </Header>
                </Divider>
                {this.renderGoalExceptFlight(currentType)})
            </Fragment>
        )
    };


    renderDynamicResults = typeOfTravel => {
        switch (typeOfTravel.toString()) {
            case "Plane":
                return this.renderFlyingResults(this.completeResults.flight);
            case "Train":
                return this.renderAllResultsExceptFlight(this.completeResults.transit);
            case "Male":
                break;
            case "Car":
                break;
            case "Bicycle":
                break;
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