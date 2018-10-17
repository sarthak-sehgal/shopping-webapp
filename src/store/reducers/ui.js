import { AUTH_START_LOADING, AUTH_STOP_LOADING, USER_START_LOADING, USER_STOP_LOADING, UI_START_LOADING, UI_STOP_LOADING, PRODUCTS_START_LOADING, PRODUCTS_STOP_LOADING, CART_START_LOADING, CART_STOP_LOADING } from '../actions/actionTypes';

const initialState = {
    authLoading: false,
    userLoading: false,
    uiLoading: false,
    productsLoading: false,
    cartLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START_LOADING:
            return {
                ...state,
                authLoading: true
            }
        case AUTH_STOP_LOADING: {
            return {
                ...state,
                authLoading: false
            }
        }
        case USER_START_LOADING:
            return {
                ...state,
                userLoading: true
            }
        case USER_STOP_LOADING: {
            return {
                ...state,
                userLoading: false
            }
        }
        case UI_START_LOADING:
            return {
                ...state,
                uiLoading: true
            }
        case UI_STOP_LOADING: {
            return {
                ...state,
                uiLoading: false
            }
        }
        case PRODUCTS_START_LOADING:
            return {
                ...state,
                productsLoading: true
            }
        case PRODUCTS_STOP_LOADING: {
            return {
                ...state,
                productsLoading: false
            }
        }
        case CART_START_LOADING:
            return {
                ...state,
                cartLoading: true
            }
        case CART_STOP_LOADING: {
            return {
                ...state,
                cartLoading: false
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;