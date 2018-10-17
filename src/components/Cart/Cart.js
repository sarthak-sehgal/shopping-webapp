import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardPanel, Preloader, Icon, Chip } from 'react-materialize';
import classes from './Cart.css';
import { removeItemFromCart } from '../../store/actions/index';
import Quantity from '../Quantity/Quantity';
import Summary from './Summary/Summary';

class Cart extends Component {
    removeItemHandler = (key) => {
        this.props.removeItem(key);
    }

    render() {
        if (this.props.cartLoading) {
            return (
                <div className={classes.container}>
                    <Preloader />
                </div>
            )
        }

        let cart = this.props.cart.map(item => {
            return (
                <CardPanel className={`white lighten-4 black-text ${classes.card}`}>
                    <span className={classes.name}>{item.name}</span>
                    <span className={classes.price}>{item.qty} x {item.price} = &#8377; {item.qty * item.price}</span>
                    <span className={classes.quantity}><Quantity quantity={item.qty} fbKey={item.key} /></span>
                    <span className={classes.category}>Category: {item.category}</span>
                    <span className={classes.removeBtn} onClick={() => this.removeItemHandler(item.key)}><Icon>close</Icon></span>
                </CardPanel>
            )
        })

        let cartHeading = <span className={classes.heading}>Cart</span>
        if(this.props.cart.length === 0) {
            cartHeading = <span className={classes.heading}>Cart is empty</span>
        }

        return (
            <div className={classes.container}>
                <Summary />
                {cartHeading}
                {cart}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartLoading: state.ui.cartLoading,
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeItem: (key) => dispatch(removeItemFromCart(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);