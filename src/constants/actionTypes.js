import { Component } from 'react';

class ActionType extends Component {
    
    static CLICK = 'CLICK';

    static CHANGE_SORT = 'CHANGE_SORT';

    static JUMP_TO = 'JUMP_TO';

    static LOGIN = 'LOGIN';

    static REGISTER = 'REGISTER';

    static GET_INFO = 'GET_INFO';

    static GET_BOARD = 'GET_BOARD';

    static ADD_BOARD = "ADD_BOARD";

    static SET_BOARD = "SET_BOARD";

    static JOIN_ROOM = 'JOIN_ROOM';

    static CHAT = 'CHAT';

    static REQUEST = 'REQUEST';

    static RESET_GAME = 'RESET_GAME';

    static REFRESH = 'REFRESH';

    static CHANGE_INFO = 'CHANGE_INFO';

    static CHANGE_PASSWORD = 'CHANGE_PASSWORD';
}

export default ActionType;