import { STORE_CATEGORIES, STORE_NEW_CATEGORY, STORE_PRODUCTS, ADD_PRODUCT_IN_STORE } from "../actions/actionTypes";

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
        case ADD_PRODUCT_IN_STORE:
            let products = Object.assign({}, state.products);
            products[action.productObj.category][action.key] = action.productObj;
            return {
                ...state,
                products
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;