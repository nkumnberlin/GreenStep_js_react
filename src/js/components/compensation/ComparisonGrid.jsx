import React, {Fragment} from 'react'
import { Grid, Image, Segment} from 'semantic-ui-react'

export const GridVerticallyDivided = () => {
    return(
      <Fragment>
        <Segment>
        <h2 id="vergleichHeader">Zum Vergleich</h2>
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