import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionGetBoard(status, boardInfo) {
    return {
        type: ActionType.GET_BOARD,
        status, 
        boardInfo
    };
}

export default function fetchBoard(token) {

    return dispatch => {
  
        dispatch(actionGetBoard('REQUEST'));

        var bearerToken = 'Bearer ' + token;

        return fetch(config['server-domain'] + 'boards', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionGetBoard('FAILED'));
            }
        )
        .then(json => {
            dispatch(actionGetBoard('SUCCESS', json));
        })
        .catch(err => {
            dispatch(actionGetBoard('FAILED'));
        })
    }
  }