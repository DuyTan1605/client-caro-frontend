import React from 'react';
import Square from "./square"

function Board(props) {
  const boardRow = props.rowSetup;
  const boardCol = props.columnSetup;
  const renderSquare = (dem) => {
    let cssWinner = [...props.cssWinner];
    let isWinner = false;
    for (let j = 0; j < cssWinner.length; j++) {
      if (cssWinner[j] == dem) {
        isWinner = true;
      }
    }
    return <Square key={dem} value={props.squares[dem]}
      isWinner={isWinner}
      onClick={() => { props.onClick(dem) }}
    />
  }

  let squares = [];
  let dem = 0;
  for (let i = 0; i < boardRow; i++) {
    let row = [];
    for (let j = 0; j < boardCol; j++) {
      row.push(renderSquare(dem));
      dem++;
    }
    squares.push(<div key={i} className="board-row">{row}</div>);
  }

  return (
    <div>{squares}</div>
  );

}

export default Board;
