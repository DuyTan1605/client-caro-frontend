import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionChangeInfo(status, message,userInfo) {
    return {
        type: ActionType.CHANGE_INFO,
        status,
        message,
        userInfo
    };
}

export default function fetchChangeInfo(name,email,avatar,type) {
  //console.log(String(avatar));
    return dispatch => {

        const token = localStorage.getItem('token');
        const bearerToken = 'Bearer ' + token;
       
        dispatch(actionChangeInfo('REQUEST', 'Please waiting for a moment...'));

        return fetch(config['server-domain'] + 'users/changeinfo', {
            method: 'POST',
            mode:'cors',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
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
                dispatch(actionChangeInfo('FAILED', 'Error ! Please try again',JSON.parse(localStorage.getItem('user'))));
            }
        )
        .then(json => {
           console.log(json)
            let newUserInfo = json.userInfo ? localStorage.setItem('user',JSON.stringify(json.userInfo)):JSON.parse(localStorage.getItem('user'));
            if(json.token)
            {
                localStorage.setItem('token',json.token);
            }
            dispatch(actionChangeInfo('SUCCESS', json.message,newUserInfo));
        })
        .catch(err => {
            console.log(err);
            dispatch(actionChangeInfo('FAILED', err.message,JSON.parse(localStorage.getItem('user'))));
        })
    }
  }

