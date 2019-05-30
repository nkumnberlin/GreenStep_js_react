import React, {Component, Fragment} from 'react'
import {Grid} from 'semantic-ui-react'
import {daysHoursMinutes} from "../../data_handler/MillisecondsConverter.jsx";
import {determineMaxEmission} from "../../data_handler/EmissionsConverter.jsx";
import {ProgressBar} from "../../data_handler/ProgressBar.jsx";
import {distanceInKm} from "../../data_handler/DistanceConverter.jsx";

export default class GeneralResult extends Component {
    constructor(props) {
        super(props);
        this.maxEm = determineMaxEmission(this.props.completeResults);
    }

    render() {
       const Header = ["Transportation", "Time", "Travel Distance", "Emission(kg)"];
        const colWidth = 3;

        const renderHeader = Header.map((key) => {
            return (
                <Grid.Column key={key} width={colWidth}>
                    {key}
                </Grid.Column>
            )
        });

        const renderContent = Object.values(this.props.completeResults).map((k, value) => {
            return (
                <Grid.Row key={k.dist}>
                    <Grid.Column
                        width={colWidth}>
                        {this.props.TravelChoices[value]}
                    </Grid.Column>
                    <Grid.Column
                        width={colWidth}>
                        {daysHoursMinutes(k.time)}
                    </Grid.Column>
                    <Grid.Column
                        width={colWidth}>
                        {distanceInKm(k.dist)}
                    </Grid.Column>
                    <Grid.Column
                        width={5}>
                        {ProgressBar(k.emission, this.maxEm)}
                    </Grid.Column>
                </Grid.Row>
            )
        });

        return (
            <Fragment>
                <Grid.Row>
                    {renderHeader}
                </Grid.Row>
                {renderContent}
            </Fragment>

        )
    }

}