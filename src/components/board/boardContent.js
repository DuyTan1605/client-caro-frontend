import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chat from "./chat"
import ListUser from "./users"
import {socket} from "../../helpers/socket";
import {useParams} from "react-router-dom"
import { createBrowserHistory } from "history";
import DefaultLayout from "../layout/defaultLayout";
import Game from "./game"
import shortId from "shortid"
const history = createBrowserHistory();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  
  let {id:room}=useParams();
  let username;
  let idUser;
  if(localStorage.getItem("user"))
  {
      
     username = JSON.parse(localStorage.getItem("user")).name;
     idUser = JSON.parse(localStorage.getItem("user")).id;
  }
  else{
    if(!sessionStorage.getItem("anonymousUser"))
      {
        let anoyId=shortId.generate();
        sessionStorage.setItem("anonymousUser",JSON.stringify({id:anoyId,name:anoyId,avatar:null}))
        socket.emit("login",{id:anoyId,name:anoyId,avatar:null})
      }
      else{
        const data = JSON.parse(sessionStorage.getItem("anonymousUser"));
        socket.emit("login",{id:data.id,name:data.name,avatar:data.avatar})
      }

      username = JSON.parse(sessionStorage.getItem("anonymousUser")).name;
      idUser = JSON.parse(sessionStorage.getItem("anonymousUser")).id;
  }
  
  useEffect(() => {
    socket.emit('joinRoom', { username, room,idUser });
  }, []);

  

  return (
    <DefaultLayout>
      <div className={classes.root}>
        <Grid container spacing={3}>   
          <Grid item xs={12} sm={6}>
           <Game/>
          </Grid>
          <Grid item xs={12} sm={3}>
              <ListUser history={history}/>
          </Grid>
          <Grid item xs={12} sm={3}>
              <Chat/>
          </Grid>
        </Grid>
      </div>
    </DefaultLayout>
  );
}
