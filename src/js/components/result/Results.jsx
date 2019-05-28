import React, {Component} from 'react'
import {Segment, Placeholder, Container, Grid} from 'semantic-ui-react'
import Result from "./Result";

export default class Results extends Component {
    constructor(props) {
        super(props)
    }

    resultData = {
        data: {
            cycling: {dist: 369270.6, time: 108861.3, emission: 1.1816659200000001},
            driving: {dist: 407345.8, time: 15023.9, emission: 86.5609825},
            flight: {dist: 308469.945250751, time: 25551.57089380632, emission: 55.36653014513517},
            transit: {dist: 404634, time: 12424, emission: 16.18536}
        }
    };

    componentDidUpdate(prevProps) {
        console.log("prev props: ", prevProps, "current props: ", this.props)

        if (prevProps !== this.props) {

        }
    }


    render() {
        this.placeholderIntern = (
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

        const resultDataLoop = this.props.resultData === undefined ?
            Object.keys(this.props.resultData).map((value) => {
                const completeResults = this.props.resultData[value];
                const {cycling, driving, flight, transit} = completeResults;

                return (
                    <React.Fragment key={value}>
                        <Segment>
                            <Grid>
                                <Grid.Row columns={4}>
                                    {/*<Result/>*/}
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </React.Fragment>
                )
            })
            :<Grid columns={3} stackable>
                {this.placeholderIntern}
                {this.placeholderIntern}
                {this.placeholderIntern}
            </Grid>;


        return <Segment> {resultDataLoop}</Segment>
    }

}

