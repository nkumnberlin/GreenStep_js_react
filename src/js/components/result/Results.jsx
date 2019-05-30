import React, {Component, Fragment} from 'react'
import {Segment, Step, Icon, Image, Placeholder, Header, Container, Grid, Divider} from 'semantic-ui-react'
import Result from "./display_result/Result.js";

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


    render() {
        const StepContent = this.props.StepContent;
        // const locationArrival = this.props.locationArrival;
        // const locationDeparture = this.props.locationDeparture;
        const locationArrival = "this.props.locationArrival";
        const locationDeparture = "this.props.locationDeparture";


        const renderSteps = Object.keys(StepContent).map((key, value) => {
            return (
                <Step key={key}>
                    <Icon name={StepContent.Icons[value]}/>
                    <Step.Content>
                        <Step.Title>{StepContent.Header[value]}</Step.Title>
                        <Step.Description>{StepContent.Description[value]}</Step.Description>
                    </Step.Content>
                </Step>
            )
        });
        const Steps = (
            <Fragment>
                <div>
                    <Segment>
                        <Container textAlign={'center'}>
                            <Header as='h4'> GREENSTEP </Header>
                            <p> Let us give you the exact Route for your GREENSTEP</p>
                        </Container>
                    </Segment>
                    <Step.Group fluid>
                        {renderSteps}
                    </Step.Group>
                </div>
                <div>
                    <Segment attached>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                    </Segment>
                </div>
            </Fragment>
        );


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
                        <React.Fragment key={value}>
                            <Segment>
                                <Grid columns={4}>
                                    <Result completeResults={completeResults}
                                            TravelChoices={this.props.TravelChoices}
                                    />
                                </Grid>
                            </Segment>
                        </React.Fragment>
                    </React.Fragment>
                )
            })
        );


        return (
            <React.Fragment >
                <Segment className={'results prob'}> {this.props.resultData.data === undefined ?
                    Steps
                    :
                    renderResult}
                </Segment>
            </React.Fragment>)
    }

}

