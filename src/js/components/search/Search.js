import React, {Component, Fragment} from 'react';
import {Segment, Grid, Button, Menu, Icon} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {Departure} from './search_input-fields/Departure.js'
import {Arrival} from "./search_input-fields/Arrival";


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.travelChoices = this.props.TravelChoices;
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
        
        const menu_ButtonAnimated = (
            <Segment>
                <Header textAlign={'center'} as='h3'> How do you want to travel? </Header>
                <br/>
                <Grid columns={16}>
                    <Grid.Column width={5}> </Grid.Column>
                    <Button.Group size='large'>
                        {Object.keys(this.travelChoices).map((key => {
                            return (
                                <Grid.Column key={key}>
                                    <Button basic
                                            animated
                                            onClick={this.props.clickedItem}>
                                        <Button.Content id={this.travelChoices[key]} visible>
                                            {this.travelChoices[key]}
                                        </Button.Content>
                                        <Button.Content id={this.travelChoices[key]} hidden>
                                            <Icon id={this.travelChoices[key]}
                                                  name={this.travelChoices[key].toLowerCase()}
                                            />
                                        </Button.Content>
                                    </Button>
                                </Grid.Column>
                            )
                        }))}
                    </Button.Group>
                    <Grid.Column width={5}> </Grid.Column>
                </Grid>
                <br/>
            </Segment>

        );

        return (
            <div className={'search prob'}>
                <Segment padded>
                    <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
                    <br/>
                    {grid_ArrAndDep}
                    {/*{menu_Divided}*/}
                    {menu_ButtonAnimated}
                    {grid_Button}
                </Segment>
            </div>
        );
    }
}