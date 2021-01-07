import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGetHistory(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.GET_HISTORY:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    historyInfo: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    historyInfo: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    historyInfo: action.historyInfo
                }
            }
            else {
                return state;
            }

        default:
            {
                //console.log(state)
                return state;
             }
    }
}