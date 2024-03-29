import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MoreIcon from '@material-ui/icons/MoreVert';
import {
    Link
  } from "react-router-dom";

import { useDispatch,useSelector} from "react-redux";
import {socket} from "../../helpers/socket"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import DesktopMenu from "./menu"
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
//import {socket} from "../../helpers/socket"


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default function PrimarySearchAppBar(props) {  

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [sender,setSender] = useState("");
  const [senderID,setSenderID] = useState("");
  const [gameID,setGameID] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open,setOpen] = useState(false);
  const [openSender,setOpenSender] = useState(false);
  const history = useHistory();
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSender = () => {
    setOpenSender(false);
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));

  socket.on("invitation",function(data){
    
    console.log("On invitation: " , data);
    // console.log(localStorage.getItem("user"))
      if(JSON.parse(localStorage.getItem("user")).id == data.userId)
      {
          setSender(data.sender);
          setSenderID(data.senderID);
          setGameID(data.room);
          setOpen(true);
      }
  })

  console.log(props);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    socket.emit("logout",{id:JSON.parse(localStorage.getItem("user")).id});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // props.refresh();
    window.location.href = '/login';
  };

  const handleAccept = ()=>{
    socket.emit('joinroom',{user:JSON.parse(localStorage.getItem("user")),room:gameID,time:null});
    socket.emit('accept-invited',{receiver:JSON.parse(localStorage.getItem("user")).name,senderID:senderID,room:gameID});
    history.push(`/board/${gameID}`);
    setOpen(false);
  }

  const handleReject = ()=>{
    socket.emit('reject-invited',{receiver:JSON.parse(localStorage.getItem("user")).name,senderID:senderID,room:gameID});
    setOpen(false);
  }

  socket.on('reject-invited',function(data)
  {
      if(JSON.parse(localStorage.getItem("user")).id == data.senderID)
      {
        setSender(data.receiver);
        setGameID(data.room);
        setOpenSender(true);
      }
  })

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
   
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={"/profile"} style={{color:"black",textDecoration:"none"}}><MenuItem onClick={handleMenuClose}><AccountCircleIcon/> Your Profile</MenuItem></Link>
      <Link to={"/history"} style={{color:"black",textDecoration:"none"}}><MenuItem onClick={handleMenuClose}><HistoryIcon/> History</MenuItem></Link>
      <Link to={"/login"} style={{color:"black",textDecoration:"none"}} onClick={logOut}><MenuItem onClick={handleMenuClose}><ExitToAppIcon/> Logout</MenuItem></Link>
    </Menu>
    
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
       <Link to={"/profile"} style={{color:"black",textDecoration:"none"}}><MenuItem onClick={handleMenuClose}><AccountCircleIcon/> Your Profile</MenuItem></Link>
       <Link to={"/history"} style={{color:"black",textDecoration:"none"}}><MenuItem onClick={handleMenuClose}><HistoryIcon/> History</MenuItem></Link>
      <Button style={{color:"black",textDecoration:"none",textTransform:"none"}} onClick={logOut}><MenuItem onClick={handleMenuClose}><ExitToAppIcon/>Logout</MenuItem></Button>
    </Menu>
  );

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
         <Link to ="/home">
            <ListItem button >
              <HomeIcon/> <ListItemText primary="Home" />
            </ListItem>
          </Link>

          <Link to ="/ranking">
            <ListItem button >
              <ListIcon/> <ListItemText primary="Ranking" />
            </ListItem>
          </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/home"} style={{textDecoration:'none',color:'white'}}>
          <Typography className={classes.title} variant="h5" noWrap>
            Caro
          </Typography>
          </Link>
          <span className={classes.title}>
            <DesktopMenu/>
          </span>
          <div className={classes.sectionMobile} style={{flexGrow:'1'}}>
             <React.Fragment key="left">
                  {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                      <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
                  <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
                        {list("left")}
                  </Drawer>
               </React.Fragment>
          </div>

          <div className={classes.grow} />

          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"New Invitation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {sender} want to invite you to join {gameID}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} color="primary">
            Accept
          </Button>
          <Button onClick={handleReject} color="primary" autoFocus>
            Reject
          </Button>
        </DialogActions>
      </Dialog>




      <Dialog
        open={openSender}
        onClose={handleCloseSender}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reject join room"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {sender} has rejected join {gameID}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenSender(false)} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    
          <span> Hello, {currentUser?currentUser.name:""}</span>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser.avatar? 
                <Avatar className={classes.avatar} src={String(currentUser.avatar)}/>
                : <AccountCircle/>}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
  

}
