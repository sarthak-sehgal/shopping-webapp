import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Preloader, CardPanel, CollectionItem, Collection } from 'react-materialize';
import { getOrders } from '../../store/actions/index';
import classes from './Orders.css';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../serverConfig';

class Orders extends Component {
    state = {
        loading: true,
        user: null,
        orders: null
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false, user: this.props.user });
            this.props.getOrders()
                .then(orders => {
                    if(orders!=='error')
                        this.setState({ orders })
                })
        }, 300);
    }

    render() {
        if (this.state.loading || this.props.uiLoading) {
            return (
                <div className={classes.container}>
                    <Preloader size="small" />
                </div>
            )
        }

        if (!this.state.loading && !this.props.user) {
            return <Redirect
                to={{
                    pathname: BASE_URL + "/auth",
                }}
            />
        }

        let orders = null;
        if (this.state.orders) {
            if (this.state.orders.length === 0) {
                orders = <span className={classes.subtitle}>No past orders</span>
            }
            if (this.state.orders.length > 0) {
                orders = this.state.orders.reverse().map((order, index) => {
                    let cart = order.cart.map(item => {
                        return (
                            <CollectionItem className={classes.itemsCollectionItem}>
                                <span className={classes.itemSpan}>Name: {item.name}</span>
                                <span className={classes.itemSpan}>Quantity: {item.qty}</span>
                                <span className={classes.itemSpan}>Price: {item.price}</span>
                            </CollectionItem>
                        )
                    })
                    return (
                        <CardPanel className={`white lighten-4 black-text ${classes.card}`}>
                            <span className={classes.orderTitle}>Order #{this.state.orders.length - index}</span>
                            <span className={classes.orderTime}>Total: &#8377; {order.total}</span>
                            <span className={classes.orderTime}>{order.time}</span>
                            <span className={classes.orderAdd}>Delivered to: {`${order.address.houseNo} ${order.address.locality}, ${order.address.city}, ${order.address.state}, Pin Code: ${order.address.pinCode}`}</span>
                            <span className={classes.itemsHeading}>Items:</span>
                            <Collection>
                                {cart}
                            </Collection>
                        </CardPanel>
                    )
                })
            }
        }

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <span className={classes.title}>My Orders</span>
                    {orders}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAdmin: state.auth.isAdmin,
        uiLoading: state.ui.uiLoading,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);