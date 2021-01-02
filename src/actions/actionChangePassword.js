import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionChangePassword(status, message) {
    return {
        type: ActionType.CHANGE_PASSWORD,
        status,
        message
    };
}


export default function fetchChangePassword(oldPassword,newPassword) {

    return dispatch => {
    
        const token = localStorage.getItem('token');
        const bearerToken = 'Bearer ' + token;
    
        dispatch(actionChangePassword('REQUEST', 'Xin vui lòng đợi...'));
    
        return fetch(config['server-domain'] + 'users/changePasswordFromProfile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionChangePassword('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
            }
        )
        .then(json => {
            console.log(JSON.stringify(json))
            dispatch(actionChangePassword('SUCCESS', json.message));
        })
        .catch(err => {
            dispatch(actionChangePassword('FAILED', err));
        })
    }
    }