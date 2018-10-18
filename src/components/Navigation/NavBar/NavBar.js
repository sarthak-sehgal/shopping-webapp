import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import {connect} from 'react-redux';
import {signOut} from '../../../store/actions/index';
import {BASE_URL} from '../../../serverConfig';

class NavBar extends Component {
    signOutHandler = () => {
        this.props.signOut();
        window.Materialize.toast('Signed out!', 3000);
    }
    
    render() {
        let authStatus = <NavItem href={BASE_URL + '/auth'}>Login &amp; Sign Up</NavItem>;
        if(this.props.user) {
            authStatus = (
                <React.Fragment>
                    <NavItem href={BASE_URL + '/addresses'}>Addresses</NavItem>
                    <NavItem href={BASE_URL + '/orders'}>My Orders</NavItem>
                    <NavItem onClick={this.signOutHandler}>Sign Out</NavItem>
                </React.Fragment>
            )
        }
        return (
            <Navbar brand='Balaji Stores' href={BASE_URL + '/'} right>
                <NavItem href={BASE_URL + '/'}>Home</NavItem>
                <NavItem href={BASE_URL + '/cart'}>Cart</NavItem>
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