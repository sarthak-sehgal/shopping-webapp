import db from '../../firebaseConfig';
import { uiStartLoading, uiStopLoading, storeCart } from './index';
import { STORE_ORDERS, STORE_NEW_ORDER } from './actionTypes';

export const getOrders = () => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        return new Promise(resolve => {
            let user = getState().auth.user;
            if (user) {
                let uid = user.uid;
                db.ref('/users/' + uid + '/uorders/').once('value')
                    .then((snap) => {
                        dispatch(uiStopLoading());
                        var snapData = snap.val();
                        if (!snapData)
                            snapData = [];
                        dispatch(storeOrders(snapData));
                        resolve(snapData)
                    })
                    .catch(err => {
                        dispatch(uiStopLoading());
                        dispatch(storeOrders([]));
                        console.log(err);
                        resolve("error");
                    });
            } else {
                resolve("error");
            }
        })
    }
}

export const storeOrders = (orders) => {
    return {
        type: STORE_ORDERS,
        orders
    }
}

export const placeOrder = (order) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        return new Promise(resolve => {
            let user = getState().auth.user;
            if (user) {
                let uid = user.uid;
                dispatch(getOrders())
                    .then(result => {
                        if (result === 'error') {
                            resolve("error");
                        } else {
                            let orders = result;
                            let date = new Date();
                            order.time = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
                            orders.push(order);
                            db.ref('/users/' + uid + '/uorders/').set(orders);
                            dispatch(storeNewOrder(order, date));
                            localStorage.removeItem('sn-cart');
                            dispatch(storeCart([]));
                            dispatch(uiStopLoading());
                            resolve("order placed");
                        }
                    })
            }
        })
    }
}

export const storeNewOrder = (order, time) => {
    return {
        type: STORE_NEW_ORDER,
        order,
        time
    }
}