import React, {Component} from 'react'
import {Segment, Placeholder, Header, Container, Grid, Divider} from 'semantic-ui-react'
import Result from "./Result.js";

export default class Results extends Component {
    constructor(props) {
        super(props)
    }

    // resultData = {
    //     data: {
    //         cycling: {dist: 369270.6, time: 108861.3, emission: 1.1816659200000001},
    //         driving: {dist: 407345.8, time: 15023.9, emission: 86.5609825},
    //         flight: {dist: 308469.945250751, time: 25551.57089380632, emission: 55.36653014513517},
    //         transit: {dist: 404634, time: 12424, emission: 16.18536}
    //     }
    // };

    componentDidUpdate(prevProps) {
        console.log("prev props: ", prevProps, "current props: ", this.props);
        if (prevProps !== this.props) {

            this.render()
        }
    }


    render() {


        const placeholderIntern = (
            <Grid.Column>
                <Segment raised>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='medium'/>
                            <Placeholder.Line length='short'/>
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
            </Grid.Column>);

        const gridStructure = (
            <React.Fragment>
                <Grid columns={3} stackable>
                    {placeholderIntern}
                    {placeholderIntern}
                    {placeholderIntern}
                </Grid>
            </React.Fragment>

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
                            <p> For your wanted Route you have the following choices </p>
                        </Container>
                        <React.Fragment key={value}>
                            <Segment>
                                <Grid columns={4}>
                                    <Result completeResults={completeResults}/>
                                </Grid>
                            </Segment>
                        </React.Fragment>
                    </React.Fragment>
                )
            })
        );


        return <Segment> {this.props.resultData.data === undefined ? gridStructure : renderResult }</Segment>

    }

}

