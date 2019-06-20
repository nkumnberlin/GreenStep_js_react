import React from 'react'
import {Segment, Progress, Grid} from 'semantic-ui-react'

export const MyFootprintSegment = (prop) => {
    return (Object.values(prop).map((key) => {
                const per = Math.round(key.perc_amount);
                return (
                    <Segment>
                        {key.descr}
                        <br/>
                        <br/>

                        <Grid>
                            <Grid.Column width={key.width}>
                                <Progress percent={per} color={key.color}>
                                    {key.emission} CO2</Progress>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                )
            }
        )

    )

};