import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useSelector} from "react-redux"
import { Redirect } from 'react-router-dom';
import Header from "../layout/header";
import ListOnline from "./listOnline"
import {socket} from "../../helpers/socket"

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

export default function Home() {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => {return state.auth});
  const [listUsers, setlistUsers] = useState([]);
  
  socket.on('connect', () => {
    console.log(socket.connected); // true
   });

  socket.on("listonline",data=>{
    console.log("List users: ",data);
    setlistUsers(data.filter(user=>user.id!=currentUser.id));
  })

  useEffect(() => {
    socket.emit("login",{name:currentUser.name,id:currentUser.id,avatar:currentUser.avatar});
  }, []);

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10} sm={10}>
            <Paper className={classes.paper}>List Board</Paper>
          </Grid>
          <Grid item xs={12} md={2} sm={2} style={{float:'right'}}>
            <h4>Users</h4>
            <ListOnline listUsers={listUsers}/>
          </Grid>
        </Grid>
        
      </div>
    );
}