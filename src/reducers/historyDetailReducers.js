import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGetHistory(state = Config.initialState, action) {
    switch (action.type) {
        
        case ActionType.GET_HISTORY_DETAIL:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    historyDetail: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    historyDetail: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    historyDetail: action.historyDetail
                }
            }
            else {
                return state;
            }
            
        case ActionType.REFRESH:
            return Config.initialState;

        default:
        {
            //console.log(state)
            return state;
        }
    }
}