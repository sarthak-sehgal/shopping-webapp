import { AUTH_STOP_LOADING, AUTH_START_LOADING, USER_START_LOADING, USER_STOP_LOADING, UI_START_LOADING, UI_STOP_LOADING, PRODUCTS_START_LOADING, PRODUCTS_STOP_LOADING, CART_START_LOADING, CART_STOP_LOADING } from './actionTypes';

export const authStartLoading = () => {
    return {
        type: AUTH_START_LOADING
    }
}

export const authStopLoading = () => {
    return {
        type: AUTH_STOP_LOADING
    }
}

export const userStartLoading = () => {
    return {
        type: USER_START_LOADING
    }
}

export const userStopLoading = () => {
    return {
        type: USER_STOP_LOADING
    }
}

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
}

export const productsStartLoading = () => {
    return {
        type: PRODUCTS_START_LOADING
    }
}

export const productsStopLoading = () => {
    return {
        type: PRODUCTS_STOP_LOADING
    }
}

export const cartStartLoading = () => {
    return {
        type: CART_START_LOADING
    }
}

export const cartStopLoading = () => {
    return {
        type: CART_STOP_LOADING
    }
}