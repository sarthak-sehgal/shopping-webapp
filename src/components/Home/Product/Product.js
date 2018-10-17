import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../firebaseConfig';

class Product extends Component {
    componentDidMount() {
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
    render() {
        return (
            <div>
                <img id="myimg"></img>
                {JSON.stringify(this.props.info)}
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