import {STORE_ORDERS, STORE_NEW_ORDER} from '../actions/actionTypes';

const initialState = {
    orders: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STORE_ORDERS: {
            let orders = action.orders;
            if(!orders)
                orders = [];
            return {
                ...state,
                orders
            }
        }
        case STORE_NEW_ORDER: {
            let orders = [...state.orders];
            let newOrder = action.order;
            newOrder.time = action.time;
            orders.push(newOrder);
            return {
                ...state,
                orders
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default reducer;