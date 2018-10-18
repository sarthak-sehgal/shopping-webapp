import { STORE_ADDRESSES, STORE_NEW_ADDRESS, DELETE_ADDRESS_FROM_STORE } from '../actions/actionTypes';

const initialState = {
    addresses: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STORE_ADDRESSES: {
            let addresses = action.addresses;
            if(!action.addresses)
                addresses = []
            return {
                ...state,
                addresses
            }
        }
        case STORE_NEW_ADDRESS: {
            let addresses = [...state.addresses];
            addresses.push(action.address);
            return {
                ...state,
                addresses
            }
        }
        case DELETE_ADDRESS_FROM_STORE: {
            let addresses = [...state.addresses];
            addresses.splice(action.index, 1);
            return {
                ...state,
                addresses
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default reducer;