import React, {Fragment} from 'react';
import {Container, Divider, Grid, Header, Icon, Segment} from "semantic-ui-react";
import {adjustEmissionValues, daysHoursMinutes,
    distanceInKm, iconTranslator} from "../../data_handler/Converter.jsx";

export const renderTotal = currentType => {
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



export const renderSteps = key => (
    <Fragment>
        <br/>
        <Grid style={{padding: 2, marginBottom: 10}}>
            <Grid.Column width={6}>
                <Icon size='large' name={iconTranslator(key.travel_mode)}/>
                From:
                <br/>
                <br/>
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
                To:
                <br/>
                <br/>
                {key.end_location}
                <br/>
                <br/>
                Distance: {distanceInKm(key.distance)}
            </Grid.Column>
        </Grid>
    </Fragment>
);

export const renderStepsToGoalTertiary = key => (
    <Segment key={key.duration} tertiary>
        {renderSteps(key)}
    </Segment>
);

export const renderStepsToGoalSecondary = key => (
    <Segment key={key.duration} secondary>
        {renderSteps(key)}
    </Segment>
);

export const renderStepsToGoal = key => (
    <Segment key={key.duration}>
        {renderSteps(key)}
    </Segment>
);

export const renderIconsTransitFlight = (currentType, key, value) => {
    return (<Icon.Group size={"huge"}>
            <Icon name={iconTranslator(key.travel_mode)} style={{marginRight: 30}}/>
            {value === currentType.steps.length - 1 ?
                <Icon corner name={""}/>
                : <Icon corner name={"angle right"}/>
            }
        </Icon.Group>
    )
};

export const renderHeaderOfIcon = (name = "Change") => {
    return (<>
            <br/>
            <Divider horizontal>
                <Header as='h4'>
                    {name}
                </Header>
            </Divider>
        </>
    )
};