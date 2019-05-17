import React, {Component} from 'react'
import {Menu, Segment} from 'semantic-ui-react'

export default class MenuBar extends Component {
    menuItems = ['GreenStep', 'Vision', 'About us'];
    state = {activeItem: this.menuItems[0]};
    handleItemClick = (e, {name}) => this.setState({activeItem: name})


    render() {
        const {activeItem} = this.state;
        return (
            <Menu>
                {this.menuItems.map(menu =>
                    <Menu.Item
                        key={menu}
                        name={menu}
                        active={activeItem === menu}
                        onClick={this.handleItemClick}
                    />
                )}
            </Menu>
        )
    }
}
