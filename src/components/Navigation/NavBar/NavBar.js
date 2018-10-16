import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';

class NavBar extends Component {
    render() {
        return (
            <Navbar brand='Balaji Stores' right>
                <NavItem href="./cart"><Icon>shopping_cart</Icon></NavItem>
                <NavItem href="./auth">Login &amp; Sign Up</NavItem>
            </Navbar>
        )
    }
}

export default NavBar;