import React, { useState } from "react"
import "../game/game.css"
import { Card,Button } from 'react-bootstrap';
import Board from "./board"
import RenderStep from "./renderStep"
import { render } from "@testing-library/react";
export default function Game(props)
{
    //console.log(props);
    const [nowStep,setNowStep] = useState(0);

    const [current,setCurrent]=useState(props.gameHistory[0]);

    const [winCells,setWinCells] = useState(null);
   
    return (
        <div className='board-game'>
            <div>
                    {/* Our infomation */}
                    <Card className='card'>
                        <Card.Body className='card-body'>
                            <Card.Title className='card-title'>Bạn</Card.Title>
                            <Card.Text className='card-text-bold'><b>{JSON.parse(localStorage.getItem("user")).name}</b></Card.Text>
                        </Card.Body>
                    </Card>
                    <h2>VS</h2>
                    {/* Rival infomation */}
                    <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>Đối thủ</Card.Title>
                                <Card.Text className='card-text-bold'><b>{props.competitorName}</b></Card.Text>
                            </Card.Body>
                    </Card>
            </div>
           
            <div style={{textAlign:'center'}}>
                <h3>Result game: You {props.finalResult}</h3>
                <Board  
                winCells={winCells}
                squares={current.squares}
                currentCell={[current.x, current.y]}
               /> 
            </div>
            
            <RenderStep changeStep={(step,winCells)=>{
                setNowStep(step);
                setCurrent(props.gameHistory[step])
                setWinCells(winCells)
                }} 

                nowStep={nowStep} 
                gameHistory={props.gameHistory}/>
        </div>
    )
}