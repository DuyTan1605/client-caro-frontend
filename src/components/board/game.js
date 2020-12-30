import React, { useState,useEffect } from 'react'
import Board from "./board"
import calculateWinner from "../../helpers/caculateWinner"
import { socket } from '../../helpers/socket';
import {useParams} from "react-router-dom"

function Game() {
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
    if(currentRole==nowStep)
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
    status = "Winner " + resWinner.winner;
    cssWinner = resWinner.line;
  }
  else {
    if (resWinner.isDraw) {
      status = "Draw";
    }
    else {
      status = 'Next player ' + (currentRole == "0" ? 'X' : 'O')
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
    <>
      <div className="game">
       
        <div className="game-board">
        <h2>Your role: {currentRole}</h2>
        <h2>Next step: {nowStep}</h2>
          <Board
            onClick={(i) => handleClick(i)}
            squares={current.squares}
            cssWinner={cssWinner}
            rowSetup={rowSetup}
            columnSetup={columnSetup}
          />
        </div>
        <div className="game-info">
          <div style={{ margin: '5px' }}>{status}</div>
          <ol>{moves}</ol>
        </div>

      </div>
      {/* <div>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" danger onClick={() => changeOrder()}>
            {ascendingOrder ? (<>Ascending <ArrowUpOutlined /></>) :
              <>Descending <ArrowDownOutlined /></>}
          </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={() => restartGame()}>
            Restart
            <UndoOutlined />
          </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <span>Select row: </span>
          <Size size={rowSetup} handleChangeSize={(value) => handleChangeSize(value, 'row')} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Select column: </span>
          <Size size={columnSetup} handleChangeSize={(value) => handleChangeSize(value, 'column')} />
        </div>

      </div> */}
    </>

  )


}



export default Game;