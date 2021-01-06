import ActionType from '../constants/actionTypes';

export default function actionEndGame(message) {
    return {
        type: ActionType.END_GAME,
        message
    };
}