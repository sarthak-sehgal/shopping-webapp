import { combineReducers } from 'redux';

import auth from './reducers/auth';
import ui from './reducers/ui';
import products from './reducers/products';
import cart from './reducers/cart';
import addresses from './reducers/addresses';
import orders from './reducers/orders';

export default combineReducers({
    auth,
    ui,
    products,
    cart,
    addresses,
    orders
})