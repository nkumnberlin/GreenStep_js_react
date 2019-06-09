import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const GridVerticallyDivided = () => (
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
)

export default GridVerticallyDivided