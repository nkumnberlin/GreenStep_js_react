import React, {Component} from 'react'
import {Menu, Segment} from 'semantic-ui-react'

export default class MenuBar extends Component {
    state = {activeItem: 'GreenStep'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
                <Menu>
                    <Menu.Item
                        name='GreenStep'
                        active={activeItem === 'GreenStep'}
                        onClick={this.handleItemClick}/>
                    <Menu.Item
                        name='Vision'
                        active={activeItem === 'Vision'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='About us'
                        active={activeItem === 'About us'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
           )
    }
}
