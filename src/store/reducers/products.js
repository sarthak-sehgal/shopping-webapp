import { STORE_CATEGORIES, STORE_NEW_CATEGORY } from "../actions/actionTypes";

const initialState = {
    categories: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STORE_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case STORE_NEW_CATEGORY:
            let categories = [];
            if(state.categories)
                categories = [...state.categories];
            categories.push(action.name);
            return {
                ...state,
                categories
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;