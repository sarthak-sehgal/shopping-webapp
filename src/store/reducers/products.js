import { STORE_CATEGORIES, STORE_NEW_CATEGORY, STORE_PRODUCTS } from "../actions/actionTypes";

const initialState = {
    categories: [],
    products: {}
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
        case STORE_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;