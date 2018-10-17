import { STORE_CART, ADD_TO_CART } from "./actionTypes";

export const getCart = () => {
    return dispatch => {
        let cart = localStorage.getItem('sn-cart');
        if(cart) {
            console.log("Cart found in storage");
            dispatch(storeCart(JSON.parse(cart)))
        } else {
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