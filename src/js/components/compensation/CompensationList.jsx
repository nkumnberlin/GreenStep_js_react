import React, { Fragment} from 'react'
import { List, Segment, Header } from 'semantic-ui-react'

export const ListExampleHeader = () => (
  <Fragment>
    <Segment>
      <Header as={"h3"} textAlign="center">Possibilites for Compensation:</Header>
      <List>
        <List.Item>
          <List.Header>New York City</List.Header>
          <a href="https://www.google.com/" target="_blank">A lovely city</a>
        </List.Item>
        <List.Item>
          <List.Header>Chicago</List.Header>
          Also quite a lovely city
        </List.Item>
        <List.Item>
          <List.Header>Los Angeles</List.Header>
          Sometimes can be a lovely city
        </List.Item>
        <List.Item>
          <List.Header>San Francisco</List.Header>
          What a lovely city
        </List.Item>
      </List>
    </Segment>
  </Fragment>
)
