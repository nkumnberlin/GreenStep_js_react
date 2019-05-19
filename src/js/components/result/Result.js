import React, {Component} from 'react'
import {Divider, Progress, Container, Header, Segment, Grid, SegmentGroup} from 'semantic-ui-react'
import GridColumn from "semantic-ui-react/dist/commonjs/collections/Grid/GridColumn";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";


export default class Results extends Component {
    fetchResults = [
        {
            0: {
                transport: 'Plane',
                emission: 21,
                distance: 1000,
                description: 'Fancy things about plane flights are bad!',
                icon: 'tba'
            }
        }, {
            1: {
                transport: 'Car',
                emission: 15,
                distance: 600,
                description: 'Fancy things about car rides are bad!',
                icon: 'tba'
            }
        }, {
            2: {
                transport: 'Train',
                emission: 8,
                distance: 300,
                description: 'Fancy things about train rides are bad!',
                icon: 'tba'
            }
        }
    ];






    _renderFetchResults() {
        return Object.entries(this.fetchResults).map(([key, value], i) => {

            const getHighestEmission = () => {
                let arr = [];
                arr.push(value[key].emission)
                // return(Math.max(...arr))
                return 21;
            };

            const getHighestDistance= () => {
                let arr = [];
                Object.entries(this.fetchResults).map(([key, value]) => {
                    arr.push(value[key].distance)
                });
                // return(Math.max(...arr))
                return 1000;
            };

                const descriptionResults = {
                    typ: 'Type of Transport',
                    dist: 'Distance',
                    em: 'Emission Value',
                    unitWeight: 'kg',
                    unitDistance: 'km',
                    separator: ': '
                };


                const CreateCO2Bubble = (emission) =>
                    <div>
                        <Segment  color={ColorOfBubble(emission)} circular style={SizeOfBubble(emission)}>
                            <Header as='h2'>
                                <p>  {value[key].transport}</p>
                            </Header>
                            <Header.Subheader>
                                <p>{value[key].emission}  {descriptionResults.unitWeight}</p>
                                <p>{value[key].distance}  {descriptionResults.unitDistance}</p>
                            </Header.Subheader>
                        </Segment>
                    </div>;

                const SizeOfBubble = (emission) => {
                    let sizeOfBubble;
                    switch (true) {
                        case emission < 10:
                            sizeOfBubble = {width: 300, height: 200};
                            break;
                        case emission < 20:
                            sizeOfBubble = {width: 450, height: 200};
                            break;
                        case emission > 20:
                            sizeOfBubble = {width: 600, height: 200};
                            break;
                    }
                    return sizeOfBubble;
                };

                const ColorOfBubble = (emission) => {
                    let colorOfSegment;
                    switch (true) {
                        case emission < 5:
                            colorOfSegment = 'green';
                            break;
                        case emission < 10:
                            colorOfSegment = 'teal';
                            break;
                        case emission < 15:
                            colorOfSegment = 'blue';
                            break;
                        case emission < 20:
                            colorOfSegment = 'yellow';
                            break;
                        case emission < 25:
                            colorOfSegment = 'red';
                            break;
                        case emission > 25:
                            colorOfSegment = 'black';
                            break;

                    }
                    return colorOfSegment;
                };

                const BuildTopProgressbar = (emission) => {
                    const MaxEmission = getHighestEmission() / 100;
                    return  emission / MaxEmission;
                };

            const BuildBotProgressbar = (distance) => {
                const MaxEmission = getHighestDistance() / 100;
                return  distance / MaxEmission;
            };




            const BuildProgressbar = (emission, distance) =>
                    <Segment>
                        <Progress color={ColorOfBubble(emission)} percent={BuildTopProgressbar(emission)} attached='top' size='medium' />

                        <Header as='h2'>
                            <p>{value[key].transport}</p>
                        </Header>
                        <Header.Subheader>
                            <p>{descriptionResults.em}{descriptionResults.separator} {value[key].emission}{descriptionResults.unitWeight}</p>
                            <p>{descriptionResults.dist}{descriptionResults.separator}{value[key].distance}  {descriptionResults.unitDistance}</p>
                        </Header.Subheader>

                        <Progress percent={BuildBotProgressbar(distance)} attached='bottom' size='medium' />
                    </Segment>



                return (
                    <Grid columns={1} key={key}>
                        <Grid.Column>
                            {/*{CreateCO2Bubble(value[key].emission)}*/}
                            {BuildProgressbar(value[key].emission, value[key].distance)}
                        </Grid.Column>
                    </Grid>



                )
            }
        )
    }

    render() {
        return (
            <div>
                <Segment>
                    <Container textAlign='center'><Header as='h1'> Results </Header></Container>
                    <Divider/>
                    <Container fluid textAlign='center'>
                        {this._renderFetchResults()}
                    </Container>
                </Segment>
            </div>
        )
    };
}

