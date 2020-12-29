import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
//import {socket} from "../../helpers/socket"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  content:{
    flex: 1,
    background: "#aaa",
    overflowY: "scroll",
    height:'300px'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();
  const [listContent, setlistContent] = useState([]);

  socket.on('message', message => {
    console.log(message);
    setlistContent([...listContent,message]);
    //console.log(listContent);
  });

  // useEffect(() => {
  //   socket.on('message', message => {
  //       setlistContent([...listContent,message]);
  //   });
  // }, []);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="ROOM NAME" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders" className={classes.content}>
        {
          listContent.map((msg,index)=>{
            return (
             
              <ListItem key={index} style={{background:'#F0F8FF',marginBottom:'5px'}}>
                 <ListItemText primary={msg.text} secondary={msg.username+" "+msg.time}/>
               
            </ListItem>
           
            )
          })
        }
      </List>
    </div>
  );
}
