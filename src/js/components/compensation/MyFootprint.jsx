import React, {Component, Fragment} from 'react';
import {Segment, Progress, Header, Grid, Divider} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {MyFootprintSegment} from "../compensation/MyFootprintSegment.jsx";
import {adjustEmissionValues} from "../data_handler/Converter.jsx";
import {ListExampleHeader} from './CompensationList.jsx';

export default class MyFootprint extends Component {
    constructor(props) {
        super(props)
    }

    renderFootprint = (data) => {
        const perc_amount = (data.emission / 1200) * 100;
        const prog_values = {
            0: {
                perc_amount: perc_amount,
                descr: "Your route's emission",
                width: 3,
                color: "teal",
                emission: adjustEmissionValues(data.emission),
            },
            1: {
                perc_amount: 100,
                descr: "How much CO2 an EU citizen should max. cause per year in order to stop climate change:",
                width: 3,
                color: "olive",
                emission: "1200kg",
            },
            2: {
                perc_amount: 100,
                descr: "How much CO2 one EU citizen actually causes on average per year:",
                width: 16,
                color: "yellow",
                emission: "8400kg",
            }
        };

        return MyFootprintSegment(prog_values)
    };


    prepareFootprint = (footprintData) => {
        return (
            <Fragment>
                {footprintData.emission === 0 ? null :
                    <Segment>
                        <Divider horizontal>
                            <Header as='h4'>
                                Your Carbon Footprint
                            </Header>
                        </Divider>
                        {this.renderFootprint(footprintData)}
                    </Segment>
                }
            </Fragment>
        )
    };

    renderDynamicResults = typeOfTravel => {
        if (this.props.resultData !== undefined) {
            const {driving, walking, cycling, flight, transit} = this.props.resultData;

            switch (typeOfTravel.toString()) {
                case "Plane":
                    return (
                        this.prepareFootprint(flight)
                    );
                case "Train":
                    return (
                        this.prepareFootprint(transit)
                    );
                case "Male":
                    return (
                        this.prepareFootprint(walking)
                    );
                case "Car":
                    return (
                        this.prepareFootprint(driving)
                    );
                case "Bicycle":
                    return (
                        this.prepareFootprint(cycling)
                    );
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