import db, { auth } from '../../firebaseConfig';
import { authStartLoading, authStopLoading, userStartLoading, userStopLoading } from './index';
import { STORE_USERS, STORE_USER } from './actionTypes';

export const getUser = () => {
    return (dispatch, getState) => {
        dispatch(userStartLoading());
        let user = getState().auth.user;
        if(user) {
            dispatch(userStopLoading());
            // lite
        } else {
            let userFromStorage = localStorage.getItem('sn-user');
            if(userFromStorage) {
                userFromStorage = JSON.parse(userFromStorage);
                dispatch(storeUser(userFromStorage));
            }
            dispatch(userStopLoading());
        }
    }
}

export const signIn = (phoneNumber, appVerifier, isNewUser) => {
    return dispatch => {
        dispatch(authStartLoading());
        return new Promise((resolve, reject) => {
            if (isNewUser) {
                auth.signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then(function (confirmationResult) {
                        dispatch(authStopLoading());
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;
                        console.log(phoneNumber);
                        console.log("OTP sent to new user");
                        resolve("otpNeeded");
                        console.log(confirmationResult);
                    }).catch(function (error) {
                        dispatch(authStopLoading());

                        // Error; SMS not sent
                        // that.setState({ isError: true });
                        if (error.code === 'auth/invalid-phone-number')
                            reject('Please enter a valid phone number');
                        else
                            reject('Some error ocurred. Please try again.');

                        console.log(error);
                    });
            } else {
                dispatch(doesUserExists(phoneNumber))
                    .then(result => {
                        if (!result) {
                            dispatch(authStopLoading());
                            resolve("phoneNotExists");
                        } else {
                            auth.signInWithPhoneNumber(phoneNumber, appVerifier)
                                .then(function (confirmationResult) {
                                    dispatch(authStopLoading());
                                    // SMS sent. Prompt user to type the code from the message, then sign the
                                    // user in with confirmationResult.confirm(code).
                                    window.confirmationResult = confirmationResult;
                                    resolve("otpNeeded");
                                    console.log(confirmationResult);
                                }).catch(function (error) {
                                    dispatch(authStopLoading());

                                    // Error; SMS not sent
                                    // that.setState({ isError: true });
                                    if (error.code === 'auth/invalid-phone-number')
                                        reject('Please enter a valid phone number');
                                    else
                                        reject('Some error ocurred. Please try again.');

                                    console.log(error);
                                });
                        }
                    });
            }
        })
    }
}

export const getUsers = () => {
    return dispatch => {
        db.ref('/users/').once('value')
            .then((snap) => {
                var snapData = snap.val();
                console.log(snapData);
                dispatch(storeUsers(snapData));
            })
            .catch(err => {
                dispatch(storeUsers({ "Error": "Error" }));
                console.log(err)
            });
    }
}

export const storeUsers = (users) => {
    return {
        type: STORE_USERS,
        users
    }
}

export const doesUserExists = (phone) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let users = getState().auth.users;
            if (users) {
                for (let user in users) {
                    console.log(users[user]);
                    if (users[user].uphone === phone) {
                        resolve(true);
                    }
                }
            } else {
                resolve(false);
            }
            resolve(false);
        })
    }
}

export const setNewUser = (uid, phone, name, email) => {
    return (dispatch, getState) => {
        let users = getState().auth.users;
        let obj = {
            uid,
            uphone: phone,
            uname: name,
            uemail: email
        };
        db.ref('users/' + uid).set(obj);

        users[uid] = obj;
        dispatch(storeUsers(users));
        dispatch(setUser(obj.uid));
    }
}

export const setUser = (uid) => {
    return dispatch => {
        db.ref('/users/' + uid).once('value')
            .then((snap) => {
                var snapData = snap.val();
                dispatch(storeUser(snapData));
                localStorage.setItem('sn-user', JSON.stringify(snapData));
            })
            .catch(err => {
                dispatch(storeUser(null));
                console.log(err);
            });
    }
}

export const storeUser = (user) => {
    return {
        type: STORE_USER,
        user
    }
}

export const signOut = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(storeUser(null));
        dispatch(getUsers());
    }
}