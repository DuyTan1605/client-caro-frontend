import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGetInfo(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.GET_INFO:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    userInfo: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    userInfo: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    userInfo: action.userInfo
                }
            }
            else {
                return state;
            }

        case ActionType.CHANGE_INFO:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    message: action.message
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    message: action.message
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    message: action.message,
                    userInfo: action.userInfo
                }
            }
            else {
                return state;
            }

        case ActionType.CHANGE_PASSWORD:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    message: action.message
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    message: action.message
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    message: action.message
                }
            }
            else {
                return state;
            }

        case ActionType.REFRESH:
            return Config.initialState;
        
        default:
            return state;
    }
}