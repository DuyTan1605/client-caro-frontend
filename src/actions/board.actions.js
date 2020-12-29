import {
    CREATE_BOARD_FAIL,
    CREATE_BOARD_SUCCESS,
    LOAD_BOARD_SUCCESS,
    LOAD_BOARD_FAIL,
    SET_MESSAGE
} from "./type"
// import {socket} from "../helpers/socket";

import BoardService from "../services/board.services"

export const addNewBoard = (boardName)=>(dispatch)=>{
    return BoardService.addNewBoard(boardName).then(
        (data) => {
          socket.emit("listBoard")
          dispatch({
            type: CREATE_BOARD_SUCCESS,
            payload: { boards: data },
          });

          dispatch({
            type: SET_MESSAGE,
            payload: data.message,
          });

          return Promise.resolve(data);
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          dispatch({
            type: CREATE_BOARD_FAIL
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject(error);
        }
      );
}

export const loadAllBoard=()=>(dispatch)=>{
    return BoardService.loadAllBoard().then(
        (data)=>{
          dispatch({
            type:LOAD_BOARD_SUCCESS,
            payload:{boards:data}
          });
          dispatch({
            type: SET_MESSAGE,
            payload: data.message,
          });
    
          return Promise.resolve();
        },
        (error)=>{
          const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            dispatch({
              type: LOAD_BOARD_FAIL,
            });
      
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject();
        }
      )
}
