import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewBoard from "./addNewBoard";
import { socket } from '../../helpers/socket';
import CircularProgress from '@material-ui/core/CircularProgress';
import Board from "./board"
import _ from "lodash"
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { createBrowserHistory } from "history";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import JoinRoomWithID from "./joinRoomWithID"
import EnterPassword from "./enterPassword"
import {useHistory} from "react-router-dom"
import CancelIcon from '@material-ui/icons/Cancel';

const history = createBrowserHistory();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:'1em',
    padding:'1em'
  },
  rootLoading:
  {
    margin:theme.spacing(5)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ListBoard(props) {  

  const classes = useStyles();
  const {actions} = props;
  const {isFetching} = props;
  const {boardInfo} = props;
  const historyRoute = useHistory();
  const [open, setOpen] = useState(false);
  const [openJoinRoom, setOpenJoinRoom] = useState(false);
  const [openPasswordRoom, setOpenPasswordRoom] = useState(false);
  const [boardId, setboardID] = useState("");
  const [message,setMessage] = useState("");
  const [isPassword,setIsPassword] = useState(false);
  const [myBoard, setmyBoard] = useState([]);
  const [otherBoard, setotherBoard] = useState([]);
  const [finding,setFinding] = useState(false);
  const handleClickOpen=()=>{
    setOpen(true)
  }

  const handleClickOpenJoinRoom=()=>{
    setOpenJoinRoom(true)
  }

  const handleClose = ()=>{
    setOpen(false);
  } 

  const handleCloseJoinRoom = ()=>{
    setOpenJoinRoom(false);
    setMessage("");
  } 

  const handleClosePasswordRoom = ()=>{
    setOpenPasswordRoom(false);
    setMessage("");
  } 


  const handleSubmit = ({boardName,timeOneStep,password})=>{
    setOpen(false);
    actions.addBoard(localStorage.getItem('token'),boardName,timeOneStep,password);
  }

  const handleSubmitJoinRoom = (boardID)=>{
    const pos = _.findIndex(props.boardInfo,{id:parseInt(boardID)});
      if(pos == -1)
      {
          setMessage("Not existed game with ID " + boardID);
      }
      else{
         if(!props.boardInfo[pos].password)
         {
            socket.emit('joinroom',{user:JSON.parse(localStorage.getItem("user")),room:parseInt(boardID),time:props.boardInfo[pos].time_for_one_step});
            historyRoute.push(`/board/${boardID}`);
            setOpenJoinRoom(false);
         }
         else{
            setboardID(boardID);
            setOpenPasswordRoom(true);
         }
      }
  }
    const handleSubmitPasswordRoom = (boardID,password)=>{
      const pos = _.findIndex(props.boardInfo,{id:parseInt(boardID)});
      if(props.boardInfo[pos].password == password)
      {
        setOpenPasswordRoom(false);
        socket.emit('joinroom',{user:JSON.parse(localStorage.getItem("user")),room:parseInt(boardID),time:props.boardInfo[pos].time_for_one_step});
        historyRoute.push(`/board/${boardID}`);
      } 
      else{
        setMessage("Wrong password");
      }
    }

  const findPlayer = ()=>
  {
    setFinding(true);
    socket.emit("findPlayer",JSON.parse(localStorage.getItem('user')));
  } 

  const cancelFindPlayer = ()=>{
    setFinding(false);
    socket.emit("cancelFindPlayer",JSON.parse(localStorage.getItem('user')));
  }

  socket.on("listBoard",data=>{
    console.log("Data socket board: ",data);
    actions.setBoard(data);
  })

  socket.on("joinroom-now-success",data=>{
    socket.emit('joinroom',{user:data.playerX,room:data.id,time:data.time});
    socket.emit('joinroom',{user:data.playerO,room:data.id,time:data.time});
    historyRoute.push(`/board/${data.id}`);
  })

  if(boardInfo)
    {
      console.log(boardInfo)
        const myBoard = _.filter(boardInfo,{created_by:parseInt(JSON.parse(localStorage.getItem("user")).id)}); 
        const otherBoard = _.xor(boardInfo,myBoard); 
        return (
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <h2 style={{display:'inline-block',marginRight:'2%'}}>Play now</h2>
                { !finding &&
                <Fab color="primary" aria-label="Play now" className={classes.fab} onClick={findPlayer}>
                  <SportsEsportsIcon/>
                </Fab>
                }
                {
                finding &&
                <Fab color="secondary" aria-label="Play now" className={classes.fab} onClick={cancelFindPlayer}>
                  <CancelIcon/>
                </Fab>
                }
                {finding && <div><h4>Finding... </h4><CircularProgress/></div>}
              </Grid>

              <Grid item xs={12} md={6}>
                <h2 style={{display:'inline-block',marginRight:'2%'}}>Play with room ID</h2>
                <Fab color="primary" aria-label="Play with room ID" className={classes.fab} onClick={handleClickOpenJoinRoom}>
                  <PlayCircleFilledIcon/>
                </Fab>
                <JoinRoomWithID 
                message={message} 
                open = {openJoinRoom} 
                handleClose = {handleCloseJoinRoom} 
                handleSubmit={handleSubmitJoinRoom}
                />
                
                <EnterPassword 
                message={message} 
                board={boardId} 
                open = {openPasswordRoom} 
                handleClose = {handleClosePasswordRoom}
                handleSubmit={handleSubmitPasswordRoom}
                />
              </Grid>

            </Grid>
          {(<>
              <h1 style={{color:"#283593",margin:'2% 0'}}>My games</h1>
                  <Grid container spacing={3} style={{marginLeft:'auto'}}>
                      <Grid item xs={3}>  
                        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={handleClickOpen}>
                            <AddIcon/>
                        </Fab>
                        <NewBoard open={open} handleSubmit={handleSubmit} handleClose={handleClose}/>
                      </Grid>
                      {
                        myBoard.map((board,index)=>{
                          return (
                          <Grid item xs={12} md={4} sm={4} key={index}>
                             {/* <Provider store={store}> */}
                               <Board board={board} history={history}/>
                              {/* </Provider> */}
                          </Grid>
                          )
                        })
                      }   
                  </Grid>
              </>)  
              }  
              <h1 style={{color:"#283593",margin:'2% 0'}}>Other games</h1>
                  <Grid container spacing={3} style={{marginLeft:'auto'}}>
                     {
                         otherBoard.map((board,index)=>{
                          return (
                          <Grid item xs={12} md={4} sm={4} key={index}>
                             {/* <Provider store={store}> */}
                                <Board board={board} history={history}/>
                            {/* </Provider> */}
                          </Grid>
                          )
                        })
                      }   
                  </Grid>
          </div>
        );
    }
    else if(!isFetching)
    {
        const token = localStorage.getItem('token');
        actions.fetchBoard(token);
    }
    return (
        <center>
            <div className='status'>... CONNECTING ...</div>
        </center>
    );
   

}
