import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGetRanking(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.GET_RANKING:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    rankingInfo: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    rankingInfo: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    rankingInfo: action.rankingInfo
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