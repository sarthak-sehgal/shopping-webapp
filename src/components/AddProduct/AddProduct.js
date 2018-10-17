import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AddProduct.css';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../serverConfig';
import { Preloader, Input, Button } from 'react-materialize';
import { storage } from '../../firebaseConfig';

class AddProduct extends Component {
    state = {
        loading: true,
        isAdmin: false,
        file: undefined
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false, isAdmin: this.props.isAdmin }) }, 500);
        let imageRef = storage.ref('test.jpg');
        imageRef.getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
        }).catch(function (error) {
            // Handle any errors
        });
    }

    handleFile = (file) => {
        this.setState({ file: document.getElementById("file-handler").files[0] });
    }

    handleAddProduct = () => {
        let file = this.state.file;
        let storageRef = storage.ref('test.jpg');
        if (file && file !== undefined) {
            storageRef.put(file).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
            });
        } else {
            console.log('Please select file');
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className={classes.container}>
                    <Preloader size="small" />
                </div>
            )
        }
        if (!this.state.isAdmin) {
            return <Redirect
                to={{
                    pathname: BASE_URL + "/",
                }}
            />
        }
        return (
            <div className={classes.container}>
                <h3>Add a product</h3>
                <img id="myimg"></img>
                <Input placeholder="" label="Name" />
                <Input type='select' label="Category">
                    <option value='1'>Option 1</option>
                    <option value='2'>Option 2</option>
                    <option value='3'>Option 3</option>
                </Input>
                <Input placeholder="" label="Price" />
                <Input placeholder="" label="Description" />
                <Input accept="image/*" type="file" label="Image" id="file-handler" onChange={this.handleFile} />
                <Button waves='light' onClick={this.handleAddProduct}>Add Product</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAdmin: state.auth.isAdmin,
        userLoading: state.ui.userLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);