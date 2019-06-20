import React, {Component} from 'react';
import {Container, Header, Placeholder, Segment} from "semantic-ui-react";

class Vision extends Component {

    render() {


        return (
            <div className={'Vision prob'}>
                <Segment>
                    <Segment>
                        <Container textAlign={'center'}>
                            <Header as='h4'> Our Vision </Header>
                            <p> Our Reasons for our Effort</p>
                        </Container>
                    </Segment>
                <Placeholder fluid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder>
                </Segment>
            </div>
        );
    }
}


export default Vision;
