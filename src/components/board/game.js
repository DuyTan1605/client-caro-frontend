import React, { useState,useEffect } from 'react'
import Board from "./board"
import calculateWinner from "../../helpers/caculateWinner"
import { socket } from '../../helpers/socket';
import {useParams} from "react-router-dom"

function Game() {
  const [gameStatus,setGameStatus]=useState(false);
  const {id:room}=useParams();
  const [rowSetup, setrow] = useState(10);
  const [columnSetup, setcolumn] = useState(10);
  const [history, setHistory] = useState([{
    squares: Array(rowSetup * columnSetup).fill(null),
    latestMoveSquare: -1,
    winner: null
  }]);
  const [stepNumber, setstepNumber] = useState(0);
  const [nowStep, setNowStep] = useState("Guest");
  const [ascendingOrder, setascendingOrder] = useState(true);
  const [currentRole,setcurrentRole]=useState("Guest");
  
  socket.on("gameStart",data=>{
    console.log(data);
    setGameStatus(data);
  })

  socket.on("player",data=>{
    console.log(data);
    setcurrentRole(data.player);
  })

  socket.on("nowStep",data=>{
    setNowStep(data);
  })

  socket.on("move",data=>{
    console.log(data);
    setHistory(data.history);
    setNowStep(data.nowStep);
    setstepNumber(data.stepNumber)
  })

  const handleClick = (i) => {
    if(currentRole==nowStep && nowStep!="Guest")
    {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const newSquares = current.squares.slice();
      if (newSquares[i] || current.winner) {
        return;
      }
      newSquares[i] = nowStep;
      const newWinner = calculateWinner(newSquares, Math.floor(i / columnSetup), i % columnSetup, rowSetup, columnSetup).winner;
      setHistory(newHistory.concat([{
        squares: newSquares,
        latestMoveSquare: i,
        winner: newWinner
      }]));
      setNowStep(nowStep=="X"?'O':'X');
      setstepNumber(newHistory.length);
      socket.emit("move",{
        room:room,
        history:newHistory.concat([{
          squares: newSquares,
          latestMoveSquare: i,
          winner: newWinner
        }]),
        nowStep:nowStep=="X"?'O':'X',
        stepNumber:stepNumber+1});
    }
  }

  // const jumpTo = (pos) => {
  //   setstepNumber(pos);
  //   setxIsNext(pos % 2 == 0)
  // }

  // const changeOrder = () => {
  //   setascendingOrder(!ascendingOrder);
  // }

  // const restartGame = () => {
  //   setHistory([{
  //     squares: Array(rowSetup * columnSetup).fill(null),
  //     latestMoveSquare: 0,
  //     winner: null
  //   }]);
  //   setascendingOrder(true);
  //   setstepNumber(0);
  //   setxIsNext(true);
  // }

  // const handleChangeSize = (value, type) => {
  //   if (type == 'row') {
  //     setrow(value);
  //     setHistory([{
  //       squares: Array(value * columnSetup).fill(null),
  //       latestMoveSquare: 0,
  //       winner: null
  //     }]);
  //     setascendingOrder(true);
  //     setstepNumber(0);
  //     setxIsNext(true);
  //   }
  //   else {
  //     setcolumn(value);
  //     setHistory([{
  //       squares: Array(value * columnSetup).fill(null),
  //       latestMoveSquare: 0,
  //       winner: null
  //     }]);
  //     setascendingOrder(true);
  //     setstepNumber(0);
  //     setxIsNext(true);
  //   }
  // }

  const newHistory = history;
  const current = newHistory[stepNumber];
  const resWinner = calculateWinner(current.squares, current.latestMoveSquare != -1 ?
    (Math.floor(current.latestMoveSquare / columnSetup)) : -1, current.latestMoveSquare != -1 ? current.latestMoveSquare % columnSetup : -1, rowSetup, columnSetup);
  let status = '';
  let cssWinner = '';
  if (resWinner.winner) {
    console.log("Reswinner: ",resWinner.winner);
    status = "Winner " + resWinner.winner;
    cssWinner = resWinner.line;
    if(resWinner.winner == currentRole)
    {
      socket.emit("history",{winner:resWinner.winner,room:room,data:history});
    }
  }
  else {
    if (resWinner.isDraw) {
      status = "Draw";
    }
    else {
      status = 'Now Turn: ' + (nowStep)
    }
  }
  const moves = newHistory.map((step, move) => {
    const latestMoveSquare = step.latestMoveSquare;
    const col = latestMoveSquare % columnSetup + 1;
    const row = Math.floor(latestMoveSquare / columnSetup) + 1;
    const desc = (move) ?
      '#' + move + "(col=" + col + ";row=" + row + ")" :
      'Start';
    const classBold = (move == stepNumber ? 'class-bold' : "");
    return (
      <li key={move} className={classBold} style={{margin:'5px'}}>
        <button className={classBold}>{desc}</button>
      </li>
    )
  });

  if (!ascendingOrder) {
    moves.sort(function (a, b) {
      return b.key - a.key;
    });
  }

  return (
    <>
    {!gameStatus?<h1>WAITING YOUR OPPONENT...</h1>:
    (
      <div className="game">
       
        <div className="game-board">
        <h2>Your role: {currentRole}</h2>
        {/* <h2>Next step: {nowStep}</h2> */}
          <Board
            onClick={(i) => handleClick(i)}
            squares={current.squares}
            cssWinner={cssWinner}
            rowSetup={rowSetup}
            columnSetup={columnSetup}
          />
        </div>
        <div className="game-info">
          <h3 style={{ margin: '5px' }}>{status}</h3>
          <ol>{moves}</ol>
        </div>

      </div>
      
    )}
    </>

  )


}



export default Game;