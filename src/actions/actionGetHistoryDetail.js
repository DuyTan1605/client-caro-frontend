import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionGetHistoryDetail(status, historyDetail) {
    return {
        type: ActionType.GET_HISTORY_DETAIL,
        status, 
        historyDetail
    };
}

export default function fetchHistoryDetail(token,id) {

    return dispatch => {
  
        dispatch(actionGetHistoryDetail('REQUEST'));

        var bearerToken = 'Bearer ' + token;

        return fetch(config['server-domain'] + `histories/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionGetHistoryDetail('FAILED'));
            }
        )
        .then(json => {
            dispatch(actionGetHistoryDetail('SUCCESS', json));
        })
        .catch(err => {
            dispatch(actionGetHistoryDetail('FAILED'));
        })
    }
  }