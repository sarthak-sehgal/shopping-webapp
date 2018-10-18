import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Preloader, Button, Input } from 'react-materialize';
import classes from './Order.css';
import Auth from '../Auth/Auth';
import Addresses from '../Addresses/Addresses';
import { placeOrder } from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Order extends Component {
    state = {
        loading: true,
        deliveryTime: 'immediate',
        orderPlaced: false,
        shopMore: false,
        address: 'select'
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

    placeOrderHandler = () => {
        if (this.props.total <= 0) {
            window.Materialize.toast("Error occurred!", 3000);
        } else {
            if (this.state.address === 'select' || !this.state.address) {
                window.Materialize.toast("Please select an address", 3000);
            } else {
                let orderObj = {};
                orderObj.cart = this.props.cart;
                orderObj.deliveryTime = this.state.deliveryTime;
                orderObj.total = this.props.total;
                orderObj.address = this.props.addresses[parseInt(this.state.address)];
                this.props.placeOrder(orderObj)
                    .catch(err => {
                        window.Materialize.toast("Error occurred!", 3000)
                    })
                    .then(result => {
                        if (result === "order placed") {
                            this.setState({ orderPlaced: true });
                            window.Materialize.toast("Order placed!", 3000);
                            setTimeout(() => { this.setState({ shopMore: true }) }, 3000)
                        } else {
                            window.Materialize.toast("Error occurred!", 3000)
                        }
                    });
            }
        }
    }

    addHandler = (value) => {
        this.setState({ address: value });
    }

    render() {
        if (this.state.shopMore) {
            return (
                <Redirect
                    to='/'
                />
            )
        }

        if (this.state.orderPlaced) {
            return (
                <div className={classes.container}>
                    <span className={classes.thanks}>Thanks for orderding!</span>
                    <span>You will be contacted soon by us at {this.props.user.uphone}</span>
                    <Button onClick={() => this.setState({ shopMore: true })} className={classes.continueBtn}>Continue shopping</Button>
                    <span>(You will be automatically redirected soon)</span>
                </div>
            )
        }
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
                    <span className={classes.expensiveMsg}>We only deliver between 10 AM - 8 PM</span>
                    <span className={classes.expensiveMsg}>{expensiveMsg}</span>
                    <span className={classes.selectTime}>Select address:</span>
                    <Input type='select' label="Address" onChange={(e) => this.addHandler(e.target.value)}>
                        <option value="select">Select</option>
                        {
                            this.props.addresses.map((address, index) => {
                                return <option value={index} onChange={(e) => this.addHandler(e.target.value)}>{`${address.houseNo} ${address.locality}, ${address.city}, ${address.state}`}</option>
                            })
                        }
                    </Input>
                    <span className={classes.selectTime}>Select delivery time:</span>
                    <div className={classes.timeBtns}>
                        <div onClick={() => this.setState({ deliveryTime: 'immediate' })} className={this.state.deliveryTime === 'immediate' ? `${classes.selectedTime} ${classes.time}` : classes.time}>Immediate</div>
                        <div onClick={() => this.setState({ deliveryTime: 'later' })} className={this.state.deliveryTime === 'later' ? `${classes.selectedTime} ${classes.time}` : classes.time}>Decide on call</div>
                    </div>
                    <Button className={classes.orderBtn} onClick={this.placeOrderHandler}>Order</Button>
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
        cart: state.cart.cart,
        addresses: state.addresses.addresses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        placeOrder: (order) => dispatch(placeOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);