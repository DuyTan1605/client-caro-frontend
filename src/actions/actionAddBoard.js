import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';
import { socket } from '../helpers/socket';
export function actionAddBoard(status, boardInfo) {
    return {
        type: ActionType.GET_BOARD,
        status, 
        boardInfo
    };
}

export default function addBoard(token,boardName,timeOneStep,password) {

    return dispatch => {
  
        dispatch(actionAddBoard('REQUEST'));

        var bearerToken = 'Bearer ' + token;

        return fetch(config['server-domain'] + 'boards/add', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
               boardName,
               timeOneStep,
               password
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionAddBoard('FAILED'));
            }
        )
        .then(json => {
            dispatch(actionAddBoard('SUCCESS', json));
            socket.emit("listBoard");
        })
        .catch(err => {
            dispatch(actionAddBoard('FAILED'));
        })
    }
  }