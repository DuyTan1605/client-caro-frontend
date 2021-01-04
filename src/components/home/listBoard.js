import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import {useSelector} from "react-redux"
import AddIcon from '@material-ui/icons/Add';
import NewBoard from "./addNewBoard";
import { socket } from '../../helpers/socket';
import {useDispatch} from "react-redux"
import {loadAllBoard} from "../../actions/board.actions"
import CircularProgress from '@material-ui/core/CircularProgress';
import {CLEAR_MESSAGE} from "../../actions/type"
import Board from "./board"
import {addNewBoard} from "../../actions/board.actions"
import _ from "lodash"
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import store from "../../store"
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history";
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

  console.log(store);
  const classes = useStyles();
  const {actions} = props;
  const {isFetching} = props;
  const {boardInfo} = props;
  
  const [open, setOpen] = useState(false);
  const [myBoard, setmyBoard] = useState([]);
  const [otherBoard, setotherBoard] = useState([]);
  
  const handleClickOpen=()=>{
    setOpen(true)
  }

  const handleClose = ()=>{
    setOpen(false);
  } 

  const handleSubmit = ({boardName,timeOneStep,password})=>{
    console.log(boardName,timeOneStep,password);
    setOpen(false);
    actions.addBoard(localStorage.getItem('token'),boardName,timeOneStep,password);
  }

  socket.on("listBoard",data=>{
    console.log("Data socket board: ",data);
    actions.setBoard(data);
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
                <Fab color="primary" aria-label="Play now" className={classes.fab}>
                  <PlayCircleFilledIcon/>
                </Fab>
              </Grid>

              <Grid item xs={12} md={6}>
                <h2 style={{display:'inline-block',marginRight:'2%'}}>Play with room ID</h2>
                <Fab color="primary" aria-label="Play now" className={classes.fab}>
                  <PlayCircleFilledIcon/>
                </Fab>
              </Grid>

            </Grid>
          {(<>
              <h1 style={{color:"#283593"}}>My games</h1>
                  <Grid container spacing={3}>
                      <Grid item xs={3}>  
                        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={handleClickOpen}>
                            <AddIcon/>
                        </Fab>
                        <NewBoard open={open} handleSubmit={handleSubmit} handleClose={handleClose}/>
                      </Grid>
                      {
                        myBoard.map((board,index)=>{
                          return (
                          <Grid item xs={3} key={index}>
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
              <h1 style={{color:"#283593"}}>Other games</h1>
                  <Grid container spacing={3}>
                     {
                         otherBoard.map((board,index)=>{
                          return (
                          <Grid item xs={3} key={index}>
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
            <div className='status'>... ĐANG KẾT NỐI ...</div>
        </center>
    );
   

}
