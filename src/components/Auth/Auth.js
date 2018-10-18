import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button, Preloader } from 'react-materialize';
import classes from './Auth.css';
import {BASE_URL} from '../../serverConfig';
import { signIn, setNewUser, setUser, signOut } from '../../store/actions/index';

class Auth extends Component {
    state = {
        phoneNumber: '',
        isOtpNeeded: false,
        isError: false,
        errorMsg: '',
        isLoading: false,
        otp: '',
        phoneNotExists: false
    }

    handleSignin = () => {
        var phoneNumber = '+91' + this.state.phoneNumber;
        var appVerifier = window.recaptchaVerifier;

        let isNewUser = false;
        if (this.state.phoneNotExists)
            isNewUser = true;

        this.props.signIn(phoneNumber, appVerifier, isNewUser)
            .catch(err => this.setState({ isError: true, errorMsg: err }))
            .then(result => {
                if (result === 'otpNeeded') {
                    this.setState({ isOtpNeeded: true });
                    console.log("Otp neeeded");
                } else if (result === 'phoneNotExistsOtpNeeded') {
                    this.setState({ phoneNotExists: true, isOtpNeeded: true });
                    console.log("Phone not exists");
                }
            })
    }

    handleOtp = () => {
        this.setState({ isLoading: true });

        var code = this.state.otp;

        let that = this;
        window.confirmationResult.confirm(code).then(function (result) {

            // User signed in successfully.
            window.Materialize.toast('Signed in!', 3000);
            var user = result.user;
            that.props.setUser(user.uid);
            console.log(result);
            if (that.state.phoneNotExists) {
                that.props.setNewUser(result.user.uid, '+91' + that.state.phoneNumber);
            }
            that.setState({ isLoading: false, phoneNotExists: false });
            // ...
        }).catch(function (error) {
            that.setState({ isLoading: false });

            // User couldn't sign in (bad verification code?)
            that.setState({ isError: true });

            if (error.code === 'auth/invalid-verification-code') that.setState({ isError: true, errorMsg: 'Please enter a valid OTP' });
            else that.setState({ isError: true, errorMsg: 'Some error ocurred. Please try again.' });
            console.log(error);
        });
    }

    render() {
        if (this.props.user) {
            return <Redirect
                to={{
                    pathname: BASE_URL + "/",
                }}
            />
        }

        let continueBtn = <Button waves='light' className={classes.content} onClick={this.handleSignin}>Continue</Button>;
        if (this.props.authLoading) {
            continueBtn = <div className={classes.preloader}><Preloader size='small' /></div>
        }
        if (this.state.isOtpNeeded) {
            continueBtn = (
                <div>
                    <Input label="OTP" value={this.state.otp} onChange={(e) => this.setState({ otp: e.target.value })} />
                    <Button waves='light' className={classes.content} onClick={this.handleOtp}>Submit</Button>
                </div>
            );
        }
        if (this.state.isLoading) {
            continueBtn = (
                <div>
                    <Input label="OTP" value={this.state.otp} onChange={(e) => this.setState({ otp: e.target.value })} disabled={true} />
                    <div className={classes.preloader}><Preloader size='small' /></div>;
                </div>
            )
        }

        let error = null;
        if (this.state.isError) {
            error = <span className={classes.error}>{this.state.errorMsg}</span>
        }

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    {error}
                    <Input label="Mobile No." value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                    {continueBtn}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.ui.authLoading,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (phoneNumber, appVerifier, isNewUser) => dispatch(signIn(phoneNumber, appVerifier, isNewUser)),
        setNewUser: (uid, phone) => dispatch(setNewUser(uid, phone)),
        setUser: (uid) => dispatch(setUser(uid)),
        signOut: () => dispatch(signOut())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));