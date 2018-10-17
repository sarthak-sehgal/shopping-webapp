import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../firebaseConfig';
import classes from './Product.css';
import { Icon } from 'react-materialize';
import { addToCart, doesExistInCart } from '../../../store/actions/index';

class Product extends Component {
    componentDidMount() {
        if (this.props.info.isImg) {
            let imageRef = storage.ref(this.props.info.category + '/' + this.props.info.name);
            imageRef.getDownloadURL().then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // Or inserted into an <img> element:
                var img = document.getElementById('myimg');
                img.src = url;
            }).catch(function (error) {
                // Handle any errors
            });
        }
    }

    addProductHandler = () => {
        this.props.doesExistInCart(this.props.fbKey)
        .then(result => {
            if(result === 'exists') {
                window.Materialize.toast('Product exists in cart!', 3000);
            } else if(result==='notExists') {
                let item = {...this.props.info};
                item.key = this.props.fbKey;
                item.qty = 1;
                this.props.addToCart(item);
                window.Materialize.toast('Added to cart!', 3000);
            } else {
                window.Materialize.toast('Error occurred!', 3000);
            }
        })    
    }

    render() {
        return (
            <div className={classes.container}>
                <img id="myimg" className={classes.image}></img>
                <div className={classes.content}>
                    <span className={classes.name}>{this.props.info.name}</span>
                    <span className={classes.price}>&#8377; {this.props.info.price}</span>
                    <span className={classes.description}>{this.props.info.description}</span>
                    <div className={classes.addToCart} onClick={this.addProductHandler}>
                        <Icon>add_shopping_cart</Icon>
                        <span className={classes.add}>ADD</span>
                    </div>
                </div>
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
        addToCart: (item) => dispatch(addToCart(item)),
        doesExistInCart: (key) => dispatch(doesExistInCart(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);