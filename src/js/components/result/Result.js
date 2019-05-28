import React, {Component, Fragment} from 'react'
import {Divider, Progress, Container, Header, Segment, Grid} from 'semantic-ui-react'

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.maxEm = this.determineMaxEmission();
    }

    determineMaxEmission = () => {
        let em = Object.values(this.props.completeResults).map(key => {
            let array = [];
            array.push(key.emission);
            return array;
        });
        return Math.max(...em);
        ;
    };

    static daysHoursMinutes(time) {
        console.log(time)
        let num = time / 60;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + " min.";
    }

    render() {
        const Description = ["Plane", "Driving", "Cycling", "Transit"];
        const Header = ["Transportation", "Time", "Travel Distance", "Emission(kg)"];
        const colWidth = 3;
        const renderHeader = Header.map((key) => {
            return (
                <Grid.Column key={key} width={colWidth}>
                    {key}
                </Grid.Column>
            )
        });
        const ProgressBar = (emission) => (
            <Progress progress='value' value={Math.round(emission)} total={Math.round(this.maxEm)} active>
            </Progress>
        );


        const renderContent = Object.values(this.props.completeResults).map((k, value) => {
            let dist = (k.dist = k.dist / 1000).toFixed(1) + " km";
            return (
                <Grid.Row key={k.dist}>
                    <Grid.Column width={colWidth}>
                        {Description[value]}
                    </Grid.Column>
                    <Grid.Column width={colWidth}>
                        {Results.daysHoursMinutes(k.time)}
                    </Grid.Column>
                    <Grid.Column width={colWidth}>
                        {dist}
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {ProgressBar(k.emission)}
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