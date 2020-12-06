import axios from "axios"
//import authHeader from "./auth-header.services"
import api from "../helpers/api"

const API_URL = api.apiUrl + "account/";

const register = (username, email, password) => {
    const dateCreated=new Date();
    const created_at= dateCreated.getFullYear() + "-"+ (dateCreated.getMonth()+1) + "-"+ dateCreated.getDate();
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      created_at
    }).then((response) => {
      // console.log(response.data);
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }notice!!
  
      return response.data;
    });
};

const login = (email, password) => {
  console.log(email,password);
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      // console.log(response.data);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return;
};

const loginWithSocial = (data) => {
  const dateCreated=new Date();

  const created_at=dateCreated.getFullYear()+"-"+(dateCreated.getMonth()+1)+"-"+dateCreated.getDate();

  if(data.type=="google")
  {
    return axios
      .post(API_URL + "loginWithSocial", {created_at:created_at,type:data.type},{headers:{ "x-access-token": data.tokenId }})
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  else{
    return axios
    .post(API_URL + "loginWithSocial", {created_at:created_at,type:data.type,userId:data.userId},{headers:{ "x-access-token": data.tokenId }})
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }
};

export default {
    register,
    login,
    logout,
    loginWithSocial
}