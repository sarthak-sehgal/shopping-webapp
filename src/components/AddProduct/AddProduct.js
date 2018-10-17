import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AddProduct.css';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../serverConfig';
import { Preloader, Input, Button } from 'react-materialize';
import { storage } from '../../firebaseConfig';
import { addCategory } from '../../store/actions/index';

class AddProduct extends Component {
    state = {
        loading: true,
        isAdmin: false,
        file: undefined,
        selectedCategory: null,
        newCatName: '',
        newCatStatus: null
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false, isAdmin: this.props.isAdmin }) }, 1000);
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

    categoryChangeHandler = (e) => {
        if(e.target.value !== 'select')
            this.setState({ selectedCategory: e.target.value, newCatStatus: null, newCatName: '' });
        console.log(e.target.value);
    }

    newCategoryHandler = () => {
        if (this.state.newCatName.trim()) {
            this.props.addCategory(this.state.newCatName)
                .then(result => this.setState({newCatStatus: result}))
                .catch(err => this.setState({newCatStatus: err}))
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

        let addCategory = null;
        if (this.state.selectedCategory === 'addCategory') {
            addCategory = (
                <div>
                    <Input placeholder="" label="Category Name" value={this.state.newCatName} onChange={(e) => this.setState({ newCatName: e.target.value })} />
                    <Button waves="light" onClick={this.newCategoryHandler}>Add</Button>
                </div>
            )
        }

        let categories = null;
        if(this.props.categories) {
            categories = this.props.categories.map((category, index) => {
                return <option value={category} key={index}>{category}</option>
            })
        }

        return (
            <div className={classes.container}>
                <h3>Add a product</h3>
                <img id="myimg"></img>
                <Input placeholder="" label="Name" />
                <span>{this.state.newCatStatus}</span>
                <Input type='select' label="Category" onChange={this.categoryChangeHandler}>
                    <option value='select' selected={true}>Select</option>
                    {categories}
                    <option value='addCategory'>New category</option>
                </Input>
                {addCategory}
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
        userLoading: state.ui.userLoading,
        categories: state.products.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategory: (name) => dispatch(addCategory(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);