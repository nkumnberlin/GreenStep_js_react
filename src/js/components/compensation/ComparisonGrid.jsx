import React, {Fragment} from 'react'
import { Grid, Image, Segment, Header} from 'semantic-ui-react'

export const GridVerticallyDivided = () => {
    return(
      <Fragment>
        <Segment>
        <Header as={"h2"} id="vergleichHeader">Zum Vergleich</Header>
          <Grid divided='vertically'>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>  
      </Fragment>
    )    
};