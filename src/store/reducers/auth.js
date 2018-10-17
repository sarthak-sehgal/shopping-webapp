import { STORE_USERS, STORE_USER } from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    users: {},
    user: null,
    isAdmin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERS:
            return {
                ...state,
                users: action.users
            }
        case STORE_USER:
            let isAdmin = false;
            if(action.user) {
                if(action.user.uphone === '+911234567890')
                    isAdmin = true;
            }
            return {
                ...state,
                user: action.user,
                isAdmin
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;