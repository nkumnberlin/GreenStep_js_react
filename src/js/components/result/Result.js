import React from 'react'
import {Step, Segment, Grid} from 'semantic-ui-react'

const Results = () => (

    <div>
        <Segment>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>

                        <Segment>
                            <Step.Group>
                                <Step>
                                    <Step.Title>RESULTS</Step.Title>
                                    <Step.Description>Choose your </Step.Description>
                                </Step>
                            </Step.Group>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Step.Group>
                                <Step>
                                    <Step.Title>RESULTS</Step.Title>
                                    <Step.Description>Choose your </Step.Description>
                                </Step>
                            </Step.Group>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Step.Group>
                                <Step>
                                    <Step.Title>RESULTS</Step.Title>
                                    <Step.Description>Choose your </Step.Description>
                                </Step>
                            </Step.Group>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Step.Group>
                                <Step>
                                    <Step.Title>RESULTS</Step.Title>
                                    <Step.Description>Choose your </Step.Description>
                                </Step>
                            </Step.Group>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>

);

export default Results
