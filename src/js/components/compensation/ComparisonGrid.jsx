import React, {Fragment} from 'react';
import { Grid, Image, Segment, Header, Icon} from 'semantic-ui-react';
import {adjustEmissionValues} from "../data_handler/Converter.jsx";
import * as utils from './ComparisonCalculator.js';

export const GridVerticallyDivided = (prop) => {
    let emission = Math.round(Number.parseFloat(prop) * 100) / 100;
    let amountRides = utils.equalsTrain(emission);
    let perc_Allowed = utils.allowedPercentage(emission);
    let waterBottles = utils.equalsWaterBottles(emission);

    return(
      <Fragment>
        <Segment>
        <Header as={"h2"} id="vergleichHeader" textAlign="center">In Comparison</Header>
        <Header as={"h3"} id="didYouKnow" textAlign="center">Did you already know? <span className="boldText">{emission}</span>kg CO2 equals:</Header>
          <Grid divided='vertically'>
            <Grid.Row columns={3}>
              <Grid.Column>
                <p>
                  <Icon name="train" size="large"/><span className="boldText">{amountRides}</span> train rides from Berlin to Cologne.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  <Icon name="male" size="large"/><span className="boldText">{perc_Allowed}</span>% of the officially allowed CO2 emission of a citizen in Germany per year.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                 <Icon name="tint" size="large"/>The content of <span className="boldText">{waterBottles}</span> water bottles (1,5 Liter).
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>  
      </Fragment>
    )    
};