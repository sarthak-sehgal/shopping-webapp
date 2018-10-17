import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AddProduct.css';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../serverConfig';
import { Preloader, Input, Button } from 'react-materialize';
import { storage } from '../../firebaseConfig';
import { addCategory, addProduct } from '../../store/actions/index';

class AddProduct extends Component {
    state = {
        loading: true,
        isAdmin: false,
        file: undefined,
        selectedCategory: 'select',
        newCatName: '',
        newCatStatus: null,
        productName: '',
        productPrice: '0',
        productDescription: '',
        isError: false,
        errorMsg: ''
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false, isAdmin: this.props.isAdmin }) }, 1000);
    }

    handleFile = (file) => {
        this.setState({ file: document.getElementById("file-handler").files[0] });
    }

    handleAddProduct = () => {
        this.setState({ isError: false, errorMsg: '' });
        let isCategory = false;
        let selectedCategory = '';
        if (this.state.selectedCategory !== 'select' && this.state.selectedCategory !== 'addCategory') {
            isCategory = true;
            selectedCategory = this.state.selectedCategory;
        }
        if (this.state.selectedCategory === 'addCategory' && this.state.newCatName.trim() !== '' && this.state.newCatStatus === 'added') {
            isCategory = true;
            selectedCategory = this.state.newCatName;
        }

        if (this.state.productName.trim() && parseInt(this.state.productPrice.trim()) && isCategory) {
            let file = this.state.file;
            let storageRef = storage.ref(selectedCategory + '/' + this.state.productName.trim());
            let that = this;
            if (file && file !== undefined) {
                storageRef.put(file).then(function (snapshot) {
                    console.log('Uploaded a blob or file!');
                    that.props.addProduct(that.state.productName, selectedCategory, that.state.productPrice, that.state.productDescription)
                        .then(result => { window.Materialize.toast(result, 5000) });
                });
            } else {
                this.props.addProduct(this.state.productName, selectedCategory, this.state.productPrice, this.state.productDescription).then(result => { window.Materialize.toast(result, 5000) });
            }
        } else {
            console.log(this.state.productName.trim(), parseInt(this.state.productPrice.trim()), isCategory, selectedCategory);
            this.setState({ isError: true, errorMsg: 'Error in one of the fields.' });
        }
    }

    categoryChangeHandler = (e) => {
        if (e.target.value !== 'select')
            this.setState({ selectedCategory: e.target.value, newCatStatus: null, newCatName: '' });
        console.log(e.target.value);
    }

    newCategoryHandler = () => {
        if (this.state.newCatName.trim()) {
            this.props.addCategory(this.state.newCatName)
                .then(result => this.setState({ newCatStatus: result }))
                .catch(err => this.setState({ newCatStatus: err }))
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
        if (this.props.categories) {
            categories = this.props.categories.map((category, index) => {
                return <option value={category} key={index}>{category}</option>
            })
        }

        return (
            <div className={classes.container}>
                <h3>Add a product</h3>
                {/* <img id="myimg"></img> */}
                <Input placeholder="" label="Name" onChange={(e) => this.setState({ productName: e.target.value })} />
                <span>{this.state.newCatStatus}</span>
                <Input type='select' label="Category" onChange={this.categoryChangeHandler}>
                    <option value='select' selected={true}>Select</option>
                    {categories}
                    <option value='addCategory'>New category</option>
                </Input>
                {addCategory}
                <Input placeholder="" label="Price" onChange={(e) => this.setState({ productPrice: e.target.value })} />
                <Input placeholder="" label="Description" onChange={(e) => this.setState({ productDescription: e.target.value })} />
                <Input accept="image/*" type="file" label="Image" id="file-handler" onChange={this.handleFile} />
                <Button waves='light' onClick={this.handleAddProduct}>Add Product</Button>
                {this.state.isError ? <span className={classes.errorMsg}>{this.state.errorMsg}</span> : null}
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
        addCategory: (name) => dispatch(addCategory(name)),
        addProduct: (name, category, price, description) => dispatch(addProduct(name, category, price, description))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);