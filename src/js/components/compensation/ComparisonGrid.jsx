import React, {Fragment} from 'react';
import { Grid, Image, Segment, Header} from 'semantic-ui-react';
import {adjustEmissionValues} from "../data_handler/Converter.jsx";
import * as utils from './ComparisonCalculator.js';

export const GridVerticallyDivided = (prop) => {
    let emission = Math.round(Number.parseFloat(prop) * 100) / 100;
    let amountRides = utils.equalsTrain(emission);
    let perc_Allowed = utils.allowedPercentage(emission);
    return(
      <Fragment>
        <Segment>
        <Header as={"h2"} id="vergleichHeader" textAlign="center">Zum Vergleich</Header>
        <Header as={"h4"} id="didYouKnow" textAlign="center">Wussten Sie schon? <span className="boldText">{emission}</span>kg CO2 entsprechen:</Header>
          <Grid divided='vertically'>
            <Grid.Row columns={3}>
              <Grid.Column>
                <p>
                  <span className="boldText">{amountRides}</span> einfachen Bahnfahrten Berlin - Köln.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  <span className="boldText">{perc_Allowed}</span>% des offiziell erlaubten CO2 Ausstoßes eines Bundesbürgers pro Jahr.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  dem Inhalt von x Wasserflaschen (1,5 Liter).
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>  
      </Fragment>
    )    
};