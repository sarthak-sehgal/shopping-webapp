import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AddProduct.css';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../serverConfig';
import { Preloader, Input } from 'react-materialize';

class AddProduct extends Component {
    state = {
        loading: true,
        isAdmin: false
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false, isAdmin: this.props.isAdmin }) }, 500)
    }

    handleFile = (file) => {
        console.log(document.getElementById("file-handler").files[0]);
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
                <Input placeholder="" label="Name" />
                <Input type='select' label="Category">
                    <option value='1'>Option 1</option>
                    <option value='2'>Option 2</option>
                    <option value='3'>Option 3</option>
                </Input>
                <Input placeholder="" label="Price" />
                <Input placeholder="" label="Description" />
                <Input accept="image/*" type="file" label="Image" id="file-handler" onChange={this.handleFile}/>
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