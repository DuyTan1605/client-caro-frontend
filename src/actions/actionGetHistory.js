import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionGetHistory(status, historyInfo) {
    return {
        type: ActionType.GET_HISTORY,
        status, 
        historyInfo
    };
}

export default function fetchHistoryInfo(token) {

    return dispatch => {
  
        dispatch(actionGetHistory('REQUEST'));

        var bearerToken = 'Bearer ' + token;

        return fetch(config['server-domain'] + 'histories', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionGetHistory('FAILED'));
            }
        )
        .then(json => {
            dispatch(actionGetHistory('SUCCESS', json));
        })
        .catch(err => {
            dispatch(actionGetHistory('FAILED'));
        })
    }
  }