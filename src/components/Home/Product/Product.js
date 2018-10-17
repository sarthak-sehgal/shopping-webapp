import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../firebaseConfig';
import classes from './Product.css';
import { Icon } from 'react-materialize';

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
    render() {
        return (
            <div className={classes.container}>
                <img id="myimg" className={classes.image}></img>
                <div className={classes.content}>
                    <span className={classes.name}>{this.props.info.name}</span>
                    <span className={classes.price}>&#8377; {this.props.info.price}</span>
                    <span className={classes.description}>{this.props.info.description}</span>
                    <div className={classes.addToCart}>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);