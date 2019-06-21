import React, {Fragment} from 'react'
import {Segment, Header, Icon, Divider} from 'semantic-ui-react'

export const ListExampleHeader = (props) => {
    if (props !== undefined) {
        return (
            <Fragment>
                <Segment>
                    <Divider horizontal>
                        <Header as='h4'>
                            You can compensate your Emission:
                        </Header>
                    </Divider>
                    <Segment.Group>

                        <Segment.Group horizontal>
                            <Segment>
                                <Icon name="pagelines" size={"big"}>
                                </Icon>
                                <a href="https://www.atmosfair.de/en/offset/"
                                   target="_blank"> Atmosfair
                                </a>
                                <Segment>
                                    <p><Icon name="angle right"/> Go climate conscious </p>
                                    <p><Icon name="angle right"/> Offset flight </p>
                                    <p><Icon name="angle right"/> Offset cruise</p>
                                    <p><Icon name="angle right"/> Donate directly.</p>
                                </Segment>
                            </Segment>

                            <Segment>
                                <Icon name="pagelines" size={"big"}>
                                </Icon>
                                <a
                                    href="https://co2.myclimate.org/de/contribution_calculators/new"
                                    target="_blank"> MyClimate
                                </a>
                                <Segment>
                                    <p><Icon name="angle right"/> Get informed </p>
                                    <p><Icon name="angle right"/> Calculate Your Carbon Footprint </p>
                                    <p><Icon name="angle right"/> Compensate CO2 </p>
                                    <p><Icon name="angle right"/> Donate to Projects.</p>
                                </Segment>
                            </Segment>
                        </Segment.Group>

                        <Segment.Group horizontal>
                            <Segment>
                                <Icon name="pagelines" size={"big"}>
                                </Icon>
                                <a
                                    href="https://www.primaklima.org/baeume-verschenken/"
                                    target="_blank"
                                > PrimaKlima</a>
                                <Segment>
                                    <p><Icon name="angle right"/> Plant trees in Uganda, Nicaragua, Germany or Bolivia
                                    </p>
                                    <p><Icon name="angle right"/> 3€ per Tree</p>
                                    <p><Icon name="angle right"/> Trees as a Gift</p>
                                    <p><Icon name="angle right"/> Take Responsibility.</p>
                                </Segment>
                            </Segment>

                            <Segment>
                                <Icon name="pagelines" size={"big"}>
                                </Icon>
                                <a
                                    href="https://www.plant-for-the-planet.org/en/donation"
                                    target="_blank"
                                > Plant For The Planet
                                </a>
                                <Segment>
                                    <p><Icon name="angle right"/> Plant 1 Trillion Trees </p>
                                    <p><Icon name="angle right"/> Plant Trees in Brazil, Philippines or India </p>
                                    <p><Icon name="angle right"/> Plant Trees Worldwide </p>
                                    <p><Icon name="angle right"/> Stop talking. Start planting.</p>
                                </Segment>
                            </Segment>
                        </Segment.Group>
                    </Segment.Group>
                </Segment>
            </Fragment>
        )
    }
};


