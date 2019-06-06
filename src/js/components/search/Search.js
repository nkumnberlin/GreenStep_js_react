import React, {Component, Fragment} from 'react';
import {Segment, Grid, Button, Menu, Icon} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {Departure} from './search_input-fields/Departure.js'
import {Arrival} from "./search_input-fields/Arrival";


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.travelChoices = this.props.TravelChoices;
        console.log(props)
    }

    createMenuButton = (key) => {
        return (<Button basic
                        animated
                        onClick={this.props.clickedItem}
                        id={this.travelChoices[key]}
                        active={this.props.activeItem === this.travelChoices[key]}>

                <Button.Content id={this.travelChoices[key]} visible>
                    {this.travelChoices[key] === 'Male' ? "Walking" : this.travelChoices[key]}
                </Button.Content>
                <Button.Content id={this.travelChoices[key]} hidden>
                    <Icon id={this.travelChoices[key]}
                          name={this.travelChoices[key].toLowerCase()}
                    />
                </Button.Content>
            </Button>
        )
    };

    render() {
        const form_style = {
            margin: '0 auto',
            maxWidth: 800,
        };

        const ArrivalAndDeparture = (
            <Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <br/>
                            <Departure style={form_style}/>
                            <br/>
                        </Grid.Column>
                        <Grid.Column>
                            <br/>
                            <Arrival style={form_style}/>
                            <br/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );

        const grid_MenuButton = (
            <Grid columns={16}>
                <Grid.Column width={4}> </Grid.Column>
                <Button.Group size='large'>
                    {Object.keys(this.travelChoices).map((key => {
                        return (
                            <Grid.Column key={key}>
                                {this.createMenuButton(key)}
                            </Grid.Column>
                        )
                    }))}
                </Button.Group>
                <Grid.Column width={4}> </Grid.Column>
            </Grid>
        );


        const menu_Button = (
            <Segment>
                <Header textAlign={'center'} as='h3'> How do you want to travel? </Header>
                <br/>
                {grid_MenuButton}
                <br/>
            </Segment>

        );

        return (
            <div className={'search prob'}>
                <Segment padded>

                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
                    <br/>
                    {ArrivalAndDeparture}
                    <br/>
                    {menu_Button}
                </Segment>
            </div>
        );
    }
}