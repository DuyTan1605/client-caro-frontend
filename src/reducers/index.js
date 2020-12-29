import { combineReducers } from "redux";
import auth from "./auth.reducer"
import message from "./message.reducer"
import board from "./board.reducer"
export default combineReducers({
    auth,
    message,
    board
})