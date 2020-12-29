import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import {useSelector} from "react-redux"
import AddIcon from '@material-ui/icons/Add';
import NewBoard from "./addNewBoard";
// import { socket } from '../../helpers/socket';
import {useDispatch} from "react-redux"
import {loadAllBoard} from "../../actions/board.actions"
import CircularProgress from '@material-ui/core/CircularProgress';
import {CLEAR_MESSAGE} from "../../actions/type"
import Board from "./board"
import {addNewBoard} from "../../actions/board.actions"

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

export default function CenteredGrid() {
  const classes = useStyles();
  const {user:currentUser}=useSelector(state=>state.auth);
  const [open, setOpen] = React.useState(false);
  const [myBoard, setmyBoard] = useState([]);
  const [otherBoard, setotherBoard] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  
  const handleClickOpen=()=>{
    setOpen(true)
  }

  const handleClose = ()=>{
    setOpen(false);
  } 
  const handleSubmit=(boardName)=>{
    setOpen(false);
    console.log(boardName);
    dispatch(addNewBoard(boardName))
    .then(
      ()=>{
        const boards= JSON.parse(localStorage.getItem("boards")).boards;
        console.log()
        if(currentUser)
        {
            setmyBoard(boards.filter(board=>board.created_by==currentUser.id))
            setotherBoard(boards.filter(board=>board.created_by!=currentUser.id))
        }
        else{
            setotherBoard(boards);
        }

        setTimeout(()=>{
            dispatch({
                type: CLEAR_MESSAGE,
            })
        },2000)
      }
    )
    .catch(
        setTimeout(()=>{
            dispatch({
                type: CLEAR_MESSAGE,
            })
        },2000)
    )
  }

  useEffect(() => {

    dispatch(loadAllBoard())
      .then(()=>{
          setloading(false);
          const boards= JSON.parse(localStorage.getItem("boards")).boards;
          console.log(boards);
          if(currentUser)
          {
              setmyBoard(boards.filter(board=>board.created_by==currentUser.id))
              setotherBoard(boards.filter(board=>board.created_by!=currentUser.id))
          }
          else{
              setotherBoard(boards);
          }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
    
    socket.on("listBoard",data=>{
      console.log(data);
        if(currentUser)
        {
            setmyBoard(data.filter(board=>board.created_by==currentUser.id))
            setotherBoard(data.filter(board=>board.created_by!=currentUser.id))
        }
        else{
          setotherBoard(data);
        }
    })

    

    return () => {
      dispatch({
        type: CLEAR_MESSAGE,
      })
    };

  }, []);

  if(loading)
  {
      return(
        <div className={classes.rootLoading}>
          <CircularProgress />
      </div>
      )
  }
  return (
    <div className={classes.root}>
    {currentUser &&
        (<>
        <h1 style={{color:"#283593"}}>My games</h1>
            <Grid container spacing={3}>
                <Grid item xs={3}>  
                  <Fab color="primary" aria-label="Add" className={classes.fab} onClick={handleClickOpen}>
                      <AddIcon/>
                  </Fab>
                  <NewBoard open={open} handleSubmit={(boardName)=>handleSubmit(boardName)} handleClose={handleClose}/>
                </Grid>
                {
                  myBoard.map((board,index)=>{
                    return (
                    <Grid item xs={3} key={index}>
                         <Board board={board}/>
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
                          <Board board={board}/>
                    </Grid>
                    )
                  })
                }   
            </Grid>
    </div>
  );
}
