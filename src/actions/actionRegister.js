import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionRegister(status, message) {
    return {
        type: ActionType.REGISTER,
        status,
        message
    };
}

export default function fetchRegister(name, password, email) {

    return dispatch => {

        dispatch(actionRegister('REQUEST', 'Please waiting for a moment...'));

        return fetch(config['server-domain'] + 'users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionRegister('FAILED', 'Error! Please try again'));
            }
        )
        .then(json => {
            dispatch(actionRegister('SUCCESS', json.message));
        })
        .catch(err => {
            dispatch(actionRegister('FAILED', 'Error ! Please try again'));
        })
    }
  }