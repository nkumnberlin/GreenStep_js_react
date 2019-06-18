import React, { Fragment} from 'react'
import { List, Segment, Header, Icon } from 'semantic-ui-react'

export const ListExampleHeader = () => (
  <Fragment>
    <Segment>
      <Header as={"h3"} textAlign="center">Possibilites for Compensation:</Header>
      <List>
        <List.Item>
          <List.Header as="h2"><Icon name="external alternate" size="small"/><a href="https://www.google.com/" target="_blank">Atmosfair</a></List.Header>
          <List.Description className="compDes">Go climate conscious <Icon name="angle right" /> Offset flight <Icon name="angle right" /> Offset cruise <Icon name="angle right" /> Offset desired CO2 value <Icon name="angle right" /> Donate directly.</List.Description>
        </List.Item>
        <List.Item>
          <List.Header as="h3">Chicago</List.Header>
          Also quite a lovely city
        </List.Item>
        <List.Item>
          <List.Header as="h3">Los Angeles</List.Header>
          Sometimes can be a lovely city
        </List.Item>
        <List.Item>
          <List.Header as="h3">San Francisco</List.Header>
          What a lovely city
        </List.Item>
      </List>
    </Segment>
  </Fragment>
)
