import { uiStartLoading , uiStopLoading} from "./index";
import db from '../../firebaseConfig';
import {STORE_ADDRESSES, STORE_NEW_ADDRESS, DELETE_ADDRESS_FROM_STORE} from './actionTypes';

export const getAddresses = () => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        let uid = getState().auth.user.uid;
        db.ref('/users/' + uid + '/uaddresses/').once('value')
            .then((snap) => {
                dispatch(uiStopLoading());
                var snapData = snap.val();
                dispatch(storeAddresses(snapData));
            })
            .catch(err => {
                dispatch(uiStopLoading());
                dispatch(storeAddresses([]));
                console.log(err);
            });
    }
}

export const storeAddresses = (addresses) => {
    return {
        type: STORE_ADDRESSES,
        addresses
    }
}

export const addAddress = (address) => {
    return (dispatch, getState) => {
        let uid = getState().auth.user.uid;
        let addresses = [...getState().addresses.addresses];
        addresses.push(address);
        db.ref('/users/' + uid + '/uaddresses/').set(addresses);
        dispatch(storeNewAddress(address));
    }
}

export const storeNewAddress = (address) => {
    return {
        type: STORE_NEW_ADDRESS,
        address
    }
}

export const deleteAddress = (indexx) => {
    return (dispatch, getState) => {
        let uid = getState().auth.user.uid;
        let addresses = [...getState().addresses.addresses];
        addresses = addresses.filter((address, index) => index!==indexx)
        db.ref('/users/' + uid + '/uaddresses/').set(addresses);
        dispatch(deleteAddressFromStore(indexx));
    }
}

export const deleteAddressFromStore = (index) => {
    return {
        type: DELETE_ADDRESS_FROM_STORE,
        index
    }
}