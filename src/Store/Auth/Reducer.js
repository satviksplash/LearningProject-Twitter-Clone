import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    GET_USER_PROILE_REQUEST,
    GET_USER_PROILE_SUCCESS,
    GET_USER_PROILE_FAILURE,
    LOGOUT,
    FIND_USER_BY_ID_SUCCESS,
    FOLLOW_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE,
    SEARCH_USER_REQUEST,
} from "./ActionType"

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROILE_REQUEST:
        case SEARCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                jwt: action.payload,
                // user: action.payload.user
            }

        case GET_USER_PROILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload,
                findUser: state.findUser?.id === action.payload.id ? action.payload : state.findUser,
                updateUser: true
            }

        case FIND_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                findUser: action.payload
            }
        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                findUser: action.payload
            }

        case SEARCH_USER_SUCCESS:
            return { ...state, loading: false, searchResult: action.payload, error: null };
        case LOGOUT:
            return initialState;

        case LOGIN_USER_FAILURE:
        case SEARCH_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_PROILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case 'CLEAR_AUTH_ERROR':
            return {
              ...state,
              error: null
            };

        default:
            return state;
    }
}