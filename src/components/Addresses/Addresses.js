import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAddresses, addAddress, deleteAddress } from '../../store/actions/index';
import classes from './Addresses.css';
import { Preloader, Button, Input, CardPanel, Icon} from 'react-materialize';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../serverConfig';

class Addresses extends Component {
    state = {
        loading: true,
        user: null,
        newAddressWindow: false,
        houseNo: '',
        locality: '',
        pinCode: '',
        city: '',
        state: '',
        Icon
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false, user: this.props.user }); this.props.getAddresses(); }, 500);
    }

    addAddressHandler = () => {
        console.log(this.state.houseNo.trim(), this.state.locality.trim(), parseInt(this.state.pinCode.trim()), this.state.city.trim(), this.state.state.trim());
        if (this.state.houseNo.trim() && this.state.locality.trim() && parseInt(this.state.pinCode.trim()) && this.state.city.trim() && this.state.state.trim()) {
            let object = {
                houseNo: this.state.houseNo,
                locality: this.state.locality,
                pinCode: parseInt(this.state.pinCode),
                city: this.state.city,
                state: this.state.state
            }
            this.props.addAddress(object);
            this.setState({
                newAddressWindow: false,
                houseNo: '',
                locality: '',
                pinCode: '',
                city: '',
                state: ''
            })
            window.Materialize.toast('Address added!', 3000);
        } else {
            window.Materialize.toast('Problem with one or more fields', 3000);
        }
    }

    inputHandler = (e, value) => {
        this.setState({ [value]: e.target.value })
    }

    deleteAddressHandler = (index) => {
        this.props.deleteAddress(index);
        window.Materialize.toast("Deleted address", 3000);
    }

    render() {
        if (this.state.loading || this.props.uiLoading) {
            return (
                <div className={classes.container}>
                    <Preloader />
                </div>
            )
        }

        if (!this.state.loading && !this.state.user) {
            return <Redirect
                to={{
                    pathname: BASE_URL + "/",
                }}
            />
        }

        let addresses = <span>No addresses found</span>
        if (this.props.addresses.length > 0) {
            addresses = this.props.addresses.map((address, index) => {
                return (
                    <CardPanel className={`white lighten-4 black-text ${classes.addCard}`}>
                        <span className={classes.title}>{address.city}, {address.state}</span>
                        <span className={classes.subtitle}>{address.houseNo}, {address.locality}, {address.city}, {address.state}</span>
                        <span className={classes.pinCode}>Pin code: {address.pinCode}</span>
                        <span className={classes.removeBtn} onClick={() => this.deleteAddressHandler(index)}><Icon>close</Icon></span>
                    </CardPanel>
                )
            })
        }

        if (this.state.newAddressWindow) {
            addresses = (
                <div className={classes.container}>
                    <Input placeholder="" label="House No." onChange={(e) => this.inputHandler(e, "houseNo")} />
                    <Input placeholder="" label="Locality" onChange={(e) => this.inputHandler(e, "locality")} />
                    <Input placeholder="" label="Pin Code" onChange={(e) => this.inputHandler(e, "pinCode")} />
                    <Input placeholder="" label="City" onChange={(e) => this.inputHandler(e, "city")} />
                    <Input placeholder="" label="State" onChange={(e) => this.inputHandler(e, "state")} />
                    <Button onClick={this.addAddressHandler}>Add Address</Button>
                </div>
            )
        }

        let button = <Button floating large className='red' waves='light' icon='add' className={classes.addBtn} onClick={() => this.setState({ newAddressWindow: true })} />;
        if (this.state.newAddressWindow) {
            button = <Button floating large className='red' waves='light' icon='close' className={classes.addBtn} onClick={() => this.setState({ newAddressWindow: false })} />;
        }

        return (
            <div className={classes.container}>
                {addresses}
                {button}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        uiLoading: state.ui.uiLoading,
        addresses: state.addresses.addresses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAddresses: () => dispatch(getAddresses()),
        addAddress: (address) => dispatch(addAddress(address)),
        deleteAddress: (index) => dispatch(deleteAddress(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);