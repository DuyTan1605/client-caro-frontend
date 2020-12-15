import axios from "axios"
import api from "../helpers/api"
import authHeader from "./auth-header.services"

const API_URL = api.apiUrl + "board/";

const addNewBoard = (boardName)=>{

  console.log(boardName,authHeader());
  return axios
  .post(API_URL + "addNewBoard", {
      boardName
    },{
      headers: authHeader()
    })
    .then((response) => {  
        localStorage.setItem("boards", JSON.stringify(response.data));
      return response.data;
    });

} 

const loadAllBoard = ()=>{
  return axios
  .get(API_URL+"loadAllBoard")
  .then((response)=>{
    //console.log(response.data);
    localStorage.setItem("boards", JSON.stringify(response.data));
    return response.data;
  })
}
export default{
    addNewBoard,
    loadAllBoard
}