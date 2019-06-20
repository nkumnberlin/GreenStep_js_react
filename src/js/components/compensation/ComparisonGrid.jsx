import React, {Fragment} from 'react';
import {Grid, Image, Segment, Header, Icon, Divider, TextArea} from 'semantic-ui-react';
import {adjustEmissionValues} from "../data_handler/Converter.jsx";
import * as utils from './ComparisonCalculator.js';


export const GridVerticallyDivided = (prop) => {
    let emission = Math.round(Number.parseFloat(prop) * 100) / 100;
    let amountRides = utils.equalsTrain(emission);
    let perc_Allowed = utils.allowedPercentage(emission);
    let waterBottles = utils.equalsWaterBottles(emission);

    const ComparisonGrid = (
        <Grid divided='vertically'>
            <Grid.Row columns={3}>
                <Grid.Column>
                    <Segment textAlign={'center'}>
                        <Icon name="train" size="big"/>
                        <p>
                            <br/>
                            <span>{amountRides} </span>
                            train rides from Berlin to Cologne.
                        </p>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment textAlign={'center'}>
                        <Icon name="male" size="big"/>
                        <p>
                            <br/>
                            <span>{perc_Allowed}</span>% of the
                            officially allowed CO2 emission of a citizen in Germany per year.
                        </p>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment textAlign={'center'}>
                        <Icon name="tint" size="big"/>
                        <p>
                            <br/>
                            The content of
                            <span> {waterBottles} </span> water bottles (1,5 Liter).
                        </p>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    return (
        <Fragment>
            <Segment>
                <Divider horizontal>
                    <Header as='h4'>
                        In Comparison
                    </Header>
                </Divider>
                <Header as={"h3"} textAlign="center">Did you know: <span>{emission}</span> kg CO2 equals:</Header>
                {ComparisonGrid}
            </Segment>
        </Fragment>
    )
};