import React, {Component} from 'react';
import { connect } from 'react-redux';
import Product from '../Product/Product';

class Products extends Component {
    render() {
        return (
            <div>
                {
                    Object.keys(this.props.products[this.props.category]).map(key => {
                        return <Product info={this.props.products[this.props.category][key]} />
                    })
                }
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