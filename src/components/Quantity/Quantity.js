import React, {Component} from 'react';
import {Icon} from 'react-materialize';
import {connect} from 'react-redux';
import {setProductQty} from '../../store/actions/index';
import classes from './Quantity.css';

class Quantity extends Component {
    state = {
        quantity: ''
    }
    componentDidMount() {
        this.setState({quantity: this.props.quantity})
    }

    removeQtyHandler = () => {
        let quantity = this.state.quantity;
        if(quantity === 1) {
            window.Materialize.toast("Cannot decrease quantity further", 3000);
        } else {
            quantity--;
            this.setState({quantity});
            this.props.setQty(this.props.fbKey, quantity);
        }
    }

    addQtyHandler = () => {
        let quantity = this.state.quantity;
        if(quantity === 20) {
            window.Materialize.toast("Cannot increase quantity further", 3000);
        } else {
            quantity++;
            this.setState({quantity});
            this.props.setQty(this.props.fbKey, quantity);
        }
    }

    render () {
        return (
            <div className={classes.container}>
                <span onClick={this.removeQtyHandler} className={classes.iconContainer}>
                    <Icon className={classes.icon}>remove_circle_outline</Icon>
                </span>
                <span className={classes.qty}>{this.state.quantity}</span>
                <span onClick={this.addQtyHandler} className={classes.iconContainer}>
                    <Icon className={classes.icon}>add_circle_outline</Icon>
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setQty: (key, qty) => dispatch(setProductQty(key, qty))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quantity);