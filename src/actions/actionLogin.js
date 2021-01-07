import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionLogin(status, message) {
    return {
        type: ActionType.LOGIN,
        status,
        message
    };
}

export default function fetchLogin(username, password) {

    return dispatch => {
  
        dispatch(actionLogin('REQUEST', 'Please waiting for a moment...'));

        return fetch(config['server-domain'] + 'users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionLogin('FAILED', 'Error ! Please try again'));
            }
        )
        .then(json => {
            if (json.token) {

                // Redirect immediately, no need to dispatch SUCCESS action4
                console.log(json)
              
                localStorage.setItem('token', json.token);
                localStorage.setItem('user',JSON.stringify(json.user));
                window.location.href = '/home';
            }
            else {
                dispatch(actionLogin('FAILED', json.message));
            }
        })
        .catch(err => {
            dispatch(actionLogin('FAILED', 'Error ! Please try again'));
        })
    }
  }

  