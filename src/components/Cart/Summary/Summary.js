import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { } from '../../../store/actions/index';
import classes from './Summary.css';
import {Redirect} from 'react-router-dom';
import {BASE_URL} from '../../../serverConfig';

class Summary extends Component {
    state = {
        placeOrder: false
    }
    render() {
        let orderBtn = <Button onClick={() => this.setState({placeOrder: true})}>Place Order</Button>
        if(!this.props.total) {
            orderBtn = <Button disabled={true}>Cart empty</Button>
        }

        if(this.state.placeOrder) {
            return (
                <Redirect 
                    to={BASE_URL + '/order'}
                />
            )
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