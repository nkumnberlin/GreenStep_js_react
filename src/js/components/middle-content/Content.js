import React from 'react'
import {Step, Segment} from 'semantic-ui-react'

const Content = () => (
    <div>
        <Segment stacked>
            <Step.Group>
                <Step>
                    <Step.Title>RESULTS</Step.Title>
                    <Step.Description>Choose your traveling options</Step.Description>
                </Step>
            </Step.Group>
        </Segment>
    </div>
);

export default Content
