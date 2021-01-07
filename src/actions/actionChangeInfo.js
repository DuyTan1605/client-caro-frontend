import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionChangeInfo(status, message) {
    return {
        type: ActionType.CHANGE_INFO,
        status,
        message
    };
}

export default function fetchChangeInfo(name,email,avatar,type) {

    return dispatch => {

        const token = localStorage.getItem('token');
        const bearerToken = 'Bearer ' + token;

        dispatch(actionChangeInfo('REQUEST', 'Please waiting for a moment...'));

        return fetch(config['server-domain'] + 'users/changeinfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            },
            body: JSON.stringify({
                name,
                email,
                avatar,
                type
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionChangeInfo('FAILED', 'Error ! Please try again'));
            }
        )
        .then(json => {
            console.log(JSON.stringify(json))
            let newUserInfo = json.userInfo ? localStorage.setItem('user',JSON.stringify(json.userInfo)):JSON.parse(localStorage.getItem('user'));
            if(json.token)
                localStorage.setItem('token',json.token);
            dispatch(actionChangeInfo('SUCCESS', json.message,newUserInfo));
        })
        .catch(err => {
            dispatch(actionChangeInfo('FAILED', err));
        })
    }
  }

