


import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_REGISTER_SUCCESS, AUTH_LOGIN_REQUEST, AUTH_LOGIN_FAILURE, AUTH_REGISTER_REQUEST, AUTH_REGISTER_FAILURE, AUTH_RESET_STATE, ADVERTS_SUCCESS, ADVERTS_REQUEST, ADVERT_CREATION_REQUEST, ADVERT_CREATION_SUCCESS, ADVERT_CREATION_FAILURE } from "./types";
import { combineReducers } from 'redux';



const initialState = {
    auth: false,
    ui: {
        loading: false,
        error: null,
    },

    adverts: [],

}


export const auth = (state = initialState.auth, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
        case AUTH_REGISTER_SUCCESS:
            return true;

        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
            return false;
        case AUTH_LOGOUT:
            return false;
        default:
            return state;
    }
}

export const adverts = (state = initialState.adverts, action) => {
    switch (action.type) {
        case ADVERTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export const ui = (state = initialState.ui, action) => {
    if (action.error) {
        return {...state, loading:false, error:action.payload }
    }
    switch (action.type) {
        case AUTH_RESET_STATE:
            return {
                loading: false,
                error: null,
            };

        case AUTH_LOGIN_REQUEST:
        case AUTH_REGISTER_REQUEST:
        case ADVERT_CREATION_REQUEST:
            return {
                loading: true,
                error: null,
            };

        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
        case ADVERT_CREATION_SUCCESS:
            return {
                loading: false,
                error: null,
            };
        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
        case ADVERT_CREATION_FAILURE:
            return {
                loading: false,
                error: true,
            };
        case ADVERTS_REQUEST:
            return { ...state, loading: true }
        case ADVERTS_SUCCESS:
            return { ...state, loading: false }
        default:
            return state;

    }
}

const reducer = combineReducers({
    auth,
    ui,
    adverts
})

export default reducer;