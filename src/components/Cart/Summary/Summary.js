import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { } from '../../../store/actions/index';
import classes from './Summary.css';

class Summary extends Component {
    render() {
        return (
            <div className={classes.container}>
                <span className={classes.total}>Total price: &#8377; {this.props.total}</span>
                <Button>Place Order</Button>
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