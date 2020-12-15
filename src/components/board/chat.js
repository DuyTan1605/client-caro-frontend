import React,{useState,useEffect} from "react"
import { useSelector } from "react-redux";
import {
    useParams
  } from "react-router-dom";
import { socket } from "../../helpers/socket";
import ChatContent from "./chatContent"
import Message from "./sendMsgInput"

export default function Chat(props)
{
    return (
        <div style={{marginRight:'10px'}}>
            <ChatContent/>
            <Message/>
        </div>
    )
}