import React, {Component} from 'react';
import {Segment, Grid, Button, Form} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {Departure} from './search_input-fields/Departure.js'
import {Arrival} from "./search_input-fields/Arrival";


export default class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const form_style = {
            margin: '0 auto',
            maxWidth: 800,
        };

        const grid_ArrAndDep = (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Departure style={form_style}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Arrival style={form_style}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );

        const grid_Button = (
            <Grid column={1}>
                <Grid.Column verticalAlign={'middle'} textAlign={'center'}>
                    <Button onClick={this.props.submitCords} positive> Submit </Button>
                </Grid.Column>
            </Grid>
        );

        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
            { key: 'o', text: 'Other', value: 'other' },
        ];

        return (
            <div className={'search prob'}>
                <Segment padded>
                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
                    <br/>
                    {grid_ArrAndDep}
                    {grid_Button}
                </Segment>
            </div>
        );
    }
}