import React, { useState,useEffect } from 'react';
import { Button, Card, FormControl,Container } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog'
import Board from './board';
import Config from '../../constants/configs';
import Status from './status';
import logo from '../../logo.svg';
import './game.css';
import {socket} from '../../helpers/socket';
import ScrollToBottom from 'react-scroll-to-bottom';
// import defaultAvatar from '../../images/boy.png'
import defaultAvatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";
import DefaultLayout from "../layout/defaultLayout"
import CountDown from "./countDown"
import WaitingRoom from "./waitingRoom"
import {getDate} from "../../helpers/helper"

function Game(props) {
    let historyRouter = useHistory();
    const { actions } = props;
    console.log(props);

    socket.on('joinroom-success', function (roomInfo) {
       //console.log(roomInfo); 
       actions.actionJoinRoom(roomInfo);
    })

    

    const { history } = props;
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
    const { userInfo } = props;
    const { roomInfo } = props;
    const { isFetching } = props;
    const { message } = props;
    const { winnerBg } = props;

    const acceptInvited = ()=>{
        console.log("accept: ",roomInfo);
        // actions.actionJoinRoom(roomInfo);
    }

    if(!roomInfo || !roomInfo.playerO || !roomInfo.playerX)
    {
        return (
        <DefaultLayout>
            <WaitingRoom acceptInvited = {()=>acceptInvited()}/>
        </DefaultLayout>
        )
    }
    else{
    // Temporary states
    const [avatarSrc, setAvatarSrc] = useState(roomInfo.playerX.avatar);
    const [rivalAvatarSrc, setRivalAvatarSrc] = useState(roomInfo.playerO.avatar);
    const [dialog, setDialog] = useState('');
    const { chatHistory } = props;
    // Setup socket
   
    setupSocket();

    // Setup chat engine
  
    const [chatMessage, setChatMessage] = useState('');
    const chatHistoryUI = [];
    for (var i = 0; i < chatHistory.length; i++) {
        const color = chatHistory[i].sender === 'Mình' ? 'blue' : 'red';
        const style = { color: color };
        chatHistoryUI.push(<b style={style} key={i}>{chatHistory[i].sender}</b>);
        chatHistoryUI.push(': ' + chatHistory[i].message);
        chatHistoryUI.push(<br key={i + chatHistory.length}></br>);
    }

    // Setup disable state for components
    const oneIsDisconnect = roomInfo.playerO.status === 'DISCONNECTED' || roomInfo.playerX.status === 'DISCONNECTED';
    const needToDisable = props.endGame || winCells || oneIsDisconnect || isFetching || (userInfo.id != roomInfo.playerO.id && userInfo.id != roomInfo.playerX.id);

    // Setup board game
    const current = history[stepNumber];
    const sortMode = accendingMode ? `Accending turn` : `Descending turn`;
    const moves = [];

    history.map((step, move) => {
        const content = move ? `Go to #${
            Config.makeTwoDigits(move)}:
            (${Config.makeTwoDigits(history[move].x)},${Config.makeTwoDigits(history[move].y)})`
        : `Play again !`;
        const variant = (move === stepNumber) ? `danger` : `success`;
        
        // Get current move
        const isDisabled = oneIsDisconnect || (needToDisable && message && message.startsWith(".."));
        const currentMove = (
            // eslint-disable-next-line react/no-array-index-key
            <li key={move}>
                <Button onClick={() => requestUndo(move)} variant={variant} disabled={isDisabled}
                    className='board-button'>{content}</Button>
            </li>
        )

        // Push head or tail depends on sort mode
        if (winCells && move > 0) {
            // Invisible moves when match is finish
        }
        else if (needToDisable && message && !message.startsWith("...") && move > 0) {
            // Invisible moves when match is finish
        }
        else {
            if (accendingMode) {
                moves.push(currentMove);
            }
            else {
                moves.splice(0, 0, currentMove);
            }
        }
        return moves;
    })

    // Setup players info (too complicated, do not try to understand)
    // const Xname = userInfo.name;
    // var isPlayerX = Xname === roomInfo.playerX.name;
    // if (Xname !== roomInfo.playerX.name) {
    //     isPlayerX = Xname !== roomInfo.playerO.name;
    // }
    // const rivalname = isPlayerX ? roomInfo.playerO.name : roomInfo.playerX.name;

    const Xname = roomInfo.playerX.name;
    const rivalname = roomInfo.playerO.name;
    var isPlayerX = userInfo.name === roomInfo.playerX.name;
    if (userInfo.name !== roomInfo.playerX.name) {
        isPlayerX = userInfo.name !== roomInfo.playerO.name;
    }

    const [isCheck,setisCheck] = useState(props.countDown);
    // actions.actionSetCountDown(false);
    const endGame = ()=>{
        actions.actionSetCountDown(false);
        actions.actionEndGame(true);
        
        if(!needToDisable)
        {
            const winnerId = props.nextMove == "O" ? props.roomInfo.playerX.id : props.roomInfo.playerO.id;
            const loserId = winnerId == props.roomInfo.playerO.id ? props.roomInfo.playerX.id : props.roomInfo.playerO.id;
            const winnerType = props.nextMove == "O" ? "X" : "O";
            const loserType = winnerType == "O" ? "X" : "O";
            socket.emit("endgame",{winnerId,loserId});
            actions.actionAddHistory(props.roomInfo.id,winnerId,loserId,props.history,props.chatHistory,"normal",winnerType,loserType,getDate());
        }

        console.log("End game: ",props);
    }
    return (
        <DefaultLayout>
        <div className='App'>
            {/* <header className='App-header'> */}
                {/* <img src={logo} className='App-logo' alt='logo' /> */}
                
                <Dialog ref={(el) => setDialog(el)} />
                <div className='board-game' style={{overflow:'scroll'}}>
                    <div className = "flex-item-player" style={{padding:'1%'}}>
                        {/* Our infomation */}
                        <Card className='card'>
                            <Card.Body className='card-body' 
            style={{background : ((winCells && nextMove == "O") || (winnerBg == roomInfo.playerX.id)) ? "#80ff80" : (winnerBg=="draw"? "#ffd699": "")}}>
                                <Card.Title className='card-title'>{userInfo.id == roomInfo.playerX.id ? "You": userInfo.id == roomInfo.playerO.id ? "Opponent":"Role"}: X </Card.Title>
                                <Card.Text className='card-text-bold'><b>{Xname}</b></Card.Text>
                                <Card.Text className='card-text-bold'><b>{roomInfo.playerX.status}</b></Card.Text>
                                <img src={avatarSrc} className='avatar-small' alt='avatar'/><br></br>
                                <Card.Text className='card-text-bold'><b>Rank: {roomInfo.playerX.rank}</b></Card.Text>
                                <Card.Text className='card-text-bold'><b>Total match: {roomInfo.playerX.total_match}</b></Card.Text>
                            </Card.Body>
                        </Card>
                        <h2>VS</h2>
                        {/* Rival infomation */}
                        <Card className='card'>
                            <Card.Body className='card-body' 
                         style={{background :((winCells && nextMove == "X") || (winnerBg == roomInfo.playerO.id)) ? "#80ff80" : (winnerBg=="draw"? "#ffd699": "")}}>
                                <Card.Title className='card-title'>{userInfo.id == roomInfo.playerO.id ? "You":userInfo.id == roomInfo.playerX.id ? "Opponent":"Role"} : O  </Card.Title>
                                <Card.Text className='card-text-bold'><b>{rivalname}</b></Card.Text>
                                <Card.Text className='card-text-bold'><b>{roomInfo.playerO.status}</b></Card.Text>
                                <img src={rivalAvatarSrc} className='avatar-small' alt='rivalAvatar'/><br></br>
                                <Card.Text className='card-text-bold'><b>Rank: {roomInfo.playerO.rank}</b></Card.Text>
                                <Card.Text className='card-text-bold'><b>Total match: {roomInfo.playerO.total_match}</b></Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="flex-item-game">
                    <div 
                style={{display:(userInfo.id != roomInfo.playerX.id && userInfo.id != roomInfo.playerO.id ? "none" : "inline-block")}}>
                    {roomInfo.playerX.id == userInfo.id && nextMove == "X" && !needToDisable &&
                    <CountDown countDown = {props.countDown} time = {roomInfo.time} endGame = {endGame} needToDisable={needToDisable}/>}
                    <Status nextMove={nextMove}
                        winCells={winCells}
                        rivalname={roomInfo.playerO.name}
                        messages={message}
                        isPlayerX={isPlayerX}/>
                    {roomInfo.playerO.id == userInfo.id &&  nextMove=="O" && !needToDisable &&
                    <CountDown countDown = {props.countDown} time = {roomInfo.time} endGame = {endGame} needToDisable={needToDisable}/>}
                </div>

                        <Board  winCells={winCells}
                                squares={current.squares}
                                currentCell={[current.x, current.y]}
                                handleClick={(i, j) => userClick(i, j)}/>
                        <Button className='logout-button' variant='info' onClick={() => goHome()}>Trang chủ</Button>&nbsp;&nbsp;
                        <Button className='logout-button' variant='info' onClick={() => requestSurrender()}
                                        style={{display:(userInfo.id != roomInfo.playerX.id && userInfo.id != roomInfo.playerO.id ? "none" : "inline-block")}}
                                        disabled={needToDisable }>Surrender</Button>&nbsp;&nbsp;
                        <Button className='logout-button' variant='info' onClick={() => requestCeasefire()}
                                style={{display:(userInfo.id != roomInfo.playerX.id && userInfo.id != roomInfo.playerO.id ? "none" : "inline-block")}}
                                disabled={needToDisable }>Draw</Button>
                    </div>
                    {/* <div> */}
                        {/* Change sort mode */}
                        <div className ="flex-item-step">
                            <div style={{width:'100%', display:(userInfo.id != roomInfo.playerX.id && userInfo.id != roomInfo.playerO.id ? "none" : "inline-block")}}>
                                <Button className='change-sort-button' onClick={actions.actionChangeSort}>{sortMode}</Button>
                                <br></br>
                                <ScrollToBottom className='scroll-view' mode={accendingMode ? `bottom` : `top`}>
                                    <ol>{moves}</ol>
                                </ScrollToBottom>
                            </div>
                        {/* </div> */}
                        {/* Chat panel */}
                        <Card className='card-chat'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>Chat</Card.Title>
                                <div className='scroll-view-chat'>
                                    {chatHistoryUI}
                                </div>
                                <form onSubmit={e => handleChat(e)}>
                                    <FormControl type='chatMessage'
                                        className='input-message'
                                        placeholder='Your message'
                                        style={{background:"white"}}
                                        value={chatMessage}
                                        // disabled={needToDisable}
                                        onChange={e => setChatMessage(e.target.value)}>
                                    </FormControl>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            {/* </header> */}
        </div>
        </DefaultLayout>
    );

    function goHome() {
        actions.actionRefresh();
       window.location.href = '/';
        //historyRouter.push("/");
    }

    function checkWin(row, col, user, stepNumber) {

        if (stepNumber === 0) {
            return null;
        }

        const { history } = props;
        const current = history[stepNumber];
        const squares = current.squares.slice();

        // Get coordinates
        let coorX = row;
        let coorY = col;
 
        let countCol = 1;
        let countRow = 1;
        let countMainDiagonal = 1;
        let countSkewDiagonal = 1;
        let isBlock;
        const rival = (user === Config.xPlayer) ? Config.oPlayer : Config.xPlayer;
 
        // Check col
        isBlock = true;
        let winCells = [];
        coorX -= 1;
        while(coorX >= 0 && squares[coorX][coorY] === user) {
            countCol += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
        }
        if (coorX >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        winCells.push([coorX, coorY]);
        coorX += 1;
        while(coorX <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countCol += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
        }
        if (coorX <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        if (isBlock === false && countCol >= 5) return winCells;
 
        // Check row
        isBlock = true;
        winCells = [];
        coorY -= 1;
        while(coorY >= 0 && squares[coorX][coorY] === user) {
            countRow += 1;
            winCells.push([coorX, coorY]);
            coorY -= 1;
        }
        if (coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        winCells.push([coorX, coorY]);
        coorY += 1;
        while(coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countRow += 1;
            winCells.push([coorX, coorY]);
            coorY += 1;
        }
        if (coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        if (isBlock === false && countRow >= 5) return winCells;

        // Check main diagonal
        isBlock = true;
        winCells = [];
        coorX -= 1;
        coorY -= 1;
        while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
            countMainDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
            coorY -= 1;
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        winCells.push([coorX, coorY]);
        coorX += 1;
        coorY += 1;
        while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countMainDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
            coorY += 1;
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        if (isBlock === false && countMainDiagonal >= 5) return winCells;

        // Check skew diagonal
        isBlock = true;
        winCells = [];
        coorX -= 1;
        coorY += 1;
        while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
            countSkewDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
            coorY += 1;
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        winCells.push([coorX, coorY]);
        coorX += 1;
        coorY -= 1;
        while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countSkewDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
            coorY -= 1;
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        if (isBlock === false && countSkewDiagonal >= 5) return winCells;

        return null;
    }

    function userClick(row, col) {
        const { nextMove } = props;

        // Prevent user click if rival is disconnected
        if (needToDisable ) {
            return;
        }

        // Prevent user click if not his turn
        if ((isPlayerX && nextMove === Config.oPlayer) || (!isPlayerX && nextMove === Config.xPlayer)) {
            return;
        }
        
        // Send move to server if it is valid
        if (handleClick(row, col)) {
            socket.emit('move', { row: row, col: col });
        }
    }

    function handleClick(row, col) {
      
        const { actions } = props
        const { stepNumber } = props;
        const { history } = props;
        const { nextMove } = props;
        const { winCells } = props;
        actions.actionSetCountDown(true);
        actions.actionJoinRoom(roomInfo);
        // It should be named 'curMove'
        const curMove = nextMove;
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];

        // Attention: Slice does not work properly with 2D array
        const squares = JSON.parse(JSON.stringify(current.squares));

        if (winCells == null && squares[row][col] == null) {

            // Assign value
            squares[row][col] = curMove;
            const _nextMove = curMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
            const _winCells = checkWin(row, col, curMove, newHistory.length - 1);
           // console.log(_winCells);
            //console.log(props);
            
            const _history  = newHistory.concat([{
                x: row,
                y: col,
                squares
            }]);
            if(_winCells)
            {
                if(props.roomInfo.playerX.id == props.userInfo.id)
                {
                    const winnerId = _nextMove == "O" ? props.roomInfo.playerX.id :props.roomInfo.playerO.id;
                    const loserId = _nextMove == "O" ? props.roomInfo.playerO.id :props.roomInfo.playerX.id;
                    const winnerType = _nextMove == "O" ? "X" : "O";
                    const loserType = winnerType == "O" ? "X" : "O";
                    actions.actionAddHistory(props.roomInfo.id,winnerId,loserId,_history,props.chatHistory,"normal",winnerType,loserType,getDate());
                }
            }
            // Call action
            actions.actionClick(_history, _nextMove, _winCells);
            return true;
        }
        return false;
    }

    function jumpTo(step) {
        const { actions } = props
        const { history } = props;
        actions.actionEndGame(false);
        const { nextMove } = props;
        const oppositeNextMove = nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
        const { stepNumber } = props;
        const target = history[step];

        var futureCurrMove;
        var futureNextMove;

        // If current step and wanted step is the same type
        if ((stepNumber % 2 === 0 && step % 2 === 0) || (stepNumber % 2 !== 0 && step % 2 !== 0)) {
            futureCurrMove = oppositeNextMove;
            futureNextMove = nextMove;
        }
        else {
            futureCurrMove = nextMove;
            futureNextMove = oppositeNextMove;
        }
        
        const winCells = checkWin(target.x, target.y, futureCurrMove, step);

        // Call action
        actions.actionJumpTo(step, futureNextMove, winCells);
    }

    function handleChat(e) {
        e.preventDefault();
        socket.emit('chat', 
        {idSender:JSON.parse(localStorage.getItem('user')).id,
        sender:JSON.parse(localStorage.getItem('user')).name,
        message:chatMessage});
        setChatMessage('');
    }

    function setupSocket() {
        if(userInfo.id == roomInfo.playerX.id || userInfo.id == roomInfo.playerO.id)
        {
        socket.removeAllListeners();
        socket.on('endgame',function(data)
        {
            actions.actionEndGame(true);
             if(userInfo.id == data.winnerId)
            {
                actions.actionRequest(true, `You opponent's turn out of time, you win !`);
            }
            if(userInfo.id == data.loserId)
            {  
                actions.actionRequest(true, `Time out! You lose`);
            }
            actions.actionAddWinner(data.winnerId);
        })

        socket.on('move', function (data) {
            handleClick(data.row, data.col);
        });
        socket.on('disconnect1', function (data) {

            // Check if data is 'transport close'
            if (data.id) {
                actions.actionJoinRoom(data);
            }
        });
        socket.on('chat', function (data) {
                actions.actionChat(data);
        });

        socket.on("winner",function(winnerId)
        {
            actions.actionAddWinner(winnerId);
        })
        // Surrender / Ceasefire
        socket.on('surrender-request', function (data) {
            doConfirm('Your opponent wants to surrender.Do you accept?', () => {
                
                actions.actionRequest(true, `Congratulations! You win`);
                const winnerId = (userInfo.id == roomInfo.playerX.id || userInfo.id == roomInfo.playerO.id) ? userInfo.id : null;
                socket.emit('surrender-result', {
                    message: 'yes',
                    winnerId: winnerId
                });
                if(winnerId)
                {
                    const loserId = (winnerId == roomInfo.playerX.id) ? roomInfo.playerO.id : roomInfo.playerX.id;
                    const winnerType = winnerId == roomInfo.playerX.id ? "X" : "O";
                    const loserType = winnerType == "O" ? "X" : "O";
                    actions.actionAddHistory(props.roomInfo.id,winnerId,loserId,props.history,props.chatHistory,"surrender",winnerType,loserType,getDate());
                }
            }, () => {
                socket.emit('surrender-result', {
                    message: 'no'
                });
                actions.actionRequest(false, null);
            })
        });
        socket.on('surrender-result', function (data) {
            if (data.message === `yes`) {
                const winnerId = userInfo.id == roomInfo.playerX.id ? roomInfo.playerO.id : roomInfo.playerX.id;
                actions.actionRequest(true, `Opps ! You lose`);
                if (!data.noAlert) {
                    dialog.showAlert(`Your opponent has accepted your surrdering request!`);
                }
            }
            else {
                actions.actionRequest(false, null);
                dialog.showAlert(`Your opponent has rejected your surrdering request!`);
            }
        });
        socket.on('ceasefire-request', function (data) {
            doConfirm('Your opponent wants to draw.Do you accept?', () => {
                socket.emit('ceasefire-result', {
                    message: 'yes'
                });
                actions.actionRequest(true, `Great! This game is draw`);
                const winnerType = userInfo.id == roomInfo.playerO.id ? "O" : "X";
                const loserType = winnerType == "O" ? "X" : "O";
                actions.actionAddHistory(roomInfo.id,roomInfo.playerO.id,roomInfo.playerX.id,props.history,props.chatHistory,"draw",winnerType,loserType,getDate());
            }, () => {
                socket.emit('ceasefire-result', {
                    message: 'no'
                });
                actions.actionRequest(false, null);
            });
        });
        socket.on('ceasefire-result', function (data) {
            if (data.message === 'yes') {
                actions.actionRequest(true, `Great! This game is draw`);
                if (!data.noAlert) {
                    dialog.showAlert(`Your opponent has accepted your drawing request!`);
                }
            }
            else {
                actions.actionRequest(false, null);
                dialog.showAlert(`Your opponent has rejected your drawing request`);
            }
        });

        // Undo / Redo
        socket.on('undo-request', function (data) {
            doConfirm(`Your opponent want to return turn #${data.stepNumber}: (${data.x},${data.y}). Do you accept?`, () => {
                socket.emit('undo-result', {
                    message: 'yes',
                    stepNumber: data.stepNumber
                });
                jumpTo(data.stepNumber);
            }, () => {
                socket.emit('undo-result', {
                    message: 'no'
                });
            });
        });
        socket.on('undo-result', function (data) {
            if (data.message === `yes`) {
                jumpTo(data.stepNumber);
                if (!data.noAlert) {
                    dialog.showAlert(`Your opponent has accepted!`);
                }
            }
            else {
                dialog.showAlert(`Your opponent has rejected!`);
            }
            actions.actionRequest(false, null);
        });

        // Play again
        socket.on('play-again-request', function (data) {
            doConfirm('Your opponent want to play again. Do you accept ?', () => {
                actions.actionResetGame(isPlayerX ? Config.xPlayer : Config.oPlayer);
                socket.emit('play-again-result', {
                    message: 'yes'
                });
            }, () => {
                socket.emit('undo-result', {
                    message: 'no'
                });
            });
        });
        socket.on('play-again-result', function (data) {
            if (data.message === 'yes') {
                actions.actionResetGame(isPlayerX ? Config.oPlayer : Config.xPlayer);
                if (!data.noAlert) {
                    dialog.showAlert(`Your opponent has accepted!`);
                }
            }
            else {
                dialog.showAlert(`Your opponent has rejected!`);
            }
        });

        // Reconnect if browser refresh
        if (!socket.joinroom) {
            //console.log(socket.joinroom)
           
            socket.joinroom = true;
            socket.emit('on-reconnect', { roomInfo, userInfo });
           
        }
            socket.on('on-reconnect', function (data) {
                // If found the room, join it
                if (data) {
                    data.justReconnect = true;
                // console.log(data);
                
                    actions.actionJoinRoom(data);
                }

                // Else reset
                else {
                    actions.actionRefresh();
                }
            });
        }
        else{
            socket.removeAllListeners();
            socket.on('move', function (data) {
                handleClick(data.row, data.col);
            });
            socket.on('disconnect1', function (data) {
    
                // Check if data is 'transport close'
                if (data.id) {
                    actions.actionJoinRoom(data);
                }
            });
            socket.on('chat', function (data) {
                    actions.actionChat(data);
            });
            socket.on('winner',function(winnerId)
            {
                actions.actionAddWinner(winnerId);
            })
            socket.on('on-reconnect', function (data) {
                // If found the room, join it
                if (data) {
                    data.justReconnect = true;
                // console.log(data);
                
                    actions.actionJoinRoom(data);
                }

                // Else reset
                else {
                    actions.actionRefresh();
                }
            });
        }
    }

    function doConfirm(message, callbackYes, callbackNo) {
        dialog.show({
            title: 'Acception',
            body: message,
            actions: [
                Dialog.CancelAction(() => callbackNo()),
                Dialog.OKAction(() => callbackYes())
            ],
            bsSize: 'md',
            onHide: (dialog) => {}
        })
    }

    function requestSurrender() {
        doConfirm('Do you want to surrender ?', () => {
            socket.emit('surrender-request', userInfo.username);
            actions.actionRequest(true, `... Wating opponent's response ...`);
        }, () => {});
    }

    function requestCeasefire() {
        doConfirm('Do you want to draw ?', () => {
            socket.emit('ceasefire-request', userInfo.username);
            actions.actionRequest(true, `... Wating opponent's response ...`);
        }, () => {});
    }

    function requestUndo(stepNumber) {

        if (stepNumber === 0) {
            doConfirm('Do you want to play again ?', () => {
                socket.emit('play-again-request', '');
                actions.actionRequest(true, `... Wating opponent's response ...`);
            }, () => {});
            return;
        }

        const { history } = props;
        const target = history[stepNumber];
        var request = {
            stepNumber,
            x: target.x,
            y: target.y
        };

        // For bot
        if (history[stepNumber + 1]) {
            request.nextX = history[stepNumber + 1].x;
            request.nextY = history[stepNumber + 1].y;
        }

        doConfirm('Do you want to return this turn ?', () => {
            socket.emit('undo-request', request);
            actions.actionRequest(true, `... Wating opponent's response ...`);
        }, () => {});
    }

}
}

export default Game;