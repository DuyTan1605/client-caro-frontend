import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_MESSAGE,
    LOGOUT,
    LOAD_HISTORY_SUCCESS
} from "./type"
import AuthService from "../services/auth.services"
import HistoryService from "../services/history.services"

export const loadAllHistory=(id)=>(dispatch)=>{
  return HistoryService.loadAllHistory(id).then(
      (data)=>{
        dispatch({
          type:LOAD_HISTORY_SUCCESS,
          payload:{histories:data}
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
            type: LOAD_HISTORY_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
      }
    )
}

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (data) => {
      // console.log(data);
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
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
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(error);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
  return Promise.resolve();
};

export const loginWithSocial = (data) => (dispatch) => {
    
  return AuthService.loginWithSocial(data).then(
    (data) => {
      //console.log(data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


