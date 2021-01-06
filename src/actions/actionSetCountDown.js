import ActionType from '../constants/actionTypes';

export default function actionCountDown(message) {
    return {
        type: ActionType.SET_COUNTDOWN,
        message
    };
}