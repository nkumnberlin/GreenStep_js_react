import React, {Component, Fragment} from 'react'
import {Segment, Step, Icon, Header, Container, Grid, Divider} from 'semantic-ui-react'
import GeneralResult from "./display_result/GeneralResult.jsx";
import {Steps} from "./display_result/PlaceholderResult.js"
import SpecificResult from "./display_result/SpecificResult.jsx";

export default class Results extends Component {
    constructor(props) {
        super(props)
        console.log("PROPS: ", props)
    }

    componentDidUpdate(prevProps) {
        console.log("prev props: ", prevProps, "current props: ", this.props);
        if (prevProps !== this.props) {
            // this.render()
        }
    }
    createGeneralResult =(completeResults, value)=> (
        <React.Fragment key={value}>
            <Segment>
                <Grid columns={4}>
                    <GeneralResult completeResults={completeResults}
                                   TravelChoices={this.props.TravelChoices}/>
                </Grid>
            </Segment>
        </React.Fragment>
    );

    createSpecificResult = (completeResults) => (
        <React.Fragment key={0}>
            <Segment>
                <Grid columns={4}>
                    <SpecificResult completeResults={completeResults}
                                   TravelChoices={this.props.TravelChoices}/>
                </Grid>
            </Segment>
        </React.Fragment>
    );


    render() {
        const StepContent = this.props.StepContent;
        // const locationArrival = this.props.locationArrival;
        // const locationDeparture = this.props.locationDeparture;
        const locationArrival = "this.props.locationArrival";
        const locationDeparture = "this.props.locationDeparture";


        const renderResult = (
            Object.keys(this.props.resultData).map((value) => {
                const completeResults = this.props.resultData[value];
                return (
                    <React.Fragment key={value}>
                        <Divider horizontal>
                            <Header as='h4'>
                                Results
                            </Header>
                        </Divider>
                        <Container textAlign="center">
                            <p> For your wanted Route from {locationDeparture} to {locationArrival} you have the following choices </p>
                        </Container>
                        {this.createGeneralResult(completeResults, value)}
                        {this.createSpecificResult(completeResults, value)}
                    </React.Fragment>
                )
            })
        );


        return (
            <React.Fragment >
                <Segment className={'results prob'}> {this.props.resultData.data === undefined ?
                    Steps(StepContent)
                    :
                    renderResult}
                </Segment>
            </React.Fragment>)
    }

}

