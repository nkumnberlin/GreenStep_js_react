import React, {Component, Fragment} from 'react'
import {Divider, Table, Header, Icon, Segment, Rail, Grid} from 'semantic-ui-react'


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
                <>
                <Grid.Column width={3}>
                    <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='tag'/>
                    </Header>
                </Divider>
                    <p>
                        {value[key].description}
                    </p>
                </Grid.Column>
                </>;

            const listOfResult =
                <>
                    <Grid.Column width={10}>
                        <Segment>
                            {this.descriptionResults[0]}
                            {value[key].transport}
                            {this.descriptionResults[1]}
                            {value[key].emission}
                            {this.descriptionResults[2]}
                            {value[key].distance}
                        </Segment>
                    </Grid.Column>
                </>;

            return (
                <Grid celled='internally'>
                    <Grid.Row>


                        <Fragment key={key}>
                            {descriptionOfResult}
                            {listOfResult}
                        </Fragment>
                    </Grid.Row>
                </Grid>

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

