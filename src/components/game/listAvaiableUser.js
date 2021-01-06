
import React,{useState,useEffect} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {socket} from "../../helpers/socket"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

export default function CheckboxListSecondary(props) {
  const classes = useStyles();
  const [listOnline,setListOnline] = useState([]);
  const [open, setOpen] = React.useState(false);
  let { id : room } = useParams();
  const [dialog, setDialog] = useState('');
  const history = useHistory();
  const [openInvited,setOpenInvited] = useState(false);

  const [invitedUser,setInvitedUser] = useState('');
  const [invitedUserId,setInvitedUserId] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    socket.emit("listUser");
  },[])

  socket.on("listonline",data=>{
    setListOnline(data.filter(user=> user.id != JSON.parse(localStorage.getItem("user")).id));
  })

  const sendInvitatiton = (userId,userName)=>{
    setInvitedUser(userName);
    setInvitedUserId(userId);
    setOpenInvited(true);
  }

  const handleCloseInvited = () => {
    setOpenInvited(false);
  };

  const handleAccept = ()=>{
      console.log("Accept invoite: ",invitedUserId);
      setOpenInvited(false);
      socket.emit('invitation',{sender:JSON.parse(localStorage.getItem("user")).name,userId:invitedUserId,room,senderID:JSON.parse(localStorage.getItem("user")).id});
  }

  const handleReject = ()=>{
    setOpenInvited(false);
  }

  socket.on("accept-invited",function(data)
  {
    if(JSON.parse(localStorage.getItem("user")).id == data.senderID && data.room == room)
    {
        //props.acceptInvited();
        socket.emit('joinroom',{user:JSON.parse(localStorage.getItem("user")),room,time:null});
        history.push(`/board/${room}`);
    }
  })

  return (
    <List dense className={classes.root}>
      {listOnline.map((user,value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <div key={value}>
         <Grid container>
            <Grid item xs={6}>
                <Button onClick={handleClickOpen}>
                <ListItem>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                    >
                {user.avatar?<Avatar alt={user.name} src={user.avatar} />:<AccountCircle fontSize="large"/>}
                </StyledBadge>
                    <ListItemText style={{marginLeft:'1em'}} id={labelId} primary={user.name} />
                </ListItem>
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" style={{textTransform:'none',marginTop:"2%"}} onClick={()=>sendInvitatiton(user.id,user.name)}>
                    Mời
                </Button>
                <Dialog
                    open={openInvited}
                    onClose={handleCloseInvited}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Xác nhận mời người chơi"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn mời {invitedUser} tham gia phòng chơi {room}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleAccept} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                    <Button onClick={handleReject} color="primary">
                        Từ chối
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
         </Grid>
          <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Personal Information</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                  <div>Name: {user.name}</div>
            </Typography>
            <Typography gutterBottom>
                  <div>Day join: {user.created_at}</div>
            </Typography>
            <Typography gutterBottom>
                  <div>Total match: {user.total_match}</div>
            </Typography>
            <Typography gutterBottom>
                  <div>Percent win: {user.percent_win}</div>
            </Typography>
            <Typography gutterBottom>
                  <div>Rank: {user.rank}</div>
            </Typography>
            </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Disagree
            </Button> */}
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
        </div>
        );
      })}
    </List>
  );

}
