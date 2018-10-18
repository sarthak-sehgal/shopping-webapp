import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Preloader, Button, Row, Input } from 'react-materialize';
import classes from './Order.css';
import Auth from '../Auth/Auth';
import Addresses from '../Addresses/Addresses';

class Order extends Component {
    state = {
        loading: true,
        deliveryTime: 'immediate'
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false, user: this.props.user }); }, 500);
    }

    onTimeChanged = (e) => {
        this.setState({
            deliveryTime: e.currentTarget.value
        });
        console.log(e.currentTarget.value);
    }

    render() {
        if (this.state.loading || this.props.uiLoading) {
            return (
                <div className={classes.container}>
                    <Preloader />
                </div>
            )
        }

        if (!this.props.user) {
            return (
                <div className={classes.container}>
                    <span className={classes.topMsg}>Please log in to continue</span>
                    <Auth />
                </div>
            )
        }

        if (this.props.addresses.length === 0) {
            return (
                <div className={classes.container}>
                    <span className={classes.topMsg}>Please add an addresses to continue</span>
                    <Addresses />
                </div>
            )
        }

        if (this.props.total === 0) {
            return (
                <div className={classes.container}>
                    <h3>Cart is empty</h3>
                </div>
            )
        }

        let expensiveMsg = null;
        if (this.props.total > 500) {
            expensiveMsg = "Note: You might be asked to PayTM order charges since your total exceeds 500";
        }

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <span className={classes.title}>Place Order</span>
                    <span className={classes.total}>Total: &#8377; {this.props.total}</span>
                    <span className={classes.expensiveMsg}>{expensiveMsg}</span>
                    <span className={classes.selectTime}>Select delivery time:</span>
                    <div className={classes.timeBtns}>
                        <div onClick={() => this.setState({deliveryTime: 'immediate'})} className={this.state.deliveryTime === 'immediate' ? `${classes.selectedTime} ${classes.time}` : classes.time}>Immediate</div>
                        <div onClick={() => this.setState({deliveryTime: 'later'})} className={this.state.deliveryTime === 'later' ? `${classes.selectedTime} ${classes.time}` : classes.time}>Decide on call</div>
                    </div>
                    <Button className={classes.orderBtn}>Order</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        addresses: state.addresses.addresses,
        total: state.cart.total,
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);