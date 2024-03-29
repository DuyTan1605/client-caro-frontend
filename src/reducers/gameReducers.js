import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGame(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.CLICK:
            return {
                ...state,
                data: {
                    ...state.data,
                    history: action.history,
                    stepNumber: action.history.length - 1,
                    nextMove: action.nextMove,
                    winCells: action.winCells,
                }
            }
        
        case ActionType.CHANGE_SORT:
            return {
                ...state,
                data: {
                    ...state.data,
                    accendingMode: !state.data.accendingMode
                }
            };
        
        case ActionType.JUMP_TO:
            return {
                ...state,
                data: {
                    ...state.data,
                    stepNumber: action.stepNumber,
                    nextMove: action.nextMove,
                    winCells: action.winCells
                }
            };
        
        case ActionType.REQUEST:
            return {
                ...state,
                isFetching: action.isRequesting,
                message: action.message
            };
        
        case ActionType.RESET_GAME:
            return {
                ...state,
                isFetching: false,
                message: null,
                data: {
                    history: [{
                        x: null,
                        y: null,
                        squares: Array(Config.brdSize).fill(null).map(() => {
                            return Array(Config.brdSize).fill(null)
                        })
                    }],
                    nextMove: action.nextMove,
                    stepNumber: 0,
                    winCells: null,
                    accendingMode: false,
                },
                endGame: false,
                winner: null,
                countDown: false
            };
        
        case ActionType.ADD_WINNER:
            return {
                ...state,
               winner: action.message
            };

        case ActionType.SET_COUNTDOWN:
            return {
                ...state,
                countDown: action.message
            };
        
        case ActionType.END_GAME:
            return {
                ...state,
                endGame: action.message
            };

        case ActionType.REFRESH:
            return Config.initialState;
        
        default:
            return state;
    }
}