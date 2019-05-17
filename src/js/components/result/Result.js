import React, {Component, Fragment} from 'react'
import {Divider, Table, Header, Icon, Segment, Grid} from 'semantic-ui-react'


export default class Results extends Component {
    fetchResults = [
        {
            0: {
                transport: 'Flight',
                emission: '10kg',
                distance: '1000km',
                description: 'Fancy things about plane flights are bad!',
                icon: 'tba'
            }
        }, {
            1: {
                transport: 'Car',
                emission: '8kg',
                distance: '600km',
                description: 'Fancy things about car rides are bad!',
                icon: 'tba'
            }
        }, {
            2: {
                transport: 'Train',
                emission: '4kg',
                distance: '300km',
                description: 'Fancy things about train rides are bad!',
                icon: 'tba'
            }
        }
    ];
    descriptionResults = ['Transport', 'Emission Value', 'Distance']

    _renderFetchResults() {
        return Object.entries(this.fetchResults).map(([key, value], i) => {
            let descriptionOfResult =
                <><Divider horizontal>
                    <Header as='h4'>
                        <Icon name='tag'/>
                    </Header>
                </Divider>
                    <p>
                        {value[key].description}
                    </p></>;

            let detailsOfResult = <Divider horizontal>
                <Header as='h4'>
                    <Icon name='bar chart'/>
                    Details
                </Header>
            </Divider>;

            const listOfResult =
                <>
                    <Table.Row>
                        <Table.Cell width={2}>{this.descriptionResults[0]}</Table.Cell>
                        <Table.Cell>{value[key].transport}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2}>{this.descriptionResults[1]}</Table.Cell>
                        <Table.Cell>{value[key].emission}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2}>{this.descriptionResults[2]}</Table.Cell>
                        <Table.Cell>{value[key].distance}</Table.Cell>
                    </Table.Row>
                </>;

            return (
                <Fragment key={key}>
                    {descriptionOfResult}
                    {detailsOfResult}
                    <Table definition>
                        <Table.Body>
                            <Grid columns={4} divided>
                                <Grid.Row>
                                    <Grid.Column>
                                        {listOfResult}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Table.Body>
                    </Table>
                </Fragment>
            )
        })
    }

    render() {
        return (
            <div>
                <Segment>
                    <Header as='h4' textAlign='center'>Results</Header>
                    {this._renderFetchResults()}
                </Segment>
            </div>

        )
    };
}

