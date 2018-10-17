import { STORE_CART, ADD_TO_CART, REMOVE_ITEM_FROM_CART, SET_PRODUCT_QTY } from "../actions/actionTypes";

const initialState = {
    cart: [],
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_CART: {
            let total = computeTotal(action.cart);
            return {
                ...state,
                cart: action.cart,
                total
            }
        }
        case ADD_TO_CART: {
            let cart = [...state.cart];
            cart.push(action.item);
            let total = computeTotal(cart);
            localStorage.removeItem('sn-cart');
            localStorage.setItem('sn-cart', JSON.stringify(cart));
            return {
                ...state,
                cart,
                total
            }
        }
        case REMOVE_ITEM_FROM_CART: {
            let cart = [...state.cart];
            cart = cart.filter(item => item.key !== action.key);
            let total = computeTotal(cart);
            localStorage.removeItem('sn-cart');
            localStorage.setItem('sn-cart', JSON.stringify(cart));
            return {
                ...state,
                cart,
                total
            }
        }
        case SET_PRODUCT_QTY: {
            let cart = [...state.cart];
            cart.map(item => {
                if(item.key === action.key) {
                    item.qty = action.qty;
                }
            })
            let total = computeTotal(cart);
            localStorage.removeItem('sn-cart');
            localStorage.setItem('sn-cart', JSON.stringify(cart));
            return {
                ...state,
                cart,
                total
            }
        }
        default:
            return {
                ...state
            }
    }
}

const computeTotal = (cart) => {
    let total = 0;
    cart.map(item => {
        total += item.qty * item.price;
    })
    return total;
}

export default reducer;