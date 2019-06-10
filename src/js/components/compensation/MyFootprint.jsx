import React, {Component, Fragment} from 'react';
import {Segment, Progress, Header, Grid} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {MyFootprintSegment} from "../compensation/MyFootprintSegment.jsx";
import {adjustEmissionValues} from "../data_handler/Converter.jsx";

export default class MyFootprint extends Component {
    constructor(props) {
        super(props)
    }

    renderFootprint = (data) => {
        const perc_amount = (data.emission / 1200) * 100;
        const prog_values = {
        1:    [perc_amount, 100, 100],
         2:  ["Meine Streckenemission", "So viel sollte eine Person maximal pro Jahr verursachen, um den Klimawandel zu stoppen:", "So viel CO2 verursacht eine Person in der EU im Durchschnitt pro Jahr:"],
          3: [3, 3, 16],
           4:["teal", "green", "red"],
           5: [adjustEmissionValues(data.emission), 1.200, 8.400]
        };
        //Strecke / erlaubte Jahresmenge

        MyFootprintSegment(prog_values)
    };


    prepareFootprint = (data) => {
        //"Meine Streckenemission", width, percentage, Beschreibungprogressba
        console.log("IST IN FOOTPR")
        return (
            <Fragment>
                <Segment.Group>
                    <Segment>
                        <Header as={"h3"}>Mein CO2 Fußabdruck</Header>
                    </Segment>
                    {this.renderFootprint(data)}
                </Segment.Group>
            </Fragment>
        )

    }


    renderDynamicResults = typeOfTravel => {
        if (this.props.resultData !== undefined) {
            const {driving, walking, cycling, flight, transit} = this.props.resultData;
            switch (typeOfTravel.toString()) {
                case "Plane":
                    return (
                        this.prepareFootprint(flight)
                    )
                case "Train":
                    return (
                        this.prepareFootprint(transit)
                    )
                case "Male":
                    return (
                        this.prepareFootprint(walking)
                    )
                case "Car":
                    return (
                        this.prepareFootprint(driving)
                    )
                case "Bicycle":
                    return (
                        this.prepareFootprint(cycling)
                    )
            }
        }
    };


    render() {
        return (
            <>
                {this.renderDynamicResults(this.props.clickedItem)}
            </>
        )
    };
}