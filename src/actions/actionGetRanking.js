import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionGetRanking(status, rankingInfo) {
    return {
        type: ActionType.GET_RANKING,
        status, 
        rankingInfo
    };
}

export default function fetchRankingInfo(token) {

    return dispatch => {
  
        dispatch(actionGetRanking('REQUEST'));

        var bearerToken = 'Bearer ' + token;

        return fetch(config['server-domain'] + 'ranking', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionGetRanking('FAILED'));
            }
        )
        .then(json => {
            dispatch(actionGetRanking('SUCCESS', json));
        })
        .catch(err => {
            dispatch(actionGetRanking('FAILED'));
        })
    }
  }