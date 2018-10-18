import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { } from '../../../store/actions/index';
import classes from './Summary.css';

class Summary extends Component {
    render() {
        let orderBtn = <Button>Place Order</Button>
        if(!this.props.total) {
            orderBtn = <Button disabled={true}>Cart empty</Button>
        }
        return (
            <div className={classes.container}>
                <span className={classes.total}>Total price: &#8377; {this.props.total}</span>
                {orderBtn}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        total: state.cart.total
    }
}

export default connect(mapStateToProps)(Summary);