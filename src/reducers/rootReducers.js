import { combineReducers } from 'redux';
// import gameReducers from './gameReducers';
import loginReducers from './loginReducers';
import registerReducers from './registerReducers';
import infoReducers from './infoReducers';
import roomReducers from './roomReducers';
import boardReducers from './boardReducers'
import gameReducers from "./gameReducers"
import rankingReducers from "./rankingReducers"
import historyReducers from "./historyReducers"
import historyDetailReducers from "./historyDetailReducers"
const rootReducers = combineReducers({
    gameReducers,
    loginReducers,
    registerReducers,
    infoReducers,
    roomReducers,
    boardReducers,
    rankingReducers,
    historyReducers,
    historyDetailReducers
});

export default rootReducers;