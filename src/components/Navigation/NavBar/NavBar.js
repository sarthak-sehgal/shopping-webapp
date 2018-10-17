import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import {connect} from 'react-redux';
import {signOut} from '../../../store/actions/index';

class NavBar extends Component {
    signOutHandler = () => {
        this.props.signOut();
        window.Materialize.toast('Signed out!', 3000);
    }
    
    render() {
        let authStatus = <NavItem href="./auth">Login &amp; Sign Up</NavItem>;
        if(this.props.user) {
            authStatus = <NavItem onClick={this.signOutHandler}>Sign Out</NavItem>
        }
        return (
            <Navbar brand='Balaji Stores' right>
                <NavItem href="./">Home</NavItem>
                <NavItem href="./cart">Cart</NavItem>
                {authStatus}
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);