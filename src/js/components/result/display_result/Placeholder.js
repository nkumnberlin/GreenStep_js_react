import React, {Fragment} from 'react'
import {Segment, Container, Image, Header, Loader} from 'semantic-ui-react'

export const GreenstepHeader = () => {
    return (
        <>
            <Segment>
                <Container textAlign={'center'}>
                    <Header as='h3'> GREENSTEP </Header>
                    <p> Let us give you the exact Route for your GREENSTEP</p>
                </Container>
            </Segment>
        </>
    )
};

export const ReceiveResults = () => {
    return (
        <Segment placeholder>
            <Loader active/>
            <Header icon>
                We're currently looking for the Best Route for your Destination
            </Header>
            <Segment.Inline>

            </Segment.Inline>
        </Segment>
    )


};


