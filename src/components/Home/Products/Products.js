import React, {Component} from 'react';
import { connect } from 'react-redux';
import Product from '../Product/Product';
import classes from './Products.css';

class Products extends Component {
    render() {
        let products = <span>No products found</span>;
        if(this.props.products && this.props.products[this.props.category]) {
            products = Object.keys(this.props.products[this.props.category]).map(key => {
                return <Product info={this.props.products[this.props.category][key]} fbKey={key} />
            })
        }
        return (
            <div className={classes.container}>
                {products}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);