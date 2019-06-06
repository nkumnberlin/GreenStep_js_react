import React, {Component, Fragment} from 'react'
import {Segment, Step, Icon, Header, Container, Grid, Divider, Loader, Image} from 'semantic-ui-react'
import TableResult from "./display_result/TableResult.jsx";
import {Steps,StepsLoader} from "./display_result/PlaceholderResult.js"
import SpecificResult from "./display_result/SpecificResult.jsx";

export default class Results extends Component {
    constructor(props) {
        super(props)
        console.log("PROPS: ", props)
    }



    createGeneralResult = (completeResults, value) => (
        <React.Fragment key={value}>
            <Segment>
                <Grid columns={completeResults.length}>
                    <TableResult completeResults={completeResults}
                                 TravelChoices={this.props.TravelChoices}/>
                </Grid>
            </Segment>
        </React.Fragment>
    );

    createSpecificResult = (completeResults) => (
        <React.Fragment key={0}>
            <SpecificResult completeResults={completeResults}
                            ActiveTravelItem={this.props.ActiveTravelItem}
                            TravelChoices={this.props.TravelChoices}/>
        </React.Fragment>
    );


    render() {
        const StepContent = this.props.StepContent;
        const locationArrival = this.props.locationArrival;
        const locationDeparture = this.props.locationDeparture;
        // const locationArrival = "this.props.locationArrival";
        // const locationDeparture = "this.props.locationDeparture";

        const renderResult = (
            Object.keys(this.props.resultData).map((value) => {
                const completeResults = this.props.resultData[value];
                return (
                    <React.Fragment key={value}>
                        <Segment>
                        <Divider horizontal>
                            <Header as='h4'>
                                Results
                            </Header>
                        </Divider>
                        <Container textAlign="center">
                            <p> From {locationDeparture} to {locationArrival} would be this the CO2 - Emission </p>
                        </Container>
                        {this.createGeneralResult(completeResults, value)}
                        {this.createSpecificResult(completeResults, value)}
                        </Segment>
                    </React.Fragment>
                )
            })
        );


        return (
            <React.Fragment>
                {this.props.loading  ?
                        StepsLoader(StepContent)
                    :
                    renderResult}
            </React.Fragment>)
    }

}

