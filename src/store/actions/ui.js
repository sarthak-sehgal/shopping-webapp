import { AUTH_STOP_LOADING, AUTH_START_LOADING, USER_START_LOADING, USER_STOP_LOADING } from './actionTypes';

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