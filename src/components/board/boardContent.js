import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chat from "./chat"
import ListUser from "./users"
import {socket} from "../../helpers/socket";
import {useParams} from "react-router-dom"
import { createBrowserHistory } from "history";
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
  if(localStorage.getItem("user"))
  {
      
     username = JSON.parse(localStorage.getItem("user")).name;
  }
  else{
      username = JSON.parse(sessionStorage.getItem("anonymousUser")).name
  }
  
  useEffect(() => {
    socket.emit('joinRoom', { username, room });
  }, []);


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>   
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>CARO</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
            <ListUser history={history}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Chat/>
        </Grid>
      </Grid>
    </div>
  );
}
