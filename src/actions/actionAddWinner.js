import ActionType from '../constants/actionTypes';

export default function actionWinner(message) {
    return {
        type: ActionType.ADD_WINNER,
        message
    };
}