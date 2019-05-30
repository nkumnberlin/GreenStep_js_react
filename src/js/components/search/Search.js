import React, {Component} from 'react';
import {Segment, Grid, Button} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {Departure} from './search_input-fields/departure.js'
import {Arrival} from "./search_input-fields/arrival.js";


export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const form_style = {
            margin: '0 auto',
            maxWidth: 800,
        };
        return (
            <div className={'search prob'}>
                <Segment padded >
                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Departure style={form_style}/>
                                <Arrival style={form_style}/>
                            </Grid.Column>
                            <Grid.Column verticalAlign={'middle'} textAlign={'center'} width={4}>
                                <Button onClick={this.props.submitCords} positive> Submit </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}