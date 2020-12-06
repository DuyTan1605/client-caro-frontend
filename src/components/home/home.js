import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useSelector} from "react-redux"
import { Redirect } from 'react-router-dom';
import Header from "../layout/header";
import ListOnline from "./listOnline"

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
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={10} sm={10}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12} md={2} sm={2} style={{float:'right'}}>
          <h4>Users</h4>
          <ListOnline/>
        </Grid>
      </Grid>
      
    </div>
  );
}