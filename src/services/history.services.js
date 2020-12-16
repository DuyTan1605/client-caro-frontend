import axios from "axios"
import api from "../helpers/api"


const API_URL = api.apiUrl + "history/";

const loadAllHistory = (id)=>{
  console.log("id",id);
    return axios
    .get(API_URL+"loadAllHistory",{
      params:{
        id:id
      }
    })
    .then((response)=>{
      //console.log(response.data);
      localStorage.setItem("histories", JSON.stringify(response.data));
      return response.data;
    })
  }
  export default{
      loadAllHistory
  }