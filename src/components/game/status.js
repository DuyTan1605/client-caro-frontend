import React from 'react';
import Config from '../../constants/configs';

function Status(props) {
    const { winCells } = props;
    const { rivalname } = props;
    const { isPlayerX } = props;
    const { messages } = props;
    
    let message;

    if (rivalname === 'DISCONNECTED') {
        message = 'Your opponent has exited room !';
    }
    else if (messages) {
        message = messages;
    }
    else if (winCells) {
        const winner = props.nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
        message = `Congratulation ! You win`;

        if ((isPlayerX && winner === Config.oPlayer) || (!isPlayerX && winner === Config.xPlayer)) {
            message = `Opps! You lose`;
        }
    }
    else {
        message = `Next turn: ${  props.nextMove}`;
    }
    return (
        <span className='status'><b>{message}</b></span>
    )
}

export default Status;