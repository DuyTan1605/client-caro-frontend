import { 
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAIL,
    LOAD_BOARD_FAIL,
    LOAD_BOARD_SUCCESS
} from "../actions/type";
  
  const boards = JSON.parse(localStorage.getItem("boards"));
    
  const initialState = boards
    ? boards
    : [];
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    // console.log(payload);
    switch (type) {
      case LOAD_BOARD_SUCCESS:
        return {
          ...state,
          boards:payload.boards
         };
  
      case LOAD_BOARD_FAIL:
        return { 
          ...state,
          boards:[]
         };
      case CREATE_BOARD_SUCCESS:
        return {
          ...state,
          boards:payload.boards
        }
      case CREATE_BOARD_FAIL:
        return {
          ...state,
          boards:boards
        }
      
      
      default:
        return state;
    }
  }
  