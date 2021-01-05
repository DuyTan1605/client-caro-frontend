import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionAddHistory(status, message) {
    return {
        type: ActionType.ADD_HISTORY,
        status,
        message
    };
}

export default function fetchAddHistory(board,winner,loser,data,chat,type) {

    
    return dispatch => {
        console.log(board,winner,loser,data,chat);
        const token = localStorage.getItem('token');
        const bearerToken = 'Bearer ' + token;

        dispatch(actionAddHistory('REQUEST', 'Xin vui lòng đợi...'));

        return fetch(config['server-domain'] + 'histories/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            },
            body: JSON.stringify({
               board,
               winner,
               loser,
               data,
               chat,
               type
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionAddHistory('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
            }
        )
        .then(json => {
            console.log(JSON.stringify(json))
            dispatch(actionAddHistory('SUCCESS', json));
        })
        .catch(err => {
            dispatch(actionAddHistory('FAILED', err));
        })
    }
  }

