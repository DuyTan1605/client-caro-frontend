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

export default function fetchChangeInfo(name,email,avatar) {

    return dispatch => {

        const token = localStorage.getItem('token');
        const bearerToken = 'Bearer ' + token;

        dispatch(actionChangeInfo('REQUEST', 'Xin vui lòng đợi...'));

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
                avatar
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionChangeInfo('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
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

