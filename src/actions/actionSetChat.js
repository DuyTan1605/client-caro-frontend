import ActionType from '../constants/actionTypes';

export default function actionSetChat(message) {
    return {
        type: ActionType.SET_CHAT,
        message
    };
}