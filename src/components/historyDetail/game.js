import React, { useState } from "react"
import "../game/game.css"
import { Card,Button,Container } from 'react-bootstrap';
import Board from "./board"
import RenderStep from "./renderStep"
import { render } from "@testing-library/react";
import Chat from "./chat"
export default function Game(props)
{
    console.log(props);
    const [nowStep,setNowStep] = useState(0);

    const [current,setCurrent]=useState(props.gameHistory[0]);

    const [winCells,setWinCells] = useState(null);
   
    return (
        <div className='board-game'>
            <div className="flex-item-player">
                    {/* Our infomation */}
                    <Card className='card'>
                        <Card.Body className='card-body'>
                            <Card.Title className='card-title'>You</Card.Title>
                            <Card.Title className='card-title'>
                                {JSON.parse(localStorage.getItem("user")).id == props.winnerId ? props.winnerType : props.loserType}
                            </Card.Title>
                            <Card.Text className='card-text-bold'><b>{JSON.parse(localStorage.getItem("user")).name}</b></Card.Text>
                        </Card.Body>
                    </Card>
                    <h2>VS</h2>
                    {/* Rival infomation */}
                    <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>Competitor</Card.Title>
                                <Card.Title className='card-title'>
                                {JSON.parse(localStorage.getItem("user")).id == props.winnerId ? props.loserType : props.winnerType}
                                 </Card.Title>
                                <Card.Text className='card-text-bold'><b>{props.competitorName}</b></Card.Text>
                            </Card.Body>
                    </Card>
            </div>
           
            <div className="flex-item-game">
                <h3>Result game: You {props.finalResult}</h3>
                <Board  
                winCells={winCells}
                squares={current.squares}
                currentCell={[current.x, current.y]}
                /> 
            </div>
            <div className="flex-item-step">
                <RenderStep changeStep={(step,winCells)=>{
                    setNowStep(step);
                    setCurrent(props.gameHistory[step])
                    setWinCells(winCells)
                    }} 

                    nowStep={nowStep} 
                    gameHistory={props.gameHistory}/>

                <Chat chatHistory={props.chatHistory}/>
            </div>

            {/* <div className="flex-item-chat">
                <Chat chatHistory={props.chatHistory}/>
            </div> */}
        </div>
    )
}