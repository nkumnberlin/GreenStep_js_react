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


    createMenuButton = (key) => {
        const {TravelChoices} = this.props;
        return (<Button basic
                        animated
                        onClick={this.props.clickedItem}
                        id={TravelChoices[key]}
                        active={this.props.activeItem === TravelChoices[key]}
            >
                <Button.Content id={TravelChoices[key]} visible>
                    {TravelChoices[key] === 'Male' ? "Walking" : TravelChoices[key]}
                </Button.Content>
                <Button.Content id={TravelChoices[key]} hidden>
                    <Icon name={TravelChoices[key].toLowerCase()}
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
            <Grid centered columns={this.props.TravelChoices.length === 0 ?
                this.props.TravelChoices.length + 1 :
                this.props.TravelChoices.length
            }>
                <Button.Group size='large'>
                    {Object.keys(this.props.TravelChoices).map((key => {
                        return (
                            <Grid.Column key={key}>
                                {this.createMenuButton(key)}
                            </Grid.Column>
                        )
                    }))}
                </Button.Group>
            </Grid>
        );

        const grid_Button = (
            <Grid column={1}>
                <Grid.Column verticalAlign={'middle'} textAlign={'center'}>
                    <Button onClick={this.props.checkLocation} positive> Submit </Button>
                </Grid.Column>
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
                    {grid_Button}
                    <br/>
                    {console.log("Leng:", this.props.TravelChoices.length)}
                    {menu_Button}
                    {/*{this.props.TravelChoices.length !== 0 ? menu_Button : null}*/}
                </Segment>
            </div>
        );
    }
}