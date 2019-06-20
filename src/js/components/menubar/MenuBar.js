import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'

export default class MenuBar extends Component {
    menuItems= ['Green Step', 'Vision', 'About Us'];
    render() {
        const {activeMenuItem} = this.props;
        return (
            <Menu>
                {this.menuItems.map(menu =>
                    <Menu.Item
                        id={this.menuItems.indexOf(menu)}
                        key={menu}
                        name={menu}
                        active={menu === this.menuItems[activeMenuItem]}
                        onClick={this.props.changeMenuItem}
                    />
                )}
            </Menu>
        )
    }
}
