
import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link
  } from "react-router-dom";
import shortId from "shortid"
import {socket} from "../../helpers/socket"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function AnonymousHeder(props)
{
    const classes = useStyles();
    useEffect(() => { 
      if(!sessionStorage.getItem("anonymousUser"))
      {
        let anoyId=shortId.generate();
        sessionStorage.setItem("anonymousUser",JSON.stringify({id:anoyId,name:anoyId,avatar:null}))
        socket.emit("newAnonymousUser",{id:anoyId,name:anoyId,avatar:null})
      }
      else{
        console.log("in")
        socket.emit("listUser");
      }
    }, []);
    return (
        <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
        <Link to={"/home"} style={{textDecoration:'none',color:'white'}}><Typography className={classes.title} variant="h5" noWrap>
            Caro
          </Typography></Link>
          <div className={classes.grow} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    )
}