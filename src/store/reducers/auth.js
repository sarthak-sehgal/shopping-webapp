import { STORE_USERS, STORE_USER } from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    users: {},
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERS:
            return {
                ...state,
                users: action.users
            }
        case STORE_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;