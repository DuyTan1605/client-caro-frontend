import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListOnline from "./listOnline"
import ListBoard from "./listBoard"
import {socket} from "../../helpers/socket"
import {useSelector} from "react-redux"

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
  const [listUsers, setlistUsers] = useState([]);

 
  socket.on("listonline",data=>{
    console.log(data);
    setlistUsers(data);
  })

  useEffect(() => {
    const currentUser=JSON.parse(localStorage.getItem("user"))
    if(currentUser)
    {
      socket.emit("login",{name:currentUser.name,id:currentUser.id,avatar:currentUser.avatar});
    }
  }, []);

   return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10} sm={10}>
            <ListBoard/>
          </Grid>
          <Grid item xs={12} md={2} sm={2} style={{float:'right'}}>
            <h4>Users online</h4>
            <ListOnline listUsers={listUsers}/>
          </Grid>
        </Grid>
        
      </div>
    );
}