import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import Avatar from '@material-ui/core/Avatar';
//import {socket} from "../../helpers/socket";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
  const classes = useStyles();
  const [listUser, setlistUser] = useState([]);

  const leaveRoom = ()=>{
    console.log("leave")
    socket.emit("leaveRoom");
    props.history.push("/home");
  }

  socket.on('roomUsers', ({ room, users }) => {
    // outputRoomName(room);
    // outputUsers(users);
    console.log(room,users)
    setlistUser(users)
  });

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="ROOM'S USERS" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
      {
          listUser.map((user,index)=>{
            return (
              <ListItem key={index} style={{background:'#F0F8FF',marginBottom:'5px'}}>
                 <ListItemIcon>
                    <Avatar></Avatar>
                </ListItemIcon>
                <ListItemText primary={user.username} />
            </ListItem>
            )
          })
        }
      </List>
      <Link to={"/home"} onClick={leaveRoom}>
      <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="LEAVE ROOM" />
        </ListItem>
      </Link>
    </div>
  );
}
