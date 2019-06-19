import React, { Fragment} from 'react'
import { List, Segment, Header, Icon } from 'semantic-ui-react'

export const ListExampleHeader = () => (
  <Fragment>
    <Segment>
      <Header as={"h1"} textAlign="center" id="compHeader">Possibilites for Compensation:</Header>
      <List>
        <List.Item>
          <List.Header as="h2"><Icon name="external alternate" size="small"/><a href="https://www.atmosfair.de/en/offset/" target="_blank" className="compOrg">Atmosfair</a></List.Header>
          <List.Description className="compDes">Go climate conscious <Icon name="angle right" /> Offset flight <Icon name="angle right" /> Offset cruise <Icon name="angle right" /> Offset desired CO2 value <Icon name="angle right" /> Donate directly.</List.Description>
        </List.Item>

        <List.Item>
          <List.Header as="h2"><Icon name="external alternate" size="small"/><a href="https://co2.myclimate.org/de/contribution_calculators/new" target="_blank" className="compOrg">MyClimate</a></List.Header>
          <List.Description className="compDes">Shape our future <Icon name="angle right" /> Get informed <Icon name="angle right" />Calculate Your Carbon Footprint <Icon name="angle right" />Compensate CO2 <Icon name="angle right" /> Donate to Projects.</List.Description>
        </List.Item>
        
        <List.Item>
          <List.Header as="h2"><Icon name="external alternate" size="small"/><a href="https://www.primaklima.org/baeume-verschenken/" target="_blank" className="compOrg">PrimaKlima</a></List.Header>
          <List.Description className="compDes">Plant trees in Uganda, Nicaragua, Germany or Bolivia <Icon name="angle right" /> 3€ per Tree <Icon name="angle right" /> Trees as a Gift <Icon name="angle right" /> Take Responsibility.</List.Description>
        </List.Item>
        
        <List.Item>
          <List.Header as="h2"><Icon name="external alternate" size="small"/><a href="https://www.plant-for-the-planet.org/en/donation" target="_blank" className="compOrg">Plant For The Planet</a></List.Header>
          <List.Description className="compDes">Plant 1 Trillion Trees <Icon name="angle right" />Plant Trees in Brazil, Philippines or India <Icon name="angle right" />Stop talking. Start planting.</List.Description>
        </List.Item>
      </List>
    </Segment>
  </Fragment>
)
