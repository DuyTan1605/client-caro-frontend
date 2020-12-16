import { 
    LOAD_HISTORY_FAIL,
    LOAD_history_SUCCESS
} from "../actions/type";
  
  const histories = JSON.parse(localStorage.getItem("histories"));
    
  const initialState = histories
    ? histories
    : [];
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    // console.log(payload);
    switch (type) {
      case LOAD_HISTORY_SUCCESS:
        return {
          ...state,
          histories:payload.histories
         };
  
      case LOAD_HISTORY_FAIL:
        return { 
          ...state,
          histories:[]
         };
         
      default:
        return state;
    }
  }
  