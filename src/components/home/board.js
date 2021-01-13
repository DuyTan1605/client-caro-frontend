import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BoardImage from "../../images/bg-login.jpg"
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import{
    Link
   } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { socket } from '../../helpers/socket';
import Game from '../game/game';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
   width:'100%'
  },
  media: {
    height: 140,
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
});

export default function MediaCard(props) {
  let history = useHistory();
  //console.log(props);
  const classes = useStyles();
  const {actions} = props;
  const [open, setOpen] = React.useState(false);
  const [password,setPassword] = React.useState("");
  const [message,setMessage] = React.useState("");
  const [totalUser,setTotalUser] = React.useState(0);
  const [valid,setValid] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setMessage("");
  };

  const joinGame = ()=>{
    if(props.board.password)
    {
      setOpen(true);
    }
    else{
      socket.emit('joinroom',{user:JSON.parse(localStorage.getItem("user")),room:props.board.id,time:props.board.time_for_one_step});
     history.push(`/board/${props.board.id}`);
    }
  }

  socket.emit("joined-room",{id: props.board.id});
  socket.on("joined-room",function(data)
  {
    if(props.board.id == data.id && data)
    {
      setTotalUser(data.users.length);
    }
  })

  const handleJoin = ()=>{
    if(password == "")
    {
      setMessage("Password id required");
      return;
    }
    if(password == props.board.password)
    { 
     socket.emit('joinroom',{user:JSON.parse(localStorage.getItem("user")),room:props.board.id,time:props.board.time_for_one_step});
     history.push(`/board/${props.board.id}`);
      //window.location.href = `/board/${props.board.id}`;
    }
    else
    {
      setMessage("Incorrect password");
    }
  }
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={BoardImage}
          title={props.board.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
           Room: {props.board.id} - {props.board.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
          Status: {totalUser >=2 ? "Playing" : "Waiting"}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
          Total people: {totalUser}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* Created by : {props.board.user.name} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
         {/* <Link style={{color:"black",textDecoration:"none"}}>    */}
            <Button size="small" color="primary" variant="contained" onClick={joinGame}>
            JOIN
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">JOIN GAME</DialogTitle>
        {message && <Alert severity="info">{message}</Alert>}
        <DialogContent>
          <DialogContentText>
            Enter room's password
          </DialogContentText>
          <TextField
            autoFocus
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleJoin}>
            JOIN
          </Button>
        </DialogActions>
      </Dialog>

        {/* </Link> */}
        {props.board.password ? <LockIcon style={{marginLeft:'auto'}}/> : <LockOpenIcon style={{marginLeft:'auto'}}/>}

      </CardActions>
    </Card>
  );
}