import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chat from "./chat"
import ListUser from "./users"
//import {socket} from "../../helpers/socket";
import {useParams} from "react-router-dom"
import { createBrowserHistory } from "history";
<<<<<<< HEAD
import DefaultLayout from "../layout/defaultLayout"
import Board from "./board";
import calculateWinner from "../../helpers/caculateWinner"
=======
import DefaultLayout from "../layout/defaultLayout";
import Game from "./game"

>>>>>>> ec76cfb88b4e2bb358805dd25babead1390b5144
const history = createBrowserHistory();
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

export default function FullWidthGrid() {
  
  const classes = useStyles();

  let {id:room}=useParams();
  let username;
  if(localStorage.getItem("user"))
  {
     username = JSON.parse(localStorage.getItem("user")).name;
  }
  else{
      username = JSON.parse(sessionStorage.getItem("anonymousUser")).name
  }
  
  useEffect(() => {
    socket.emit('joinRoom', { username, room });
  }, []);

  const [userRole, setuserRole] = useState("guest");
  socket.on("player",data=>{
    console.log("user role: ",data);
    setuserRole(data);
  })
  const [rowSetup, setrow] = useState(10);
  const [columnSetup, setcolumn] = useState(10);

  const [history, setHistory] = useState([{
    squares: Array(rowSetup * columnSetup).fill(null),
    latestMoveSquare: -1,
    winner: null
  }]);

  const [stepNumber, setstepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);
  const [ascendingOrder, setascendingOrder] = useState(true);

  const [pos, setpos] = useState("");
  const [currentRole, setcurrentRole] = useState("X");
  socket.on("move",(data)=>{
      // const i=data.i;
      // console.log(history);
      // const newHistory = history.slice(0, data.stepNumber + 1);
      // console.log("Step number: ",data.stepNumber);
      // //console.log("New history: ",newHistory);
      // // console.log(newHistory);
      // const current = newHistory[newHistory.length - 1];
      // const newSquares = current.squares.slice();
      // if (newSquares[i] || current.winner) {
      //   return;
      // }
      // newSquares[i] = data.player;
      // console.log(newSquares);
      // const newWinner = calculateWinner(newSquares, Math.floor(i / columnSetup), i % columnSetup, rowSetup, columnSetup).winner;
      // setHistory(newHistory.concat([{
      //   squares: newSquares,
      //   latestMoveSquare: i,
      //   winner: newWinner
      // }]));
      // console.log(history,newHistory.length);
      // setstepNumber(newHistory.length);
      // setcurrentRole(data.player=="X"?"O":"X");
      console.log(data);
      setHistory(data.history);
      setstepNumber(data.stepNumber);
      setcurrentRole(data.currentRole)
  })

  const handleClick = (i) => {
   
    if(userRole!="guest")
    {
      if(userRole==currentRole)
      {
        console.log("Role: ",i,userRole)

        const newHistory = history.slice(0, stepNumber + 1);
        console.log("Step number: ",stepNumber);
        //console.log("New history: ",newHistory);
        // console.log(newHistory);
        const current = newHistory[newHistory.length - 1];
        const newSquares = current.squares.slice();
        if (newSquares[i] || current.winner) {
          return;
        }
        newSquares[i] = currentRole;
        console.log(newSquares);
        const newWinner = calculateWinner(newSquares, Math.floor(i / columnSetup), i % columnSetup, rowSetup, columnSetup).winner;
        setHistory(newHistory.concat([{
          squares: newSquares,
          latestMoveSquare: i,
          winner: newWinner
        }]));
        console.log(newHistory.concat([{
          squares: newSquares,
          latestMoveSquare: i,
          winner: newWinner
        }]));
        setstepNumber(newHistory.length);
        setcurrentRole(currentRole=="X"?"O":"X");

        const newHistorySent= newHistory.concat([{
          squares: newSquares,
          latestMoveSquare: i,
          winner: newWinner
        }])

        socket.emit("move",{i,player:userRole,stepNumber:newHistory.length,history:newHistorySent,currentRole:currentRole=="X"?"O":"X"});
      }
    }
  }

  const jumpTo = (pos) => {
    setstepNumber(pos);
    setxIsNext(pos % 2 == 0)
  }

  const changeOrder = () => {
    setascendingOrder(!ascendingOrder);
  }

  const restartGame = () => {
    setHistory([{
      squares: Array(rowSetup * columnSetup).fill(null),
      latestMoveSquare: 0,
      winner: null
    }]);
    setascendingOrder(true);
    setstepNumber(0);
    setxIsNext(true);
  }

  const handleChangeSize = (value, type) => {
    if (type == 'row') {
      setrow(value);
      setHistory([{
        squares: Array(value * columnSetup).fill(null),
        latestMoveSquare: 0,
        winner: null
      }]);
      setascendingOrder(true);
      setstepNumber(0);
      setxIsNext(true);
    }
    else {
      setcolumn(value);
      setHistory([{
        squares: Array(value * columnSetup).fill(null),
        latestMoveSquare: 0,
        winner: null
      }]);
      setascendingOrder(true);
      setstepNumber(0);
      setxIsNext(true);
    }
  }

  const newHistory = history;
  const current = newHistory[stepNumber];
  console.log(stepNumber,newHistory);
  const resWinner = calculateWinner(current.squares, current.latestMoveSquare != -1 ?
    (Math.floor(current.latestMoveSquare / columnSetup)) : -1, current.latestMoveSquare != -1 ? current.latestMoveSquare % columnSetup : -1, rowSetup, columnSetup);
  let status = '';
  let cssWinner = '';
  if (resWinner.winner) {
    status = "Winner " + resWinner.winner;
    cssWinner = resWinner.line;
  }
  else {
    if (resWinner.isDraw) {
      status = "Draw";
    }
    else {
      status = 'Next player ' + (currentRole == 'X' ? 'X' : 'O')
    }
  }


  const moves = newHistory.map((step, move) => {
    const latestMoveSquare = step.latestMoveSquare;
    const col = latestMoveSquare % columnSetup + 1;
    const row = Math.floor(latestMoveSquare / columnSetup) + 1;
    const desc = (move) ?
      'Go to position #' + move + "(col=" + col + ";row=" + row + ")" :
      'Go to start';
    const classBold = (move == stepNumber ? 'class-bold' : "");
    return (
      <li key={move} className={classBold}>
        <button className={classBold} onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  });

  if (!ascendingOrder) {
    moves.sort(function (a, b) {
      return b.key - a.key;
    });
  }
  
  return (
    <DefaultLayout>
<<<<<<< HEAD
    <div className={classes.root}>
      <Grid container spacing={3}>   
        <Grid item xs={12} sm={6}>
          {/* <Paper className={classes.paper}>CARO</Paper> */}
        <h1>Your role: {userRole}</h1>
        <h1>{status}</h1>
          <Board
            onClick={(i) => handleClick(i)}
            squares={current.squares}
            cssWinner={cssWinner}
            rowSetup={rowSetup}
            columnSetup={columnSetup}
          />
           <ol>{moves}</ol>
        </Grid>
        <Grid item xs={12} sm={3}>
            <ListUser history={history}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Chat/>
        </Grid>
      </Grid>
    </div>
=======
      <div className={classes.root}>
        <Grid container spacing={3}>   
          <Grid item xs={12} sm={6}>
            <Game/>
          </Grid>
          <Grid item xs={12} sm={3}>
              <ListUser history={history}/>
          </Grid>
          <Grid item xs={12} sm={3}>
              <Chat/>
          </Grid>
        </Grid>
      </div>
>>>>>>> ec76cfb88b4e2bb358805dd25babead1390b5144
    </DefaultLayout>
  );
}
