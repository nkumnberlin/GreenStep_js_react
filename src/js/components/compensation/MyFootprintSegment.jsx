import React from 'react'
import {Segment, Progress, Grid} from 'semantic-ui-react'

export const MyFootprintSegment = (prop) => {
    return (Object.values(prop).map((key) => {
                return (
                    <Segment>
                        {key.descr}
                        <Grid>
                            <Grid.Column width={key.width}>
                                <Progress percent={key.perc_amount} color={key.color}>{key.emission} CO2</Progress>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                )
            }
        )

    )

};