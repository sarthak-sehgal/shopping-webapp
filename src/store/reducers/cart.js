import { STORE_CART, ADD_TO_CART, REMOVE_ITEM_FROM_CART, SET_PRODUCT_QTY } from "../actions/actionTypes";

const initialState = {
    cart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_CART:
            return {
                ...state,
                cart: action.cart
            }
        case ADD_TO_CART: {
            let cart = [...state.cart];
            cart.push(action.item);
            localStorage.removeItem('sn-cart');
            localStorage.setItem('sn-cart', JSON.stringify(cart));
            return {
                ...state,
                cart
            }
        }
        case REMOVE_ITEM_FROM_CART: {
            let cart = [...state.cart];
            cart = cart.filter(item => item.key !== action.key);
            localStorage.removeItem('sn-cart');
            localStorage.setItem('sn-cart', JSON.stringify(cart));
            return {
                ...state,
                cart
            }
        }
        case SET_PRODUCT_QTY: {
            let cart = [...state.cart];
            cart.map(item => {
                if(item.key === action.key) {
                    item.qty = action.qty;
                }
            })
            localStorage.removeItem('sn-cart');
            localStorage.setItem('sn-cart', JSON.stringify(cart));
            return {
                ...state,
                cart
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default reducer;