import { combineReducers } from 'redux';
// import gameReducers from './gameReducers';
import loginReducers from './loginReducers';
import registerReducers from './registerReducers';
import infoReducers from './infoReducers';
import roomReducers from './roomReducers';
import boardReducers from './boardReducers'
import gameReducers from "./gameReducers"
const rootReducers = combineReducers({
    gameReducers,
    loginReducers,
    registerReducers,
    infoReducers,
    roomReducers,
    boardReducers
});

export default rootReducers;