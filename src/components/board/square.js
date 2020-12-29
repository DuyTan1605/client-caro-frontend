import React from 'react';

function Square(props) {
  let classSquare = 'square';
  classSquare += props.value == 'X' ? ' classX' : (props.value == 'O' ? ' classO' : '');
  classSquare += props.isWinner ? ' is-win' : '';
  return (
    <button className={classSquare}
      onClick={() => { props.onClick() }}
    >
      {props.value}
    </button>
  )
}

export default Square;