import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import {List} from 'semantic-ui-react'
import {Header} from 'semantic-ui-react'
import {Segment} from 'semantic-ui-react';

export default class Footer extends Component {
    render() {

        return (
            <Segment className={'footer prob'}>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header size='large'> About</Header>
                            <List divided relaxed>
                                <List.Item active> Home</List.Item>
                                <List.Item> test2</List.Item>
                                <List.Item> test3</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header inverted size='large'> About</Header>
                            <List divided relaxed>
                                <List.Item active> Home</List.Item>
                                <List.Item> test2</List.Item>
                                <List.Item> test3</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header inverted size='large'> About</Header>
                            <List divided relaxed>
                                <List.Item active> Home</List.Item>
                                <List.Item> test2</List.Item>
                                <List.Item> test3</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}