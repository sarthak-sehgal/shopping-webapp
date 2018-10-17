import { STORE_CART, ADD_TO_CART, REMOVE_ITEM_FROM_CART, SET_PRODUCT_QTY } from "./actionTypes";
import {cartStartLoading, cartStopLoading} from './index';

export const getCart = () => {
    return dispatch => {
        dispatch(cartStartLoading());
        let cart = localStorage.getItem('sn-cart');
        if(cart) {
            dispatch(cartStopLoading());
            console.log("Cart found in storage");
            dispatch(storeCart(JSON.parse(cart)))
        } else {
            dispatch(cartStopLoading());
            console.log("Cart not found in storage");
            dispatch(storeCart([]))
        }
    }
}

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item
    }
}

export const storeCart = (cart) => {
    return {
        type: STORE_CART,
        cart
    }

}

export const doesExistInCart = (key) => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            let cart = getState().cart.cart;
            let exists = false;
            cart.map(item => {
                if(item.key === key)
                    exists = true;
            })
            if(exists)
                resolve("exists");
            else
                resolve("notExists");
        })
    }
}

export const removeItemFromCart = (key) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        key
    }
}

export const setProductQty = (key, qty) => {
    console.log("set product qty called", key, qty)
    return {
        type: SET_PRODUCT_QTY,
        key,
        qty
    }
}