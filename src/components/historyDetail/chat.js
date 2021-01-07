import React, { useState } from "react"
import "../game/game.css"
import { Card,Button } from 'react-bootstrap';


export default function Chat(props)
{
    const chatHistory = props.chatHistory;
    const chatHistoryUI = [];
    for (var i = 0; i < chatHistory.length; i++) {
        const color = chatHistory[i].sender === 'Mình' ? 'blue' : 'red';
        const style = { color: color };
        chatHistoryUI.push(<b style={style} key={i}>{chatHistory[i].sender}</b>);
        chatHistoryUI.push(': ' + chatHistory[i].message);
        chatHistoryUI.push(<br key={i + chatHistory.length}></br>);
    }

    

    return (
        <>
        <Card className='card-chat'>
            <Card.Body className='card-body'>
                <Card.Title className='card-title'>Chat History</Card.Title>
                <div className='scroll-view-chat'>
                    {chatHistoryUI}
                </div>
            </Card.Body>
        </Card>
        </>
    )
}