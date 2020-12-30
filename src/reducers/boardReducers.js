import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGetBoard(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.GET_BOARD:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    didInvalidate: false,
                    boardInfo: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: true,
                    boardInfo: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: false,
                    boardInfo: action.boardInfo
                }
            }
            else {
                return state;
            }
        
        case ActionType.ADD_BOARD:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    didInvalidate: false,
                    boardInfo: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: true,
                    boardInfo: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: false,
                    boardInfo: action.boardInfo
                }
            }
            else {
                return state;
            }
        
        case ActionType.SET_BOARD:
            if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: false,
                    boardInfo: action.boardInfo
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