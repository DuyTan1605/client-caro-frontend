import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';
import { socket } from '../helpers/socket';
export function actionSetBoard(status, boardInfo) {
    return {
        type: ActionType.SET_BOARD,
        status, 
        boardInfo
    };
}

export default function setBoard(boardInfo) {

    return dispatch => {
  
        dispatch(actionSetBoard('SUCCESS',boardInfo));
    }
  }