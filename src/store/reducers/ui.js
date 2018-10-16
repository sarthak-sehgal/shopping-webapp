import {AUTH_START_LOADING, AUTH_STOP_LOADING, USER_START_LOADING, USER_STOP_LOADING} from '../actions/actionTypes';

const initialState = {
    authLoading: false,
    userLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
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
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;