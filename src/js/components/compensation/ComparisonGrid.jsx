import React, {Fragment} from 'react';
import { Grid, Image, Segment, Header} from 'semantic-ui-react';
import {adjustEmissionValues} from "../data_handler/Converter.jsx";

export const GridVerticallyDivided = (prop) => {
    return(
      <Fragment>
        <Segment>
        <Header as={"h2"} id="vergleichHeader" textAlign="center">Zum Vergleich</Header>
        <Header as={"h4"} id="didYouKnow" textAlign="center">Wussten Sie schon? {prop} kg CO2 entsprechen:</Header>
          <Grid divided='vertically'>
            <Grid.Row columns={3}>
              <Grid.Column>
                <p>
                  x einfachen Bahnfahrten Berlin - Köln.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  x % des durchschnittlichen CO2 Ausstoßes eines Bundesbürgers pro Jahr.
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